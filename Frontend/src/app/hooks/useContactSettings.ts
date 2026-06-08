import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  ContactSettingsResponse,
  ContactSettingsPatchRequest,
} from "../../api/api-client";

const operations = {
  get: () => apiClient.contactSettingsGET(),
  update: (body: ContactSettingsPatchRequest) =>
    apiClient.contactSettingsPATCH(body),
};

export function useContactSettingss() {
  return useSingletonBase<ContactSettingsResponse, ContactSettingsPatchRequest>(
    operations,
  );
}
