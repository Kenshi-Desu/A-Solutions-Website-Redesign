import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  TeamMembersResponse,
  TeamMembersPostRequest,
  TeamMembersPatchRequest,
} from "../../api/api-client";

export function useTeamMemberss() {
  return useCrudBase<
    TeamMembersResponse,
    TeamMembersPostRequest,
    TeamMembersPatchRequest
  >({
    getAll: () => apiClient.teamMembersAll(),
    getById: (id) => apiClient.teamMembersGET(id),
    create: (body) => apiClient.teamMembersPOST(body),
    update: (id, body) => apiClient.teamMembersPATCH(id, body),
    remove: (id) => apiClient.teamMembersDELETE(id),
  });
}
