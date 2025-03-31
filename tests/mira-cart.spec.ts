import { test as base, chromium } from '@playwright/test';
import { expect } from '@playwright/test';

// Declare the types of your fixtures
type TestFixtures = {
  page: any;
};

// Extend the base test with custom fixtures
const test = base.extend<TestFixtures>({
  page: async ({}, use) => {
    const capabilities = {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Mira Safety Cart Test',
        'name': 'Add Gas Mask to Cart Test',
        'user': 'tanyamirasafety',
        'accessKey': 'LT_tR2dodbSvX4Ajb2UoAlVMtHSQ8yQGbsRfFkDLSVW3lk9TRl',
        'network': true,
        'video': true,
        'console': true
      }
    };

    console.log('Connecting to LambdaTest...');
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    await use(page);
    await page.close();
    await browser.close();
  },
});

test('add gas mask to cart and verify checkout summary', async ({ page }) => {
  // Navigate to the product page
  await page.goto('https://www.mirasafety.com/products/cm-6m-tactical-gas-mask');
  
  // Add product to cart
  await page.getByRole('button', { name: 'Add to cart' }).click();
  
  // Verify price in cart
  await page.locator('#CartDrawer-Item-1').getByText('456.00 лв').click();
  await page.getByText('Total 456.00 лв').click();
  
  // Proceed to checkout
  await page.getByRole('dialog', { name: 'Your cart' }).getByRole('button').nth(2).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  
  // Verify currency
  await page.getByRole('strong').filter({ hasText: 'BGN' }).click();
  
  // Set test status
  try {
    // Verify order summary structure and content
    await expect(page.getByRole('complementary')).toMatchAriaSnapshot(`
      - heading "Order summary" [level=2]
      - group:
        - heading "Shopping cart" [level=3]
        - table "Shopping cart":
          - rowgroup:
            - row "Product image Description Quantity Price":
              - columnheader "Product image"
              - columnheader "Description"
              - columnheader "Quantity"
              - columnheader "Price"
          - rowgroup:
            - row /Closeup of CM-[\\d,.]+[bkmBKM]+ tactical gas mask Quantity 2 MIRA Safety CM-[\\d,.]+[bkmBKM]+® Tactical Gas Mask - Full-Face Respirator for CBRN Defense 0 2 BGN \\d+\\.\\d+/:
              - cell /Closeup of CM-[\\d,.]+[bkmBKM]+ tactical gas mask Quantity 2/:
                - img /Closeup of CM-[\\d,.]+[bkmBKM]+ tactical gas mask/
              - cell /MIRA Safety CM-[\\d,.]+[bkmBKM]+® Tactical Gas Mask - Full-Face Respirator for CBRN Defense 0/:
                - paragraph: /MIRA Safety CM-[\\d,.]+[bkmBKM]+® Tactical Gas Mask - Full-Face Respirator for CBRN Defense/
                - paragraph: "0"
              - cell "2"
              - cell /BGN \\d+\\.\\d+/
      - heading "Discount code or gift card" [level=3]
      - text: Discount code or gift card
      - textbox "Discount code or gift card"
      - button "Apply Discount Code" [disabled]
      - heading "Cost summary" [level=3]
      - table "Cost summary":
        - rowgroup:
          - row "Item Value":
            - columnheader "Item"
            - columnheader "Value"
        - rowgroup:
          - row /Subtotal BGN \\d+\\.\\d+/:
            - rowheader "Subtotal"
            - cell /BGN \\d+\\.\\d+/
          - row "Shipping Shipping policy Enter shipping address":
            - rowheader "Shipping Shipping policy":
              - button "Shipping policy"
            - cell "Enter shipping address"
          - row /Total BGN \\d+\\.\\d+/:
            - rowheader "Total":
              - strong: Total
            - cell /BGN \\d+\\.\\d+/:
              - strong: /BGN \\d+\\.\\d+/
      `);

    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'passed', remark: 'Cart test completed successfully' }
    })}`)
  } catch (error) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'failed', remark: error.message }
    })}`)
    throw error;
  }
}); 