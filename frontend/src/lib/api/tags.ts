import { Tag, TagWithCount } from "../../types/tags";
import http from "../http";

export async function getAllTagsWithCount() {
  const res = await http.get<TagWithCount[]>("/tag/all-with-count");
  return res.data;
}

export async function getAllTags() {
  const res = await http.get<Tag[]>("/tag/all");
  return res.data;
}

export async function deleteTag(name: string) {
  await http.delete(`/tag/${encodeURIComponent(name)}`);
}

export async function createTag(name: string) {
  const res = await http.post<Tag>("/tag", { name });
  return res.data;
}
