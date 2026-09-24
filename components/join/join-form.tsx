'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  // Move focus to the revealed content as soon as loading starts, not once
  // it finishes — the button that had focus unmounts immediately, and the
  // container persists unchanged through 'loading-iframe' -> 'iframe-loaded'
  // (same DOM node), so focus set here naturally carries through both.
  useEffect(() => {
    if (state === 'loading-iframe') {
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
        <div className="flex flex-col items-start gap-2">
          {/* Not disabled: window.open's return value can't confirm the popup
              actually opened (see the noopener comment above), so the button
              stays actionable — clicking again just reopens it — rather than
              locking the visitor out on an unverifiable "success" state. */}
          <Button onClick={handleClick} size="lg" className="h-14 px-8 text-base font-semibold">
            {state === 'opened-new-tab' ? 'Reopen form' : 'Open Form'}
          </Button>
          {state === 'opened-new-tab' && (
            <>
              <p className="text-sm text-foreground/70">
                Didn&apos;t see it open?{' '}
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
              <p className="text-sm text-foreground/70">
                Once you submit, a member of our team will follow up soon — thanks for taking the
                first step toward joining ADVANCE. You&apos;ll see a Microsoft Forms confirmation
                screen when you&apos;re finished — that&apos;s expected.
              </p>
            </>
          )}
        </div>
      )}

      {showEmbed && (
        <Card className="max-w-2xl border-primary/25 bg-background">
          <CardContent>
            <p className="mb-4 text-foreground/80">
              You&apos;re almost there — fill out the form below to complete your ADVANCE
              interest submission.
            </p>
            {state === 'loading-iframe' && (
              <p className="mb-2 text-sm text-foreground/70">Loading form...</p>
            )}
            {state === 'loading-iframe' && showFallback && (
              <p className="mb-2 text-sm text-foreground/70">
                Trouble loading the form here?{' '}
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
                allowFullScreen
                onLoad={() => setState('iframe-loaded')}
                onError={() => setShowFallback(true)}
                className={state === 'iframe-loaded' ? 'h-[min(700px,80dvh)]' : 'invisible h-0'}
              />
            </div>
            {state === 'iframe-loaded' && (
              <p className="mt-4 text-sm text-foreground/70">
                Once you submit, a member of our team will follow up soon — thanks for taking the
                first step toward joining ADVANCE. You&apos;ll see a Microsoft Forms confirmation
                screen when you&apos;re finished — that&apos;s expected.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
