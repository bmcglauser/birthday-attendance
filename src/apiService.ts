import axios from "axios";
import { IRespInput, IRespondent, ResponseOption } from "./types";
const API_URL = process.env.REACT_APP_BASE_URL;

const transformData = (r: any): IRespondent => {
  console.log({ r });
  return {
    id: r.id,
    name: r.name,
    number: r.number,
    response: r.response,
  };
};

export const getAllResps = async () =>
  await axios
    .get(`${API_URL}/resps` ?? "")
    .then((res) => res.data.map(transformData));

export const getOneResp = async (id: number | string) =>
  await axios.get(`${API_URL}/resp/${id}` ?? "").then((res) => {
    console.log({ res });
    return transformData(res.data);
  });

export const newResp = async ({ name, response, number }: IRespInput) =>
  await axios
    .post(`${API_URL}/resp`, { name, response, number })
    .then((res) => res.data);

export const delResp = async ({ id }: { id: number }) =>
  await axios.delete(`${API_URL}/resp/${id}`);

export const changeResp = async ({
  id,
  response,
}: {
  id: number;
  response: ResponseOption;
}) =>
  await axios
    .put(`${API_URL}/resp/${id}`, { response })
    .then((res) => res.data);
