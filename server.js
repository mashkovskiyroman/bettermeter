const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = 3000;
io.on('connect', (socket) => {

  socket.on('connect_to_edit_campaign', async ({id}) => {
    socket.join(`edit_campaign_${id}`);
    const sockets = await io.in(`edit_campaign_${id}`).allSockets();
    const members = Array.from(sockets).filter(member => member !== socket.id);
    if (members.length) {
      io.in(`edit_campaign_${id}`).emit('edit_campaign', {
        message: members.length > 1
          ? `These members also edit this campaign: ${members.join(', ')}`
          : `This member also edit this campaign: ${members[0]}`
      })
    }
  });

  socket.on('disconnect_from_edit_campaign', ({id}) => {
    socket.leave(`edit_campaign_${id}`);
  });

  io.in('now').emit('now', {message: 'Works!'})
});

nextApp.prepare().then(() => {
  app.all('*', (req, res) => {
    return nextHandler(req, res);
  })

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready on http://localhost:${port}`)
  })
});
