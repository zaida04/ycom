import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.post("/broadcast", (req, res) => {
    const { event, message } = req.body;

    if (!event || !message) {
        return res.status(400).json({ error: 'Missing event or message' });
    }

    console.log("Broadcasting", event, message)
    io.emit(event as string, message);
    return res.json({ event, message, ack: true });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        socket.emit('time', new Date().toTimeString());
    }, 10_000);
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
