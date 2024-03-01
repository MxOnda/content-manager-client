import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const newContentSchema = z.object({
  socialNetwork: z.string().min(1),
  caption: z.string(),
  type: z.string().min(1),
  isScheduled: z.boolean(),
  scheduledAt: z.string().optional(),
  file: z.instanceof(File),
  socialNetworkId: z.string().uuid(),
});

export type NewContentFormValues = z.infer<typeof newContentSchema>;

export const resolver = zodResolver(newContentSchema);
