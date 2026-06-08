import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  TestimonialResponse,
  TestimonialPostRequest,
  TestimonialPatchRequest,
} from "../../api/api-client";

export function useTestimonials() {
  return useCrudBase<
    TestimonialResponse,
    TestimonialPostRequest,
    TestimonialPatchRequest
  >({
    getAll: () => apiClient.testimonialsAll(),
    getById: (id) => apiClient.testimonialsGET(id),
    create: (body) => apiClient.testimonialsPOST(body),
    update: (id, body) => apiClient.testimonialsPATCH(id, body),
    remove: (id) => apiClient.testimonialsDELETE(id),
  });
}
