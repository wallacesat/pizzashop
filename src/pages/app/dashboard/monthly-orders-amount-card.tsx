import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthlyOrdersAmount } from '@/api/get-montlhy-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthlyOrdersAmountCard() {
  const { data: monthlyOrdersAmount } = useQuery({
    queryKey: ['metrics', 'monthly-orders-amount'],
    queryFn: getMonthlyOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthlyOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthlyOrdersAmount.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthlyOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthlyOrdersAmount.diffFromLastMonth}%
                </span>
              )}{' '}
              relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
