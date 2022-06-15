import qs from "qs";
import * as axiosHelper from "./api_helper";
export const getAssets = async ({ payload })=>{
  const data = await axiosHelper.get(`/assets/?${qs.stringify(payload)}`, { crypto: false });
  return data;
};
export const addNewSymbol = async (values)=>{
  
  const data = await axiosHelper.post("/assets", {
    name:values.name,
    symbol: values.symbol,
    description: values.description,
    markup: values.markup,
    explorerLink:values.explorerLink,
    fee: {
      deposit:values.depositFee,
      withdrawal:values.withdrawFee
    },

    minAmount: {
      deposit :values.minDepositAmount,
      withdrawal:values.minWithdrawAmount
    },
    isCrypto:true,
      
  }, { crypto:true }
  );
  
  if (data.code === 500){
    throw new Error("Please Enter Valid data");
  }
  
  return data;
};
export const updateSymbol = async ({ payload })=>{
  
  const { id, values } = payload;
  
  const { name, markup, explorerLink, description } = values;
  const data = await axiosHelper.patch(`/assets/${id}`, {
  
    name,
    description,
    markup,
    explorerLink,
    fee: {
      deposit:values.depositFee,
      withdrawal:values.withdrawFee
    },
    minAmount: {
      deposit :values.minDepositAmount,
      withdrawal:values.minWithdrawAmount
    },
    
      
  }, { crypto:true });

  if (data.code === 500){
    throw new Error("Please Enter Valid data");
  }
  return data;
}; 
export const deleteSymbol = async ({ payload })=>{
 
  const result = await axiosHelper.del(`/assets/${payload}`, {
    crypto:true
  });

  
  return result;
  
};
