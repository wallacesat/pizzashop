import { expect, test } from '@playwright/test'

test('Update profile successfully', async ({ page }) => {
  const newProfileName = 'The Best Pizza'

  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill(newProfileName)
  await page.getByLabel('Description').fill('Changed description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')
  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('button', { name: newProfileName })).toBeVisible()
})
