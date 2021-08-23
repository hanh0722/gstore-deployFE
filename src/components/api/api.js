const OUR_DOMAIN = `https://api-gstorevn.herokuapp.com`
export const GET_ALL_POST_URL = `${OUR_DOMAIN}/get-all-posts`;
export const SORT_POST = (sorting) =>{
    return `${OUR_DOMAIN}/post/${sorting}`
}
export const UPDATE_POST = `${OUR_DOMAIN}/api/upload`;
export const UPLOAD_IMAGES_ID = (id) =>{
    return `${OUR_DOMAIN}/api/images/${id}`
}

export const API_UPLOAD_IMAGES = `${OUR_DOMAIN}/api/upload-images`;
export const API_CREATE_POST = `${OUR_DOMAIN}/api/create-post`;
export const API_REGISTER = `${OUR_DOMAIN}/register`;
export const API_USER_DETAIL = (username) =>{
    return `${OUR_DOMAIN}/api/get-user/${username}`
}

export const API_USER = `${OUR_DOMAIN}/api/users`;
export const API_REMOVE_USER = `${OUR_DOMAIN}/api/remove-user`;
export const API_GET_NUMBER_POST = (number) =>{
    return `${OUR_DOMAIN}/post/news/${number}`
}
export const API_BLOG_DETAIL = (id) =>{
    return `${OUR_DOMAIN}/get-post/${id}`
}
export const API_SEARCH_BLOG = (data) =>{
    return `${OUR_DOMAIN}/api/${data}`
}
export const API_LOGIN = `https://api-gstorevn.herokuapp.com/login`;
export const API_GET_RECENT_POST = (number) =>{
    return `${OUR_DOMAIN}/post/news/${number}`
}
export const API_ADMIN_INFORMATION = (id) =>{
    return `${OUR_DOMAIN}/admin/${id}`
}