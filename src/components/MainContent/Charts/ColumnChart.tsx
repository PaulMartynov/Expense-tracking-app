import React from "react";
import Chart from "react-google-charts";

interface ColumnChartProps {
  transactions: Transaction[];
}

type chartData = {
  [key: string]: number[];
};

export default function ColumnChart(props: ColumnChartProps): JSX.Element {
  const data: chartData = {};
  const columnsData = [];

  props.transactions.forEach((t) => {
    const date = new Date(t.date);
    const dateString = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
      -2
    )}-${`0${date.getDate()}`.slice(-2)}`;
    if (!data[dateString]) {
      data[dateString] = [0, 0];
    }
    if (t.type === "expense") {
      data[dateString][0] += t.amount;
    }
    if (t.type === "income") {
      data[dateString][1] += t.amount;
    }
  });

  columnsData.push(["Дата", "Расходы", "Доходы"]);
  if (props.transactions?.length === 0) {
    columnsData.push(["Нет данных", 0, 0]);
  }
  Object.keys(data).forEach((key) => {
    columnsData.push([key, data[key][0], data[key][1]]);
  });

  return (
    <Chart
      width={"80vw"}
      height={"600px"}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={columnsData}
      options={{
        title: "Статистика по дням",
        hAxis: {
          title: "Дата",
          minValue: 0,
        },
        vAxis: {
          title: "Сумма",
        },
        colors: ["tomato", "palegreen"],
      }}
      legendToggle
    />
  );
}
