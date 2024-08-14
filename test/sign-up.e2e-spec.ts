import { expect, test } from '@playwright/test'

test('Sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Jonh Doe')
  await page.getByLabel('Seu e-mail').fill('jonhdoe@example.com')
  await page.getByLabel('Seu celular').fill('6498887373')
  await page.getByRole('button', { name: 'Finalizar cadasdtro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()
})

test('Sign with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Wrong Pizza Shop')
  await page.getByLabel('Seu nome').fill('Jonh Doe')
  await page.getByLabel('Seu e-mail').fill('jonhdoe@example.com')
  await page.getByLabel('Seu celular').fill('6498887373')
  await page.getByRole('button', { name: 'Finalizar cadasdtro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

test('Navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
