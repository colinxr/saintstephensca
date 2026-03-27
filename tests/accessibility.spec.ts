import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('homepage has no critical/high accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      JSON.stringify(accessibilityScanResults.violations, null, 2)
    ).toHaveLength(0);
  });

  test('skip link is first focusable element', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => {
      return document.activeElement?.classList.contains('skip-link');
    });

    expect(firstFocused).toBe(true);
  });

  test('skip link becomes visible on focus', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a.skip-link');
    await skipLink.focus();

    const isVisible = await skipLink.isVisible();
    expect(isVisible).toBe(true);
  });
});
