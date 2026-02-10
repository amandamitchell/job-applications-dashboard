# Job Applications Dashboard

This is a local React web app intended for tracking job applications and interview processes, because (a) I can do better than a spreadsheet and (b) I don’t want my skills to go dormant. It is intended for my own personal use and I make no guarantees about its suitability for anyone else.

The larger intent is to do a bit of comparative analysis between different React/Typescript frameworks by building the same app with different tech stacks. This first one uses Next + MUI + Prisma + PostgreSQL. I am using locally stored data only for privacy purposes.

## Getting Started

First, create a .env file with the environment variables needed for PostgreSQL:

```
POSTGRES_USER="youruser"
POSTGRES_PASSWORD="yourpassword"
POSTGRES_DB="yourdb"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
```

Then, start (or install) the PostgreSQL instance:

```bash
docker-compose up -d
```

Finally, build the site and start the server:

```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To make changes, run the server in development mode instead:

```bash
npm run dev
```

## Todo

- [ ] More contract options: W2, 1099, Contract-to-hire
- [x] Associated recruiting company & recruiter name
- [ ] Auto-update status when adding events
- [ ] Auto-update last updated date when adding events
- [ ] Pagination / filtering / sorting on main list
- [ ] Stats view
- [ ] Error and loading states
- [ ] Export data to CSV
