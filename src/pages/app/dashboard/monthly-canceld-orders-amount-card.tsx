import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthlyCanceledOrdersAmount } from '@/api/get-montlhy-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthlyCanceledOrdersAmountCard() {
  const { data: monthlyCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'monthly-canceled-orders-amount'],
    queryFn: getMonthlyCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthlyCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthlyCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthlyCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  +{monthlyCanceledOrdersAmount.diffFromLastMonth}%
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
