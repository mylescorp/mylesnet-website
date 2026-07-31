import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
  location: z.string().trim().min(2, "Enter your city or area.").max(140),
  message: z.string().trim().min(5, "Tell us how we can help.").max(2000),
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
