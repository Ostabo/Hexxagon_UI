import { SERVER_URL } from "@/main";

export function apiPost(action) {
  return fetch(`http://${SERVER_URL}/` + action, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: "",
  });
}
export function apiGet(action) {
  return fetch(`http://${SERVER_URL}/` + action, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
}
