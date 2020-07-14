import uuid from 'node-uuid'

const storage = window.localStorage;
const tokenName = 'user-token';
const refreshTokenName = 'refresh-token';

export function getToken () {
  return storage.getItem(tokenName);
}

export function setToken (value) {
  return storage.setItem(tokenName, value);
}

export function getRefreshToken () {
  return storage.getItem(refreshTokenName)
}

export function setRefreshToken (value) {
  return storage.setItem(refreshTokenName, value)
}

export function getDeviceId () {
  const deviceId = storage.getItem('device_id')
  if (deviceId) return deviceId
  const _deviceId = uuid()
  storage.setItem('device_id', _deviceId)
  return _deviceId
}
