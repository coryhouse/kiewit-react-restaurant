import { useState } from "react";
import { Heading } from "./shared/Heading";
import { NewFood } from "./foods.types";
import { Input } from "./shared/Input";
import { addFood } from "./api/foods.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const newFood: NewFood = {
  name: "",
  description: "",
  image: "",
  price: 0,
  tags: [],
};

const foodFormSchema = z.object({
  name: z.string().max(50),
  description: z.string().min(2).max(50),
  image: z.string(),
  price: z.number().min(1).max(100),
  tags: z.array(z.string()),
});

export function Admin() {
  const [food, setFood] = useState(newFood);

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFood((prevFood) => {
      return {
        ...prevFood,
        // Use the computed property syntax to set the property
        [event.target.id]:
          event.target.id === "price"
            ? parseInt(event.target.value, 10)
            : event.target.value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // validate input via zod
    const result = foodFormSchema.safeParse(food);
    if (!result.success) {
      toast.error("Invalid input");
      return;
    }
    await addFood(food);
    toast.success("Food added!");
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading tag="h1">Admin</Heading>
      <Input label="Name" id="name" value={food.name} onChange={handleChange} />

      <Input
        label="Description"
        id="description"
        value={food.description}
        onChange={handleChange}
      />

      <Input
        label="Price"
        id="price"
        type="number"
        value={food.price}
        onChange={handleChange}
      />

      <input className="block" type="submit" value="Add Food" />
    </form>
  );
}
