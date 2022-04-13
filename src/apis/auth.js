

export const loginUser = async(values) => {
  const result = await fetch("http://localhost:3001/api/v1/crm/auth/login", {
    method:"POST",
    mode:"cors",
       
    headers:{  
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({
      email:values.email,
      password:values.password 
    })
  });
  const data = await result.json();
  return data;
};