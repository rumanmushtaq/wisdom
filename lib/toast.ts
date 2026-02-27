export type ToastPayload = {
  variant?: string;
  title?: string;
  description?: string;
};

function encodePayload(payload: string) {
  if (typeof window === "undefined") {
    // server (Node)
    // Buffer is available in Node environments
    return Buffer.from(payload).toString("base64");
  } else {
    // client
    return btoa(payload);
  }
}

function decodePayload(encoded?: string) {
  if (!encoded) return null;
  try {
    if (typeof window === "undefined") {
      return JSON.parse(Buffer.from(encoded, "base64").toString());
    } else {
      return JSON.parse(atob(encoded));
    }
  } catch {
    return null;
  }
}

/**
 * Dispatches a client-side toast event when run in the browser.
 * When run on the server it returns an object containing a header
 * you can attach to a Response (e.g. { headers: getToastHeader(...) })
 */
export function showToast(payload: ToastPayload) {
  if (
    typeof window !== "undefined" &&
    typeof window.dispatchEvent === "function"
  ) {
    window.dispatchEvent(new CustomEvent("api-error", { detail: payload }));
    return;
  }

  // Server-side: return a header containing the toast payload (base64 encoded)
  const headerValue = encodePayload(JSON.stringify(payload));
  return { "x-toast": headerValue };
}

export function getToastHeader(payload: ToastPayload) {
  const headerValue = encodePayload(JSON.stringify(payload));
  return { "x-toast": headerValue };
}

export function parseToastHeader(headerValue?: string): ToastPayload | null {
  return decodePayload(headerValue) as ToastPayload | null;
}
