import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

export const newSocialNetworkSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(8),
  socialNetwork: z.string().min(1),
});

export type NewSocialNetworkFormValues = z.infer<typeof newSocialNetworkSchema>;

export const resolver = zodResolver(newSocialNetworkSchema);
