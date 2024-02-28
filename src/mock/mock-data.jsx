export const account = [
    {
        id: 1,
        username: "thanh",
        password: "123",
        created_at: "2023-09-24T00:00:00",
        updated_at: "2023-09-24T00:00:00",
        deleted_at: "2023-09-24T00:00:00",
        role: "teacher",
        email: "teacher@gmail.com",
        active: true,
        teacherNumber: 122412312,
        teacherId: 1
    },
    {
        id: 2,
        username: "teo",
        password: "123",
        created_at: "2023-09-24T00:00:00",
        updated_at: "2023-09-24T00:00:00",
        deleted_at: "2023-09-24T00:00:00",
        role: "student",
        email: "student@gmail.com",
        active: true,
        studentNumber: 644352341,
        studentId: 1
    },
    {
        id: 3,
        username: "long",
        password: "123",
        created_at: "2023-09-24T00:00:00",
        updated_at: "2023-09-24T00:00:00",
        deleted_at: "2023-09-24T00:00:00",
        role: "manager",
        email: "manager@gmail.com",
        active: true,
    },
];

export const courseAccount = [
    {
        id: 1,
        accountId: 2,
        courseId: 1,
        status: 'completed'
    },
    {
        id: 1,
        accountId: 2,
        courseId: 2,
        status: 'in-process'
    },
    {
        id: 1,
        accountId: 2,
        courseId: 3,
        status: 'in-process'
    },
]

export const courseData = [
    {
        id: 1,
        name: "Basic",
        status: 'active',
        image: "https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg",
        description: "Basic",
        createDate: "2023-09-25T16:02:47.864Z",
        price: 500,
        limitTime: "2023-09-25T16:02:47.864Z",
        quizTime: 15,
        averagePoint: 10,
        teacherId: 1,
        subject: {
            id: 1,
            name: 'Lập trình hướng đối tượng'
        }
    },
    {
        id: 2,
        name: "Advance",
        status: 'deactive',
        image: "https://greensock.com/uploads/monthly_2021_08/header-2.png.29be1f7af433cbcaaa95eb36c1aa8100.png",
        description: "Advance",
        createDate: "2023-09-25T16:02:47.864Z",
        price: 500,
        limitTime: "2023-09-25T16:02:47.864Z",
        quizTime: 15,
        averagePoint: 10,
        teacherId: 1,
        subject: {
            id: 1,
            name: 'Lập trình hướng đối tượng'
        }

    },
    {
        id: 3,
        name: "Master",
        status: 'pending',
        image: "https://cdn.kobo.com/book-images/d1208771-29e2-41e6-aac3-c6bb7cf416ac/353/569/90/False/master-react-js-part-1.jpg",
        description: "Master",
        createDate: "2023-09-25T16:02:47.864Z",
        price: 500,
        limitTime: "2023-09-25T16:02:47.864Z",
        quizTime: 15,
        averagePoint: 10,
        teacherId: 1,
        subject: {
            id: 1,
            name: 'Lập trình hướng đối tượng'
        }
    }, {
        id: 4,
        name: "Super Master",
        status: 'draft',
        image: "https://cdn.kobo.com/book-images/d1208771-29e2-41e6-aac3-c6bb7cf416ac/353/569/90/False/master-react-js-part-1.jpg",
        description: "Super Master",
        createDate: "2023-09-25T16:02:47.864Z",
        price: 500,
        limitTime: "2023-09-25T16:02:47.864Z",
        quizTime: 15,
        averagePoint: 10,
        teacherId: 1,
        subject: {
            id: 1,
            name: 'Lập trình hướng đối tượng'
        }
    }
]

export const syllabusData = [
    {
        id: 1,
        name: 'JAVA cơ bản',
        status: 'active',
        courseId: 1,
        createDate: '2023-10-10T10:00:00'
    },
    {
        id: 2,
        name: 'JAVA nâng cao',
        status: 'deactive',
        courseId: 1,
        createDate: '2023-10-10T10:00:00'
    },
    {
        id: 3,
        name: 'JAVA thượng thừa',
        status: 'deactive',
        courseId: 1,
        createDate: '2023-10-10T10:00:00'
    },
]

export const lessonSyllabus = [
    {
        syllabusId: 1,
        lessonId: 1
    },
    {
        syllabusId: 1,
        lessonId: 2
    }, {
        syllabusId: 2,
        lessonId: 2
    },
    {
        syllabusId: 3,
        lessonId: 1
    },
    {
        syllabusId: 3,
        lessonId: 2
    }
]


