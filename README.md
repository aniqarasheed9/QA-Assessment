# Playwright Assessment — Demo Web Shop (Tricentis)

This project implements an end‑to‑end purchase flow with Page Object Model, environment configs, and data‑driven testing.

## Quick Start

```bash
# 1) Unzip, cd into folder, then:
npm ci

# 2) Install Playwright browsers (first time only)
npm run install-browsers
# 3) Run all tests
npm test

# 4) If want to run in headed (Browser) mode
npm run test:headed


```

- One‑command execution for CI:  
  `npm ci && npm run install-browsers && npm test`

## What is covered
- Open the Demo Website
- Register a unique user, login
- Navigate to **Computers → Notebooks → "14.1-inch Laptop"**
- Add to cart, verify cart badge quantity
- Checkout with dummy billing/shipping info
- Select payment and shipping methods
- Place order, validate Thank‑you page & capture Order number
- Assertions on product name/price across PDP → Cart → Checkout, cart totals, address correctness, and Order Number regex

Artifacts on failure: **screenshots, video, Playwright trace**.
