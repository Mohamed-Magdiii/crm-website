
export const getAssests = async ({ payload })=>{
  const { page, limit } = payload;
  const result = await fetch(`http://localhost:3001/api/v1/crypto/assets?limit=${limit}&&page=${page}`);
  const assests = await result.json();
  return assests;
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
  
  const { name, markup, explorerLink, description} = values;
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
  console.log(result);
  const data = await result.json();
  console.log(data);
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
  console.log(data);
  return data;
  
};