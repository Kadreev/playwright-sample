import { NextResponse } from 'next/server';

export async function GET() {
  // In a real implementation, this would fetch data from a database
  const tests = [
    {
      id: '1',
      name: 'Cart Checkout Flow',
      description: 'Tests adding products to cart and checkout process',
      filePath: 'tests/mira-cart.spec.ts',
      lastRun: '2024-03-14T12:00:00Z',
      status: 'passed',
      schedule: {
        enabled: true,
        expression: '0 0 */6 * * *',
      }
    },
    {
      id: '2',
      name: 'Product Search Test',
      description: 'Tests product search functionality',
      filePath: 'tests/product-search.spec.ts',
      lastRun: '2024-03-14T10:30:00Z',
      status: 'failed',
      schedule: {
        enabled: false,
        expression: '',
      }
    }
  ];

  return NextResponse.json({ tests });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request
    if (!body.name || !body.filePath) {
      return NextResponse.json(
        { error: 'Name and file path are required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would save to a database
    const newTest = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || '',
      filePath: body.filePath,
      lastRun: null,
      status: 'never_run',
      schedule: body.schedule || {
        enabled: false,
        expression: '',
      }
    };

    return NextResponse.json({ test: newTest }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create test' },
      { status: 500 }
    );
  }
} 