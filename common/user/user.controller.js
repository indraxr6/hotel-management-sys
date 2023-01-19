
module.exports ={
     async register(req, res) {
          let data = {
               name: req.body.name,
               photo: req.body.photo,
               email : req.body.email,
               password : req.body.password,
               role : req.body.role
          }
     }
}