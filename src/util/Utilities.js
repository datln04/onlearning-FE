import moment from "moment";

export const sortByID = (array) => {
    // console.log(array);
    // Check if the array is not empty
    if (array.length === 0) {
        console.error("Invalid input. Please provide a non-empty array.");
        return [];
    }

    // Use the sort method to sort the array by the "id" property
    const sortedArray = array.slice().sort((a, b) => a.id - b.id);

    return sortedArray;
};

export const validateInputString = (...inputs) => {
    let tmp = true;
    for (const input of inputs) {
        if (typeof input !== 'string') {
            tmp = false; // Not a string

        } else {
            if (input.trim() === '') {
                tmp = false;
            }
        }
    }
    // console.log("string: ", tmp);
    return tmp; // All inputs are valid strings
};


export const validateInputDigits = (...inputs) => {
    let tmp = true;
    for (const input of inputs) {
        // Additional validation logic for strings can be added here

        // Example: Check if the string has a minimum length of 3 characters
        if (parseInt(input) <= 0) {
            tmp = false;
        }
    }

    return tmp; // All inputs are valid strings
};

export function isInteger(...values) {
    for (const i of values) {
        if (!Number.isInteger(Number(i))) {
            return false;
        }
    }
    return true
}

export function isInRange(...values) {
    for (const i of values) {
        if (parseInt(i) < 0 || parseInt(i) > 10) {
            return false;
        }
    }
    return true
}

export function isInRangeDynamic(startRange, endRange, ...values) {
    for (const i of values) {
        if (parseInt(i) < startRange || parseInt(i) > endRange) {
            return false;
        }
    }
    return true
}

export const isInRangePercent = (...values) => {
    for (const i of values) {
        if (parseInt(i) < 0 || parseInt(i) > 100) {
            return false;
        }
    }
    return true
}

export const calDateRange = (dateRange) => {
    const arr = dateRange.split('---')
    // Your two date strings
    const startDateString = arr[0];
    const endDateString = arr[1];

    // Creating moment objects from the date strings
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);

    // Calculating the duration between the two dates
    return moment.duration(endDate.diff(startDate));
}

export const isValidSize = (size, ...resources) => {
    let tmp = true;
    resources.forEach(resource => {
        const fileSizeInMB = resource.size / (1024 * 1024); // Convert bytes to megabytes
        if (!resource) {
            tmp = false;
        }
        if (fileSizeInMB > size) {
            tmp = false;
        }
    });
    return tmp;
}

export const isValidEditSize = (size, question) => {
    let tmp = true;
    if (typeof question?.content == 'object') {
        const fileSizeInMB = question?.content / (1024 * 1024); // Convert bytes to megabytes
        if (!question?.content) {
            tmp = false;
        }
        if (fileSizeInMB > size) {
            tmp = false;
        }
    }
    question?.answers.forEach(resource => {
        if (typeof resource == 'object') {
            const fileSizeInMB = resource.size / (1024 * 1024); // Convert bytes to megabytes
            if (!resource) {
                tmp = false;
            }
            if (fileSizeInMB > size) {
                tmp = false;
            }
        }
    });
    return tmp;
}

export const formatDate = (date) => {
    const rs = moment(date).format('HH:MM:SS DD/MM/YYYY').toString();
    if (rs === 'Invalid date') {
        return ''
    }
    return rs;
}

export function removeEmptyPTagsWithBr(htmlString) {
    // Use a regular expression to match and replace <p><br></p>
    const cleanedHtml = htmlString.replace(/<p[^>]*><br\s*\/?><\/p>/gi, '');
    return cleanedHtml;
}

export const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));
    lastDayOfWeek.setHours(23, 59, 59, 999);

    return { firstDayOfWeek, lastDayOfWeek };
};

export const filterObjectsByCurrentMonth = (yourList, isRevenue) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return yourList.filter((obj) => {
        const createDate = !isRevenue ? new Date(obj.createDate) : new Date(obj.transactionDate);
        const objMonth = createDate.getMonth();
        const objYear = createDate.getFullYear();

        return objMonth === currentMonth && objYear === currentYear;
    });
};

export const filterObjectsByLastMonth = (yourList, isRevenue) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate the first day of the current month
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

    // Calculate the last day of the last month
    const firstDayOfLastMonth = new Date(firstDayOfCurrentMonth);
    firstDayOfLastMonth.setMonth(firstDayOfLastMonth.getMonth() - 1);

    const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth);
    lastDayOfLastMonth.setDate(0); // Set to the last day of the previous month

    return yourList.filter((obj) => {
        const createDate = !isRevenue ? new Date(obj.createDate) : new Date(obj.transactionDate);

        return createDate >= firstDayOfLastMonth && createDate <= lastDayOfLastMonth;
    });
};

export const filterAccountsByLastMonth = (yourList) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate the first day of the current month
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

    // Calculate the last day of the last month
    const firstDayOfLastMonth = new Date(firstDayOfCurrentMonth);
    firstDayOfLastMonth.setMonth(firstDayOfLastMonth.getMonth() - 1);

    const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth);
    lastDayOfLastMonth.setDate(0); // Set to the last day of the previous month

    return yourList.filter((obj) => {
        const createDate = new Date(obj.createdAt)

        return createDate >= firstDayOfLastMonth && createDate <= lastDayOfLastMonth;
    });
};

