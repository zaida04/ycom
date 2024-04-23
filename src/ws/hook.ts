import { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(getSocketUrl(), {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
            transports: ['websocket'],
        });

        setSocket(socketIo);

        socketIo.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
}

function getSocketUrl() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return 'http://localhost:3001';
        case 'production':
            return 'https://your-production-url.com';
        default:
            return 'http://localhost:3001';
    }
}
