import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/session/:sessionId"
        element={
          <div data-testid="session-room-stub" style={{ padding: '2rem' }}>
            <p>Session room — coming in F-002/F-003</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
