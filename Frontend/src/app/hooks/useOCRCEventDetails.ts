import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  OCRCEventDetailsResponse,
  OCRCEventDetailsPatchRequest,
} from "../../api/api-client";

const operations = {
  get: () => apiClient.oCRCEventDetailsGET(),
  update: (body: OCRCEventDetailsPatchRequest) =>
    apiClient.oCRCEventDetailsPATCH(body),
};

export function useOCRCEventDetailss() {
  return useSingletonBase<
    OCRCEventDetailsResponse,
    OCRCEventDetailsPatchRequest
  >(operations);
}
