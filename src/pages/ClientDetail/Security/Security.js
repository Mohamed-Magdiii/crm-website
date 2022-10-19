import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "reactstrap";
import { disable2FA } from "store/client/actions";

function Security(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state=>state.clientReducer.disable2FA);
  const state = useSelector(state=>state.clientReducer.clientDetails);
  const disable2fa = ()=>{
    dispatch(disable2FA({ id:props.clientId }));
  };

  return (<>
    {state?.settings?.twoFactorAuthEnabled && <div className="d-flex align-items-center justify-content-center"> <Button color="primary" disabled={loading} onClick={disable2fa}>
      {loading ? <div className="d-flex align-items-center justify-content-center">
        <Spinner></Spinner>
      </div> : t("Disable 2FA")}
    </Button>
    </div>}
  </> );
}

export default Security;