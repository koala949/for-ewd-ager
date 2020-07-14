export function isString(str) {
  return typeof str === 'string';
}

export function isFunction(func) {
  return typeof func === 'function';
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function isUndefined(v) {
  return typeof v === 'undefined';
}

export function isNullOrUndefined(v) {
  return v == null
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isValidArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function isBoolean(bool) {
  return typeof bool === 'boolean';
}
/**
 * 判断是否为dom元素
 * @param {HTMLElement} obj - dom元素
 */
export function isDom(obj) {
  if (typeof HTMLElement === 'object') return obj instanceof HTMLElement;
  return (
    obj && (typeof obj === 'object') & (obj.nodeType === 1) && typeof obj.nodeName === 'string'
  );
}

export function delay(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 将callback形式的方法转化为返回Promise对象
 * @param {*} func
 * @param {*} context - 上下文
 * @returns {Promise}
 */
export function promisify(func, context) {
  if (!isFunction(func)) return func;
  return (...args) => {
    const ctx = context || this;
    return new Promise(resolve => {
      func.call(ctx, ...args, (...res) => {
        const err = res.shift();
        if (err) {
          resolve([err, null]);
        } else {
          resolve([null, res[0]]);
        }
      });
    });
  };
}
/**
 * 获取元素到网页顶端的距离
 */
export function getElementTop(el) {
  let actualTop = el.offsetTop;
  let current = el.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
