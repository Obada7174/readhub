/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/services/axios";
import {UpdatePagePayload, PageResponse ,Page} from "@/types/static-page";

export const getPages = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<PageResponse> => {
  const res = await axios.get("http://localhost:5000/static-pages", {
    params: { page, limit, search },
  });
  return res.data;
};
export const getPage = async (id: number): Promise<any> => {
  const res = await axios.get(`http://localhost:5000/static-pages/${id}`);
  return res.data;
};

export const createPage = async (user: Omit<Page, "id">): Promise<Page> => {
  const res = await axios.post("http://localhost:5000/static-pages", user);
  return res.data;
};

export const updatePage = async (
  id: number,
  payload: UpdatePagePayload
): Promise<Page> => {
  const res = await axios.patch(`http://localhost:5000/static-pages/${id}`, payload);
  return res.data;
};

export const deletePages = async (ids: number[]): Promise<void> => {
  await axios.delete(`http://localhost:5000/static-pages`, {
    data: { ids },
  });
};
