/**
 * Attach this script to the private Google Sheet that should receive website
 * enquiries. Deploy it as a Web App and set its URL as
 * REACT_APP_LEAD_WEBHOOK_URL when building the website.
 */
function doPost(e) {
  var raw = (e && e.parameter && e.parameter.payload) || "{}";
  var lead = JSON.parse(raw);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Website Leads");

  if (!sheet) {
    sheet = spreadsheet.insertSheet("Website Leads");
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received at",
      "Name",
      "Phone",
      "Model",
      "Requirement",
      "Pincode",
      "Preferred callback",
      "Consent",
      "UTM source",
      "UTM campaign",
      "Landing page"
    ]);
    sheet.setFrozenRows(1);
  }

  var campaign = lead.campaign || {};
  sheet.appendRow([
    lead.createdAt || new Date().toISOString(),
    lead.name || "",
    lead.phone || "",
    lead.model || "Help me choose",
    lead.intent || "",
    lead.pincode || "",
    lead.preferredTime || "",
    lead.consent ? "Yes" : "No",
    campaign.utm_source || "Direct",
    campaign.utm_campaign || "",
    lead.page || campaign.landingPath || ""
  ]);

  var notifyEmail = PropertiesService.getScriptProperties().getProperty("LEAD_NOTIFY_EMAIL");
  if (notifyEmail) {
    MailApp.sendEmail({
      to: notifyEmail,
      subject: "New Ashok Hero website lead: " + (lead.model || lead.intent || "Enquiry"),
      htmlBody:
        "<p><b>Name:</b> " + safeHtml_(lead.name) + "</p>" +
        "<p><b>Phone:</b> " + safeHtml_(lead.phone) + "</p>" +
        "<p><b>Model:</b> " + safeHtml_(lead.model || "Help me choose") + "</p>" +
        "<p><b>Requirement:</b> " + safeHtml_(lead.intent) + "</p>" +
        "<p><b>Pincode:</b> " + safeHtml_(lead.pincode) + "</p>" +
        "<p><b>Preferred callback:</b> " + safeHtml_(lead.preferredTime) + "</p>"
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
