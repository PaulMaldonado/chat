const express = require("express");
const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
});

const io = require("socket.io")(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Busca del lado del cliente si se ha conectado algun usuario
io.on('connection', (socket) => {
    console.log('a user connected');

    // Este evento verifica si se ha desconetado algun usuario
    socket.on('disconect', () => {
        console.log('user disconected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
