# Architecture Decision Record (ADR)

**Project:** DeveloperHub

**Version:** 1.0

**Status:** Accepted

---

# Purpose

This document records every major architectural decision taken during the development of DeveloperHub.

These decisions should only change when there is a strong engineering reason.

Future development should follow these decisions to maintain consistency across the project.

---

# ADR-001

## Architecture Style

### Decision

DeveloperHub will be built as a **Modular Monolith**.

### Motivation

The project is expected to grow continuously throughout many years.

It will eventually contain multiple independent domains including:

- Portfolio
- Projects
- Games
- Authentication
- Chat
- AI
- Blog
- Analytics
- Administration

A traditional layered architecture becomes increasingly difficult to maintain as the number of domains increases.

A Modular Monolith allows every domain to evolve independently while remaining inside one deployable application.

### Accepted Structure

```
src/

modules/

    auth/

    users/

    projects/

    portfolio/

    games/

    chat/

    ai/

    blog/

    analytics/

shared/

config/

app.js
```

---

# ADR-002

## Frontend Framework

### Decision

React + Vite

### Alternatives

- Next.js
- Angular
- Vue

### Motivation

React provides excellent flexibility while Vite offers an extremely fast development experience.

Server Side Rendering is not currently required.

The application behaves more like a web application than a content-heavy website.

---

# ADR-003

## Backend Framework

### Decision

Node.js + Express

### Motivation

Simple

Well understood

Large ecosystem

Easy integration with React

Supports future modular architecture

---

# ADR-004

## Database

### Decision

PostgreSQL

### Alternatives Considered

MongoDB

MySQL

SQLite

### Motivation

DeveloperHub stores highly relational information.

Examples include:

Users

Projects

Messages

Games

Achievements

Authentication

Blog

Analytics

Relationships are central to the system.

PostgreSQL provides:

- ACID compliance
- Excellent relational modeling
- Powerful querying
- Strong indexing
- High scalability
- Production maturity

---

# ADR-005

## ORM

### Decision

Prisma

### Motivation

Provides:

- Type-safe queries
- Migrations
- Excellent developer experience
- Strong PostgreSQL support
- Easy schema evolution

---

# ADR-006

## API Style

### Decision

REST API

### Examples

GET /api/projects

POST /api/projects

PATCH /api/projects/:id

DELETE /api/projects/:id

REST provides predictable endpoints and is appropriate for the current project.

GraphQL is intentionally deferred.

---

# ADR-007

## Authentication

### Decision

JWT Authentication

Future support:

- Guest Session
- Email Login
- Google OAuth
- GitHub OAuth

Guest users should later be able to convert into permanent accounts.

---

# ADR-008

## Source of Truth

The database is the only source of truth.

React must never communicate directly with GitHub or any external service.

Flow:

React

↓

Backend

↓

Database

↓

External APIs

---

# ADR-009

## GitHub Integration

Projects are manually created.

Workflow:

Admin

↓

Paste GitHub URL

↓

Backend fetches metadata

↓

Admin edits

↓

Publish

Only published projects become visible.

---

# ADR-010

## Application Philosophy

DeveloperHub is not a portfolio website.

DeveloperHub is a personal software platform.

Every new feature should behave as a natural extension of the platform.

Features should never feel disconnected.

---

# ADR-011

## Navigation

Top Navigation

- Home
- Projects
- Games
- Chat
- Blog
- About

Sidebar

- Profile
- Saved
- Messages
- Settings

Administrative functionality appears only for administrators.

---

# ADR-012

## User Roles

Three roles exist.

Visitor

Registered User

Administrator

Permissions should be role-based.

---

# ADR-013

## Deployment

Frontend

Render Static Site

Backend

Render Web Service

Database

Render PostgreSQL

Future migration to cloud providers should require minimal code changes.

---

# ADR-014

## Development Philosophy

Every feature must follow the same lifecycle.

Requirement

↓

Design

↓

Architecture Review

↓

Database Impact

↓

API Design

↓

Implementation

↓

Testing

↓

Documentation

↓

Deployment

---

# ADR-015

## Long-Term Goal

DeveloperHub is intended to remain the primary personal website of Mohit Kumawat throughout his software engineering career.

Every architectural decision should prioritize long-term maintainability over short-term convenience.