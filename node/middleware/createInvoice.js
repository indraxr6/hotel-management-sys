const fs = require("fs");
const moment = require('moment')
const PDFDocument = require("pdfkit");

function createInvoice(invoice, invoiceDetail, typeName, diffDay) {
     let doc = new PDFDocument({ size: "A4", margin: 50 });

     generateHeader(doc);
     generateCustomerInformation(doc, invoice, invoiceDetail);
     generateInvoiceTable(doc, invoice, invoiceDetail, typeName, diffDay);
     generateFooter(doc);

     doc.end();
     doc.pipe(fs.createWriteStream(`public/invoices/${invoice.order_number}.pdf`));
}

function generateHeader(doc) {
     doc
          .image("public/images/logo/slanda-logo-notext.png", 45, 40, { width: 55 })
          .fillColor("#444444")
          .fontSize(12)
          .text("Slanda Inc.", 110, 65)
          .fontSize(10)
          .text("Slanda Inc.", 200, 50, { align: "right" })
          .text("Kasembon Swag Area", 200, 65, { align: "right" })
          .text("Malang, MLG, 69420", 200, 80, { align: "right" })
          .moveDown();
}

function generateCustomerInformation(doc, invoice, invoiceDetail) {
     doc
          .fillColor("#444444")
          .fontSize(20)
          .text("Invoice", 50, 160);

     generateHr(doc, 185);

     const customerInformationTop = 200;

     doc
          .fontSize(10)
          .text("Order Number:", 50, customerInformationTop)
          .font("Helvetica-Bold")
          .text(invoice.order_number, 150, customerInformationTop)

          .font("Helvetica")
          .text("Invoice Date:", 50, customerInformationTop + 15)
          .text(moment().format('YYYY-MM-DD HH:mm:ss'), 150, customerInformationTop + 15)

          .text("Balance Due:", 50, customerInformationTop + 30)
          .text(formatCurrency(invoiceDetail), 150, customerInformationTop + 30)
          .font("Helvetica")
          .text("Order Name:", 300, customerInformationTop)
          .font("Helvetica-Bold")
          .text(invoice.order_name, 400, customerInformationTop)

          .font("Helvetica")
          .text("Order Email:", 300, customerInformationTop + 15)
          .text(invoice.order_email, 400, customerInformationTop + 15)

          .font("Helvetica")
          .text("Check-in Date:", 300, customerInformationTop + 30)
          .font("Helvetica")
          .text(formatDate(invoice.checkin_date), 400, customerInformationTop + 30)

          // .font("Helvetica-Bold")
          // .text(invoice.order_name, 300, customerInformationTop)
          // .font("Helvetica")
          // .text(invoice.order_email, 300, customerInformationTop + 15)
          .moveDown();

     generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice, invoiceDetail, typeName, diffDay) {
     let i;
     const invoiceTableTop = 330;

     doc.font("Helvetica-Bold");
     generateTableRow(
          doc,
          invoiceTableTop,
          "Item",
          "Description",
          "Unit Cost",
          "Duration (day)",
          "Line Total"
     );
     generateHr(doc, invoiceTableTop + 20);
     doc.font("Helvetica");

     for (i = 0; i < invoice.room_count; i++) {
          const position = invoiceTableTop + (i + 1) * 30;
          generateTableRow(
               doc,
               position,
               "TR" + invoice.id_room_type,
               typeName,
               "$" + invoiceDetail / diffDay / invoice.room_count,
               diffDay,
               "$" + (invoiceDetail / diffDay / invoice.room_count) * diffDay  
          );
          generateHr(doc, position + 20);
     }

     const subtotalPosition = invoiceTableTop + (i + 1) * 30;
     generateTableRow(
          doc,
          subtotalPosition,
          "",
          "",
          "Subtotal",
          "",
          formatCurrency(invoiceDetail)
     );

     const paidToDatePosition = subtotalPosition + 20;
     doc.font("Helvetica-Bold");
     generateTableRow(
          doc,
          paidToDatePosition,
          "",
          "",
          "Paid To Date",
          "",
          formatCurrency(invoiceDetail)
     );
}

function generateFooter(doc) {
     doc
          .fontSize(10)
          .font("Helvetica")
          .text(
               "Please show this payment receipt to the receptionist when you arrive according to Check-in date. Thank you for your business.",
               50,
               760,
               { align: "center", width: 500 }
          );
}

function generateTableRow(
     doc,
     y,
     item,
     description,
     unitCost,
     quantity,
     lineTotal
) {
     doc
          .fontSize(10)
          .text(item, 50, y)
          .text(description, 150, y)
          .text(unitCost, 280, y, { width: 90, align: "right" })
          .text(quantity, 370, y, { width: 90, align: "right" })
          .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
     doc
          .strokeColor("#aaaaaa")
          .lineWidth(1)
          .moveTo(50, y)
          .lineTo(550, y)
          .stroke();
}

function formatCurrency(cents) {
     return "$" + cents;
}

function formatDate(date) {
     const day = date.getDate();
     let month = date.getMonth() + 1;
     month < 10 ? month = `0${month}` : month
     const year = date.getFullYear();

     return year + "/" + month + "/" + day;
}

module.exports = {
     createInvoice
};