import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ListCourseIcon from '@mui/icons-material/CardTravelRounded';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import ListRoundedIcon from '@mui/icons-material/ListRounded';

export const DISPLAY_LOADING = 'DISPLAY_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const DOMAIN = 'https://dummyjson.com';
export const TOKEN = 'access_token';
export const STATUS_CODE = {
  SUCCESS: 200,
};

export const navData = {
  teacher: [
    {
      label: 'Thống kê',
      icon: <GridViewRoundedIcon />,
      path: '/',
    },
    {
      label: 'Quản lý khóa học',
      icon: <ListCourseIcon />,
      path: '/manage-course',
    },
    {
      label: 'Ngân hàng câu hỏi',
      icon: <QuestionMarkIcon />,
      path: '/question-banks',
    },
    // {
    //   label: 'Chính sách tài chính',
    //   icon: <LocalPoliceOutlinedIcon />,
    //   path: '/policies',
    // },
    {
      label: 'Hồ sơ cá nhân',
      icon: <Person2OutlinedIcon />,
      path: '/my-profile',
    },
    // {
    //     label: 'Manage Lesson',
    //     icon: <BookRoundedIcon />,
    //     subItems: [
    //         {
    //             label: 'List Lesson',
    //             icon: <AllLessonIcon />,
    //             path: '/lessons',
    //         },
    //         {
    //             label: 'Create Lesson',
    //             icon: <CreateLessonIcon />,
    //             path: '/create-lesson',
    //         },
    //     ],
    // },
    // Add more teacher-specific items
  ],
  staff: [
    {
      label: 'Dashboard',
      icon: <GridViewRoundedIcon />,
      path: '/dashboard',
    },
    {
      label: 'Quản lý khoá học',
      icon: <ListCourseIcon />,
      subItems: [
        {
          label: 'Theo chủ đề',
          icon: <BookRoundedIcon />,
          path: '/subjects',
        },
        {
          label: 'Tất cả khoá học',
          icon: <ListRoundedIcon />,
          path: '/courses',
        },
      ],
    },
    {
      label: 'Quản lý tài chính',
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          label: 'Lịch sử giao dịch',
          icon: <ReceiptIcon />,
          path: '/transactions',
        },
        {
          label: 'Lịch sử thanh toán',
          icon: <PaidIcon />,
          path: '/payments',
        },
      ],
    },
    {
      label: 'Cấu hình hệ thống',
      icon: <SettingsIcon />,
      path: '/configs',
    },
    {
      label: 'Hồ sơ cá nhân',
      icon: <Person2OutlinedIcon />,
      path: '/my-profile',
    },
    // Add more manager-specific items
  ],
  admin: [
    {
      label: 'Dashboard',
      icon: <GridViewRoundedIcon />,
      path: '/dashboard',
    },
    {
      label: 'Quản lý tài khoản',
      icon: <GridViewRoundedIcon />,
      subItems: [
        {
          label: 'Tài khoản',
          icon: <PeopleAltIcon />,
          path: '/accounts',
        },
        {
          label: 'Báo cáo',
          icon: <ReportIcon />,
          path: '/report-accounts',
        },
      ],
    },
    {
      label: 'Cấu hình hệ thống',
      icon: <SettingsIcon />,
      path: '/configs',
    },
    // {
    //   label: 'Quản lý khoá học',
    //   icon: <ListCourseIcon />,
    //   subItems: [
    //     {
    //       label: 'Theo chủ đề',
    //       icon: <BookRoundedIcon />,
    //       path: '/subjects',
    //     },
    //     {
    //       label: 'Tất cả khoá học',
    //       icon: <ListRoundedIcon />,
    //       path: '/courses',
    //     },
    //   ],
    // },
    {
      label: 'Quản lý tài chính',
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          label: 'Lịch sử giao dịch',
          icon: <ReceiptIcon />,
          path: '/transactions',
        },
        {
          label: 'Lịch sử thanh toán',
          icon: <PaidIcon />,
          path: '/payments',
        },
      ],
    },
    {
      label: 'Hồ sơ cá nhân',
      icon: <Person2OutlinedIcon />,
      path: '/my-profile',
    },
    // Add more manager-specific items
  ],
};

export const rating = [
  {
    id: 5,
    rate: 5,
    label: 'Rất hài lòng',
  },

  {
    id: 4,
    rate: 4,
    label: 'Hài lòng',
  },

  {
    id: 3,
    rate: 3,
    label: 'Bình thường',
  },
  {
    id: 2,
    rate: 2,
    label: 'Không hài lòng',
  },

  {
    id: 1,
    rate: 1,
    label: 'Rất không hài lòng',
  },
];

export const vapidKey = 'BLRnkMYyevkRKUHgBD7lwTYHf0MUJzyIGdc4p5Ic-qElq0153ONDeYv2Uk470PuGzAObFXTFbqpZ5hjD8p_2kPg';

export const invalidInput = 'Không được để trống và số phải nguyên dương';
export const YOUR_SERVICE_ID = 'service_dv0ty7g';
export const YOUR_TEMPLATE_ID = 'template_c59dohj';
export const YOUR_TEMPLATE_CONTACT_US_ID = 'template_njkn4aq';
export const YOUR_USER_ID = 'tClgm4YE7q5l8m6Vz';
