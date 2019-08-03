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

/***********************下拉列表************************/
export const dropListOneGetApi= data=>{return fetch(jobServer+'/api/drop/one', data, 'GET',"")}; //获取下拉列表

/***********************聊天消息相关接口********************************/
export const getUnReadNumAPI = data=>{return fetch(collectionService +'/tApi/message/all', data, 'GET')};//获取最近联系人列表

/***********************博客相关接口********************************/
export const addBlogAPI= data=>{return fetch(jobServer+'/api/blog/', data, 'POST')}; //登录

