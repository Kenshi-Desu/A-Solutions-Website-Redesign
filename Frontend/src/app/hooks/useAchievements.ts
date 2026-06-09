import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  AchievementResponse,
  AchievementPostRequest,
  AchievementPatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.achievementsAll(),
  getById: (id: number) => apiClient.achievementsGET(id),
  create: (body: AchievementPostRequest) => apiClient.achievementsPOST(body),
  update: (id: number, body: AchievementPatchRequest) =>
    apiClient.achievementsPATCH(id, body),
  remove: (id: number) => apiClient.achievementsDELETE(id),
};

export function useAchievements() {
  return useCrudBase<
    AchievementResponse,
    AchievementPostRequest, 
    AchievementPatchRequest
  >(operations);
}
