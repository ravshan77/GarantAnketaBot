import axios from "axios";
import { BaseUrl} from "../baseUrl";


export function Axios({ url, method = "GET", data = null, }) {
  return new Promise((resolve, reject) => {
    axios({ method: method, url: BaseUrl + url, data: data })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

axios.interceptors.request.use(function (config) {
  return config;
});


axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.baseURL = BaseUrl