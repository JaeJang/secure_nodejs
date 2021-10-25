const express = require('express');

const app = express();

app.use(express.json({ limit: '100mb' }));

const authRouter = require('./routes/auth');
const messageRouter = require('./routes/messages');

app.use('/api/message', messageRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('connected');
});
