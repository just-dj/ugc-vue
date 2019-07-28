import * as util from "../utils/util"

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  if (type === 'GET' || type === "DELETE") {
    if (util.isEmpty(data)){
      //不需要拼接url
    } else {
      url = url + '/' + data.toString();
    }
  }

  return new Promise((resolve, reject) => {
    let requestObj;
    if (window.XMLHttpRequest) {
      requestObj = new XMLHttpRequest();
    } else {
      requestObj = new ActiveXObject;
    }
    let sendData = '';
    if (type === 'POST' || type === "PATCH") {
      sendData = JSON.stringify(data);
    }

    requestObj.open(type, url, true);
    requestObj.setRequestHeader('content-type', 'application/json');
    requestObj.setRequestHeader("token", sessionStorage.getItem('token'));
    requestObj.send(sendData);

    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
            if (obj.code === 2) {
              //弹出登陆框
              sessionStorage.clear();
              localStorage.clear();
            }
          }
          resolve(obj)
        } else {
          console.log("接口访问出错");
          reject(requestObj)
        }
      }
    }

  })

}
