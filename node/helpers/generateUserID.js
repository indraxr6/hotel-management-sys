async function generateUserID() {
     const char = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     let id = '@'
     for (let i = 0; i < 6; i++) {
          id += char.charAt(Math.floor(Math.random() * char.length))
     }
     return id
}

module.exports = { generateUserID }