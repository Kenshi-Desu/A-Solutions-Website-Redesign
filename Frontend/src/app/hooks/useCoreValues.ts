import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  CoreValuesResponse,
  CoreValuesPostRequest,
  CoreValuesPatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.coreValuesAll(),
  getById: (id: number) => apiClient.coreValuesGET(id),
  create: (body: CoreValuesPostRequest) => apiClient.coreValuesPOST(body),
  update: (id: number, body: CoreValuesPatchRequest) =>
    apiClient.coreValuesPATCH(id, body),
  remove: (id: number) => apiClient.coreValuesDELETE(id),
};

export function useCoreValuess() {
  return useCrudBase<
    CoreValuesResponse,
    CoreValuesPostRequest,
    CoreValuesPatchRequest
  >(operations);
}
