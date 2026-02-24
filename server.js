const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});

console.log("✅ Сервер запущен на порту 3000");

io.on('connection', (socket) => {
    socket.on('yandex_change', (data) => {
        console.log("📡 Переключение трека:", data);
        io.emit('yandex_sync', data);
    });
});