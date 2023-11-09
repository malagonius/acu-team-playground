import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooComponent } from './foo.component';
import {
  TranslocoModule,
  provideTransloco,
  provideTranslocoScope,
} from '@ngneat/transloco';

@NgModule({
  declarations: [AppComponent, FooComponent],
  imports: [BrowserModule, TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
    }),
    provideTranslocoScope({
      scope: 'app',
      loader: {
        en: () => import('../assets/i18n/app/en.json'),
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
