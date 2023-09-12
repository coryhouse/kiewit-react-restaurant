import { useState } from "react";
import { Heading } from "./shared/Heading";
import { NewFood } from "./foods.types";
import { Input } from "./shared/Input";
import { addFood } from "./api/foods.service";
import toast from "react-hot-toast";

const newFood: NewFood = {
  name: "",
  description: "",
  image: "",
  price: 0,
  tags: [],
};

export function Admin() {
  const [food, setFood] = useState(newFood);

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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addFood(food);
        toast.success("Food added!");
      }}
    >
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
