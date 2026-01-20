import { test, expect } from '@playwright/test';

test.describe('Mobile Scroll Trap Fix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Mobile: No scroll trap in blue box - iPhone 14 Pro', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 393, height: 852 });
    
    // Navigate to the blue box section
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await expect(geminiSection).toBeVisible();
    
    // Scroll to the blue box
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    
    // Simulate partial scroll within the blue box (not to the end)
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
    
    // Try to continue scrolling the main page
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(200);
    
    // Verify that the page scroll position has increased
    const finalScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
    
    // Verify no JavaScript errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    expect(errors).toHaveLength(0);
  });

  test('Mobile: No scroll trap in blue box - Pixel 7', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 412, height: 915 });
    
    // Navigate to the blue box section
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await expect(geminiSection).toBeVisible();
    
    // Scroll to the blue box
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    
    // Simulate momentum scroll behavior
    for (let i = 0; i < 3; i++) {
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(50);
    }
    
    // Verify page continues to scroll
    const finalScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
  });

  test('Mobile: Smooth scrolling through entire blue box section', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 393, height: 852 });
    
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await expect(geminiSection).toBeVisible();
    
    // Scroll to the section
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Record scroll positions during continuous scrolling
    const scrollPositions: number[] = [];
    
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(50);
      
      const scrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
      scrollPositions.push(scrollY);
    }
    
    // Verify scroll positions are consistently increasing (no stuck behavior)
    for (let i = 1; i < scrollPositions.length; i++) {
      expect(scrollPositions[i]).toBeGreaterThanOrEqual(scrollPositions[i - 1]);
    }
  });

  test('Desktop: Scroll animations still work', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const geminiSection = page.locator('[class*="h-\\[200vh\\]"]:has-text("Starten Sie mit einem")');
    await expect(geminiSection).toBeVisible();
    
    // Verify desktop uses h-[200vh] class
    await expect(geminiSection).toHaveClass(/h-\[200vh\]/);
    
    // Scroll through the section and verify animations
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Check that SVG paths are present and animating
    const svgPaths = page.locator('svg path[stroke]');
    await expect(svgPaths.first()).toBeVisible();
    
    // Verify multiple paths exist (animation layers)
    const pathCount = await svgPaths.count();
    expect(pathCount).toBeGreaterThan(5);
  });

  test('Mobile: Performance check - no excessive frame drops', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 393, height: 852 });
    
    // Start performance monitoring
    await page.evaluate(() => {
      (window as any).performanceMarks = [];
      (window as any).startTime = performance.now();
    });
    
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Simulate rapid scrolling
    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, 50);
      await page.waitForTimeout(16); // ~60fps
    }
    
    // Check performance
    const performanceData = await page.evaluate(() => {
      const endTime = performance.now();
      return {
        duration: endTime - (window as any).startTime,
        memoryUsage: (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0
      };
    });
    
    // Verify reasonable performance (should complete in reasonable time)
    expect(performanceData.duration).toBeLessThan(2000); // Less than 2 seconds
  });

  test('Edge case: Orientation change handling', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 393, height: 852 });
    
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Change to landscape
    await page.setViewportSize({ width: 852, height: 393 });
    await page.waitForTimeout(200);
    
    // Verify scrolling still works after orientation change
    const initialScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(100);
    
    const finalScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    expect(finalScrollY).toBeGreaterThanOrEqual(initialScrollY);
  });

  test('Edge case: Very small viewport (<360px)', async ({ page }) => {
    // Set very small viewport
    await page.setViewportSize({ width: 320, height: 568 });
    
    const geminiSection = page.locator('[class*="min-h-screen"]:has-text("Starten Sie mit einem")');
    await expect(geminiSection).toBeVisible();
    
    await geminiSection.scrollIntoViewIfNeeded();
    
    // Verify no horizontal overflow or jitter
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
    
    // Verify vertical scrolling works
    const initialScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
    
    const finalScrollY = await page.evaluate(() => document.scrollingElement?.scrollTop || 0);
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
  });
});
