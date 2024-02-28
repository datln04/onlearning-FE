import { Link } from 'react-router-dom';
import Styles from './ChartBox.module.scss';
import classNames from 'classnames';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const ChartBox = (props) => {
  return (
    <div className={classNames(Styles.chartBox)}>
      <div className={classNames(Styles.boxInfo)}>
        <div className={classNames(Styles.title)}>
          <img src={props.icon} alt="" />
          <h5 style={{ fontWeight: 'bold' }}>{props.title}</h5>
        </div>
        <h2 style={{ fontWeight: 700 }}>{props.number}</h2>
      </div>
      <div className={classNames(Styles.chartInfo)}>
        <div className={classNames(Styles.chart)}>
          <ResponsiveContainer width="99%" height="60%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 50 }}
              />
              <Line type="monotone" dataKey={props.dataKey} stroke={props.color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classNames(Styles.texts)}>
          <span
            className={classNames(Styles.percentage)}
            style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}
          >
            {props.percentage}%
          </span>
          <span className={classNames(Styles.duration)}>So với tháng trước</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
