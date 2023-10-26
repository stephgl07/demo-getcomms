import axios, { AxiosRequestConfig, AxiosResponse } from "axios"; // Asegúrate de ajustar la ruta de importación

export async function Get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const response = await axios.get<T>(url, config);
    return response;
}
