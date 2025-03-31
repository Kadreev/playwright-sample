import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-primary-200 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-primary-200 after:via-primary-300 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-primary-700 before:dark:opacity-10 after:dark:from-primary-900 after:dark:via-primary-700 after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold text-center mb-6">
          MIRA Test Admin <span className="text-primary-600">Panel</span>
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-8 mt-16">
        <Link
          href="/dashboard"
          className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Dashboard{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            View test status, statistics, and recent test runs.
          </p>
        </Link>

        <Link
          href="/tests"
          className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Tests{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Manage test configurations and execute tests on demand.
          </p>
        </Link>

        <Link
          href="/schedule"
          className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Schedule{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Configure and manage test schedules and automations.
          </p>
        </Link>
      </div>
    </main>
  );
} 