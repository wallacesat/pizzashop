import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDailyOrdersAmount } from '@/api/get-daily-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function DailyOrdersAmountCard() {
  const { data: dailyOrdersAmount } = useQuery({
    queryKey: ['metrics', 'daily-orders-amount'],
    queryFn: getDailyOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dailyOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dailyOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {dailyOrdersAmount.diffFromYesterday >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dailyOrdersAmount.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {dailyOrdersAmount.diffFromYesterday}%
                </span>
              )}{' '}
              relação a ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
