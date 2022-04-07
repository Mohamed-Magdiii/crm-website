const initalState={
    error:'',
    loading:false,
    clients:[]
}
export const clientReducer=(state=initalState,action)=>{
  switch(action.type){
      case 'FETCH_CLIENTS':
          state={
            loading:true,
            error:'',
            clients:action.payload.clients
          }
          break;
          case 'FETCH_CLIENTS_SUCCESS':
              state={
                  ...state,
                  loading:action.payload.loading,
                  
              }
          break;
        case 'API_ERROR':
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        default:
            state={...state}
       

  }
  return state
}
export default clientReducer