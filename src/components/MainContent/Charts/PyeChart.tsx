import React from "react";
import Chart from "react-google-charts";

interface PyeChartProps {
  type: string;
  transactions: Transaction[];
}

export default function PyeChart(props: PyeChartProps): JSX.Element {
  const data = new Map<string, number>();

  props.transactions.forEach((t) => {
    const name = [t.category, t.subcategory, t.childSubCategory].join(": ");
    data.set(name, (data.get(name) || 0) + t.amount);
  });

  return (
    <Chart
      width={"600px"}
      height={"600px"}
      chartType="PieChart"
      loader={<div>Загрузка статистики...</div>}
      data={[["Категория", "Сумма"], ...data]}
      options={{
        legend: "none",
        pieSliceText: "label",
        title: `Ваши ${props.type}:`,
        pieStartAngle: 100,
      }}
      rootProps={{ "data-testid": "pyeChartId-11" }}
    />
  );
}
