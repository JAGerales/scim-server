import {z} from 'zod';

export const bambooUserSchema = z.object({
    employeeId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    workEmail: z.string().email(),
    jobTitle: z.string().optional(),
    department: z.string().optional(),
});