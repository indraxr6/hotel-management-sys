const fs = require('fs');
const PDFDocument = require('pdfkit');

async function generateInvoice(order, orderDetails) {
     const doc = new PDFDocument()

     generateHeader(doc);
     generateFooter(doc);

     function generateHeader(doc) {
          doc.image('public/images/logo/slanda-logo-smol.png', 50, 45, { width: 40 })
               .fillColor('#444444')
               .fontSize(10)
               .text('Slanda Inc.', 103, 57)
               .fontSize(10)
               .text('123 Main Street', 200, 65, { align: 'right' })
               .text('New York, NY, 10025', 200, 80, { align: 'right' })
               .moveDown();
     }

     function generateFooter(doc) {
          doc.fontSize(
               10,
          ).text(
               'Payment is due within 7 days. Thank you for your business.',
               50,
               780,
               { align: 'center', width: 500 },
          );
     }
     function generateCustomerInformation(doc, order) {
          // const shipping = invoice.shipping;
     
          doc.text(`Invoice Number: INV-31831819`, 50, 200)
               .text(`Invoice Date: ${new Date()}`, 50, 215)
               .text(`Balance Due: $32`, 50, 130)
     
               .text("shipping.name", 300, 200)
               .text("shipping.address", 300, 215)
               .text(
                    `Ranau Street 314 Jakarta, Indonesia`,
                    300,
                    130,
               )
               .moveDown();
     }
     
     function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
          doc.fontSize(10)
               .text(c1, 50, y)
               .text(c2, 150, y)
               .text(c3, 280, y, { width: 90, align: 'right' })
               .text(c4, 370, y, { width: 90, align: 'right' })
               .text(c5, 0, y, { align: 'right' });
     }
     
     

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

     generateCustomerInformation(doc, order)
     generateTableRow(doc, order)
     generateTableRow(doc, orderDetails);

     doc.pipe(fs.createWriteStream(`public/invoices/${order.order_number}.pdf`));
     doc.end();


}



module.exports = { generateInvoice }
