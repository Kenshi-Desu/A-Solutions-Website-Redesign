import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  ServiceResponse,
  ServicePostRequest,
  ServicePatchRequest,
} from "../../api/api-client";

export function useServices() {
  return useCrudBase<ServiceResponse, ServicePostRequest, ServicePatchRequest>({
    getAll: () => apiClient.servicesAll(),
    getById: (id) => apiClient.servicesGET(id),
    create: (body) => apiClient.servicesPOST(body),
    update: (id, body) => apiClient.servicesPATCH(id, body),
    remove: (id) => apiClient.servicesDELETE(id),
  });
}
