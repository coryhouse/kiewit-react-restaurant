import { useEffect, useState } from "react";
import { Heading } from "./shared/Heading";
import { NewFood } from "./foods.types";
import { Input } from "./shared/Input";
import { addFood, getFood } from "./api/foods.service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const newFood: NewFood = {
  name: "",
  description: "",
  image: "",
  price: 0,
  tags: [],
};

const foodFormSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(2).max(50),
  image: z.string(),
  price: z.number().min(1).max(100),
  tags: z.array(z.string()),
});

type Status = "idle" | "submitting" | "submitted";

export function Admin() {
  const [food, setFood] = useState(newFood);
  const [status, setStatus] = useState<Status>("idle");

  const navigate = useNavigate();
  const { foodId } = useParams();

  // Derive state
  const isEditing = Boolean(foodId);

  useEffect(() => {
    async function fetchFood() {
      if (!foodId) return;
      // TODO: Use Zod to validate the foodId is a number
      const foodResponse = await getFood(Number(foodId));
      setFood(foodResponse);
    }

    fetchFood();
  }, [foodId]);

  // Validate the form on every render (every keystroke)
  const result = foodFormSchema.safeParse(food);

  function getFieldError(field: string) {
    return (
      !result.success &&
      result.error.issues.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (issue: any) => issue.path[0] === field
      )?.message
    );
  }

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
    setStatus("submitting");
    // validate input via zod
    if (!result.success) {
      setStatus("submitted");
      toast.error("Invalid input");
      return;
    }
    await addFood(food);
    toast.success("Food added!");
    navigate("/");
  }

  const formIsSubmitted = status === "submitted";

  return (
    <form onSubmit={handleSubmit}>
      <Heading tag="h1">Admin</Heading>
      <Input
        label="Name"
        id="name"
        value={food.name}
        onChange={handleChange}
        error={getFieldError("name")}
        formIsSubmitted={formIsSubmitted}
      />

      <Input
        label="Description"
        id="description"
        value={food.description}
        onChange={handleChange}
        error={getFieldError("description")}
        formIsSubmitted={formIsSubmitted}
      />

      <Input
        label="Price"
        id="price"
        type="number"
        value={food.price}
        onChange={handleChange}
        error={getFieldError("price")}
        formIsSubmitted={formIsSubmitted}
      />

      <input
        className="block"
        type="submit"
        value={`${isEditing ? "Save" : "Add"} Food`}
      />
    </form>
  );
}
