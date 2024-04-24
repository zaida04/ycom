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
    return process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:3001';
}
