import axios from 'axios'
import qs from 'qs'
const cookies = require('vue-cookies')
// console.log(JSON.parse(this.$cookies.get('info')))

// console.log(this.$store.state.info)
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 请求头
axios.defaults.baseURL = 'http://api.6che.vip' // ip
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  if (cookies.get('info')) {
    config.headers['admin-token'] = JSON.parse(cookies.get('info')).token
    config.headers['admin-uid'] = JSON.parse(cookies.get('info')).uid
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
