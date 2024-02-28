import moment from 'moment';
import { formatVND } from '../../../util/Utilities';
import Styles from './TopBox.module.scss';
import classNames from 'classnames';
import {
  Timeline,
  timelineItemClasses,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from '@mui/lab';
import { Typography } from '@mui/material';

const TopBox = ({ title, transactions, staff }) => {
  const renderStatus = (status) => {
    if (status === 'COMPLETED') {
      return 'Nạp tiền';
    }
    if (status === 'CREATED') {
      return 'Đã tạo';
    }
    if (status === 'COMPLETED_PAYOUT') {
      return 'Rút tiền';
    }
    if (status === 'CANCEL') {
      return 'Đã huỷ';
    }
  };

  const renderAmount = (d) => {
    if (d.paymentHistoryStatus === 'COMPLETED') {
      return `+${formatVND(d.amount)}`;
    }
    if (d.paymentHistoryStatus === 'CREATED') {
      return `${formatVND(d.amount)}`;
    }
    if (d.paymentHistoryStatus === 'COMPLETED_PAYOUT') {
      return `-${formatVND(d.amount)}`;
    }
  };

  return (
    <div className={classNames(Styles.topBox)}>
      <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
      <div className={classNames(Styles.list)}>
        {transactions &&
          !staff &&
          transactions.paymentHistoryStatus !== 'CREATED' &&
          transactions?.map((d, index) => (
            <>
              {d?.paymentHistoryStatus !== 'CREATED' && d?.paymentHistoryStatus !== 'CANCEL' && (
                <Timeline
                  sx={{
                    m: 0,
                    p: 1,
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                  key={d?.id}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      {d?.paymentHistoryStatus === 'COMPLETED' ? (
                        <TimelineDot color="success" />
                      ) : (
                        <TimelineDot color="error" />
                      )}
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography style={{ fontWeight: 600 }} variant="subtitle2">
                        {renderStatus(d.paymentHistoryStatus)}, mã giao dịch #PH-{d?.id}
                      </Typography>

                      {d?.paymentHistoryStatus === 'COMPLETED' ? (
                        <Typography variant="caption" color="green">
                          {renderAmount(d)}
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="red">
                          {renderAmount(d)}
                        </Typography>
                      )}

                      <br />
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {moment(d?.transactionDate).format('DD-MM-YYYY, H:mm A')}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              )}
            </>
          ))}
        {staff &&
          transactions.paymentHistoryStatus !== 'CREATED' &&
          transactions?.map((d) => (
            <>
              {d?.paymentHistoryStatus !== 'CREATED' && d?.paymentHistoryStatus !== 'CANCEL' && (
                <Timeline
                  sx={{
                    m: 0,
                    p: 1,
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <TimelineItem key={d?.id}>
                    <TimelineSeparator>
                      {d?.paymentHistoryStatus === 'COMPLETED' ? (
                        <TimelineDot color="success" />
                      ) : (
                        <TimelineDot color="error" />
                      )}

                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography style={{ fontWeight: 600 }} variant="subtitle2">
                        @{d?.account?.username}, {renderStatus(d.paymentHistoryStatus)}, mã giao dịch #PH-{d?.id}
                      </Typography>
                      {d?.paymentHistoryStatus === 'COMPLETED' ? (
                        <Typography variant="caption" color="green">
                          {renderAmount(d)}
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="red">
                          {renderAmount(d)}
                        </Typography>
                      )}
                      <br />
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {moment(d?.transactionDate).format('DD-MM-YYYY, H:mm A')}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default TopBox;
