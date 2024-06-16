import RequestHandler from "../Services/RequestHandler"


const SERVER_URL = 'https://arachid.com/api/v1'

const API = { 
    Login: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/login`,data,useAuth:false})
        return res
    },
     Register: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/register`, data,useAuth: false})
        return res
    },
    ReSendCode: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/resendCode`, data,useAuth: false})
        return res
    },
    ConfirmRegister: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/confirmRegister`, data,useAuth: false})
        return res
    },
    ForgetPass: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/forgetPassword`, data,useAuth: false})
        return res
    },
    ChangePass: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/auth/ChangePassword`, data,useAuth: false})
        return res
    },
    Dashboard: async () => {
        const res = await RequestHandler.get({url:`${SERVER_URL}/dashboard`,useAuth: true})
        return res
    },
    GetVerifyCode: async (mobile:string) => {
        const res = await RequestHandler.get({url:`${SERVER_URL}/dashboard/send-verify-code/${mobile}`,useAuth: true})
        return res
    },
    UpdateDashboard: async (data:any) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/dashboard/complete`, data,useAuth: true})
        return res
    },
    DashboardSubmitCode: async (mobile:string,code:string) => {
        const res = await RequestHandler.post({url:`${SERVER_URL}/dashboard/check-verify-code?verify_code=${code}&mobile=${mobile}`,useAuth: true})
        return res
    },
    DailyReport: async (daily?:boolean) => {
        const res = await RequestHandler.get({url:`${SERVER_URL}/dashboard/daily-report-update/${daily}`,useAuth: true})
        return res
    },
    Renew: async (renew?:boolean) => {
        const res = await RequestHandler.get({url:`${SERVER_URL}/dashboard/auto-renew-update/${renew}`,useAuth: true})
        return res
    },
    // OTPVerify: async (data:any) => {
    //     const res = await RequestHandler.post(`${SERVER_URL}/auth/otp/verify`, data, false)
    //     return res
    // },
    // Logout: async () => {
    //     const res = await RequstHandler.post(`${SERVER_URL}/auth/logout`)
    //     return res
    // },
    // getWallet: async (id) => {
    //     const res = await RequstHandler.get(`${SERVER_URL}/wallets/1/users/${id}`)
    //     return res
    // },
   
}
 export default API ;
 