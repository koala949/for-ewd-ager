import { isNullOrUndefined, isArray } from './base';
/**
 * 获取dva的store对象
 * @returns {Object}
 */
export const getStore = () => window.g_app._store;

/**
 * dispatch一个action
 */
export const dispatch = (...params) => getStore().dispatch(...params);

/**
 * 获取当前用户的信息
 */
export const getSelfInfo = () => {
  const state = getStore().getState();
  return state.global.user;
};

/**
 * 判断当前是否登录
 */
export const isLogin = () => {
  return !isNullOrUndefined(getSelfInfo()?.id);
};

/**
 * 获取当前用户的当前租户id
 */
export const getOrgId = () => {
  // return getSelfInfo().tenantId;
  return 0;
};

/**
 * 获取值集的code对应的meaning
 */
export const getCodeMeaning = (codeValues, value) => {
  if (!isArray(codeValues)) return null;
  const res = codeValues.find(one => one.value === value);
  if (!res) return value;
  return res.meaning;
};

