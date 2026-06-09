import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  OCRCTimelineResponse,
  OCRCTimelinePostRequest,
  OCRCTimelinePatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.oCRCTimelinesAll(),
  getById: (id: number) => apiClient.oCRCTimelinesGET(id),
  create: (body: OCRCTimelinePostRequest) => apiClient.oCRCTimelinesPOST(body),
  update: (id: number, body: OCRCTimelinePatchRequest) =>
    apiClient.oCRCTimelinesPATCH(id, body),
  remove: (id: number) => apiClient.oCRCTimelinesDELETE(id),
};

export function useOCRCTimelines() {
  return useCrudBase<
    OCRCTimelineResponse,
    OCRCTimelinePostRequest,
    OCRCTimelinePatchRequest
  >(operations);
}
