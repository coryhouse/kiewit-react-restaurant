import { useState } from "react";
import { Food, FoodTag, foodTags, foods } from "./foods";
import { Heading } from "./shared/Heading";

export function App() {
  const [tagFilter, setTagFilter] = useState<null | FoodTag>(null);

  function renderFood(food: Food) {
    return (
      <div
        key={food.id}
        className="p-2 m-2 bg-cyan-100 w-80 border rounded shadow-md"
      >
        <Heading tag="h2">{food.name}</Heading>
        <img
          src={`images/${food.image}`}
          alt={food.name}
          className="max-h-36"
        />
        <p>{food.description}</p>
        <p className="font-bold">${food.price}</p>
      </div>
    );
  }

  return (
    <>
      <Heading tag="h1">Menu</Heading>
      <label htmlFor="tag-filter">Filter by Tag</label>
      <br />
      <select
        value={tagFilter ?? ""}
        id="tag-filter"
        onChange={(e) => setTagFilter(e.target.value as FoodTag)}
      >
        <option value="">All</option>
        {foodTags.map((tag) => (
          <option key={tag}>{tag}</option>
        ))}
      </select>
      <div className="flex flex-wrap">{foods.map(renderFood)}</div>
    </>
  );
}
