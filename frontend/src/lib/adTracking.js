const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const storage = {
  get(key, fallback) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return null;
    }
    return value;
  },
};

export const getCampaignContext = () => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const context = CAMPAIGN_KEYS.reduce((acc, key) => {
    const value = params.get(key);
    return value ? { ...acc, [key]: value } : acc;
  }, {});

  if (Object.keys(context).length > 0) {
    return storage.set("ashok_sales_campaign", {
      ...context,
      landingPath: window.location.pathname,
      capturedAt: new Date().toISOString(),
    });
  }

  return storage.get("ashok_sales_campaign", {});
};

export const trackLeadEvent = (eventName, payload = {}) => {
  if (typeof window === "undefined") return null;

  const event = {
    event: eventName,
    payload,
    campaign: getCampaignContext(),
    createdAt: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  const events = storage.get("ashok_sales_events", []);
  storage.set("ashok_sales_events", [event, ...events].slice(0, 50));

  return event;
};

export const saveLead = (lead) => {
  if (typeof window === "undefined") return null;

  const enrichedLead = {
    ...lead,
    id: `${Date.now()}`,
    campaign: getCampaignContext(),
    createdAt: new Date().toISOString(),
  };
  const leads = storage.get("ashok_sales_leads", []);
  storage.set("ashok_sales_leads", [enrichedLead, ...leads].slice(0, 100));
  trackLeadEvent("lead_submitted", {
    model: lead.model,
    channel: lead.channel,
    intent: lead.intent,
  });

  return enrichedLead;
};

export const buildWhatsAppLeadUrl = (phoneNumber, lead = {}) => {
  const lines = [
    "Hello Ashok Hero, I want my best Hero offer.",
    lead.model ? `Model: ${lead.model}` : null,
    lead.intent ? `Need: ${lead.intent}` : null,
    lead.name ? `Name: ${lead.name}` : null,
  ].filter(Boolean);

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};
