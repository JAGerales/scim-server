import { z } from 'zod';

export const bambooUserSchema = z.object({
  id: z.string(),
  employeeNumber: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable().optional(), // allows null
  workEmail: z.string().nullable().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  location: z.string().nullable().optional(),
  mobilePhone: z.string().nullable().optional(),
  supervisor: z.string().nullable().optional(),
  division: z.string().nullable().optional(),
  linkedIn: z.string().nullable().optional(),
  pronouns: z.string().nullable().optional(), // allows null
  photoUploaded: z.boolean().optional(),
  photoUrl: z.string().url().nullable().optional().or(z.literal("")),
  canUploadPhoto: z.union([z.boolean(), z.number()]).optional() // allows 1/0
});

// LINKED IN URL VALIDATION ( TEST )