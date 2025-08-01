// src/main.ts
import 'zone.js';  // 🟢 Bu chiziq zone.js ni ishga tushiradi
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
