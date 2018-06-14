import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 请求头
axios.defaults.baseURL = 'http://api.6che.vip' // ip
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, () => {
  return console.log('网络异常')
})
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }).catch((error) => {
        console.log(error)
      })
  })
}
