import {AutoStories, CoPresent, ManageAccounts, Newspaper, School, VolunteerActivism} from "@mui/icons-material";


export const app_colors = {
    _loginBanner: "#B274B4",
    _whiteText: "#FFFFFF",
    _primaryPurple: "#6A307D",
    _hoverPurple: "#78448A",
    _primaryGrey: "#999999",
    _blackText: "#000000",
    _primaryBackground: "#F8F8F8"
}

export const app_fonts = {
    _primaryFont: "outfit"
}

export const app_paths = {
    home: "/home",
    contact: "/contact",

    auth: "/auth/*",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    login: "/auth/login",

    user: "/user/*",
    userInfo: "/user/info",
    userPosts: "/user/posts",
    userClasses:"/user/classes",
    tutorInfo:"/user/tutor-info",
    tutorRequests:"/user/tutor-requests",
    tutorRecommendClass: "/user/tutor-recommend-class",

    tutorsPage: "#",
    postsPage: "#",
    findTutor: "#",
    refFree: "#",

}


export const studentButtons = [
    {title:"Hồ sơ cá nhân",href:app_paths.userInfo, icon: <ManageAccounts/>},
    {title:"Lớp của tôi", href:app_paths.userClasses, icon: <AutoStories/>},
    {title:"Bài đăng", href:app_paths.userPosts, icon: <Newspaper/>},
]

export const tutorButtons = [
    {title:"Hồ sơ cá nhân",href:app_paths.userInfo, icon: <ManageAccounts/>},
    {title:"Hồ sơ gia sư", href:app_paths.tutorInfo, icon: <School/>},
    {title:"Yêu cầu nhận lớp", href:app_paths.tutorRequests, icon: <CoPresent/>},
    {title:"Lớp của tôi", href:app_paths.userClasses, icon: <AutoStories/>},
    {title:"Lớp được đề xuất", href:app_paths.tutorRecommendClass, icon: <VolunteerActivism/>}
]

export const timeSlots = [
    {title:"Trước 9h", value:"0-9"},
    {title:"9h - 12h", value:"9-12"},
    {title:"12h - 15h", value:"12-15"},
    {title:"15h - 18h", value:"15-18"},
    {title:"18h - 24h", value:"18-24"}
]

export const subjectLevels = [
    {title:"Sinh viên", value:"0"},
    {title:"Giáo viên", value:"1"},
    {title:"Gia sư chuyên nghiệp", value:"2"}
]

export const daysOfWeek = [
    {title:"Thứ Hai",value:"0"},
    {title:"Thứ Ba",value:"1"},
    {title:"Thứ Tư",value:"2"},
    {title:"Thứ Năm",value:"3"},
    {title:"Thứ Sáu",value:"4"},
    {title:"Thứ Bảy",value:"5"},
    {title:"Chủ Nhật",value:"6"}
]

export const tutorLocation = {
    province: null,
    district: null,
    ward: null,
    detail: "tutorAddress",
    longitude: null,
    latitude: null
}

export const studentLocation = {
    province: null,
    district: null,
    ward: null,
    detail: "studentAddress",
    longitude: null,
    latitude: null
}

export default {
    ACCESS_TOKEN_KEY: 'access_token',
    BEARER: 'Bearer ',
    STORAGE_NAME: 'BKConnect_storage',
    bigFontSize: 50,
    ROLE_TUTOR: 'TUTOR',
    ROLE_STUDENT: 'STUDENT',
    NON_AVAILABLE_TIME_VALUE: '0',
    AVAILABLE_TIME_VALUE: '1',
    hoursOfWeek: 168
}
