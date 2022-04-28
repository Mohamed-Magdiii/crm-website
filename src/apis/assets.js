
export const getAssests = async ({ payload })=>{
  const { page, limit } = payload;
  const result = await fetch(`http://localhost:3001/api/v1/crypto/assets?limit=${limit}&&page=${page}`);
  const assests = await result.json();
  return assests;
};
export const addNewSymbol = async (values)=>{
  console.log(values);
  console.log("Inside new symbol");
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
  console.log(data);
};