import { useEffect, useRef, useState } from 'react';
import DefaultLayout from "@/components/layout/Default";
import { useSocket } from "@/ws/hook";

interface DrawingData {
    x: number;
    y: number;
    isDrawing: boolean;
}

export default function DrawingBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const socket = useSocket();

    const draw = (x: number, y: number, isDown: boolean): void => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = 'white';

        if (isDown) {
            context.lineTo(x, y);
            context.stroke();
        } else {
            context.beginPath();
            context.moveTo(x, y);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            draw(x, y, isDrawing);
            if (isDrawing) {
                socket?.emit('drawing', { x, y, isDrawing });
            }
        };

        const startDrawing = (event: MouseEvent) => {
            setIsDrawing(true);
            handleMouseMove(event);
        };

        const stopDrawing = () => {
            context.closePath();
            setIsDrawing(false);
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [socket, isDrawing]);

    useEffect(() => {
        const handleNewDrawing = (data: DrawingData) => {
            draw(data.x, data.y, data.isDrawing);
        };

        socket?.on('drawing', handleNewDrawing);
        return () => {
            socket?.off('drawing', handleNewDrawing);
        };
    }, [socket]);

    return (
        <DefaultLayout>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-6">Drawing Board</h1>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full border-2 h-[71vh] rounded-xl"
                />
            </div>
        </DefaultLayout>
    );
}
