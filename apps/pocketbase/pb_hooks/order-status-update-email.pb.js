/// <reference path="../pb_data/types.d.ts" />
onRecordAfterUpdateSuccess((e) => {
  const original = e.record.original();
  const newStatus = e.record.get("orderStatus") || e.record.get("status");
  const oldStatus = original.get("orderStatus") || original.get("status");
  
  if (newStatus === oldStatus) {
    e.next();
    return;
  }
  
  const user = $app.findRecordById("users", e.record.get("userId"));
  if (!user) {
    e.next();
    return;
  }
  
  const trackingNumber = e.record.get("trackingNumber");
  let trackingHtml = "";
  if (trackingNumber) {
    trackingHtml = `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>`;
  }
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: user.get("email") }],
    subject: "Order Status Update - Order #" + e.record.get("orderNumber"),
    html: `
      <h2>Order Status Update</h2>
      <p>Your order status has been updated!</p>
      
      <h3>Order Details</h3>
      <p><strong>Order Number:</strong> ${e.record.get("orderNumber")}</p>
      <p><strong>Previous Status:</strong> ${oldStatus || "Pending"}</p>
      <p><strong>New Status:</strong> ${newStatus || "Unknown"}</p>
      
      <h3>Delivery Information</h3>
      <p><strong>Estimated Delivery Date:</strong> ${e.record.get("estimatedDeliveryDate") || e.record.get("estimatedDelivery") || "To be confirmed"}</p>
      ${trackingHtml}
      
      <hr>
      <h3>Contact Us</h3>
      <p><strong>Phone:</strong> 7353676454, 9902857694</p>
      <p><strong>Email:</strong> tyoras9686@gmail.com</p>
      <p><strong>Address:</strong> Ambedkar Circle, Talikoti, Taluk: Talikoti, District: Vijayapura, Pincode: 586214</p>
      
      <p>Thank you for your business!</p>
    `
  });
  $app.newMailClient().send(message);
  e.next();
}, "orders");