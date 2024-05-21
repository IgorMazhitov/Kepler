import { AxiosResponse } from "axios";
import axiosInstance from "../../../api/axiosConfig";
import { IWizard } from "../interfaces/wizard.interface";


export const fetchWizard = async (id: number): Promise<IWizard> => {
  const { data: wizard } = await axiosInstance.get<IWizard>(`/wizard/${id}`);
  return wizard;
};