export const lessonsData = [
    {
        id: 1,
        name: "Lesson 1",
        description: "Description for Lesson 1",
        url: "https://example.com/lesson1",
        status: "created",
        asset: "Lesson asset data",
        date_time: "2023-09-25T12:00:00",
        estimate_time: 60, // Lesson duration in minutes
        course_id: 1, // This lesson belongs to course with ID 1,
        resources: [
            {
                id: 1,
                lessonId: 1,
                studyTime: '2023-10-10T23:00:00',
                resourceType: 'rs_type_1',
                content: '',
            },
            {
                id: 2,
                lessonId: 1,
                studyTime: '2023-10-10T23:00:00',
                resourceType: 'rs_type_1',
                content: '',
            }
        ]
    },
    {
        id: 2,
        name: "Lesson 2",
        description: "Description for Lesson 2",
        url: "https://example.com/lesson2",
        status: "created",
        asset: "Lesson asset data",
        date_time: "2023-09-30T12:00:00",
        estimate_time: 60, // Lesson duration in minutes
        course_id: 1, // This lesson belongs to course with ID 1,
        resources: [
            {
                id: 3,
                lessonId: 2,
                studyTime: '2023-10-10T23:00:00',
                resourceType: '',
                content: '',
            },
            {
                id: 4,
                lessonId: 2,
                studyTime: '2023-10-10T23:00:00',
                resourceType: '',
                content: '',
            }
        ]
    },
    // Other lessons
];

export const menu = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Dashboard",
                url: "/dashboard",
                icon: "home.svg",
            },
        ],
    },
    {
        id: 2,
        title: "lists",
        listItems: [
            {
                id: 1,
                title: "Accounts",
                url: "/accounts",
                icon: "user.svg",
            },
            {
                id: 2,
                title: "Courses",
                url: "/course",
                icon: "product.svg",
            },
            {
                id: 3,
                title: "Transactions",
                url: "/transactions",
                icon: "order.svg",
            },
        ],
    },

    {
        id: 4,
        title: "Maintenance",
        listItems: [
            {
                id: 1,
                title: "Settings",
                url: "/",
                icon: "setting.svg",
            },
            {
                id: 2,
                title: "Backups",
                url: "/",
                icon: "backup.svg",
            },
        ],
    },
    {
        id: 5,
        title: "analytics",
        listItems: [
            {
                id: 1,
                title: "Logs",
                url: "/",
                icon: "log.svg",
            },
        ],
    },
];

export const topDealUsers = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        username: "Elva McDonald",
        email: "elva@gmail.com",
        amount: "3.668",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Linnie Nelson",
        email: "linnie@gmail.com",
        amount: "3.256",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Brent Reeves",
        email: "brent@gmail.com",
        amount: "2.998",
    },
    {
        id: 4,
        img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Adeline Watson",
        email: "adeline@gmail.com",
        amount: "2.512",
    },
    {
        id: 5,
        img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Juan Harrington",
        email: "juan@gmail.com",
        amount: "2.134",
    },
    {
        id: 6,
        img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Augusta McGee",
        email: "augusta@gmail.com",
        amount: "1.932",
    },
    {
        id: 7,
        img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
        username: "Angel Thomas",
        email: "angel@gmail.com",
        amount: "1.560",
    },
];

export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
        { name: "Sun", users: 400 },
        { name: "Mon", users: 600 },
        { name: "Tue", users: 500 },
        { name: "Wed", users: 700 },
        { name: "Thu", users: 400 },
        { name: "Fri", users: 500 },
        { name: "Sat", users: 450 },
    ],
};

export const chartBoxCourse = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Total Courses",
    number: "238",
    dataKey: "course",
    percentage: 21,
    chartData: [
        { name: "Sun", course: 400 },
        { name: "Mon", course: 600 },
        { name: "Tue", course: 500 },
        { name: "Wed", course: 700 },
        { name: "Thu", course: 400 },
        { name: "Fri", course: 500 },
        { name: "Sat", course: 450 },
    ],
};

export const chartBoxRevenue = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Total Revenue",
    number: "$56.432",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
        { name: "Sun", revenue: 400 },
        { name: "Mon", revenue: 600 },
        { name: "Tue", revenue: 500 },
        { name: "Wed", revenue: 700 },
        { name: "Thu", revenue: 400 },
        { name: "Fri", revenue: 500 },
        { name: "Sat", revenue: 450 },
    ],
};

