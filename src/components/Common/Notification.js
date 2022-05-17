import React from "react";
import logo from "../../assets/images/logo-sm.svg";
function Notification({ show = false, type }){
  const closeNotifaction = () => {
    document.getElementById("notifaction-modal").style.display = "none";
  };
  return (
    <React.Fragment>
      {show && 
          <div className="toast fade show" role="alert" id="notifaction-modal">
            <div className="toast-header">
              <img src={logo} alt="" className="me-2" height="18" />
              <strong className="me-auto">Minia</strong>
              <small>Now</small>
              <button onClick={closeNotifaction} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              { `The status of the ${type} has been updated successfully `}
            </div>
          </div>
        
      }
    </React.Fragment>
   
  );
}
export default Notification;