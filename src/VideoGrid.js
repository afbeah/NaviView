import React, { useEffect, useState } from 'react';
import { getVideos } from './service/api';

const VideoGrid = () => {
    const [videos, setVideos] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedCol, setSelectedCol] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getVideos();
            setVideos(data);
        }
        fetchData();
    }, []);

    const handleKeyDown = (e) => {
        const maxRow = videos.length - 1;
        const maxCol = videos[selectedRow]?.length - 1;

        switch (e.key) {
            case 'ArrowRight':
                if (selectedCol < maxCol) setSelectedCol((col) => col + 1);
                break;
            case 'ArrowLeft':
                if (selectedCol > 0) setSelectedCol((col) => col - 1);
                break;
            case 'ArrowDown':
                if (selectedRow < maxRow) {
                    const nextRowLength = videos[selectedRow + 1]?.length || 0;
                    setSelectedRow((row) => row + 1);
                    setSelectedCol((col) => Math.min(col, nextRowLength - 1));
                }
                break;
            case 'ArrowUp':
                if (selectedRow > 0) {
                    const prevRowLength = videos[selectedRow - 1]?.length || 0;
                    setSelectedRow((row) => row - 1);
                    setSelectedCol((col) => Math.min(col, prevRowLength - 1));
                }
                break;
            default:
                break;
        }

    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedRow, selectedCol, videos]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
            {videos.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    {row.map((video, colIndex) => (
                        <div
                            key={videos.id}
                            style={{
                                padding: '1rem',
                                border: selectedRow === rowIndex && selectedCol === colIndex ? '3px solid yellow' : '1px solid gray',
                                backgroundColor: selectedRow === rowIndex && selectedCol === colIndex ? '#333' : '#111',
                                color: 'white',
                                width: '150px',
                                textAlign: 'center',
                            }}
                        >
                            {video.title}
                        </div>
                    ))}
                </div>
            ))
            }
        </div >

    );

};

export default VideoGrid;
