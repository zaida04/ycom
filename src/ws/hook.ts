import { IsProd, wsPublicUrl } from '@/env';
import { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log(`Connecting to ${wsPublicUrl}.`)
        const socketIo = io(wsPublicUrl, {
            path: IsProd ? "/ws/socket.io" : undefined,
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