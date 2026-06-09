import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  TeamMembersResponse,
  TeamMembersPostRequest,
  TeamMembersPatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.teamMembersAll(),
  getById: (id: number) => apiClient.teamMembersGET(id),
  create: (body: TeamMembersPostRequest) => apiClient.teamMembersPOST(body),
  update: (id: number, body: TeamMembersPatchRequest) =>
    apiClient.teamMembersPATCH(id, body),
  remove: (id: number) => apiClient.teamMembersDELETE(id),
};

export function useTeamMemberss() {
  return useCrudBase<
    TeamMembersResponse,
    TeamMembersPostRequest,
    TeamMembersPatchRequest
  >(operations);
}
