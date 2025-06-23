import { z } from 'zod';

export const bambooUserSchema = z.object({
  id: z.string(),
  displayName: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  preferredName: z.string().nullable().optional(), // ✅ allows null
  jobTitle: z.string().optional(),
  mobilePhone: z.string().optional(),
  workEmail: z.string().email(),
  department: z.string().optional(),
  location: z.string().optional(),
  division: z.string().optional(),
  linkedIn: z.string().url().optional(),
  pronouns: z.string().nullable().optional(), // ✅ allows null
  supervisor: z.string().optional(),
  photoUploaded: z.boolean().optional(),
  photoUrl: z.string().url().optional(),
  canUploadPhoto: z.union([z.boolean(), z.number()]).optional() // ✅ allows 1/0 or true/false
});
