import qs from "qs";
import * as axiosHelper from "./api_helper_crypto";
export const getAssets = async ({ payload })=>{
  const data = await axiosHelper.get(`/assets/${qs.stringify(payload)}`);
  console.log(data);
  return data;
};
export const addNewSymbol = async (values)=>{
  
  const result = await fetch("http://localhost:3001/api/v1/crypto/assets", {
    method:"POST",
    headers:{
      "Content-type" :"application/json"
    },
    body: JSON.stringify({
      name:values.name,
      symbol: values.symbol,
      description: values.description,
      markup: values.markup,
      fee: {
        deposit:values.depositFee,
        withdrawal:values.withdrawFee
      },
      explorerLink: values.explorerLink,
      minAmount: {
        deposit :values.minDepositAmount,
        withdrawal:values.minWithdrawAmount
      },
      isCrypto:true,
      
    })
  });
  const data = await result.json();
  if (data.code === 500){
    throw new Error("Please Enter Valid data");
  }
  
  return data;
};
export const updateSymbol = async ({ payload })=>{
  
  const { id, values } = payload;
  
  const { name, markup, explorerLink, description } = values;
  const result = await fetch(`http://localhost:3001/api/v1/crypto/assets/${id}`, {
    method:"PATCH",
    headers:{
      "Content-type" :"application/json"
    },
    body: JSON.stringify({
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
    
      
    })
  });
  
  const data = await result.json();
  if (data.code === 500){
    throw new Error("Please Enter Valid data");
  }
  return data;
}; 
export const deleteSymbol = async ({ payload })=>{
 
  const result = await fetch(`http://localhost:3001/api/v1/crypto/assets/${payload}`, {
    method:"DELETE"
  });
  const data = await result.json();
  
  return data;
  
};
