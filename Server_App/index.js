import App from './App.js';
import HTTP from 'http';
import { Server } from 'socket.io';

const http = HTTP.createServer();
const io = new Server(http, {
    cors: { origin: '*' }
});

io.on('connection', socket => App(socket, io))
http.listen(3000, () => console.log('Alive on port 3000'))