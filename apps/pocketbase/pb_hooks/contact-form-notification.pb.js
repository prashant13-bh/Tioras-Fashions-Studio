/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "tyoras9686@gmail.com" }],
    subject: "New Contact Form Submission: " + e.record.get("subject"),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${e.record.get("name")}</p>
      <p><strong>Email:</strong> ${e.record.get("email")}</p>
      <p><strong>Phone:</strong> ${e.record.get("phone") || "Not provided"}</p>
      <p><strong>Subject:</strong> ${e.record.get("subject")}</p>
      <p><strong>Message:</strong></p>
      <p>${e.record.get("message")}</p>
      <p><strong>Submitted at:</strong> ${new Date(e.record.get("created")).toLocaleString()}</p>
    `
  });
  $app.newMailClient().send(message);
  e.next();
}, "contacts");