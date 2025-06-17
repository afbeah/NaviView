import React from 'react';
import VideoGrid from './VideoGrid';

function App() {
  return (
    <div style={{ backgroundColor: '#000', height: '100vh' }}>
      <h1 style={{ color: '#ffdb58', padding: '1rem', textAlign: 'center', fontSize: '64px', textShadow: '2px 2px 4px #fff'}}>NaviView APP</h1>
      <VideoGrid />
    </div>
  );
}

export default App;

