'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { isMobileView } from '@/lib/is-mobile-view';

const FORM_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=bC4i9cZf60iPA3PbGCA7Y2YHfGb-G5NHpb26fqm2uHlUOFMzRjZCS1RWTzRXRDUyOFlWVVZYMFJMRi4u';

type FormState = 'idle' | 'opened-new-tab' | 'loading-iframe' | 'iframe-loaded';

export function JoinForm() {
  const [state, setState] = useState<FormState>('idle');

  useEffect(() => {
    const preloadFrame = document.createElement('iframe');
    preloadFrame.src = `${FORM_URL}&embed=true`;
    preloadFrame.style.display = 'none';
    preloadFrame.style.visibility = 'hidden';
    preloadFrame.style.position = 'absolute';
    preloadFrame.style.width = '1px';
    preloadFrame.style.height = '1px';
    document.body.appendChild(preloadFrame);

    return () => {
      preloadFrame.remove();
    };
  }, []);

  function handleClick() {
    if (isMobileView(navigator.userAgent, window.innerWidth)) {
      window.open(FORM_URL, '_blank');
      setState('opened-new-tab');
    } else {
      setState('loading-iframe');
    }
  }

  if (state === 'loading-iframe' || state === 'iframe-loaded') {
    return (
      <div className="mt-6">
        {state === 'loading-iframe' && (
          <p className="mb-2 text-sm text-foreground/70">Loading form...</p>
        )}
        <iframe
          src={`${FORM_URL}&embed=true`}
          width="100%"
          height="700"
          allowFullScreen
          onLoad={() => setState('iframe-loaded')}
          className={state === 'iframe-loaded' ? 'block' : 'invisible h-0'}
        />
      </div>
    );
  }

  return (
    <Button onClick={handleClick} disabled={state === 'opened-new-tab'} className="mt-6">
      {state === 'opened-new-tab' ? 'Form opened in new tab' : 'Open Form'}
    </Button>
  );
}
