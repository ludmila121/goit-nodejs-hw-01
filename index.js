const http = require('http');
const port = process.env.PORT || 300

const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
/* Приводим URL к единому виду, удаляя
строку запроса, необязательную косую черту
в конце строки и переводя в нижний регистр, */
const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
switch (path){
  case '':
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.end('Homepage')
    break
  case '/about':
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('About')
    break
  default: 
  res.writeHead(404, {'Content_Type': 'text/plain'})
  break  

} }) 

/* res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
 */
server.listen(port, () => 
  console.log(`Server running at http://${hostname}:${port}/`)
);