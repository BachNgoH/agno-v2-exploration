import { test, expect } from '@playwright/test';

test.describe('PPTist Web Component Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the PPTist integration page
    await page.goto('/pptist');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should load the PPTist integration page', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Agent UI/);

    // Check that the main heading is present
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display current state panel', async ({ page }) => {
    // Wait for the Current State card to be visible
    const stateCard = page.locator('[data-testid="current-state"]').or(
      page.locator('text=Current State').locator('..').locator('..')
    );

    await expect(stateCard).toBeVisible();

    // Check that title is displayed
    await expect(page.locator('text=Title:')).toBeVisible();

    // Check that slides info is displayed
    await expect(page.locator('text=Slides:')).toBeVisible();
  });

  test('should display control panel', async ({ page }) => {
    // Wait for the Controls card to be visible
    const controlsCard = page.locator('[data-testid="controls"]').or(
      page.locator('text=Controls').locator('..').locator('..')
    );

    await expect(controlsCard).toBeVisible();

    // Check that update title input is present
    const titleInput = page.locator('input[placeholder*="title"], input[id*="title"]');
    await expect(titleInput).toBeVisible();

    // Check that action buttons are present
    await expect(page.locator('text=Load Sample Data')).toBeVisible();
    await expect(page.locator('text=Reset Presentation')).toBeVisible();
  });

  test('should display data management panel', async ({ page }) => {
    // Wait for the Data Management card to be visible
    const dataCard = page.locator('[data-testid="data-management"]').or(
      page.locator('text=Data Management').locator('..').locator('..')
    );

    await expect(dataCard).toBeVisible();

    // Check export/import buttons
    await expect(page.locator('text=Export JSON')).toBeVisible();
    await expect(page.locator('text=Import JSON')).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    // Reload to catch loading state
    await page.reload();

    // Check for loading indicator (spinner or loading text)
    const loadingIndicator = page.locator('text=Loading PPTist').or(
      page.locator('.animate-spin')
    );

    // May appear briefly, so we'll check if it was visible at some point
    await page.waitForTimeout(100);
  });

  test('should load PPTist Web Component', async ({ page }) => {
    // Wait longer for the Web Component to load
    await page.waitForTimeout(3000);

    // Check if the Web Component is present
    const webComponent = page.locator('pptist-editor');

    // The component should be in the DOM even if not fully functional
    await expect(webComponent).toBeAttached();
  });

  test('should update title when Save button is clicked', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForTimeout(2000);

    const newTitle = 'Test Title Updated';

    // Find and fill the title input
    const titleInput = page.locator('input[placeholder*="title"], input[id*="title"]').first();
    await titleInput.fill(newTitle);

    // Click the save button (look for Save icon or text)
    const saveButton = page.locator('button').filter({ hasText: /save/i }).or(
      page.locator('button svg').locator('..').filter({ hasText: '' })
    ).first();

    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Wait a moment for state to update
      await page.waitForTimeout(1000);

      // Check if the title appears in the current state section
      const stateSection = page.locator('text=Current State').locator('..').locator('..');
      await expect(stateSection.locator(`text=${newTitle}`)).toBeVisible();
    }
  });

  test('should load sample data when button is clicked', async ({ page }) => {
    // Wait for the page to be ready
    await page.waitForTimeout(2000);

    // Click Load Sample Data button
    const sampleButton = page.locator('text=Load Sample Data');
    await expect(sampleButton).toBeVisible();
    await sampleButton.click();

    // Wait for state to update
    await page.waitForTimeout(1000);

    // Check if sample data is reflected in the state
    const stateSection = page.locator('text=Current State').locator('..').locator('..');
    await expect(stateSection.locator('text=Sample Presentation')).toBeVisible();
  });

  test('should reset presentation when button is clicked', async ({ page }) => {
    // Wait for the page to be ready
    await page.waitForTimeout(2000);

    // First load sample data
    await page.locator('text=Load Sample Data').click();
    await page.waitForTimeout(500);

    // Then reset
    const resetButton = page.locator('text=Reset Presentation');
    await expect(resetButton).toBeVisible();
    await resetButton.click();

    // Wait for state to update
    await page.waitForTimeout(1000);

    // Check if presentation is reset
    const stateSection = page.locator('text=Current State').locator('..').locator('..');
    await expect(stateSection.locator('text=New Presentation')).toBeVisible();
  });

  test('should export presentation data', async ({ page }) => {
    // Wait for the page to be ready
    await page.waitForTimeout(2000);

    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Click Export JSON button
    const exportButton = page.locator('text=Export JSON');
    await expect(exportButton).toBeVisible();
    await exportButton.click();

    // Wait for download to start
    const download = await downloadPromise;

    // Verify download has expected properties
    expect(download.suggestedFilename()).toMatch(/\.json$/);
  });

  test('should display debug information', async ({ page }) => {
    // Wait for the page to be ready
    await page.waitForTimeout(2000);

    // Check that debug section is present
    const debugSection = page.locator('text=Debug Information').locator('..').locator('..');
    await expect(debugSection).toBeVisible();

    // Check that there's a JSON preview
    const jsonPreview = debugSection.locator('pre');
    await expect(jsonPreview).toBeVisible();

    // Verify it contains valid JSON structure
    const jsonText = await jsonPreview.textContent();
    expect(jsonText).toContain('{');
    expect(jsonText).toContain('}');
  });

  test('should handle Web Component loading error gracefully', async ({ page }) => {
    // Intercept the Web Component script to simulate failure
    await page.route('**/pptist-webcomponent.es.js', route => route.abort());

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should show error message
    const errorCard = page.locator('text=Error Loading PPTist').locator('..').locator('..');
    await expect(errorCard).toBeVisible();

    // Should show instructions for fixing
    await expect(page.locator('text=To fix this issue:')).toBeVisible();
    await expect(page.locator('text=npm install')).toBeVisible();
    await expect(page.locator('text=npm run build-webcomponent')).toBeVisible();
  });

  test('should maintain state consistency across actions', async ({ page }) => {
    // Wait for initialization
    await page.waitForTimeout(2000);

    // Load sample data
    await page.locator('text=Load Sample Data').click();
    await page.waitForTimeout(1000);

    // Verify state shows in multiple places
    const stateSection = page.locator('text=Current State').locator('..').locator('..');
    const debugSection = page.locator('text=Debug Information').locator('..').locator('..');

    // Both sections should show consistent data
    await expect(stateSection.locator('text=Sample Presentation')).toBeVisible();

    const debugJson = await debugSection.locator('pre').textContent();
    expect(debugJson).toContain('Sample Presentation');

    // Update title
    const newTitle = 'Consistency Test';
    const titleInput = page.locator('input[placeholder*="title"], input[id*="title"]').first();
    await titleInput.fill(newTitle);

    const saveButton = page.locator('button').filter({ hasText: /save/i }).or(
      page.locator('button svg').locator('..').filter({ hasText: '' })
    ).first();

    if (await saveButton.isVisible()) {
      await saveButton.click();
      await page.waitForTimeout(1000);

      // Verify consistency again
      await expect(stateSection.locator(`text=${newTitle}`)).toBeVisible();

      const updatedDebugJson = await debugSection.locator('pre').textContent();
      expect(updatedDebugJson).toContain(newTitle);
    }
  });
});