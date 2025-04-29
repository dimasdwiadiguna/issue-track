import { $Enums, Status } from "@prisma/client";
import { z } from "zod";
import enumKeys from "./utils/enumKeys";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  status: z
    .enum(Object.values($Enums.Status) as [string, ...string[]])
    .optional(),
});
