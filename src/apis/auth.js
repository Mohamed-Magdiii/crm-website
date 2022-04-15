

import { API_BASE } from "./url_helper";

export const loginUser = async(values) => {
  const result = await fetch(`${API_BASE}/auth/login`, {
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