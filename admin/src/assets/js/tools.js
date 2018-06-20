import {
  fetch
} from './axios.js'

export let tools = {
  uploads: async (e) => {
    let file = e.target.files[0];
    return await new Promise((resolve, reject) => {
      let imgType = 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
      let key = Date.parse(new Date()) + parseInt(Math.random() * 10)
      let reader = new FileReader();
      if (imgType.indexOf(file.type) == -1) {
        resolve(0)
        return false
      }
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = () => {
        fetch('/store/system/Qiniu/uploads', {
          key: key,
          image: reader.result
        }).then(res => {
          if (res.code == 0) {
            resolve(`${res.data.domain}/${key}`)
          } else {
            resolve(res)
          }
        })
      };
    })
  }
}
