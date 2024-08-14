import { expect, test } from '@playwright/test'

test('Display daily orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true })).toBeVisible()
  expect(page.getByText('-5% relação a ontem')).toBeVisible()
})

test('Display monthly orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('200', { exact: true })).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^200-5% relação ao mês passado$/ })
      .getByRole('paragraph'),
  ).toBeVisible()
})

test('Display monthly canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('5', { exact: true })).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^5-5% relação ao mês passado$/ })
      .getByRole('paragraph'),
  ).toBeVisible()
})

test('Display monthly revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('R$ 200,00')).toBeVisible()
  expect(page.getByText('+10% relação ao mês passado')).toBeVisible()
})
