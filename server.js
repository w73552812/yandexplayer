const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});

console.log("🟠 SoundCloud Sync Server запущен на порту 3000");

io.on('connection', (socket) => {
    // Смена трека для всех
    socket.on('sc_change', (url) => {
        console.log("🎵 Новый трек в очереди:", url);
        io.emit('sc_sync', url);
    });

    // Пересылка команд управления (пауза/старт)
    socket.on('sc_event', (data) => {
        socket.broadcast.emit('sc_server_event', data);
    });
});
