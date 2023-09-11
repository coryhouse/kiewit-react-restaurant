import { z } from "zod";

export const foodTags = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
] as const;

export const foodTagsSchema = z.enum(foodTags);

export const foodSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  tags: z.array(foodTagsSchema),
});

export type Food = z.infer<typeof foodSchema>;
export type FoodTag = z.infer<typeof foodTagsSchema>;
