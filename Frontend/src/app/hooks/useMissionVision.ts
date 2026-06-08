import { apiClient } from "../../api/index";
import { useSingletonBase } from "./base/useSingletonBase";

import {
  MissionVisionResponse,
  MissionVisionPatchRequest,
} from "../../api/api-client";

const operations = {
  get: () => apiClient.missionVisionGET(),
  update: (body: MissionVisionPatchRequest) =>
    apiClient.missionVisionPATCH(body),
};

export function useMissionVisions() {
  return useSingletonBase<MissionVisionResponse, MissionVisionPatchRequest>(
    operations,
  );
}
