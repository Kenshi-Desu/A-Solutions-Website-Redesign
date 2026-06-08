import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  ContactSettingsResponse,
  ContactSettingsPatchRequest,
} from "../../api/api-client";

export function useContactSettingss() {
  return useSingletonBase<ContactSettingsResponse, ContactSettingsPatchRequest>(
    {
      get: () => apiClient.contactSettingsGET(),
      update: (body) => apiClient.contactSettingsPATCH(body),
    },
  );
}
