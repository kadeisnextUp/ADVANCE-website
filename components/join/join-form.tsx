'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { isMobileView } from '@/lib/is-mobile-view';

const FORM_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=bC4i9cZf60iPA3PbGCA7Y2YHfGb-G5NHpb26fqm2uHlUOFMzRjZCS1RWTzRXRDUyOFlWVVZYMFJMRi4u';
const EMBED_URL = `${FORM_URL}&embed=true`;
const IFRAME_TIMEOUT_MS = 8000;

type FormState = 'idle' | 'opened-new-tab' | 'loading-iframe' | 'iframe-loaded';

const STATUS_MESSAGES: Record<FormState, string> = {
  idle: '',
  'loading-iframe': 'Loading form…',
  'iframe-loaded': 'Form loaded.',
  'opened-new-tab': 'Form opened in a new tab.',
};

export function JoinForm() {
  const [state, setState] = useState<FormState>('idle');
  const [showFallback, setShowFallback] = useState(false);
  const preloadFrameRef = useRef<HTMLIFrameElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  // Preload the form on desktop only — mobile never uses the embed, so
  // there's nothing to warm up for that path.
  useEffect(() => {
    if (isMobileView(navigator.userAgent, window.innerWidth)) return;

    const preloadFrame = document.createElement('iframe');
    preloadFrame.src = EMBED_URL;
    preloadFrame.style.display = 'none';
    preloadFrame.style.visibility = 'hidden';
    preloadFrame.style.position = 'absolute';
    preloadFrame.style.width = '1px';
    preloadFrame.style.height = '1px';
    document.body.appendChild(preloadFrame);
    preloadFrameRef.current = preloadFrame;

    return () => {
      preloadFrame.remove();
      preloadFrameRef.current = null;
    };
  }, []);

  // Once the real iframe takes over, the preload copy is no longer needed.
  useEffect(() => {
    if (state === 'loading-iframe' && preloadFrameRef.current) {
      preloadFrameRef.current.remove();
      preloadFrameRef.current = null;
    }
  }, [state]);

  // If the embed hasn't loaded within IFRAME_TIMEOUT_MS, offer a fallback
  // link rather than leaving the user stuck on "Loading form..." forever.
  // (The timeout only ever sets showFallback to true; the render below
  // re-gates on `state === 'loading-iframe'` so the fallback disappears on
  // its own once the iframe loads, without a second synchronous setState.)
  useEffect(() => {
    if (state !== 'loading-iframe') return;

    const timeoutId = setTimeout(() => setShowFallback(true), IFRAME_TIMEOUT_MS);
    return () => clearTimeout(timeoutId);
  }, [state]);

  // Move focus to the revealed content once the embed finishes loading —
  // the button that had focus no longer exists at that point.
  useEffect(() => {
    if (state === 'iframe-loaded') {
      revealRef.current?.focus();
    }
  }, [state]);

  function handleClick() {
    if (isMobileView(navigator.userAgent, window.innerWidth)) {
      // 'noopener' matches the CampusLink link's existing rel="noopener" —
      // it also means window.open's return value is always null, so it
      // can't be used to detect a blocked popup; that's an accepted,
      // pre-existing limitation (the live site has the same gap today).
      window.open(FORM_URL, '_blank', 'noopener');
      setState('opened-new-tab');
    } else {
      setState('loading-iframe');
    }
  }

  const showEmbed = state === 'loading-iframe' || state === 'iframe-loaded';

  return (
    <div className="mt-6">
      <div role="status" className="sr-only">
        {STATUS_MESSAGES[state]}
      </div>

      {!showEmbed && (
        <Button onClick={handleClick} disabled={state === 'opened-new-tab'} size="lg">
          {state === 'opened-new-tab' ? 'Form opened in new tab' : 'Open Form'}
        </Button>
      )}

      {showEmbed && (
        <>
          {state === 'loading-iframe' && (
            <p className="mb-2 text-sm text-foreground/70">Loading form...</p>
          )}
          {state === 'loading-iframe' && showFallback && (
            <p className="mb-2 text-sm text-foreground/70">
              Having trouble?{' '}
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Open the form in a new tab
              </a>
              .
            </p>
          )}
          <div ref={revealRef} tabIndex={-1}>
            <iframe
              title="ADVANCE interest form"
              src={EMBED_URL}
              width="100%"
              height="700"
              allowFullScreen
              onLoad={() => setState('iframe-loaded')}
              className={state === 'iframe-loaded' ? undefined : 'invisible h-0'}
            />
          </div>
        </>
      )}
    </div>
  );
}
