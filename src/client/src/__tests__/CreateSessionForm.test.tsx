import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CreateSessionForm from '../components/CreateSessionForm';

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderForm() {
  return render(
    <MemoryRouter>
      <CreateSessionForm />
    </MemoryRouter>
  );
}

describe('CreateSessionForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  it('renders the display name input and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/your display name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create game/i })).toBeInTheDocument();
  });

  it('renders the optional story input', () => {
    renderForm();
    expect(screen.getByLabelText(/first story title/i)).toBeInTheDocument();
  });

  it('shows an error when submitted with empty name', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));
    expect(await screen.findByText(/display name is required/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('clears the name error when user starts typing after failed submit', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));
    await screen.findByText(/display name is required/i);
    await userEvent.type(screen.getByLabelText(/your display name/i), 'A');
    expect(screen.queryByText(/display name is required/i)).not.toBeInTheDocument();
  });

  it('disables the button and shows "Creating…" during submission', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    renderForm();
    await userEvent.type(screen.getByLabelText(/your display name/i), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));
    const button = screen.getByRole('button', { name: /creating/i });
    expect(button).toBeDisabled();
  });

  it('writes to sessionStorage and navigates on successful submission', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        sessionId: 'test-session-id',
        participantId: 'test-participant-id',
        sessionUrl: '/session/test-session-id',
      }),
    });

    renderForm();
    await userEvent.type(screen.getByLabelText(/your display name/i), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('sessionId', 'test-session-id');
      expect(setItemSpy).toHaveBeenCalledWith('participantId', 'test-participant-id');
      expect(mockNavigate).toHaveBeenCalledWith('/session/test-session-id');
    });
  });

  it('shows a generic error banner when the API returns an error', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderForm();
    await userEvent.type(screen.getByLabelText(/your display name/i), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create game/i })).not.toBeDisabled();
  });

  it('dismisses the error banner when × is clicked', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    renderForm();
    await userEvent.type(screen.getByLabelText(/your display name/i), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));
    await screen.findByText(/something went wrong/i);

    await userEvent.click(screen.getByRole('button', { name: /dismiss error/i }));
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it('blocks whitespace-only name and shows an error (EC-003)', async () => {
    renderForm();
    await userEvent.type(screen.getByLabelText(/your display name/i), '   ');
    await userEvent.click(screen.getByRole('button', { name: /create game/i }));
    expect(await screen.findByText(/display name is required/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
