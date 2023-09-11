import { z } from "zod";
import { Food, foodSchema } from "../foods.types";

export async function getFoods(): Promise<Food[]> {
  // TODO: Show alternative to fetch
  // TODO: What about errors?
  const resp = await fetch("http://localhost:3001/foods");
  const foods = await resp.json();
  const foodResponseSchema = z.array(foodSchema);
  // If the JSON doesn't match the schema, we'll get a runtime error.
  return foodResponseSchema.parse(foods);
}
