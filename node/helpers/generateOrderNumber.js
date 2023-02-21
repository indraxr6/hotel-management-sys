function generateOrderNumber() {
     return `INV-${Math.floor(Math.random() * 90000) + 10000}`
}

module.exports = { generateOrderNumber }