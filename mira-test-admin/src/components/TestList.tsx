'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Test {
  id: string;
  name: string;
  description: string;
  filePath: string;
  lastRun: string | null;
  status: string;
  schedule: {
    enabled: boolean;
    expression: string;
  };
}

export default function TestList({ tests }: { tests: Test[] }) {
  const [runningTests, setRunningTests] = useState<Record<string, boolean>>({});

  const handleRunTest = async (testId: string) => {
    setRunningTests((prev) => ({ ...prev, [testId]: true }));
    
    try {
      const response = await fetch('/api/tests/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to run test');
      }
      
      const data = await response.json();
      console.log('Test run started:', data);
      // In a real app, you would update the UI with the run status
      
      // For demo purposes, we'll just wait 2 seconds and then remove the loading state
      setTimeout(() => {
        setRunningTests((prev) => ({ ...prev, [testId]: false }));
      }, 2000);
    } catch (error) {
      console.error('Error running test:', error);
      setRunningTests((prev) => ({ ...prev, [testId]: false }));
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Schedule
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tests.map((test) => (
            <tr key={test.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{test.name}</div>
                <div className="text-sm text-gray-500">{test.filePath}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{test.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  test.status === 'passed' ? 'bg-green-100 text-green-800' :
                  test.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {test.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {test.schedule.enabled ? (
                  <div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Enabled
                    </span>
                    <div className="text-sm text-gray-500 mt-1">{test.schedule.expression}</div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Not scheduled</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleRunTest(test.id)}
                  disabled={runningTests[test.id]}
                  className={`mr-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                    runningTests[test.id]
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                  }`}
                >
                  {runningTests[test.id] ? 'Running...' : 'Run'}
                </button>
                <Link
                  href={`/tests/${test.id}`}
                  className="text-primary-600 hover:text-primary-900"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 