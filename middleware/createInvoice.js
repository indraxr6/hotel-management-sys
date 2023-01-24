const fs = require('fs')
const PDFDocument = require('pdfkit')

async function generateInvoice(order) {
     const doc = new PDFDocument()
     // Set the invoice number and date
     doc.fontSize(18).text(`Invoice #: ${order.order_number}`, 50, 50);
     doc.fontSize(18).text(`Date: ${order.order_date}`, 50, 80);
     // Add the customer information
     doc.fontSize(12).text(`Customer: ${order.guest_name}`, 50, 110);
     doc.fontSize(12).text(`Email: ${order.order_email}`, 50, 130);
     // Add the room type and price information
     doc.fontSize(12).text(`Room Type: ${order.id_room_type.room_type_name}`, 50, 160);
     doc.fontSize(12).text(`Price: ${order.price}`, 50, 180);
     // Add the checkin and checkout information
     doc.fontSize(12).text(`Check-in: ${order.checkin_date}`, 50, 210);
     doc.fontSize(12).text(`Check-out: ${order.checkout_date}`, 50, 230);

     doc.pipe(fs.createWriteStream(`public/invoices/${order.order_number}.pdf`));
     doc.end();
}

module.exports = { generateInvoice }