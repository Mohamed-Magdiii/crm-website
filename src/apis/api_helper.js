import axios from "axios"
import * as url from "./url_helper";

const authUser = JSON.parse(localStorage.getItem("authUser"))
console.log("hi from api helper");

let token;

if (authUser) {
  try {
    token = authUser.token
  }
  catch (err) {
    console.log(err);
  }
}

export const loginCheck = function () {
  if (authUser) {
    return true
  } else {
    return false
  }
};
export const redirectToLogin = function () {
  return window.location.replace(url.LOGIN);

};

//apply base url for axios
const API_URL = "http://localhost:3001"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
