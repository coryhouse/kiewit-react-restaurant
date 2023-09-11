import { z } from "zod";
import { Food, foodSchema } from "../foods.types";
import ky from "ky";

export async function getFoods(): Promise<Food[]> {
  // TODO: What about errors?
  const foods = await ky("http://localhost:3001/foods").json();
  const foodResponseSchema = z.array(foodSchema);
  // If the JSON doesn't match the schema, we'll get a runtime error.
  return foodResponseSchema.parse(foods);
}
