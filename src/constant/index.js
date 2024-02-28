import moment from 'moment/moment';

const TRANSACTION_TYPE = {
  REFUNDED: 'Hoàn tiền',
  ENROLLED: 'Đăng ký',
  SERVICE_CHARGE: 'Hoa hồng',
};

const TRANSACTION_STATUS = {
  REQUEST: 'Đề nghị',
  COMPLETED: 'Thành công',
  CANCEL: 'Thất bại',
  DONE: 'Xong',
};

const PAYMENT_TYPE = {
  DEPOSIT: 'Nạp tiền',
  WITHDRAW: 'Rút tiền',
};

const PAYMENT_STATUS = {
  CREATED: 'Tạo mới',
  COMPLETED: 'Thành công',
  REFUNDED: 'Hoàn tiền',
  PENDING: 'Chờ duyệt',
  PENDING_PAYOUT: 'Chờ thanh toán',
  COMPLETED_PAYOUT: 'Thanh toán thành công',
  PAYOUT: 'Thanh Toán',
  CANCEL: 'Hủy',
};

const COURSE = {
  ACTIVE: 'Hoạt động',
  DEACTIVE: 'Vô hiệu hóa',
  PENDING: 'Chờ phê duyệt',
  DRAFT: 'Bản nháp',
  REJECT: 'Từ chối',
};
const ENROLL = {
  PROCESSING: 'Đang học',
  DONE: 'Đã xong',
  PENDING: 'Đang chờ xét duyệt',
  REMOVED: 'Đã xoá',
  REFUNDED: 'Hoàn tiền',
};

const FEEDBACK_CONTENT = {
  1: [
    {
      label: 'Rất Tốt',
      value: 5,
    },
    {
      label: 'Tốt',
      value: 4,
    },
    {
      label: 'Trung Bình',
      value: 3,
    },
    {
      label: 'Kém',
      value: 2,
    },
    {
      label: 'Rất kém',
      value: 1,
    },
  ],
  2: [
    {
      label: 'Chắc chắn sẽ giới thiệu',
      value: 5,
    },
    {
      label: 'Khả năng cao sẽ giới thiệu',
      value: 4,
    },
    {
      label: 'Sẽ cân nhắc',
      value: 3,
    },
    {
      label: 'Nếu có cơ hội',
      value: 2,
    },
    {
      label: 'Nếu có cơ hội',
      value: 1,
    },
  ],
  3: [
    {
      label: 'Rất Tốt',
      value: 5,
    },
    {
      label: 'Tốt',
      value: 4,
    },
    {
      label: 'Trung Bình',
      value: 3,
    },
    {
      label: 'Kém',
      value: 2,
    },
    {
      label: 'Rất kém',
      value: 1,
    },
  ],
  4: [
    {
      label: 'Rất Tốt',
      value: 5,
    },
    {
      label: 'Tốt',
      value: 4,
    },
    {
      label: 'Trung Bình',
      value: 3,
    },
    {
      label: 'Kém',
      value: 2,
    },
    {
      label: 'Rất kém',
      value: 1,
    },
  ],
  5: [
    {
      label: 'Rất Dễ Sử Dụng',
      value: 5,
    },
    {
      label: 'Dễ Sử Dụng',
      value: 4,
    },
    {
      label: 'Trung Bình',
      value: 3,
    },
    {
      label: 'Khó Sử Dụng',
      value: 2,
    },
    {
      label: 'Rất khó sử dụng',
      value: 1,
    },
  ],
};

const PATTERN_DATE = {
  DD_MM_YYYY: 'DD/MM/YYYY',
  HH_MM_SS_DD_MM_YYYY: 'HH:mm:ss DD/MM/YYYY',
  HH_MM_SS: 'HH:mm:ss',
};

const formatDate = (date, pattern) => {
  return moment(date).format(pattern);
};

export {
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  FEEDBACK_CONTENT,
  formatDate,
  PATTERN_DATE,
};
