# CoFounder BD

Multi-brand e-commerce monorepo powered by Next.js, Turborepo, and Prisma.

## Apps

- **bengolsale** - Premium T-shirt
- **fruits-zone** - Ramadan premium dates collection
- **raafidan** - Premium Perfume
- **stylehunt** - Fashion and lifestyle products
- **control** - Admin dashboard

## Tech Stack

- **Framework**: Next.js 15.3.4
- **Package Manager**: pnpm with Turborepo
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific app
pnpm bengolsale:dev
pnpm fruits-zone:dev
pnpm raafidan:dev
pnpm stylehunt:dev
pnpm control:dev
```

## Deployment

Each app is configured for individual Vercel deployment with `vercel.json` files. See deployment documentation for details.
