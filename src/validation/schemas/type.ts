import {z} from 'zod';

// Define the member schema
export const memberSchema = z.object({
  name: z.string(),
  age: z.number(),
  secretIdentity: z.string(),
  powers: z.array(z.string()),
});

// Define the main schema
export const squadSchema = z.object({
  squadName: z.string(),
  homeTown: z.string(),
  formed: z.number(),
  secretBase: z.string(),
  active: z.boolean(),
  members: z.array(memberSchema),
});

// Define types
export type Member = z.infer<typeof memberSchema>;
export type Squad = z.infer<typeof squadSchema>;

/**
  To validate the data against the schema
  try {
    squadSchema.parse(data);
    console.log("Data is valid.");
  } catch (error) {
    console.error("Data is invalid:", error.errors);
  }
*/
