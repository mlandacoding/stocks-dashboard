import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
// window.Pusher = Pusher;

const appEnv = import.meta.env.VITE_APP_ENV;

window.Echo = new Echo(
    appEnv === 'local'
        ? {
              broadcaster: 'reverb',
              key: import.meta.env.VITE_REVERB_APP_KEY,
              wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
              wsPort: import.meta.env.VITE_REVERB_PORT ?? 6001,
              forceTLS: false,
              encrypted: false,
              enabledTransports: ['ws'],
          }
        : {
              broadcaster: 'reverb',
              key: import.meta.env.VITE_REVERB_APP_KEY,
              wsHost: import.meta.env.VITE_REVERB_HOST,
              wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
              wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
              forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
              enabledTransports: ['ws', 'wss'],
          }
);
