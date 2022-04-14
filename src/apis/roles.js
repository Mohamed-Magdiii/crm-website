

import { API_BASE } from "./url_helper";
import qs from "qs";

export const getRoles = async({ payload }) => {
  const result = await fetch(`${API_BASE}/roles?${qs.stringify(payload)}`, {
    method:"GET",
  });
  const data = await result.json();
  return data;
};