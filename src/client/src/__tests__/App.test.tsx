import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  it('renders the landing page at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Scrum Poker/i })).toBeInTheDocument();
  });

  it('renders the session room stub at /session/:id', () => {
    render(
      <MemoryRouter initialEntries={['/session/test-id']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('session-room-stub')).toBeInTheDocument();
  });
});
