import { expect, test } from '@playwright/test'

test('Sign in successfully', async ({ page }) => {
  const signInEmail = 'jonhdoe@example.com'

  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill(signInEmail)
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Link de autenticação enviado para o seu e-mail.',
  )

  expect(toast).toBeVisible()
})

test('Sign with wrong credentials', async ({ page }) => {
  const wrongSignInEmail = 'wrong@example.com'

  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill(wrongSignInEmail)
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()
})

test('Navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
