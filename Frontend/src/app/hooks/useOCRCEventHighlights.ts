import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  OCRCEventHighlightsResponse,
  OCRCEventHighlightsPostRequest,
  OCRCEventHighlightsPatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.oCRCEventHighlightsAll(),
  getById: (id: number) => apiClient.oCRCEventHighlightsGET(id),
  create: (body: OCRCEventHighlightsPostRequest) =>
    apiClient.oCRCEventHighlightsPOST(body),
  update: (id: number, body: OCRCEventHighlightsPatchRequest) =>
    apiClient.oCRCEventHighlightsPATCH(id, body),
  remove: (id: number) => apiClient.oCRCEventHighlightsDELETE(id),
};

export function useOCRCEventHighlights() {
  return useCrudBase<
    OCRCEventHighlightsResponse,
    OCRCEventHighlightsPostRequest,
    OCRCEventHighlightsPatchRequest
  >(operations);
}
