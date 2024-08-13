import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyOrdersAmountMock } from './get-daily-orders-amount-mock'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getMonthlyCanceledOrdersAmountMock } from './get-monthly-canceled-orders-amount-mock'
import { getMonthlyOrdersAmountMock } from './get-monthly-orders-amount-mock'
import { getMonthlyRevenueMock } from './get-monthly-revenue-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sing-in-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDailyOrdersAmountMock,
  getMonthlyOrdersAmountMock,
  getMonthlyCanceledOrdersAmountMock,
  getMonthlyRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return

  await worker.start()
}