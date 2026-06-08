import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  AchievementResponse,
  AchievementPostRequest,
  AchievementPatchRequest,
} from "../../api/api-client";

export function useAchievements() {
  return useCrudBase<
    AchievementResponse,
    AchievementPostRequest,
    AchievementPatchRequest
  >({
    getAll: () => apiClient.achievementsAll(),
    getById: (id) => apiClient.achievementsGET(id),
    create: (body) => apiClient.achievementsPOST(body),
    update: (id, body) => apiClient.achievementsPATCH(id, body),
    remove: (id) => apiClient.achievementsDELETE(id),
  });
}
