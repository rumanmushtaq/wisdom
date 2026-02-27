// lib/api/events.ts

export type ApiErrorPayload = {
  message: string;
  status?: number;
};

export const dispatchApiError = (payload: ApiErrorPayload) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<ApiErrorPayload>("api-error", {
        detail: payload,
      })
    );
  }
};
