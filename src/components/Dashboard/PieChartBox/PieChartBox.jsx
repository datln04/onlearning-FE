import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Styles from './PieChartBox.module.scss';
import classNames from 'classnames';
import { Typography } from '@mui/material';

const PieChartBox = ({ data }) => {
  return (
    <div className={classNames(Styles.pieChartBox)}>
      <h5 style={{ fontWeight: 'bold' }}>Tổng quan đánh giá</h5>
      <div className={classNames(Styles.chart)}>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: 'white', borderRadius: '5px' }} />
            <Pie data={data} innerRadius={'70%'} outerRadius={'90%'} paddingAngle={5} dataKey="value">
              {data?.map((item) => (
                <Cell key={item?.name} fill={item?.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={classNames(Styles.options)}>
        {data?.map((item) => (
          <div className={classNames(Styles.option)} key={item?.name}>
            <div className={classNames(Styles.title, 'col-6')}>
              <div className={classNames(Styles.dot)} style={{ backgroundColor: item?.color }} />
              <Typography>{item?.name}</Typography>
            </div>
            <div className="text-end col-6">
              <Typography>{item?.value} lượt</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
