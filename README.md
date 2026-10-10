# BazarDorBD

My BazarDorBD project is a responsive web application for checking the daily prices of essential products in Bangladesh. It helps users browse products, compare price changes, and view prices from different markets.

## My Live Project

I deployed the production website on Vercel.

- Live : 
- GitHub repository: 

### Live Authentication Setup

The production environment variables are stored securely in Vercel. The production base URL is:

```text
BETTER_AUTH_URL=
```

Production OAuth callback URLs:

```text
Google: #/api/auth/callback/google
GitHub: #/api/auth/callback/github
```

These callback URLs must also be added to Google Cloud Console and GitHub Developer Settings.

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/bdshroud/bazardorBD.git
cd bazardorBD
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Copy `.env.example` to `.env.local`.

```powershell
Copy-Item .env.example .env.local
```

Add the required credentials:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Local OAuth callback URLs:

```text
Google: http://localhost:3000/api/auth/callback/google
GitHub: http://localhost:3000/api/auth/callback/github
```

Never commit `.env.local` or share its values.

### 4. Start the project

```bash
npm run dev
```

Open http://localhost:3000 in a browser.

## Features

- Today's price increase and decrease sections
- Complete product list with responsive cards
- Category filtering and numerical price sorting
- Dynamic product details pages
- Minimum, maximum, average, and market-based prices
- Protected product and profile routes
- Email and password authentication
- Google and GitHub social login
- Profile information and user-name update
- Loading skeletons and toast notifications
- Friendly 404 and empty states
- Responsive navigation and price ticker
- Automatic backup API support

## Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- React Hot Toast
- Lucide React
- Vercel

## API Information

Primary API:

```text
https://api.api-store.workers.dev/api/bazardor
```

Backup API:

```text
https://api.abcz.workers.dev/api/bazardor
```

The primary API is used first. If it fails or returns an unsuccessful response, the application automatically sends the same request to the backup API.

Available endpoints:

```text
/products
/products?category=chal
/products/1
/categories
/categories/chal
```

## Main Routes

| Route              | Description                                   |
| ------------------ | --------------------------------------------- |
| `/`                | Homepage with price sections and all products |
| `/category/[slug]` | Category products with sorting                |
| `/product/[slug]`  | Protected product details                     |
| `/signin`          | User sign-in                                  |
| `/signup`          | User registration                             |
| `/profile`         | Protected user profile                        |
| `/profile/update`  | Update the user's name                        |

## Available Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```