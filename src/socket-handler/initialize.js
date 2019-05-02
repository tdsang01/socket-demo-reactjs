import io from 'socket.io-client';

export default class SocketInitialization {
    static connect = (token) => {
        const socket = io(`http://localhost:3001/inside?token=${token}`, { path: '/socket' });
        socket.on('error', (e) => {
            console.log('Socket connection error: ', e);
            return false;
        });
        socket.on('test', (data) => {
            console.log('data', data);
        });
        return socket;
    };
}
