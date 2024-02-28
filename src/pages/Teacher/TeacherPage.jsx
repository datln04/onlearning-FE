import React, { useState, useEffect, createContext } from 'react';
import Styles from '../../pages/Dashboard/Dashboard.module.scss';
import classNames from 'classnames';

import TopBox from '../../components/Dashboard/TopBox/TopBox';
import ChartBox from '../../components/Dashboard/ChartBox/ChartBox';
import BigChartBox from '../../components/Dashboard/BigChartBox/BigChartBox';
import Cookies from 'js-cookie';

import ApiClientSingleton from '../../api/apiClientImpl';
import moment from 'moment';

//data
import { chartBoxRevenue } from '../../mock/mock-data';
import PieChartBox from '../../components/Dashboard/PieChartBox/PieChartBox';
import {
  CourseControllerApi,
  FeedbackControllerApi,
  PaymentHistoryControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
  WithdrawRequestControllerApi,
} from '../../api/generated/generate-api';
import {
  calculatePercentageChange,
  filterObjectsByCurrentMonth,
  filterObjectsByCurrentWeek,
  filterObjectsByLastMonth,
  formatVND,
  getChartData,
  getChartRevenues,
  getRevenueBigChartData,
} from '../../util/Utilities';
import { ToastContainer } from 'react-toastify';
import PaginateTransaction from '../StudentProfile/components/PaginateTransaction';
import PaginatePaymentTransaction from '../StudentProfile/components/PaginatePaymentTransaction';
import TransactionRequestWithDraw from '../../components/Profile/TransactionRequestWithDraw';
import Navbar from '../../components/Dashboard/Navbar/Navbar';
import { Box, Tab, Tabs } from '@mui/material';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const transactionApi = new TransactionControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());
const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const withdrawApi = new WithdrawRequestControllerApi(ApiClientSingleton.getInstance());

const FilterContext = createContext(null);

