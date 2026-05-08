import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionStore from '../store/sessionStore';

interface FormState {
  facilitatorName: string;
  story: string;
  isSubmitting: boolean;
  nameError: string;
  apiError: string;
  hasSubmittedOnce: boolean;
}

export default function CreateSessionForm() {
  const navigate = useNavigate();
  const setSession = useSessionStore((s) => s.setSession);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    facilitatorName: '',
    story: '',
    isSubmitting: false,
    nameError: '',
    apiError: '',
    hasSubmittedOnce: false,
  });

  // IB-001: Autofocus — skip on coarse-pointer (mobile) devices
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      nameInputRef.current?.focus();
    }
  }, []);

  // IB-004: Auto-dismiss API error banner after 8s
  useEffect(() => {
    if (!form.apiError) return;
    const timer = setTimeout(() => setForm((f) => ({ ...f, apiError: '' })), 8000);
    return () => clearTimeout(timer);
  }, [form.apiError]);

  function validate(name: string): string {
    const trimmed = name.trim();
    if (trimmed.length === 0) return 'Display name is required.';
    return '';
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const nameError = form.hasSubmittedOnce ? validate(value) : '';
    setForm((f) => ({ ...f, facilitatorName: value, nameError }));
  }

  function handleStoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, story: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.isSubmitting) return;

    const nameError = validate(form.facilitatorName);
    if (nameError) {
      setForm((f) => ({ ...f, nameError, hasSubmittedOnce: true }));
      nameInputRef.current?.focus();
      return;
    }

    setForm((f) => ({ ...f, isSubmitting: true, apiError: '', hasSubmittedOnce: true }));

    try {
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilitatorName: form.facilitatorName.trim(),
          story: form.story.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as {
        sessionId: string;
        participantId: string;
        sessionUrl: string;
      };

      // EC-007: sessionStorage may throw in strict private mode
      try {
        sessionStorage.setItem('sessionId', data.sessionId);
        sessionStorage.setItem('participantId', data.participantId);
      } catch {
        // Swallow silently — navigate anyway
      }

      setSession(data.sessionId, data.participantId);
      navigate(`/session/${data.sessionId}`);
    } catch {
      setForm((f) => ({
        ...f,
        isSubmitting: false,
        apiError: 'Something went wrong. Please try again.',
      }));
    }
  }

  const nameHasError = form.nameError.length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* IB-004: API error banner */}
      {form.apiError && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            backgroundColor: 'var(--color-error-bg)',
            border: '1px solid var(--color-error)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>⚠️ {form.apiError}</span>
          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setForm((f) => ({ ...f, apiError: '' }))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1,
              padding: '0 0.25rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Display name field */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="facilitatorName"
          style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          Your display name{' '}
          <span aria-hidden="true" style={{ color: 'var(--color-error)' }}>
            *
          </span>
        </label>
        <input
          ref={nameInputRef}
          id="facilitatorName"
          name="facilitatorName"
          type="text"
          required
          aria-required="true"
          aria-describedby="facilitatorName-error"
          aria-invalid={nameHasError}
          maxLength={30}
          placeholder="e.g. Alice"
          value={form.facilitatorName}
          onChange={handleNameChange}
          disabled={form.isSubmitting}
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            padding: '0.625rem 0.75rem',
            fontSize: '1rem',
            lineHeight: 1.5,
            borderRadius: '0.5rem',
            border: nameHasError
              ? '2px solid var(--color-error)'
              : '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            outline: 'none',
            minHeight: '2.75rem',
          }}
        />
        <span
          id="facilitatorName-error"
          role="alert"
          aria-live="polite"
          style={{
            display: nameHasError ? 'block' : 'none',
            marginTop: '0.25rem',
            fontSize: '0.875rem',
            color: 'var(--color-error)',
          }}
        >
          {nameHasError && <>⚠️ {form.nameError}</>}
        </span>
      </div>

      {/* Story title field */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="story"
          style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          First story title{' '}
          <span
            aria-label="optional"
            style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--color-text-secondary)' }}
          >
            (optional)
          </span>
        </label>
        <input
          id="story"
          name="story"
          type="text"
          maxLength={200}
          placeholder="e.g. US-101 Login page"
          value={form.story}
          onChange={handleStoryChange}
          disabled={form.isSubmitting}
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            padding: '0.625rem 0.75rem',
            fontSize: '1rem',
            lineHeight: 1.5,
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            outline: 'none',
            minHeight: '2.75rem',
          }}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        aria-busy={form.isSubmitting}
        disabled={form.isSubmitting}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          minHeight: '2.75rem',
          padding: '0.625rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text-on-primary)',
          backgroundColor: form.isSubmitting ? '#A5B4FC' : 'var(--color-primary)',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: form.isSubmitting ? 'not-allowed' : 'pointer',
          opacity: form.isSubmitting ? 0.7 : 1,
          transition: 'background-color 0.15s ease, transform 0.1s ease',
        }}
      >
        {form.isSubmitting && (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '1rem',
              height: '1rem',
              border: '2px solid rgba(255,255,255,0.4)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        {form.isSubmitting ? 'Creating…' : 'Create game'}
      </button>
    </form>
  );
}
