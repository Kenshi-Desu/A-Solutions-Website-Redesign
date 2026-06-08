import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  AffiliateResponse,
  AffiliatePostRequest,
  AffiliatePatchRequest,
} from "../../api/api-client";

export function useAffiliates() {
  return useCrudBase<
    AffiliateResponse,
    AffiliatePostRequest,
    AffiliatePatchRequest
  >({
    getAll: () => apiClient.affiliatesAll(),
    getById: (id) => apiClient.affiliatesGET(id),
    create: (body) => apiClient.affiliatesPOST(body),
    update: (id, body) => apiClient.affiliatesPATCH(id, body),
    remove: (id) => apiClient.affiliatesDELETE(id),
  });
}
