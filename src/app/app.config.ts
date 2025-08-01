// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase modul va funksiyalarini import qilish
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth'; // 👈 Auth provayderi uchun kerak

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    // Firebase App provayderi
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Firestore provayderi
    provideFirestore(() => getFirestore()),
    // 👈  Mana shu qator `Auth` xatosini tuzatadi
    provideAuth(() => getAuth())
  ]
};
