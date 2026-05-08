import React from 'react';
import CreateSessionForm from '../components/CreateSessionForm';

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '448px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: '0.5rem',
          padding: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* App header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            🃏 Scrum Poker
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              marginTop: '0.5rem',
              marginBottom: 0,
            }}
          >
            Estimate together. Reveal at once.
          </p>
        </div>

        <CreateSessionForm />
      </div>
    </main>
  );
}
