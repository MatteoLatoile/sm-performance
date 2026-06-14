# SM PERFORMANCE

Application web de réservation pour SM Performance : coaching sportif, sports de combat, contact, paiement Stripe et dashboard admin.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase local
- Stripe Checkout
- Resend
- React Icons

## Fonctionnalités

- Page d’accueil
- Réservation en plusieurs étapes
- Paiement Stripe en mode test
- Page de confirmation après paiement
- Formulaire de contact
- Enregistrement des messages en base de données locale
- Dashboard admin protégé
- Affichage des réservations et messages
- Suppression des réservations/messages depuis le dashboard
- Authentification Supabase
- Navbar dynamique selon utilisateur/admin

## Installation

```bash
npm install
```

Dépendances principales :

```bash
npm i @supabase/ssr @supabase/supabase-js stripe resend react-icons
```

## Lancer le projet

Terminal 1 :

```bash
npx supabase start
```

Terminal 2 :

```bash
npm run dev
```

Application :

```txt
http://localhost:3000
```

Supabase Studio local :

```txt
http://127.0.0.1:54323
```

## Variables d’environnement

Créer un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=TA_CLE_PUBLISHABLE_SUPABASE
SUPABASE_SERVICE_ROLE_KEY=TA_CLE_SECRET_SUPABASE

ADMIN_EMAIL=smperformances.coaching@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=smperformances.coaching@gmail.com

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM="SM Performance <contact@ton-domaine.fr>"
RESEND_CONTACT_TO=smperformances.coaching@gmail.com
```

Ne jamais commit `.env.local`.

## Base de données

Tables principales :

### profiles

Profil utilisateur lié à Supabase Auth.

Colonnes principales :

- id
- email
- first_name
- last_name
- phone
- is_admin
- created_at

### reservations

Réservations client.

Colonnes principales :

- id
- discipline
- session_date
- session_time
- first_name
- last_name
- phone
- email
- note
- status
- amount_cents
- currency
- stripe_session_id
- created_at

### contact_messages

Messages envoyés depuis la page contact.

Colonnes principales :

- id
- created_at
- name
- email
- subject
- message
- status

## SQL utile

Créer la table des messages contact :

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new'
);
```

Ajouter `status` si la colonne manque :

```sql
alter table public.contact_messages
add column if not exists status text not null default 'new';

select pg_notify('pgrst', 'reload schema');
```

Créer ou vérifier la table réservations :

```sql
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  discipline text not null,
  session_date date not null,
  session_time text not null,

  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  note text,

  status text not null default 'pending',
  amount_cents integer,
  currency text default 'eur',
  stripe_session_id text unique
);
```

## Stripe

Carte de test :

```txt
4242 4242 4242 4242
```

Date future, CVC au choix.

Webhook local :

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

Copier le `whsec_...` dans `.env.local`.

## Resend

Installer Resend :

```bash
npm i resend
```

Pour éviter les indésirables :

- utiliser un vrai domaine vérifié dans Resend
- configurer SPF/DKIM
- utiliser une adresse du type `contact@ton-domaine.fr`
- garder un contenu email simple

## Dashboard Admin

Accessible ici :

```txt
/dashboard
```

Seul l’email admin peut accéder au dashboard :

```env
ADMIN_EMAIL=smperformances.coaching@gmail.com
```

Le dashboard affiche :

- réservations
- messages contact
- emails clients
- numéros de téléphone
- statuts
- boutons de suppression

## Arborescence simplifiée

```txt
src/
  app/
    api/
      admin/
        messages/
        reservations/
      contact/
      stripe/
    components/
      Navbar.tsx
      Footer.tsx
      AppLoader.tsx
      Reservations.tsx
    contact/
      page.tsx
    dashboard/
      page.tsx
      layout.tsx
      DashboardClient.tsx
    login/
      page.tsx
    register/
      page.tsx
    reservations/
      page.tsx
    success/
      page.tsx
    cancel/
      page.tsx
    layout.tsx
    globals.css

  lib/
    supabase/
      admin.ts
      client.ts
      server.ts
      keys.ts
    resend.ts
```

## Commandes utiles

Stop Supabase :

```bash
npx supabase stop
```

Stop tous les projets Supabase :

```bash
npx supabase stop --all
```

Status Supabase :

```bash
npx supabase status
```

Reset DB locale :

```bash
npx supabase db reset
```

## Problèmes connus

### Supabase bloque au démarrage sur Windows

Dans `supabase/config.toml`, désactiver les services lourds :

```toml
[analytics]
enabled = false

[storage]
enabled = false

[realtime]
enabled = false
```

Puis relancer :

```bash
npx supabase stop --all
npx supabase start
```

### Schema cache Supabase

Si une colonne ajoutée n’est pas détectée :

```sql
select pg_notify('pgrst', 'reload schema');
```

Ou relancer :

```bash
npx supabase stop
npx supabase start
```

### Stripe expires_at dans le passé

Ne jamais calculer `expires_at` avec la date de séance.

Utiliser plutôt :

```ts
expires_at: Math.floor(Date.now() / 1000) + 30 * 60;
```

ou supprimer complètement `expires_at`.

## Sécurité

- `SUPABASE_SERVICE_ROLE_KEY` doit rester côté serveur uniquement.
- Ne jamais importer `createAdminSupabase()` dans un composant client.
- Le dashboard est protégé côté serveur.
- Les routes admin vérifient l’email admin avant suppression.

## Auteur

Projet développé pour SM Performance.
