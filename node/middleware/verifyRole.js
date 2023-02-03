async function verifyRole(req, res, next) {
     const userRole = await req.body.role
     if (userRole !== 'ADMIN') {
          return res.status(401).json({
               status_code : 401,
               message: "User unauthorized, doesn't have access to execute operation"
          })
     }
     next()
}

module.exports = { verifyRole }