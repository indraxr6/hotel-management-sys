function generateUserID() {
     const char = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     let id = '#'
     for (let i=0; i<5; i++) {
          id += char.charAt(Math.floor(Math.random() * char.length))
     }
     return id
}

const helper = { generateUserID }

module.exports = helper