const TeacherDashboard = () => {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [course, setCourse] = useState(0);
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState([]);
  const [transactionBigChart, seTransactionBigChart] = useState([]);
  const [transactionsCharge, setTransactionCharge] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [transactionWithDraw, setTransactionWithDraw] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [filterPaymentHis, setFilterPaymentHis] = useState({
    startDate: '',
    endDate: '',
  });
  const [filterHis, setFilterHis] = useState({
    startDate: '',
    endDate: '',
  });

  const fetchFeedbackData = async (res) => {
    let data = [
      { name: 'Rất hài lòng', value: 0, color: '#0088FE' },
      { name: 'Hài lòng', value: 0, color: '#00C49F' },
      { name: 'Bình thường', value: 0, color: '#FFBB28' },
      { name: 'Không hài lòng', value: 0, color: '#FF8042' },
      { name: 'Rất không hài lòng', value: 0, color: '#2d3436' },
    ];
    let feedbackDetails = [];
    for (const r of res) {
      try {
        const response = await new Promise((resolve, reject) => {
          feedbackApi.findAllByCourseId(r?.id, (err, res) => {
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

  useEffect(() => {
    courseApi.findAllCourseByTeacherId(userTmp?.teacherId, (err, res) => {
      if (res) {
        fetchFeedbackData(res);
        const currentList = filterObjectsByCurrentMonth(res);
        const lastList = filterObjectsByLastMonth(res);
        const percent = calculatePercentageChange(lastList.length, currentList.length);
        const chartBoxCourse = {
          color: 'skyblue',
          icon: '/productIcon.svg',
          title: 'Tổng khóa học',
          number: `${res.length}`,
          dataKey: 'course',
          percentage: percent,
          chartData: getChartData(currentList),
        };

        setCourse(chartBoxCourse);
      }
    });
  }, []);

  useEffect(() => {
    walletApi.getByAccountId(userTmp?.id, (err, resp) => {
      if (resp && resp.id) {
        paymentHisApi.getPaymentHistoryByTeacher(
          {
            teacherId: userTmp?.teacherId,
            startDate: filterPaymentHis.startDate ? moment(filterPaymentHis.startDate).format('YYYY-MM-DD') : null,
            endDate: filterPaymentHis.endDate ? moment(filterPaymentHis.endDate).format('YYYY-MM-DD') : null,
          },
          (err, res) => {
            if (res) {
              const currentList = filterObjectsByCurrentMonth(res, true);
              const lastList = filterObjectsByLastMonth(res, true);
              const percent = calculatePercentageChange(lastList.length, currentList.length);
              const chartBoxRevenue = {
                color: 'teal',
                icon: '/revenueIcon.svg',
                title: 'Số dư ví',
                number: `${formatVND(resp.amount)}`,
                dataKey: 'revenue',
                percentage: percent,
                chartData: getChartRevenues(currentList),
              };
              setWallet(chartBoxRevenue);
              const chartData = getRevenueBigChartData(res);
              seTransactionBigChart(chartData);
              setTransactions(res);
            }
          },
        );
      }
    });
  }, [isReload, filterPaymentHis]);

  useEffect(() => {
    transactionApi.getByTeacherId(
      {
        teacherId: userTmp?.teacherId,
        startDate: filterHis.startDate ? moment(filterHis.startDate).format('YYYY-MM-DD') : null,
        endDate: filterHis.endDate ? moment(filterHis.endDate).format('YYYY-MM-DD') : null,
      },
      (err, res) => {
        if (res) {
          setTransactionCharge(res);
        }
      },
    );
  }, [isReload, filterHis]);

  useEffect(() => {
    transactionApi.getTransactionForWithdraw(parseInt(userTmp?.teacherId), (err, res) => {
      if (res) {
        setTransactionWithDraw(res);
      }
    });
  }, [isReload, filterHis]);

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    filterHis &&
    filterPaymentHis && (
      <>
        <div className="px-3 py-3" style={{ overflow: 'auto', height: 850 }}>
          <FilterContext.Provider value={{ filterPaymentHis, setFilterPaymentHis, filterHis, setFilterHis }}>
            <ToastContainer />

            <h4 className="text-center" style={{ fontWeight: 'bold' }}>
              Thống kê
            </h4>
            <div className={classNames(Styles.main)}>
              {/* <Navbar /> */}
              <div className={classNames(Styles.container)}>
                <div className={classNames(Styles.contentContainer)}>
                  <div className={classNames(Styles.home)}>
                    <div className={classNames(Styles.box, Styles.box4)}>
                      <PieChartBox data={feedbackData} />
                    </div>
                    <div style={{ backgroundColor: '#d3d8ff' }} className={classNames(Styles.box, Styles.box3)}>
                      <ChartBox {...course} />
                    </div>
                    <div style={{ backgroundColor: '#d3f5f9' }} className={classNames(Styles.box, Styles.box5)}>
                      <ChartBox {...wallet} />
                    </div>
                    <div className={classNames(Styles.box, Styles.box1)}>
                      <TopBox title={'Lịch sử nạp/rút'} transactions={transactions} />
                    </div>
                    <div className={classNames(Styles.box, Styles.box7)}>
                      <BigChartBox data={transactionBigChart} />
                    </div>
                  </div>
                  <Box sx={{ width: '100%' }} className="d-flex justify-content-center my-3">
                    <Tabs
                      value={tab}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example"
                    >
                      <Tab label="Danh sách được rút tiền" />
                      <Tab label="Lịch sử nạp/rút" />
                      <Tab label="Lịch sử giao dịch" />
                    </Tabs>
                  </Box>
                  {tab === 0 && (
                    <div className="my-5">
                      <TransactionRequestWithDraw items={transactionWithDraw} />
                    </div>
                  )}
                  {tab === 1 && (
                    <div className="my-5">
                      <PaginatePaymentTransaction items={transactions} itemsPerPage={10} />
                    </div>
                  )}
                  {tab === 2 && (
                    <div className="my-5">
                      <PaginateTransaction items={transactionsCharge} itemsPerPage={10} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FilterContext.Provider>
        </div>
      </>
    )
  );
};
export { FilterContext };
export default TeacherDashboard;
