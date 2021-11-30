const restify = require('restify');
const cecCtrl = require('./cecCtrl');

const server = restify.createServer();
server.get('/device', async (_, res, next) => {
  res.setHeader('content-type', 'application/json');
  try {
    const stats = await cecCtrl();
    res.send(stats);
  } catch (e) {
    console.log(`ERROR: ${JSON.stringify(e)}`)
  }
  next();
});

server.post('/device/:id/:command', async (req, res, next) => {
  try {
    const ctrl = await cecCtrl();
    const results = await ctrl[req.params.id][req.params.command]();
    res.send({
      results,
    });
  } catch (e) {
    console.log(`ERROR: ${JSON.stringify(e)}`)
    res.send(e);
  }
  next();
});

server.post('/command/:command', async (req, res, next) => {
  console.log(req.params);
  try {
    const ctrl = await cecCtrl();
    const results = await ctrl[req.params.command]();
    res.send({
      results,
    });
  } catch (e) {
    console.log(`ERROR: ${JSON.stringify(e)}`)
    res.send(e);
  }
  next();
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
