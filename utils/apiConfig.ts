const apiEndpoints = {
  Auth: {
    LOGIN: "/api/v1/auth/signin",
    REGISTER : "/api/v1/auth/register",
    FORGET_PASSWORD : "/api/v1/auth/forgot-password",
    OTP_VERIFICATION : "/api/v1/auth/otp",
    CHANGE_PASSWORD : "/api/v1/auth/change-password",

  },
  Users: {
    GET_ALL: `/api/v1/users`,
    RESTORE: `/api/v1/users/restore`,
    ADD_CREDITS: `/api/v1/users/add-credits`,
    PROFILE: `/api/v1/users/profile`,

  },
  Services: {
    GET_ALL: `/api/v1/services`,
    CATEGORIES: `/api/v1/services/categories`,
    ADMIN_SERVICES: `/api/v1/admin/services`,
  },
  Category: {
    ALL_CRUD: `/api/v1/categories`,
  },
  Image: {
    UPLOAD: `/api/v1/storage/upload`,
  },
  Dashboard : {
    STATS :  `/api/v1/dashboard/stats`,
    MONTHLYREVENUE :  `/api/v1/dashboard/monthly-revenue`
  },
  Appointment: {
    ALL : `/api/v1/bookings`,
    TODAY : `/api/v1/bookings/today-appointments`
  },
  Packages: {
    ALL : `/api/v1/packages`,
  },
  Deposit: {
    ALL : `/api/v1/transactions`,
  },
  Tasks : {
    MY_TASKS: `/api/v1/tasks/my-tasks`,
    ALL_GET: `/api/v1/tasks`,
    START: `/api/v1/tasks/start`
  },
REFERRAL : {
  ALL: `/api/v1/users/referrals`
},

Wallets : {
  ALL : `/api/v1/wallets`
},
Withdraws : {
  MY : `/api/v1/withdrawals/my-withdrawals`,
  CREATE : `/api/v1/withdrawals`
}




};

export default apiEndpoints;
