import axios from 'axios';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { getToken, getRefreshToken, setRefreshToken, setToken } from './token';
import { API_HOST, CLIENT_ID, CLIENT_SECRET } from '@/constants/config';
import clone from 'lodash/clone'

axios.defaults.baseURL = API_HOST;

/**
 * 带token的请求
 */
const authAxios = axios.create();
/**
 * 不带token的请求
 */
const noAuthAxios = axios.create();
/**
 * hips请求
 */
const hipsAxios = axios.create();
hipsAxios.defaults.baseURL = 'https://hippiusgw.hand-china.com';

const requestQueue = []
let refreshing = false

authAxios.interceptors.request.use(async function (config) {
  if (refreshing) {
    // 刷新token期间，请求回调放在队列里，等token刷新后再继续请求
    await new Promise(resolve => requestQueue.push(resolve))
  }
  config._config = clone(config) // 备份原配置，避免本地启代理服务时改变config
  const token = getToken();
  if (token) config.headers['Authorization'] = `bearer ${token}`;
  return config;
});

authAxios.interceptors.response.use(function (response) {
  const { failed, code, message } = response.data;
  if (failed) {
    return {
      success: false,
      msg: message || code,
      __response: response,
    }
  }
  return {
    success: true,
    data: response.data,
    __response: response,
  }
}, async function (error) {
  if (!error.response) return { success: false, msg: '未知异常' }
  const { status, statusText, config } = error.response
  const res = {
    success: false,
    data: {},
    msg: status === 403 ? '该用户无此接口访问权限，请联系管理员' : statusText,
    __response: error.response,
  };
  // 若token失效，自动刷新token后重新请求
  if (!config.noJump && status === 401) {
    if (getRefreshToken()) {
      const success = await refreshToken()
      if (success) return authAxios(config._config);
    }
    // window.location.href = `/user/login?redirect_url=${encodeURIComponent(window.location.href)}`
    return res
  }
  return res
});

noAuthAxios.interceptors.response.use(function (response) {
  const { failed, code, message } = response.data;
  if (failed) {
    return {
      success: false,
      msg: message || code,
      __response: response,
    }
  }
  return {
    success: true,
    data: response.data,
    __response: response,
  }
}, function (error) {
  if (!error.response) return { success: false, msg: '未知异常' }
  const { status } = error.response
  // if (!config.noJump && status === 401) {
  //   window.location.href = `/user/login?redirect_url=${encodeURIComponent(window.location.href)}`
  // }
  return {
    success: false,
    data: {},
    msg: status === 403 ? '该用户无此接口访问权限，请联系管理员' : error.response.statusText,
    __response: error.response,
  }
});

const authAxiosWithPainationAdapter = async (options) => {
  const params = {}
  if (options.params) {
    const { current, pageSize, ...rest } = options.params;
    if (current != null) params.page = current - 1
    if (pageSize != null) params.size = pageSize
    Object.assign(params, rest);
  }
  const { success, data, msg } = await authAxios({
    ...options, ...{ params }
  })
  if (!success) return {
    success, msg,
    data: {
      data: [],
      total: 0,
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalPages: 0
    }
  }
  return {
    success, msg, data: {
      data: data.content || data || [],
      total: data.totalElements || data.length || 0,
      current: (data.number || 0) + 1,
      pageSize: data.size || DEFAULT_PAGE_SIZE,
      totalPages: data.totalPages || 0,
    }
  };
}

hipsAxios.interceptors.response.use(function (response) {
  return {
    success: true,
    data: response.data,
    __response: response,
  }
}, function (error) {
  if (!error.response) return { success: false, msg: '未知异常' }
  return {
    success: false,
    data: {},
    msg: error.response.statusText,
    __response: error.response,
  }
});

// 刷新token
async function refreshToken () {
  refreshing = true;
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('client_id', CLIENT_ID);
  formData.append('client_secret', CLIENT_SECRET);
  formData.append('refresh_token', getRefreshToken());
  const { success, data } = await noAuthAxios({
    method: 'POST',
    url: '/oauth/oauth/token',
    data: formData,
  })
  if (!success) {
    setRefreshToken('')
    refreshing = false
    return false
  }
  setToken(data.access_token)
  setRefreshToken(data.refresh_token)
  refreshing = false
  if (requestQueue.length) {
    requestQueue.forEach(callback => callback.call(null))
  }
  return true
}

export {
  authAxios,
  noAuthAxios,
  hipsAxios,
  authAxiosWithPainationAdapter,
}
