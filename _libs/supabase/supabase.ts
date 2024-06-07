import { Database } from "./types"

export type Row<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type InsertDto<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]
export type UpdateDto<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]

export const FACTS_TABLE = "facts"
export const ALTERNATIVES_TABLE = "alternatives"
export const LOGS_TABLE = "logs"
