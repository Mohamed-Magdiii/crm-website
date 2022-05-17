const initState = {
  wallets:[],
  loading:false,
  error:""
};
const walletReducer = (state = initState, action)=>{
  switch (action.type){
    case "FETCH_WALLET_START":
      state = {
        ...state,
        loading:true
      };
      break;
    case "FETCH_WALLET_SUCCESS":
      state = {
        ...state,
        wallets:[...action.payload.result.docs],
        loading:false
      };
      break;
    case "CLEAR_WALLETS":
      state = {
        wallets:[],
        loading:false
      };
  }
    

  return state;
};
export default walletReducer;