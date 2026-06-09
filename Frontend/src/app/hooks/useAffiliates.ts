import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  AffiliateResponse,
  AffiliatePostRequest,
  AffiliatePatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.affiliatesAll(),
  getById: (id: number) => apiClient.affiliatesGET(id),
  create: (body: AffiliatePostRequest) => apiClient.affiliatesPOST(body),
  update: (id: number, body: AffiliatePatchRequest) =>
    apiClient.affiliatesPATCH(id, body),
  remove: (id: number) => apiClient.affiliatesDELETE(id),
};

export function useAffiliates() {
  return useCrudBase<
    AffiliateResponse,
    AffiliatePostRequest,
    AffiliatePatchRequest
  >(operations);
}
