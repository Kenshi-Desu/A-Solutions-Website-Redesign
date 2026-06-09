import { apiClient } from "../../api/index";
import { useCrudBase } from "./base/useCrudBase";

import {
  TestimonialResponse,
  TestimonialPostRequest,
  TestimonialPatchRequest,
} from "../../api/api-client";

const operations = {
  getAll: () => apiClient.testimonialsAll(),
  getById: (id: number) => apiClient.testimonialsGET(id),
  create: (body: TestimonialPostRequest) => apiClient.testimonialsPOST(body),
  update: (id: number, body: TestimonialPatchRequest) =>
    apiClient.testimonialsPATCH(id, body),
  remove: (id: number) => apiClient.testimonialsDELETE(id),
};

export function useTestimonials() {
  return useCrudBase<
    TestimonialResponse,
    TestimonialPostRequest,
    TestimonialPatchRequest
  >(operations);
}
