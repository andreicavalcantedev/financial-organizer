import {TrendingDown, TrendingUp} from 'lucide-react';
import {Bar, BarChart, XAxis, YAxis} from 'recharts';

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
import type {
  Transaction,
  TransactionType,
} from '@/hooks/useAddNewTransaction/types';
import {formatBRL, groupByMonth} from '@/lib/utils';

const CONFIG: Record<
  TransactionType,
  {
    title: string;
    color: string;
    emptyMessage: string;
    EmptyIcon: typeof TrendingUp;
    footerLabel: string;
  }
> = {
  income: {
    title: 'Receitas por Mês',
    color: 'var(--chart-1)',
    emptyMessage: 'Nenhuma receita registrada ainda',
    EmptyIcon: TrendingUp,
    footerLabel: 'Receitas acumuladas em',
  },
  expense: {
    title: 'Gastos por Mês',
    color: 'var(--chart-2)',
    emptyMessage: 'Nenhum gasto registrado ainda',
    EmptyIcon: TrendingDown,
    footerLabel: 'Gastos acumulados em',
  },
};

interface ChartBarHorizontalProps {
  transactions: Transaction[];
  type: TransactionType;
}

export function ChartBarHorizontal({
  transactions,
  type,
}: ChartBarHorizontalProps) {
  const currentYear = new Date().getFullYear();
  const {title, color, emptyMessage, EmptyIcon, footerLabel} = CONFIG[type];

  const data = groupByMonth(transactions, type) as {
    month: string;
    value: number;
  }[];

  const chartConfig = {
    value: {
      label: CONFIG[type].title,
      color,
    },
  } satisfies ChartConfig;

  const total = data.reduce((acc, m) => acc + m.value, 0);
  const hasData = total > 0;

  const formattedTotal = formatBRL(total);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{left: -20}}
            >
              <XAxis type="number" dataKey="value" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={value =>
                      formatBRL(Number(value))
                    }
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={5} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] flex-col items-center justify-center gap-2 text-muted-foreground">
            <EmptyIcon className="h-8 w-8 opacity-40" />
            <span className="text-sm">{emptyMessage}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total: {formattedTotal}
        </div>
        <div className="text-muted-foreground leading-none">
          {footerLabel} {currentYear}
        </div>
      </CardFooter>
    </Card>
  );
}
