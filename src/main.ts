import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/App.1';

bootstrapApplication(App, appConfig)
  .catch((err: unknown) => {
    // Tipado explícito para evitar TS7006.
    // Manejo sencillo; ajustar según necesidad:
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  });
