import {memo, useMemo} from 'react';
import {Pie, PieChart, Legend} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import type {Transaction} from '@/hooks/useAddNewTransaction/types';
import {TrendingUp} from 'lucide-react';
import {formatBRL} from '@/utils/formatBRL';

const chartConfig = {
  expense: {
    label: 'Gastos',
    color: 'var(--chart-2)',
  },
  income: {
    label: 'Receitas',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

interface ChartPieLabelProps {
  title: string;
  transactions: Transaction[];
}

export const ChartPieLabel = memo(function ChartPieLabel({
  title,
  transactions,
}: ChartPieLabelProps) {
  const {totalIncome, totalExpense, chartData} = useMemo(() => {
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount / 100, 0);

    const expense = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount / 100, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      chartData: [
        {type: 'Gastos', value: expense, fill: 'var(--chart-2)'},
        {type: 'Receitas', value: income, fill: 'var(--chart-1)'},
      ],
    };
  }, [transactions]);

  const balance = totalIncome - totalExpense;
  const formattedBalance = formatBRL(balance);

  const hasNoTransactions = totalIncome === 0 && totalExpense === 0;

  return (
    <Card className="flex flex-col top-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title ?? ''}</CardTitle>
        <CardDescription>{new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasNoTransactions ? (
          <div className="flex h-[250px] flex-col items-center justify-center gap-2 text-muted-foreground">
            <TrendingUp className="h-8 w-8 opacity-40" />
            <span className="text-sm">Nenhuma transação registrada ainda</span>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={value => formatBRL(Number(value))}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(value, entry) =>
                  `${value}: ${formatBRL(Number(entry?.payload?.value ?? 0))}`
                }
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm">
        <div className="text-muted-foreground leading-none">
          Período: {new Date().getFullYear()}
        </div>
        <div className="flex gap-2 leading-none font-medium">
          Total: {formattedBalance}
        </div>
      </CardFooter>
    </Card>
  );
});
