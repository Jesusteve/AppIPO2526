import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // si tienes configuración

bootstrapApplication(AppComponent, appConfig)
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  });
