import fetch from '../common/js/fetch.js';

let jobServer = process.env.SERVER_URL;
let collectionService = process.env.COLLECTION_URL;

/***********************登陆注册************************/
export const signInAPI= data=>{return fetch(jobServer+'/api/login/in', data, 'POST')}; //登录
export const personSignUpAPI= data=>{return fetch(jobServer+'/api/login/register/person', data, 'POST')}; //true 个人注册
export const companySignUpAPI= data=>{return fetch(jobServer+'/api/login/register/company', data, 'POST')}; //true 公司注册
export const signOutAPI= data=>{return fetch(jobServer+'/api/login/out', data, 'POST')}; //注销登录
export const getCodeAPI= data=>{return fetch(jobServer+'/api/login/code/send', data, 'POST')}; //获取验证码
export const checkEmailAPI= data=>{return fetch(jobServer+'/api/login/isExist', data, 'POST')}; //true 已使用 检验邮箱是否已被使用
export const checkCodeAPI= data=>{return fetch(jobServer+'/api/login/code/check/', data, 'POST')}; //true 检验验证码是否正确
export const changePWDAPI= data=>{return fetch(jobServer+'/tApi/login/changePassword', data, 'PATCH')}; //true 检验验证码是否正确
/***********************用户相关************************/
export const getUserAPI= data=>{return fetch(jobServer+'/api/user', data, 'GET')}; //注销登录

/*****************角色相关************************/
export const getModuleTreeApi= data=>{return fetch(jobServer+'/api/role/roleGroup', data, 'GET')}; //
export const getAllRoleApi= data=>{return fetch(jobServer+'/api/role/all', data, 'POST')}; //
export const addRoleApi= data=>{return fetch(jobServer+'/api/role/', data, 'POST')}; //
export const editRoleApi= data=>{return fetch(jobServer+'/api/role/', data, 'PATCH')}; //
/***********************下拉列表************************/
export const dropListOneGetApi= data=>{return fetch(jobServer+'/api/drop/one', data, 'GET',"")}; //获取下拉列表

/***********************聊天消息相关接口********************************/
export const getUnReadNumAPI = data=>{return fetch(collectionService +'/tApi/message/all', data, 'GET')};//获取最近联系人列表

/***********************博客相关接口********************************/
export const addBlogAPI= data=>{return fetch(jobServer+'/api/blog/', data, 'POST')}; //
export const getBlogAPI= data=>{return fetch(jobServer+'/api/blog/', data, 'GET')}; //
export const blogReadCount= data=>{return fetch(jobServer+'/api/blog/readCount', data, 'GET')}; //
export const blogLikeCount= data=>{return fetch(jobServer+'/api/blog/likeCount', data, 'GET')}; // true喜欢 false 取消喜欢
export const blogSimplePageAPI= data=>{return fetch(jobServer+'/api/blog/page', data, 'POST')}; //
export const blogManagerPageAPI= data=>{return fetch(jobServer+'/api/blog/page/manager', data, 'POST')}; //
export const addCommentApi= data=>{return fetch(jobServer+'/api/blog/comment', data, 'POST')}; //
export const likeUserApi= data=>{return fetch(jobServer+'/api/blog/likeUser', data, 'GET')}; //
export const changeBlogStatusApi= data=>{return fetch(jobServer+'/api/blog/status', data, 'POST')}; //
export const changeBlogTopApi= data=>{return fetch(jobServer+'/api/blog/top', data, 'POST')}; //
export const getTopBlogApi= data=>{return fetch(jobServer+'/api/blog/top', data, 'GET')}; //
/***********************通用接口********************************/
export const uploadFile= data=>{return fetch(jobServer+'/api/universal/upload', data, 'POST')}; //登录

