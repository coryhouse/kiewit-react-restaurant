import { useEffect, useState } from "react";
import { Heading } from "./shared/Heading";
import { Food, NewFood } from "./foods.types";
import { Input } from "./shared/Input";
import { addFood, editFood, getFood } from "./api/foods.service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Spinner } from "./shared/Spinner";

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
  const navigate = useNavigate();
  const { foodId } = useParams();
  // Derive state
  const isEditing = Boolean(foodId);

  const [food, setFood] = useState<NewFood | Food>(newFood);
  const [status, setStatus] = useState<Status>("idle");
  const [isLoadingFood, setIsLoadingFood] = useState(isEditing);

  useEffect(() => {
    async function fetchFood() {
      if (!foodId) return;
      // TODO: Use Zod to validate the foodId is a number
      const foodResponse = await getFood(Number(foodId));
      setFood(foodResponse);
      setIsLoadingFood(false);
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
    if (status === "submitting") return; // Don't allow multiple submits
    setStatus("submitting");
    // validate input via zod
    if (!result.success) {
      setStatus("submitted");
      toast.error("Invalid input");
      return;
    }

    // Narrow the type by checking for the presence of an id property
    "id" in food ? await editFood(food) : await addFood(food);

    toast.success("Food added!");
    navigate("/");
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
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
          aria-disabled={!result.success}
          value={`${isEditing ? "Save" : "Add"} Food`}
        />{" "}
        {status === "submitting" && <Spinner />}
      </form>
    );
  }

  const formIsSubmitted = status === "submitted";

  return (
    <>
      <Heading tag="h1">Admin</Heading>
      {isLoadingFood ? <Spinner /> : renderForm()}
    </>
  );
}
