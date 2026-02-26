import {TrendingUp} from 'lucide-react';
import {CartesianGrid, Line, LineChart, XAxis} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type {Transaction} from '@/hooks/useAddNewTransaction/types';
import {formatBRL, groupByMonthCombined} from '@/lib/utils';

const chartConfig = {
  income: {
    label: 'Receitas',
    color: 'var(--chart-1)',
  },
  expense: {
    label: 'Gastos',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface ChartLineMultipleProps {
  transactions: Transaction[];
}

export function ChartLineMultiple({transactions}: ChartLineMultipleProps) {
  const currentYear = new Date().getFullYear();
  const data = groupByMonthCombined(transactions);

  const totalIncome = data.reduce((acc, m) => acc + m.income, 0);
  const totalExpense = data.reduce((acc, m) => acc + m.expense, 0);
  const hasData = totalIncome > 0 || totalExpense > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Gastos</CardTitle>
        <CardDescription>Evolução mensal em {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{left: 12, right: 12}}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex items-center gap-2">
                        <span>
                          {chartConfig[name as keyof typeof chartConfig]?.label}
                        </span>
                        <span className="font-medium">
                          {formatBRL(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-muted-foreground">
            <TrendingUp className="h-8 w-8 opacity-40" />
            <span className="text-sm">Nenhuma transação registrada ainda</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-4 leading-none font-medium">
          <span>Receitas: {formatBRL(totalIncome)}</span>
          <span>Gastos: {formatBRL(totalExpense)}</span>
        </div>
        <div className="text-muted-foreground leading-none">
          Período: Jan - Dez {currentYear}
        </div>
      </CardFooter>
    </Card>
  );
}
