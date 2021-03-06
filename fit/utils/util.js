// let env = 'online';
let env = 'local';
let localServierDomain = 'http://localhost:8088';
let onlineServierDomain = 'https://keephealthy.duapp.com';
let testServerUrl = '/test/mysqlHello';
let serverUrlForLogin = '/login/getUserInfo';
let serverUrlForChangeRequirement = '/requirement/changeRequirement';
let serverUrlForGetUser = '/user/get';
let serverUrlForGetRequirement = '/requirement/get';


/**
 * 时间格式化函数
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取服务器域名
 */
const getServerDomain  = () => {
  if(env == 'local') {
    return localServierDomain;
  }
  if(env == 'online') {
    return onlineServierDomain;
  }
}

/**
 * 获取测试用的服务器URL
 */
const getTestServerUrl = () => {
  return getServerDomain() + testServerUrl;
}

/**
 * 或者登陆Url
 */
const getServerUrlForLogin = () => {
  return getServerDomain() + serverUrlForLogin;
}

/**
 * 获取确认需求的服务端URL
 */
const getServerUrlForChangeRequirement = () => {
  return getServerDomain() + serverUrlForChangeRequirement;
}

/**
 * 获取用户信息服务端Url
 */
const getServerUrlForGetUser = () => {
  return getServerDomain() + serverUrlForGetUser;
}

const getServerUrlForGetRequirement = () => {
  return getServerDomain() + serverUrlForGetRequirement;
}

// 暴露公共函数
module.exports = {
  formatTime: formatTime,
  env : env,
  getServerDomain: getServerDomain,
  getTestServerUrl: getTestServerUrl, 
  getServerUrlForLogin: getServerUrlForLogin,
  getServerUrlForChangeRequirement: getServerUrlForChangeRequirement,
  getServerUrlForGetUser: getServerUrlForGetUser,
  getServerUrlForGetRequirement: getServerUrlForGetRequirement
}
