// Guard known repository risks. GitHub secret scanning remains the secret scanner.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const YAML = require('yaml');

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const forbidden = files.filter((file) =>
  /(^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.env.example') ||
  /\.(pem|key|p12|pfx)$/i.test(file) ||
  /(^|\/)(credentials[^/]*\.json|service-account[^/]*\.json)$/.test(file) ||
  /^(private-data|lead-exports)\//.test(file)
);
assert.deepEqual(forbidden, [], 'Private configuration or lead exports must not be tracked');

for (const name of fs.readdirSync('.github/workflows')) {
  if (!/\.ya?ml$/.test(name)) continue;
  const workflow = YAML.parse(fs.readFileSync(`.github/workflows/${name}`, 'utf8'));
  assert.equal(workflow.permissions?.contents, 'read', `${name}: default token must be read-only`);
  assert.ok(!workflow.on?.pull_request_target, `${name}: privileged PR execution is not allowed`);
  assert.ok(!workflow.on?.schedule, `${name}: scheduled workflows require a deliberate policy change`);
  for (const job of Object.values(workflow.jobs)) {
    assert.ok(job['timeout-minutes'], `${name}: jobs must have time limits`);
    assert.ok(job['timeout-minutes'] <= 15, `${name}: job timeout exceeds the approved limit`);
    assert.equal(job['runs-on'], 'ubuntu-latest', `${name}: use the standard public Linux runner`);
    for (const step of job.steps || []) {
      if (!step.uses) continue;
      assert.match(step.uses, /^actions\/[^@]+@[a-f0-9]{40}$/, `${name}: actions must be official and SHA pinned`);
      if (step.uses.startsWith('actions/checkout@')) {
        assert.equal(step.with?.['persist-credentials'], false, `${name}: checkout must not retain credentials`);
      }
    }
  }
}

const deploy = YAML.parse(fs.readFileSync('.github/workflows/deploy.yml', 'utf8'));
assert.deepEqual(deploy.on.push.branches, ['main']);
assert.equal(deploy.jobs.deploy.if, "github.ref == 'refs/heads/main'");
assert.equal(deploy.jobs.deploy.environment.name, 'github-pages');
assert.deepEqual(deploy.jobs.deploy.permissions, { pages: 'write', 'id-token': 'write' });
assert.ok(!deploy.jobs.build.permissions, 'Build must inherit the read-only token');
assert.equal(deploy.jobs.build.steps.find((step) => step.uses?.startsWith('actions/upload-pages-artifact@')).with['retention-days'], 1);
const ci = YAML.parse(fs.readFileSync('.github/workflows/ci.yml', 'utf8'));
assert.deepEqual(Object.keys(ci.on), ['pull_request'], 'Avoid duplicate CI builds or bot-triggered schedules');
assert.equal(ci.concurrency['cancel-in-progress'], true);
console.log('Repository security configuration passed.');
