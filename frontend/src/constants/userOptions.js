import {AutoStories, CoPresent, ManageAccounts, Newspaper, School, VolunteerActivism} from "@mui/icons-material";
import React from "react"
import {app_paths} from "./router";

export const studentButtons = [
    {title: "Hồ sơ cá nhân", href: app_paths.userInfo, icon: <ManageAccounts/>},
    {title: "Lớp của tôi", href: app_paths.userClasses, icon: <AutoStories/>},
    {title: "Bài đăng", href: app_paths.userPosts, icon: <Newspaper/>},
]
export const tutorButtons = [
    {title: "Hồ sơ cá nhân", href: app_paths.userInfo, icon: <ManageAccounts/>},
    {title: "Hồ sơ gia sư", href: app_paths.tutorInfo, icon: <School/>},
    {title: "Yêu cầu nhận lớp", href: app_paths.tutorRequests, icon: <CoPresent/>},
    {title: "Lớp của tôi", href: app_paths.userClasses, icon: <AutoStories/>},
    {title: "Lớp được đề xuất", href: app_paths.tutorRecommendClass, icon: <VolunteerActivism/>}
]
export const timeSlots = [
    {title: "Trước 9h", value: "0-9"},
    {title: "9h - 12h", value: "9-12"},
    {title: "12h - 15h", value: "12-15"},
    {title: "15h - 18h", value: "15-18"},
    {title: "18h - 23h", value: "18-23"}
]
export const subjectLevels = [
    {title: "Sinh viên", value: "1"},
    {title: "Giáo viên", value: "2"},
    {title: "Gia sư chuyên nghiệp", value: "3"}
]
export const daysOfWeek = [
    {title: "Thứ Hai", value: "0", code: "MON"},
    {title: "Thứ Ba", value: "1", code: "TUE"},
    {title: "Thứ Tư", value: "2", code: "WED"},
    {title: "Thứ Năm", value: "3", code: "THU"},
    {title: "Thứ Sáu", value: "4", code: "FRI"},
    {title: "Thứ Bảy", value: "5", code: "SAT"},
    {title: "Chủ Nhật", value: "6", code: "SUN"}
]
export const lessonTime = [
    {title: "3 giờ", value: 3},
    {title: "2 giờ 30 phút", value: 2.5},
    {title: "2 giờ", value: 2},
    {title: "1 giờ 45 phút", value: 1.75},
    {title: "1 giờ 30 phút", value: 1.5},
    {title: "1 giờ", value: 1},
    {title: "45 phút", value: 0.75},
    {title: "30 phút", value: 0.5},
]
export const ageRanges = [
    {title: "Tất cả", value: "all"},
    {title: "18-25 tuổi", value: "18,25"},
    {title: "25-35 tuổi", value: "25,35"},
    {title: "35-45 tuổi", value: "35,45"},
    {title: "Trên 45 tuổi", value: "45,90"},
]

export const cancelClassReasons = [
    "Lý do 1",
    "Lý do 2",
    "Lý do 3",
    "Lý do 4",
    "Lý do 5",
    "Khác",
]