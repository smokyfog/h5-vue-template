import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error, 'err')
    return Promise.reject(error)
  }
)

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    case 403:
      tipLogin('登录过期，请重新登录')
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

const tipLogin = (msg) => {
  Toast.confirm(msg, 'Confirm logout', {
    confirmButtonText: 'Re-Login',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.dispatch('user/resetToken').then(() => {
      location.reload()
    })
  })
}

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      errorHandle(response.status, response.data.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Toast.fail({
      message: error.message,
      duration: 1.5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
