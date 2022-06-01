import { show } from "react-notification-system-redux";

const notificationTitles = {
  success: "Success!",
  error: "Error!"
};
const notification = ({ type = "success", message = "" }) => ({
  title: notificationTitles[type],
  message,
  position: "tr",
  autoDismiss: 5
});

const showNotification = ({ message = "", type = "success" }) => (
  dispatch
) => {
  dispatch(show(notification({
    message,
    type 
  }), type));
};

export const showErrorNotification = (message = "") => (dispatch) => {
  const type = "error";
  dispatch(show(notification({
    message,
    type 
  }), type));
};

export const showSuccessNotification = (message = "") => (dispatch) => {
  const type = "success";
  dispatch(show(notification({
    message,
    type 
  }), type));
};

export const NO_ACCESS_MESSAGE = "No permissions to access this resource";
