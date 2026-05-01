/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const user = $app.findRecordById("users", e.record.get("userId"));
  if (!user) {
    e.next();
    return;
  }
  
  const items = e.record.get("items") || [];
  let itemsHtml = "<ul>";
  if (Array.isArray(items)) {
    items.forEach(item => {
      itemsHtml += `<li>${item.name || "Product"} - Qty: ${item.quantity || 1} - ₹${item.price || 0}</li>`;
    });
  }
  itemsHtml += "</ul>";
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: user.get("email") }],
    subject: "Order Confirmation - Order #" + e.record.get("orderNumber"),
    html: `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      
      <h3>Order Details</h3>
      <p><strong>Order Number:</strong> ${e.record.get("orderNumber")}</p>
      <p><strong>Order Date:</strong> ${new Date(e.record.get("orderDate")).toLocaleDateString()}</p>
      
      <h3>Items Ordered</h3>
      ${itemsHtml}
      
      <h3>Order Summary</h3>
      <p><strong>Subtotal:</strong> ₹${e.record.get("subtotal") || 0}</p>
      <p><strong>Tax:</strong> ₹${e.record.get("tax") || 0}</p>
      <p><strong>Shipping Cost:</strong> ₹${e.record.get("shippingCost") || 0}</p>
      <p><strong>Total Amount:</strong> ₹${e.record.get("totalAmount") || e.record.get("total") || 0}</p>
      
      <h3>Shipping Address</h3>
      <p>${e.record.get("shippingAddress") || "Address not provided"}</p>
      
      <h3>Estimated Delivery</h3>
      <p>${e.record.get("estimatedDeliveryDate") || e.record.get("estimatedDelivery") || "To be confirmed"}</p>
      
      <hr>
      <h3>Contact Us</h3>
      <p><strong>Phone:</strong> 7353676454, 9902857694</p>
      <p><strong>Email:</strong> tyoras9686@gmail.com</p>
      <p><strong>Address:</strong> Ambedkar Circle, Talikoti, Taluk: Talikoti, District: Vijayapura, Pincode: 586214</p>
      
      <p>We will notify you once your order is shipped!</p>
    `
  });
  $app.newMailClient().send(message);
  e.next();
}, "orders");