export const filterAccountsByCurrentMonth = (yourList) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return yourList.filter((obj) => {
        const createDate =  new Date(obj.createdAt) 
        const objMonth = createDate.getMonth();
        const objYear = createDate.getFullYear();

        return objMonth === currentMonth && objYear === currentYear;
    });
};


export function calculatePercentageChange(previousValue, currentValue) {
    // Calculate the percentage increase or decrease
    const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
    // console.log(percentageChange);
    if (percentageChange === -100 || percentageChange === Infinity) {
        return 0
    }
    // Return the result
    return percentageChange.toFixed(2);
}

export const getChartData = (courses) => {
    const chartData = [
        { name: "1st", course: 0 },
        { name: "10th", course: 0 },
        { name: "20th", course: 0 },
        { name: "end of month", course: 0 }
    ];

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Update the course values in chartData based on createDate
    courses.forEach(course => {
        const createDate = new Date(course.createDate);
        if (createDate >= firstDayOfMonth && createDate <= lastDayOfMonth) {
            if (createDate.getDate() <= 1) {
                chartData[0].course++;
            } else if (createDate.getDate() <= 10) {
                chartData[1].course++;
            } else if (createDate.getDate() <= 20) {
                chartData[2].course++;
            } else {
                chartData[3].course++;
            }
        }
    });

    return chartData;
}

export const getChartAccount = (accounts) => {
    const chartData = [
        { name: "1st", accounts: 0 },
        { name: "10th", accounts: 0 },
        { name: "20th", accounts: 0 },
        { name: "end of month", accounts: 0 }
    ];

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Update the course values in chartData based on createDate
    accounts.forEach(account => {
        const createDate = new Date(account.createAt);
        if (createDate >= firstDayOfMonth && createDate <= lastDayOfMonth) {
            if (createDate.getDate() <= 1) {
                chartData[0].account++;
            } else if (createDate.getDate() <= 10) {
                chartData[1].account++;
            } else if (createDate.getDate() <= 20) {
                chartData[2].account++;
            } else {
                chartData[3].account++;
            }
        }
    });

    return chartData;
}

export const getChartRevenues = (amounts) => {
    const chartData = [
        { name: "1st", revenue: 0 },
        { name: "10th", revenue: 0 },
        { name: "20th", revenue: 0 },
        { name: "end of month", revenue: 0 }
    ];

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Update the course values in chartData based on createDate
    amounts.forEach(r => {
        const createDate = new Date(r.transactionDate);
        if (createDate >= firstDayOfMonth && createDate <= lastDayOfMonth) {
            if (createDate.getDate() <= 1) {
                chartData[0].revenue += r.amount;
            } else if (createDate.getDate() <= 10) {
                chartData[1].revenue += r.amount;
            } else if (createDate.getDate() <= 20) {
                chartData[2].revenue += r.amount;
            } else {
                chartData[3].revenue += r.amount;
            }
        }
    });

    return chartData;
}

export const getRevenueBigChartData = (revenues) => {
    const chartData = [
        {
            name: "Ngày 1",
            success: 0,
            fail: 0,
            withdraw: 0,
        },
        {
            name: "Ngày 10",
            success: 0,
            fail: 0,
            withdraw: 0,
        },
        {
            name: "Ngày 20",
            success: 0,
            fail: 0,
            withdraw: 0,
        },
        {
            name: "Cuối tháng",
            success: 0,
            fail: 0,
            withdraw: 0,
        }
    ];

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    // Update the course values in chartData based on createDate
    revenues.forEach(r => {
        const createDate = new Date(r.transactionDate);
        if (createDate >= firstDayOfMonth && createDate <= lastDayOfMonth) {
            if (createDate.getDate() <= 1) {
                if (r.paymentHistoryStatus === "COMPLETED_PAYOUT") {
                    chartData[0].withdraw += r.amount;
                }
                if (r.paymentHistoryStatus === "COMPLETED") {
                    chartData[0].success += r.amount;
                }
                if (r.paymentHistoryStatus === "CREATED") {
                    chartData[0].fail += r.amount;
                }

            } else if (createDate.getDate() <= 10) {
                if (r.paymentHistoryStatus === "COMPLETED_PAYOUT") {
                    chartData[1].withdraw += r.amount;
                }
                if (r.paymentHistoryStatus === "COMPLETED") {
                    chartData[1].success += r.amount;
                }
                if (r.paymentHistoryStatus === "CREATED") {
                    chartData[1].fail += r.amount;
                }
            } else if (createDate.getDate() <= 20) {
                if (r.paymentHistoryStatus === "COMPLETED_PAYOUT") {
                    chartData[2].withdraw += r.amount;
                }
                if (r.paymentHistoryStatus === "COMPLETED") {
                    chartData[2].success += r.amount;
                }
                if (r.paymentHistoryStatus === "CREATED") {
                    chartData[2].fail += r.amount;
                }
            } else {
                if (r.paymentHistoryStatus === "COMPLETED_PAYOUT") {
                    chartData[3].withdraw += r.amount;
                }
                if (r.paymentHistoryStatus === "COMPLETED") {
                    chartData[3].success += r.amount;
                }
                if (r.paymentHistoryStatus === "CREATED") {
                    chartData[3].fail += r.amount;
                }
            }
        }
    });

    return chartData;
}