export const chartBoxConversion = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Total Ratio",
    number: "2.6",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
        { name: "Sun", ratio: 400 },
        { name: "Mon", ratio: 600 },
        { name: "Tue", ratio: 500 },
        { name: "Wed", ratio: 700 },
        { name: "Thu", ratio: 400 },
        { name: "Fri", ratio: 500 },
        { name: "Sat", ratio: 450 },
    ],
};

export const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "profit",
    chartData: [
        {
            name: "Sun",
            profit: 4000,
        },
        {
            name: "Mon",
            profit: 3000,
        },
        // Other lessons
    ],
}


export const subjectData = [
    {
        id: 1,
        name: "REACTJS",
        description: "hoc recjs",
        createDate: "2023-09-25T16:01:36.660Z",
        minPrice: 500,
        status: true,
        accounts: [
            {
                id: 1
            },
            {
                id: 3
            }
        ]
    }
]

export const barChartBoxVisit = {
    title: "Total Visit",
    color: "#FF8042",
    dataKey: "visit",
    chartData: [
        {
            name: "Sun",
            visit: 4000,
        },
        {
            name: "Mon",
            visit: 3000,
        },
        {
            name: "Tue",
            visit: 2000,
        },
        {
            name: "Wed",
            visit: 2780,
        },
        {
            name: "Thu",
            visit: 1890,
        },
        {
            name: "Fri",
            visit: 2390,
        },
        {
            name: "Sat",
            visit: 3490,
        },
    ],
};

export const userRows = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        lastName: "Hubbard",
        firstName: "Eula",
        email: "kewez@@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Manning",
        firstName: "Stella",
        email: "comhuhmit@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Greer",
        firstName: "Mary",
        email: "ujudokon@hottmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 4,
        img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Williamson",
        firstName: "Mildred",
        email: "tinhavabe@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 5,
        img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Gross",
        firstName: "Jose",
        email: "gobtagbes@yahoo.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 6,
        img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Sharp",
        firstName: "Jeremy",
        email: "vulca.eder@mail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 7,
        img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Lowe",
        firstName: "Christina",
        email: "reso.bilic@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 8,
        img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Dean",
        firstName: "Garrett",
        email: "codaic@mail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 9,
        img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Parsons",
        firstName: "Leah",
        email: "uzozor@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 10,
        img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Reid",
        firstName: "Elnora",
        email: "tuhkabapu@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 11,
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Dunn",
        firstName: "Gertrude",
        email: "gibo@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
        verified: true,
    },
    {
        id: 12,
        img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Williams",
        firstName: "Mark",
        email: "tic.harvey@hotmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 13,
        img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Cruz",
        firstName: "Charlotte",
        email: "ceuc@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 14,
        img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
        lastName: "Harper",
        firstName: "Sara",
        email: "bafuv@hotmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
    {
        id: 15,
        img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        lastName: "Griffin",
        firstName: "Eric",
        email: "ubi@gmail.com",
        phone: "123 456 789",
        createdAt: "01.02.2023",
    },
];


export const courseQuestionBank = [
    {
        id: 1,
        accountId: 1,
        courseId: 1,
        content: 'Định nghĩa hướng đối tượng?',
        answerBank: [
            {
                id: 1,
                questionBankId: 1,
                content: 'Là một đối tượng',
                isCorrect: false
            },
            {
                id: 2,
                questionBankId: 1,
                content: 'Là hướng về một đối tượng',
                isCorrect: false
            },
            {
                id: 3,
                questionBankId: 1,
                content: 'Là một phương pháp để thiết kế một chương trình bởi sử dụng các lớp và các đối tượng.',
                isCorrect: true
            },
            {
                id: 4,
                questionBankId: 1,
                content: 'Tất cả đều đúng',
                isCorrect: false
            }
        ]
    },
    {
        id: 2,
        accountId: 1,
        courseId: 1,
        content: 'Khái niệm của lập trình hướng đối tượng?',
        answerBank: [
            {
                id: 5,
                questionBankId: 2,
                content: 'Là một phong cách lập trình',
                isCorrect: false
            },
            {
                id: 6,
                questionBankId: 2,
                content: 'Là một ngôn ngữ lập trình cụ thể',
                isCorrect: false
            },
            {
                id: 7,
                questionBankId: 2,
                content: 'Là một phương pháp lập trình dựa trên việc sử dụng các đối tượng và lớp.',
                isCorrect: true
            },
            {
                id: 8,
                questionBankId: 2,
                content: 'Chỉ dùng cho lập trình web',
                isCorrect: false
            }
        ]
    },
    {
        id: 3,
        accountId: 2,
        courseId: 2,
        content: 'Trong lập trình hướng đối tượng, một đối tượng là gì?',
        answerBank: [
            {
                id: 9,
                questionBankId: 3,
                content: 'Một biến số',
                isCorrect: false
            },
            {
                id: 10,
                questionBankId: 3,
                content: 'Một thực thể ảo trong không gian 3D',
                isCorrect: false
            },
            {
                id: 11,
                questionBankId: 3,
                content: 'Một thực thể bao gồm dữ liệu và các phương thức xử lý dữ liệu đó.',
                isCorrect: true
            },
            {
                id: 12,
                questionBankId: 3,
                content: 'Một loại biến số đặc biệt',
                isCorrect: false
            }
        ]
    },
]


