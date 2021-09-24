import React from "react";
import Chart from "react-google-charts";

interface PyeChartProps {
  type: string;
  transactions: Transaction[];
}

export default function PyeChart(props: PyeChartProps): JSX.Element {
  const data = new Map<string, number>();
  let amount = 0;
  props.transactions.forEach((t) => {
    const name = [t.category, t.subcategory, t.childSubCategory].join(" ");
    data.set(name, (data.get(name) || 0) + t.amount);
    amount += t.amount;
  });

  return (
    <>
      <h5>{`Ваши ${props.type}: ${amount.toFixed(2)}`}</h5>
      <Chart
        width={"600px"}
        height={"600px"}
        chartType="PieChart"
        loader={<div>Загрузка статистики...</div>}
        data={[["Категория", "Сумма"], ...data]}
        options={{
          legend: "none",
          pieSliceText: "label",
          pieStartAngle: 45,
        }}
        rootProps={{ "data-testid": "pyeChartId-11" }}
      />
    </>
  );
}
