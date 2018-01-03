import io from 'socket.io-client';

window.io = io;
const socket = io.connect(process.env.SOCKET_URL);

export default socket;
