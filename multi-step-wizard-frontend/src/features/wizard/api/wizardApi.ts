import axiosInstance from "../../../api/axiosConfig";


export const fetchWizard = async (id: number) => {
  const response = await axiosInstance.get('/wizard', {
    params: {
      id,
    }
  });
  return response.data;
};
