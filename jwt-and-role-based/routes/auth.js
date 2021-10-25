const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const users = [];
let nextId = 1;

router.post('/signup', async (req, res) => {
  const { username, password, roles } = req.body;

  const salt = await bcrypt.genSalt(15);
  const hashed = await bcrypt.hash(password, salt);

  users.push({ username, password: hashed, roles, id: nextId });
  nextId += 1;
  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username == username);

  if (!user) throw new Error('Invalid username or password');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid username or password');

  const token = jwt.sign(
    {
      id: user.id,
      roles: user.roles
    },
    'jwtPrivateKey',
    { expiresIn: '15m' }
  );

  res.send({
    token: token
  });
});

module.exports = router;
