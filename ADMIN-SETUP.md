# Admin dashboard setup (Firebase, free plan)

1. Go to https://console.firebase.google.com > Add project > name it brandinghopes (Analytics: off).
2. Build > Firestore Database > Create database > Start in PRODUCTION mode > pick a location > Enable.
   Leave the default rules (they block everyone). Only your server reads/writes leads.
3. Build > Authentication > Get started > Sign-in method > Email/Password > Enable.
   Then Users tab > Add user > your admin email + a strong password. This is your /admin login.
4. Project settings (gear icon) > General > Your apps > Web icon (</>) > register app.
   Copy apiKey, authDomain, projectId into NEXT_PUBLIC_FIREBASE_API_KEY / AUTH_DOMAIN / PROJECT_ID.
5. Project settings > Service accounts > Generate new private key. A JSON file downloads.
   client_email -> FIREBASE_CLIENT_EMAIL
   private_key  -> FIREBASE_PRIVATE_KEY (keep the double quotes and the \n characters)
   Never commit or share this file.
6. ADMIN_EMAIL = the same email you added in step 3.
7. npm install, restart npm run dev, open http://localhost:3000/admin
8. On Vercel add the same 6 variables and redeploy.
