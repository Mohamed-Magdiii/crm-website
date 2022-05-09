import axios from "axios";
import * as url from "./url_helper";

const authUser = JSON.parse(localStorage.getItem("authUser"));

let token;

if (authUser) {
  try {
    token = authUser.token;
  }
  catch (err) {
  }
}

export const loginCheck = function () {
  if (authUser) {
    return true;
  } else {
    return false;
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

axiosApi.defaults.headers.common["Authorization"] = token;

// axiosApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// );

export async function get(url, config = {}) {
  const path = config.crypto ? `/crypto${url}` : `/crm${url}`;
  return await axiosApi.get(path, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  const path = config.crypto ? `/crypto${url}` : `/crm${url}`;
  return axiosApi
    .post(path, { ...data }, { ...config })
    .then(response => {
      return response.data;
    }).catch((err) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return err;
    });
}

export async function patch(url, data, config = {}) {
  const path = config.crypto ? `/crypto${url}` : `/crm${url}`;
  return axiosApi
    .patch(path, { ...data }, { ...config })
    .then(response => {
      return response.data;
    }).catch((err) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return err;
    });
}

export async function put(url, data, config = {}) {
  const path = config.crypto ? `/crypto${url}` : `/crm${url}`;
  return axiosApi
    .put(path, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  const path = config.crypto ? `/crypto${url}` : `/crm${url}`;
  return await axiosApi
    .delete(path, { ...config })
    .then(response => response.data);
}
