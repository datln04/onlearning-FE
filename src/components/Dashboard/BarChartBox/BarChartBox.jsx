import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import Styles from "./BarChartBox.module.scss";
import classNames from "classnames";

const BarChartBox = (props) => {
  return (
    <div className={classNames(Styles.barChartBox)}>
      <h1>{props.title}</h1>
      <div className={classNames(Styles.chart)}>
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />

            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
