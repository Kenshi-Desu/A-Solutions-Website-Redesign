import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  ServiceResponse,
  ServicePostRequest,
  ServicePatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.servicesAll(),
  getById: (id: number) => apiClient.servicesGET(id),
  create: (body: ServicePostRequest) => apiClient.servicesPOST(body),
  update: (id: number, body: ServicePatchRequest) =>
    apiClient.servicesPATCH(id, body),
  remove: (id: number) => apiClient.servicesDELETE(id),
};

export function useServices() {
  return useCrudBase<
    ServiceResponse,
    ServicePostRequest,
    ServicePatchRequest
  >(operations);
}
