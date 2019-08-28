

/**
 * 安全的访问对象的字段
 * 例如有个对象 obj
 * 试图访问 obj.a.b.c.d.e 的值
 * 可以直接：
 * let val = parsePath('a.b.c.d.e')(obj)
 * if (val) {
 *   // obj.a.b.c.d.e 存在
 * } else {
 *   // obj.a.b.c.d.e 不存在
 * }
 */
const bailRE = /[^\w.$]/
export const parsePath = (path) => {
  if (bailRE.test(path)) {
    return function () { }
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

// 数组降纬
export const normalizeList = l => l.reduce((a, i) => (Array.prototype.push.apply(a, i.constructor === Array ? normalizeList(i) : [i]), a), [])

/**
 * 比较版本
 */
export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 拼接url完整链接
 */
export function buildQueryUrl(url, params = {}) {
  let arr = []
  for (let key in params) {
    arr.push(`${key}=${params[key]}`)
  }
  return `${url}${arr.length ? (url.indexOf('?') !== -1 ? '&' : '?') : ''}${arr.join('&')}`
}

/**
 * 防抖
 * isImediate: true - 执行前置；false - 执行后置；
 */
export const debounce = (func, wait, isImediate) => {
  let timmer = null
  return function (...args) {
    if (timmer) clearTimeout(timmer)
    if (isImediate) {
      let callNow = !timmer
      timmer = setTimeout(() => {
        timmer = null
      }, wait)
      if (callNow) {
        func(...args)
      }
    } else {
      timmer = setTimeout(() => {
        func(...args)
      }, wait)
    }
  }
}

/**
 * 节流
 */
export const throttle = (func, wait) => {
  let pre = 0
  return function (...args) {
    let cur = Date.now()
    if (cur - pre >= wait) {
      func(...args)
      pre = Date.now()
    }
  }
}

/**
 * 驼峰转下划线
 */
export const camelToUnderScore = (key) => {
  try {
    return key.replace(/([A-Z0-9])/g, "_$1").toLowerCase()
  } catch (e) {
    console.error('camelToUnderScore error: ', e)
    return key
  }
}

/**
 * 下划线转驼峰
 */
export const unserScoreToCamel = (key) => {
  return key.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * wx-api promise
 */
export const wxPromise = function (method, options = {}) {
  return new Promise((resolve, reject) => {
    if (!wx[method] || typeof wx[method] !== 'function') {
      reject()
    }
    options['success'] = function (...args) {
      resolve(...args)
    }
    options['fail'] = function (...args) {
      reject(...args)
    }
    wx[method](options)
  })
}

/**
 * 展示toast
 */
export const showToast = function ({ title, icon = 'none', image = '', duration = 2000, mask = false, onHide = null } = {}) {
  if (!title) return
  return wxPromise('showToast', { title, icon, image, duration, mask, onHide }).then(function () {
    if (typeof onHide === 'function') {
      setTimeout(() => {
        onHide()
      }, duration || 2000)
    }
  })
}

/**
 * 隐藏toast
 */
export const hideToast = function () {
  return wxPromise('hideToast')
}

/**
 * 展示loading
 */
export const showLoading = function ({ title = '加载中...', mask = false } = {}) {
  return wxPromise('showLoading', { title, mask })
}

/**
 * 隐藏loading
 */
export const hideLoading = function () {
  return wxPromise('hideLoading')
}

/**
 * 设置页面标题
 */
export const setTitle = function (title) {
  if (typeof title === 'string') {
    wx.setNavigationBarTitle({ title })
  }
}

/**
 * 展示确认窗口
 */
export const showModal = function (title, content, showCancel, confirmText, cancelText) {
  return wxPromise('showModal', {
    title: title,
    content: content,
    showCancel: showCancel,
    confirmText: confirmText,
    cancelText: cancelText
  })
}

/**
 * 获取当前页面的event
 */
export const getCurEvent = function () {
  try {
    let pages = getCurrentPages()
    return pages[pages.length - 1]._data.$event
  } catch (e) {
    console.error('getCurEvent error: ', e)
    return null
  }
}

/**
 * 封装统一的获取systemInfo方法 避免频繁调用 wx.getSystemInfoSync
 */
let systemInfo = null
export const getSystemInfoSync = (fouce = false) => {
  try {
    !fouce && systemInfo || (systemInfo = wx.getSystemInfoSync && wx.getSystemInfoSync())
    return systemInfo
  } catch (e) {
    console.error('utils getSystemInfoSync error: ', e)
    return systemInfo
  }
}

/**
 * 判断用户手机是否 iPhoneX
 */
let cacheIsIPhoneX = null
export const isIPhoneX = () => {
  if (typeof cacheIsIPhoneX === 'boolean') return cacheIsIPhoneX

  const sys = getSystemInfoSync() || {}
  try {
    if (sys && sys.model && sys.model.toLocaleLowerCase().indexOf('iphone x') !== -1) {
      return cacheIsIPhoneX = true
    }
  } catch (error) {
    console.error('isIPhoneX error: ', error)
    return false
  }
  return cacheIsIPhoneX = false
}

/**
 * 图片链接追加webp
 */
export const getImageWebpUrl = (imgUrl) => {
  let systemInfo = getSystemInfoSync()
  if (imgUrl) {
    // ios 不支持webp
    if (systemInfo && systemInfo.platform && systemInfo.platform.indexOf('android') !== -1 && imgUrl.indexOf('iopcmd=') === -1) {
      var sym = imgUrl.indexOf('?') === -1 ? '?' : '&'
      imgUrl = imgUrl + sym + 'iopcmd=convert&dst=webp'
    }
    return imgUrl
  } else {
    return ''
  }
}

/**
 * 判断对象是否为空
 * 空对象返回true
 */
export const gIsEmptyObject = (obj) => {
  if( !obj ) return true

  for (let t in obj) {
    return false
  }
  return true
}

/**
 * 获取当前页面实例
 */
export const getCurrentPage = () => {
  try {
    let ps = getCurrentPages()
    return ps && ps.length && ps[ps.length - 1] || {}
  } catch (e) {
    return {}
  }
}

export const findLastIndex = (arr, cb, context) => {
  if (!Array.isArray(arr)) return arr;
  for (let i = arr.length - 1; i >= 0; i--) {
    let ele = arr[i]

    if (cb.call(context, ele, i, arr)) {
      return i
    }
  }
  return -1;
}

export const getRequest = (url) => {
  let theRequest = new Object();
  let index = url.indexOf("?")
  if (index != -1) {
    let str = url.substr(index + 1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

//比较对象是否相等
export const isObjectValueEqual = (obj1, obj2) => {
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {/*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (let attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return isObjectValueEqual(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

/**
 * 获取当前日期 格式: 2017-8-18
 *
 * @returns 2017-8-18
 */
export const getNowFormatDate = () => {
  let date = new Date()
  let strDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  return strDate
}

/**
 * 时间格式化
 * @returns 2019/01/09
 */
export const formatDate = (date) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 解析h5链接
 * 返回: {uri, params, hash}
 */
export const parseUrl = (link) => {
  let [url, hash = ''] = link.split('#')
  let [uri, query = ''] = url.split('?')
  let params = {}

  if (query) {
    let arr = query.split('&')
    let tmp = null
    arr.forEach(i => {
      if (i) {
        tmp = i.split('=')
        params[tmp[0]] = tmp[1]
      }
    })
  }

  return {
    uri,
    params,
    hash
  }
}

/**
 * 判断是否低端机
 */
let cacheIsBasicPhone = null
export const isBasicPhone = () => {
  if (typeof cacheIsBasicPhone === 'boolean') {
    return cacheIsBasicPhone
  }
  let sys = getSystemInfoSync()
  try {
    if (sys && sys.model && sys.model.toLocaleLowerCase().indexOf('iphone 5') !== -1) {
      return cacheIsBasicPhone = true
    }
  } catch (e) {
    console.error('isBasicPhone error: ', e)
    // 出现异常 不cache返回值
    return false
  }
  return cacheIsBasicPhone = false
}
