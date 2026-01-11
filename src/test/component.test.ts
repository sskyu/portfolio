import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import ThemeToggle from '../components/ThemeToggle.astro';
import BaseLayout from '../layouts/BaseLayout.astro';

test('ThemeToggle component renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(ThemeToggle);

  expect(result).toContain('button id="theme-toggle"');
  expect(result).toContain('svg class="sun"');
  expect(result).toContain('svg class="moon"');
});

test('BaseLayout renders title and description', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(BaseLayout, {
    props: { title: 'Test Title', description: 'Test Description' },
  });

  expect(result).toContain('<title>Test Title</title>');
  expect(result).toContain('content="Test Description"');
});

test('BaseLayout renders navigation and footer', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(BaseLayout, {
    props: { title: 'Nav Test' },
  });

  // Navigation
  expect(result).toContain('href="/blog"');
  expect(result).toContain('aria-label="GitHub"');

  // Footer
  const currentYear = new Date().getFullYear();
  expect(result).toContain(`&copy; ${currentYear} sskyu`);
});
