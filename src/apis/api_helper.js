/* eslint-disable no-debugger */
import axios from "axios";
import * as url from "./url_helper";

const getToken = () => {
  try {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    return authUser.token;
  } catch (error) {
    return "";
  }
};

export const redirectToLogin = function () {
  return window.location.replace(url.LOGIN);

};

//apply base url for axios
const API_URL = `${process.env.REACT_APP_API_CRM_DOMAIN}/api/v1/`;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

// axiosApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// );

const apiErrorHandler = (errObj) => {
  if (errObj.response && errObj.response.data) {
    if (errObj.response.data.code === 401) {
      localStorage.removeItem("authUser");
      redirectToLogin();
    }
    return errObj.response.data;
  }
  return errObj;
};

export async function get(url, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return await axiosApi.get(path, { ...config }).then(response => response.data).catch(err => apiErrorHandler(err));
}

export async function post(url, data, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return axiosApi
    .post(path, { ...data }, { ...config })
    .then(response => {
      return response.data;
    }).catch(err => apiErrorHandler(err));
}

export async function postFormData(url, data, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return axiosApi({
    method: "post",
    url: path,
    data,
    headers: { 
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    return response.data;
  }).catch(err => apiErrorHandler(err));
}

export async function patch(url, data, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return axiosApi
    .patch(path, { ...data }, { ...config })
    .then(response => {
      return response.data;
    }).catch(err => apiErrorHandler(err));
}

export async function put(url, data, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return axiosApi
    .put(path, { ...data }, { ...config })
    .then(response => response.data).catch(err => apiErrorHandler(err));
}

export async function del(url, config = {}) {
  const path = config.crypto ? `/crm${url}` : `/crm${url}`;
  return await axiosApi
    .delete(path, { ...config })
    .then(response => response.data).catch(err => apiErrorHandler(err));
}

export async function loginApi(url, data, config = {}) {
  const res = await post(url, data, config);
  if (res && res.result && res.result.token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${res.result.token}`;
  }
  return res;
}