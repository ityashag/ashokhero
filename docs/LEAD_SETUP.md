# Ashok Hero lead setup

The landing page already opens a pre-filled WhatsApp enquiry to `+91 97588 10331`. To also keep a private, searchable owner-side lead list, connect the included Google Apps Script to a Google Sheet.

## Connect the private lead sheet

1. Create a private Google Sheet owned by the dealership account.
2. In that sheet, open **Extensions → Apps Script**.
3. Replace the sample code with [`integrations/google-apps-script.gs`](../integrations/google-apps-script.gs).
4. In **Project Settings → Script properties**, add `LEAD_NOTIFY_EMAIL` with the email that should receive each new-lead alert.
5. Choose **Deploy → New deployment → Web app**. Execute as the owner and allow access to anyone submitting the public form.
6. Copy the `/exec` deployment URL. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add a repository secret named `REACT_APP_LEAD_WEBHOOK_URL` with that URL. The deployment workflow already passes this secret to the production build. `.env.example` shows the expected local format.
7. Rebuild and deploy the site. Test once with a real phone number and confirm that the row appears in the **Website Leads** tab.

The sheet records the customer fields they knowingly submit, consent, model/intent, landing page, and available UTM campaign fields. The browser does not keep a local copy of their personal details.

## Google Ads and campaign tracking

Campaign parameters such as `utm_source`, `utm_campaign`, `gclid`, and `fbclid` are attached to submitted leads. Use tagged landing links in ads, for example:

`https://ityashag.github.io/ashokhero/?utm_source=google&utm_medium=cpc&utm_campaign=splendor_bareilly`

The site also pushes conversion events into `window.dataLayer`, ready for a Google Tag Manager container. Add the dealership's own GTM/GA4 configuration in the hosting environment before running paid campaigns, and publish a suitable privacy policy/cookie consent flow for any analytics or advertising cookies you enable.

## WhatsApp follow-up

The current flow is consent-first: the customer taps the WhatsApp button and sends the prepared message to the showroom. Staff can reply in WhatsApp Business and label the conversation by stage.

Automated outbound messages to customers require an official WhatsApp Business Platform account, approved message templates, opt-in records, and server-side credentials. Do not put a Meta access token in this React site. Connect that automation only through a protected backend or an approved CRM/provider.

## Google Business Profile checklist

- Use the same business name, phone and Nakatia address on the website and profile.
- Add this landing-page URL to the profile's website field.
- Keep holiday hours, categories, services and photos current.
- Add new showroom and delivery photos regularly; use descriptive captions.
- Ask real customers for honest reviews after delivery or service. Do not offer incentives or copy invented reviews onto the site.
