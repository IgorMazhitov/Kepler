// src/api/wizardApi.ts

import axiosInstance from "../../../api/axiosConfig";

export const fetchWizard = async () => {
  const response = await axiosInstance.get('/wizard');
  return response.data;
};
