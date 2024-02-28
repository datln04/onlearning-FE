import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Styles from './BigChartBox.module.scss';
import classNames from 'classnames';
import { formatVND } from '../../../util/Utilities';

const customLabels = {
  success: 'Nạp tiền thành công',
  fail: 'Nạp tiền thất bại',
  withdraw: 'Rút tiền thành công',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedPayload = payload.map((entry) => ({
      ...entry,
      name: customLabels[entry.dataKey] || entry.dataKey,
    }));

    return (
      <div className={Styles.custom__tooltip}>
        <p className={Styles.label}>{`${label} :`}</p>
        {formattedPayload.map((entry) => (
          <p key={entry.name} className={Styles.intro}>
            {`${entry.name} : ${formatVND(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
const BigChartBox = ({ data }) => {
  return (
    <div className={classNames(Styles.bigChartBox)}>
      <h5 style={{ fontWeight: 'bold' }}>Biểu đồ biến động số dư trong tháng</h5>
      <div className={classNames(Styles.chart)}>
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 35,
              left: 35,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="success" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="fail" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="withdraw" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
