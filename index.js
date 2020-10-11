var server = require('./src/server')
let app = server.app
const port = 6968;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
