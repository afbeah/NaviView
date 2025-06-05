import React, { useEffect, useState } from 'react';
import { getVideos } from './service/api';

const VideoGrid = () => {
    const [videos, setVideos] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getVideos();
            setVideos(data);
        }
        fetchData();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' && selectedIndex < videos.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        if (e.key === 'ArrowLeft' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
            {videos.map((video, index) => (
                <div
                    key={video.id}
                    style={{
                        padding: '1rem',
                        border: index === selectedIndex ? '3px solid yellow' : '1px solid gray',
                        backgroundColor: index === selectedIndex ? '#333' : '#111',
                        color: 'white',
                        width: '150px',
                        textAlign: 'center',
                    }}
                >
                    {video.title}
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;
