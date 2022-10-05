const initState = {
  gateways:{},
  loading:false,
  error:""
};

const forexGatewayReducer = (state = initState, action)=>{
  switch (action.type){
    case "FETCH_FOREX_GATEWAYS_START":
      state = {
        ...state,
        loading:true
      };
      break;
    case "FETCH_FOREX_GATEWAYS_SUCCESS":
      state = {
        ...state,
        loading: false,
        forexDepositGateways: { ...action.payload.result }
      };
      break;
    case "FETCH_WITHDRAWALS_FOREX_GATEWAYS_START":
      state = {
        ...state,
        loading:true
      };
      break;
    case "FETCH_WITHDRAWALS_FOREX_GATEWAYS_SUCCESS":
      state = {
        ...state,
        loading:false,
        forexWithdrawalGateways:{ ...action.payload.result }
      };
      break;

    default:
      state = { ...state };
  }
  return state;
};
export default forexGatewayReducer;