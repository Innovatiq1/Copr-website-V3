# syntax=docker/dockerfile:1
# Multi-stage build for the Innovatiq V3 Next.js app (standalone output).

# ---- Base ----
FROM node:20-bookworm-slim AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Builder ----
FROM base AS builder
# NEXT_PUBLIC_* vars are inlined at build time, so the public site URL must be
# provided here (not at runtime). Defaults to the production domain.
ARG NEXT_PUBLIC_SITE_URL=https://innovatiq.com.sg
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# Copy the standalone server, static assets, and public files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploads dir is mounted as a Docker volume at runtime; ensure it exists/owned
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
