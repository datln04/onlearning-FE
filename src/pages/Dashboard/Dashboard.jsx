import React, { useEffect, useState } from 'react';
import Styles from './Dashboard.module.scss';
import classNames from 'classnames';

import Navbar from '../../components/Dashboard/Navbar/Navbar';
import TopBox from '../../components/Dashboard/TopBox/TopBox';
import ChartBox from '../../components/Dashboard/ChartBox/ChartBox';
import BigChartBox from '../../components/Dashboard/BigChartBox/BigChartBox';
import BarChartBox from '../../components/Dashboard/BarChartBox/BarChartBox';

//data
import {
  chartBoxUser,
  topDealUsers,
  chartBoxCourse,
  chartBoxRevenue,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
} from '../../mock/mock-data';
import PieChartBox from '../../components/Dashboard/PieChartBox/PieChartBox';
import Cookies from 'js-cookie';
import {
  AccountControllerApi,
  CourseControllerApi,
  FeedbackControllerApi,
  PaymentHistoryControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import {
  calculatePercentageChange,
  filterAccountsByCurrentMonth,
  filterAccountsByLastMonth,
  filterObjectsByCurrentMonth,
  filterObjectsByLastMonth,
  getChartAccount,
  getChartData,
  getRevenueBigChartData,
} from '../../util/Utilities';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const accountApi = new AccountControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [course, setCourse] = useState([]);
  const [account, setAccount] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [transactionBigChart, seTransactionBigChart] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      paymentHisApi.getPaymentHistories((err, resp) => {
        if (resp) {
          setTransactions(resp);
          console.log(resp);
          const chartData = getRevenueBigChartData(resp);
          seTransactionBigChart(chartData);
        }
      });
      courseApi.getAllCourses((err, resp) => {
        if (resp) {
          const currentList = filterObjectsByCurrentMonth(resp);
          const lastList = filterObjectsByLastMonth(resp);
          const percent = calculatePercentageChange(lastList.length, currentList.length);
          const chartBoxCourse = {
            color: 'skyblue',
            icon: '/productIcon.svg',
            title: 'Tổng số khoá học',
            number: `${resp.length}`,
            dataKey: 'course',
            percentage: percent,
            chartData: getChartData(currentList),
          };
          setCourse(chartBoxCourse);
        }
      });
      accountApi.getAccounts((err, resp) => {
        if (resp) {
          const currentList = filterAccountsByCurrentMonth(resp);
          const lastList = filterAccountsByLastMonth(resp);
          console.log(lastList);
          console.log(currentList);
          const percent = calculatePercentageChange(lastList.length, currentList.length);
          const chartBoxUser = {
            color: '#8884d8',
            icon: '/userIcon.svg',
            title: 'Tổng tài khoản',
            number: `${resp.length}`,
            dataKey: 'accounts',
            percentage: percent,
            chartData: getChartAccount(currentList),
          };
          setAccount(chartBoxUser);
        }
      });
      fetchFeedbackData();
    }
  }, []);

  const fetchFeedbackData = async () => {
    let data = [
      { name: 'Rất hài lòng', value: 0, color: '#0088FE' },
      { name: 'Hài lòng', value: 0, color: '#00C49F' },
      { name: 'Bình thường', value: 0, color: '#FFBB28' },
      { name: 'Không hài lòng', value: 0, color: '#FF8042' },
      { name: 'Rất không hài lòng', value: 0, color: '#2d3436' },
    ];
    let feedbackDetails = [];
    try {
      const response = await new Promise((resolve, reject) => {
        feedbackApi.getAllFeedbacks((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
      if (response.length > 0) {
        response.forEach((r) => r?.feedbackDetails.forEach((tmp) => feedbackDetails.push(tmp)));
      }
    } catch (error) {
      console.error(error);
    }

    if (feedbackDetails.length > 0) {
      feedbackDetails.forEach((fd) => {
        if (fd?.rate === 5) {
          data[0].value += 1;
        }
        if (fd?.rate === 4) {
          data[1].value += 1;
        }
        if (fd?.rate === 3) {
          data[2].value += 1;
        }
        if (fd?.rate === 2) {
          data[3].value += 1;
        }
        if (fd?.rate === 1) {
          data[4].value += 1;
        }
      });
    }
    // console.log(data);
    // Set state after the loop is done
    // Assuming you have a setState function like setFeedbackData
    setFeedbackData(data); // You might need to use the spread operator to trigger a state update
  };

  return (
    <>
      <div className={classNames(Styles.main)}>
        <div className={classNames(Styles.container)}>
          <div className={classNames(Styles.contentContainer)}>
            <div className={classNames(Styles.home)}>
              <div className={classNames(Styles.box, Styles.box1)}>
                <TopBox transactions={transactions} staff={transactions} />
              </div>
              <div className={classNames(Styles.box, Styles.box2)}>
                <ChartBox {...account} />
              </div>
              <div className={classNames(Styles.box, Styles.box3)}>
                <ChartBox {...course} />
              </div>
              <div className={classNames(Styles.box, Styles.box4)}>
                <PieChartBox data={feedbackData} />
              </div>
              {/* <div className={classNames(Styles.box, Styles.box5)}>
                <ChartBox {...chartBoxRevenue} />
              </div> */}
              {/* <div className={classNames(Styles.box, Styles.box6)}>
                <ChartBox {...chartBoxConversion} />
              </div> */}
              <div className={classNames(Styles.box, Styles.box7)}>
                <BigChartBox data={transactionBigChart} />
              </div>
              {/* <div className={classNames(Styles.box, Styles.box8)}>
                <BarChartBox {...barChartBoxVisit} />
              </div> */}
              {/* <div className={classNames(Styles.box, Styles.box9)}>
                <BarChartBox {...barChartBoxRevenue} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
