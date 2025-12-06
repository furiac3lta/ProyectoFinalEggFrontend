# Frontend (Angular)

This workspace contains an Angular app scaffolded to integrate existing components under `src/app/modules/*`.

Quick start

1. Install dependencies:

```bash
cd '/Users/marce/Documents/Desarrollo/carpeta sin título 2/frontend'
npm install --legacy-peer-deps
```

2. Start dev server:

```bash
npx ng serve --open
```

Login

- The project uses a **mock** AuthService that accepts any username/password pair and stores a fake JWT in localStorage.
- Use username `admin` to get role `ADMIN` (which shows delete buttons); any other username becomes `USER`.

Where to change behavior

- `src/app/core/auth/auth.service.ts` — replace `login()` with calls to your real backend and persist token/role accordingly.
- Services under `src/app/modules/*/*.service.ts` are in-memory mocks; replace with HttpClient calls to your API.

Notes

- Angular Material is included via `src/app/shared/material.module.ts`.
- I added confirmation dialog support in `src/app/shared/confirm-dialog.component.ts` and used it in Personas list.

If you want I can:
- Replace the mock login with real API integration (I just need your auth endpoint and response shape).
- Convert feature routes into lazy-loaded modules.
- Add tests and CI config.
