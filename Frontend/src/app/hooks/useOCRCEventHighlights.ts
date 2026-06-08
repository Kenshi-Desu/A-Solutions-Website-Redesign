import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  OCRCEventHighlightsResponse,
  OCRCEventHighlightsPostRequest,
  OCRCEventHighlightsPatchRequest,
} from "../../api/api-client";

export function useOCRCEventHighlights() {
  return useCrudBase<
    OCRCEventHighlightsResponse,
    OCRCEventHighlightsPostRequest,
    OCRCEventHighlightsPatchRequest
  >({
    getAll: () => apiClient.oCRCEventHighlightsAll(),
    getById: (id) => apiClient.oCRCEventHighlightsGET(id),
    create: (body) => apiClient.oCRCEventHighlightsPOST(body),
    update: (id, body) => apiClient.oCRCEventHighlightsPATCH(id, body),
    remove: (id) => apiClient.oCRCEventHighlightsDELETE(id),
  });
}