export const quizLessons = [
    {
        id: 1,
        lessonId: 1,
        title: "Bảo mật trong java",
        duration: 30,
        status: 'completed',
        proportion: 5,
        dateRange: 1,
        passScore: 4.0,
        allowAttempt: 2,
        questions: [
            {
                id: 1,
                content: 'Định nghĩa SOLID trong java?',
                quizId: 1,
                answers: [
                    {
                        id: 1,
                        questionId: 1,
                        content: 'test solid',
                        isCorrect: false
                    },
                    {
                        id: 2,
                        questionId: 1,
                        content: 'test solid wrong',
                        isCorrect: false
                    },
                    {
                        id: 3,
                        questionId: 1,
                        content: 'test solid correct',
                        isCorrect: true
                    },
                    {
                        id: 4,
                        questionId: 1,
                        content: 'test',
                        isCorrect: false
                    },
                ]
            },
            {
                id: 2,
                content: 'Định nghĩa DI ( dependency Injection ) trong java',
                quizId: 1,
                answers: [
                    {
                        id: 4,
                        questionId: 2,
                        content: 'test DI',
                        isCorrect: false
                    },
                    {
                        id: 5,
                        questionId: 2,
                        content: 'test DI wrong',
                        isCorrect: false
                    },
                    {
                        id: 6,
                        questionId: 2,
                        content: 'test DI correct',
                        isCorrect: true
                    },
                    {
                        id: 7,
                        questionId: 2,
                        content: 'test',
                        isCorrect: false
                    },
                ]
            }
        ]
    }
]


export const courseFeedbacks = [
    {
        id: 1,
        studentId: 1,
        courseId: 1,
        status: 'completed',
        content: 'Môn này rất bổ ích'
    },
    {
        id: 2,
        studentId: 1,
        courseId: 2,
        status: 'None',
        content: ''
    },
]

export const resultQuizLessonData = [
    {
        id: 1,
        studentId: 1,
        quizId: 1,
        enrollId: 1,
        submitTime: '2023-10-10T10:00:00',
        startTime: '2023-10-09T10:00:00',
        resultStatus: 'Pass',
        lastPoint: 6.0,
        failCount: 1
    },
    {
        id: 2,
        studentId: 2,
        quizId: 1,
        enrollId: 2,
        submitTime: '2023-10-11T14:30:00',
        startTime: '2023-10-10T14:30:00',
        resultStatus: 'Fail',
        lastPoint: 3.5,
        failCount: 2
    },
    {
        id: 3,
        studentId: 1,
        quizId: 2,
        enrollId: 3,
        submitTime: '2023-10-12T09:15:00',
        startTime: '2023-10-11T09:15:00',
        resultStatus: 'Pass',
        lastPoint: 7.5,
        failCount: 0
    },
    {
        id: 4,
        studentId: 3,
        quizId: 2,
        enrollId: 4,
        submitTime: '2023-10-12T12:45:00',
        startTime: '2023-10-11T12:45:00',
        resultStatus: 'Pass',
        lastPoint: 8.0,
        failCount: 0
    },
    {
        id: 5,
        studentId: 2,
        quizId: 3,
        enrollId: 2,
        submitTime: '2023-10-13T11:00:00',
        startTime: '2023-10-12T11:00:00',
        resultStatus: 'Pass',
        lastPoint: 9.5,
        failCount: 1
    }
];
