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
  trackLeadEvent("lead_submitted", {
    model: lead.model,
    channel: lead.channel,
    intent: lead.intent,
  });

  return enrichedLead;
};

export const sendLeadToEndpoint = async (lead) => {
  const endpoint = process.env.REACT_APP_LEAD_WEBHOOK_URL?.trim();
  if (!endpoint) return false;

  const formBody = new URLSearchParams({
    payload: JSON.stringify(lead),
    name: lead.name || "",
    phone: lead.phone || "",
    model: lead.model || "",
    intent: lead.intent || "",
    pincode: lead.pincode || "",
    preferredTime: lead.preferredTime || "",
    consent: lead.consent ? "yes" : "no",
  });

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: formBody.toString(),
  });

  return true;
};

export const buildWhatsAppLeadUrl = (phoneNumber, lead = {}) => {
  const lines = [
    "Hello Ashok Hero, I am enquiring from your website.",
    lead.model ? `Model: ${lead.model}` : null,
    lead.intent ? `Need: ${lead.intent}` : null,
    lead.name ? `Name: ${lead.name}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.pincode ? `Pincode: ${lead.pincode}` : null,
    lead.preferredTime ? `Preferred callback: ${lead.preferredTime}` : null,
  ].filter(Boolean);

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};
