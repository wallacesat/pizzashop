import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

interface GetDailyRevenueInPeriod {
  from?: Date
  to?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriod) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
