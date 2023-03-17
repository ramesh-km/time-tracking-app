import http from "../http";

export async function getTags() {
  const res = await http.get("/tags");
  return res.data;
}

