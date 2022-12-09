export const dynamicPath = {
    postDetail: (id) => `/post/view/${id}`,
    userDetail: (id) => `/user/${id}`,
    tutorDetail: (id) => `/tutor/view/${id}`
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
    userClasses: "/user/classes",
    tutorInfo: "/user/tutor-info",

    tutorRecommendClass: "/user/tutor-recommend-class",

    tutor: "/tutor/*",
    tutorRequests: "/tutor/requests",
    viewTutorInfo: "/tutor/view",

    post: "/post/*",
    createPost: "/post/create",
    viewPost: "/post/view",

    tutorsPage: "/tutor",
    postsPage: "/post",
    refFree: "#",

}