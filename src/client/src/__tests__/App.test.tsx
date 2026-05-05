import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the Scrum Poker heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Scrum Poker' })).toBeInTheDocument();
  });

  it('renders the ready to plan subheading', () => {
    render(<App />);
    expect(screen.getByText('Ready to plan.')).toBeInTheDocument();
  });

  it('renders the app root element', () => {
    render(<App />);
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });
});
