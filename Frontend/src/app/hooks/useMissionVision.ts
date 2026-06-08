import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  MissionVisionResponse,
  MissionVisionPatchRequest,
} from "../../api/api-client";

export function useMissionVisions() {
  return useSingletonBase<MissionVisionResponse, MissionVisionPatchRequest>({
    get: () => apiClient.missionVisionGET(),
    update: (body) => apiClient.missionVisionPATCH(body),
  });
}
