const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});

let queue = [];

console.log("🟠 SoundCloud Party Server (Queue Mode) запущен");

io.on('connection', (socket) => {
    // Отправляем текущую очередь новому пользователю
    socket.emit('update_queue', queue);

    socket.on('add_to_queue', (url) => {
        queue.push(url);
        console.log("➕ Добавлено в очередь. Всего треков:", queue.length);
        io.emit('update_queue', queue);
    });

    socket.on('request_next', () => {
        if (queue.length > 0) {
            const nextTrack = queue.shift(); // Берем первый трек и удаляем его из списка
            io.emit('play_track', nextTrack);
            io.emit('update_queue', queue);
        }
    });
});
