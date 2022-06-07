import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "store/auth/profile/actions";
import React, { useEffect } from "react";
function usePermissions(){
  const dispatch = useDispatch();
  const { 
    rolesPermissions,
    userPermissions,
    clientPermissions,
    teamsPermissions,
    leadsPermissions,
    withdrawalsPermissions,
    depositsPermissions,
    feeGroupsPermissions,
    systemEmailPermissions,
    symbolsPermissions,
    dictionariesPermissions,
    currencyPairsPermissions,
    markupsPermissions
  } = useSelector((state) => ({
    rolesPermissions: state.Profile.rolesPermissions || {},
    userPermissions :state.Profile.userPermissions || {}, 
    clientPermissions :state.Profile.clientPermissions || {},
    teamsPermissions : state.Profile.teamsPermissions || {},
    leadsPermissions : state.Profile.leadsPermissions || {},
    withdrawalsPermissions : state.Profile.withdrawalsPermissions || {},
    depositsPermissions : state.Profile.depositsPermissions || {},
    feeGroupsPermissions : state.Profile.feeGroupsPermissions || {},
    systemEmailPermissions : state.Profile.systemEmailPermissions || {},
    symbolsPermissions : state.Profile.symbolsPermissions || {},
    dictionariesPermissions : state.Profile.dictionariesPermissions || {},
    currencyPairsPermissions : state.Profile.currencyPairsPermissions || {},
    markupsPermissions : state.Profile.markupsPermissions || {}
  }));
  useEffect(()=>{
    if (localStorage.getItem("authUser")){
      dispatch(getUserProfile());
    }
    
  }, []);
  return { 
    clientPermissions,
    rolesPermissions, 
    userPermissions,
    teamsPermissions,
    leadsPermissions,
    withdrawalsPermissions,
    depositsPermissions,
    feeGroupsPermissions,
    systemEmailPermissions,
    symbolsPermissions,
    dictionariesPermissions,
    currencyPairsPermissions,
    markupsPermissions
  };
}
export default usePermissions; 