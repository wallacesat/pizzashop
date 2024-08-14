import { expect, test } from '@playwright/test'

test('List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('Paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()
  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()
  await expect(
    page.getByRole('cell', { name: 'customer-51', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()
  await expect(
    page.getByRole('cell', { name: 'customer-41', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()
  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('Filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('Filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('customer-11')
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(page.getByRole('cell', { name: 'customer-11' })).toBeVisible()
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendendte').click()
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()

  expect(tableRows).toHaveLength(10)
})

test('Total count items filtered ', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('6')
  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  await expect(page.getByText('Total de 7 item(s)')).toBeVisible()
})

test('Clear filters', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByPlaceholder('Nome do cliente').fill('customer-11')
  await page.getByRole('combobox').click()
  await page.getByLabel('Pendendte').click()

  await page.getByRole('button', { name: 'Remover filtros' }).click()

  expect(page.getByPlaceholder('ID do pedido')).toBeEmpty()
  expect(page.getByPlaceholder('Nome do cliente')).toBeEmpty()
  expect(page.getByRole('combobox')).toHaveText('Todos')
})

test('Change order status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  const firstOrderTableRow = page
    .getByRole('row', {
      name: 'order-1',
    })
    .first()

  await firstOrderTableRow.getByRole('button', { name: 'Aprovar' }).click()
  await expect(
    firstOrderTableRow.getByRole('button', { name: 'Em entrega' }),
  ).toBeVisible()
  await expect(
    firstOrderTableRow.getByRole('cell', { name: 'Em preparo' }),
  ).toBeVisible()

  await firstOrderTableRow.getByRole('button', { name: 'Em entrega' }).click()
  await expect(
    firstOrderTableRow.getByRole('button', { name: 'Entregue' }),
  ).toBeVisible()
  await expect(
    firstOrderTableRow.getByRole('cell', { name: 'Em entrega' }),
  ).toBeVisible()

  await firstOrderTableRow.getByRole('button', { name: 'Entregue' }).click()
  await expect(firstOrderTableRow.locator('td:nth-child(7)')).toBeEmpty()
  await expect(
    firstOrderTableRow.getByRole('button', { name: 'Cancelar' }),
  ).toBeDisabled()
  await expect(
    firstOrderTableRow.getByRole('cell', { name: 'Entregue' }),
  ).toBeVisible()
})

test('Cancel order', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  const firstOrderTableRow = page
    .getByRole('row', {
      name: 'order-1',
    })
    .first()

  await firstOrderTableRow.getByRole('button', { name: 'Cancelar' }).click()
  await expect(
    firstOrderTableRow.getByRole('button', { name: 'Cancelar' }),
  ).toBeDisabled()
  await expect(firstOrderTableRow.locator('td:nth-child(7)')).toBeEmpty()
  await expect(
    firstOrderTableRow.getByRole('cell', { name: 'Cancelado' }),
  ).toBeVisible()
})

test('Open order details', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  const firstOrderTableRow = page
    .getByRole('row', {
      name: 'order-1',
    })
    .first()

  await firstOrderTableRow.getByRole('button').first().click()
  expect(
    page.getByRole('heading', { name: 'Pedido: order-1', exact: true }),
  ).toBeVisible()
})
