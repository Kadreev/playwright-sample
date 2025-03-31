# MIRA Test Admin Panel

A web-based administration panel for managing and scheduling automated tests on LambdaTest.

## Features

- Manage test configurations
- Run tests on demand
- Schedule automated test runs
- View test results and statistics
- Real-time monitoring of test execution

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- LambdaTest account with API credentials

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mira-test-admin
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your LambdaTest credentials:

```
LT_USERNAME=your_lambdatest_username
LT_ACCESS_KEY=your_lambdatest_access_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment to Vercel

The application is designed to be deployed to Vercel. You can deploy it using the following steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your Vercel account to your Git repository
3. Import the project into Vercel
4. Add the environment variables in the Vercel dashboard
5. Deploy the application

## Project Structure

- `src/app` - Next.js app router pages and API routes
- `src/components` - Reusable UI components
- `src/lib` - Utility functions and API clients
- `src/types` - TypeScript type definitions

## API Routes

- `GET /api/tests` - Get all test configurations
- `POST /api/tests` - Create a new test configuration
- `GET /api/tests/:id` - Get a specific test configuration
- `PUT /api/tests/:id` - Update a test configuration
- `DELETE /api/tests/:id` - Delete a test configuration
- `POST /api/tests/run` - Run a test
- `GET /api/scheduler/check` - Check and trigger scheduled tests

## Technologies Used

- **Framework**: Next.js with App Router
- **UI**: TailwindCSS
- **Database**: MongoDB (planned)
- **Authentication**: NextAuth.js (planned)
- **State Management**: React Query
- **Deployment**: Vercel

## License

This project is licensed under the MIT License - see the LICENSE file for details. 