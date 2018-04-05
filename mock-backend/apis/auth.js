const mockCredentials = {
  username: 'user@email.com',
  password: 'password'
}

function authRoutes (server, db) {
  server.post('/auth/sign-up', (req, res) => {
    
  });

  server.post('/auth', (req, res) => {
    if (
      req.body.username === mockCredentials.username &&
      req.body.password === mockCredentials.password
    ) {
      res.json(db.auth)
    } else {
      res.status(401)
      res.json({ error: 'Incorrect username or password' })
    }
  })
}

module.exports = authRoutes
