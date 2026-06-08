import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  OCRCEventDetailsResponse,
  OCRCEventDetailsPatchRequest,
} from "../../api/api-client";

export function useOCRCEventDetailss() {
  return useSingletonBase<
    OCRCEventDetailsResponse,
    OCRCEventDetailsPatchRequest
  >({
    get: () => apiClient.oCRCEventDetailsGET(),
    update: (body) => apiClient.oCRCEventDetailsPATCH(body),
  });
}
