import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  CoreValuesResponse,
  CoreValuesPostRequest,
  CoreValuesPatchRequest,
} from "../../api/api-client";

export function useCoreValues() {
  return useCrudBase<
    CoreValuesResponse,
    CoreValuesPostRequest,
    CoreValuesPatchRequest
  >({
    getAll: () => apiClient.coreValuesAll(),
    getById: (id) => apiClient.coreValuesGET(id),
    create: (body) => apiClient.coreValuesPOST(body),
    update: (id, body) => apiClient.coreValuesPATCH(id, body),
    remove: (id) => apiClient.coreValuesDELETE(id),
  });
}
