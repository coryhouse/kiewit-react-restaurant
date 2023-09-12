import { useEffect, useState } from "react";
import { Food, FoodTag, foodTags } from "./foods.types";
import { Heading } from "./shared/Heading";
import { getFoods } from "./api/foods.service";

export function Menu() {
  const [tagFilter, setTagFilter] = useState<null | FoodTag>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const getFoodsResp = await getFoods();
      setFoods(getFoodsResp);
    }
    fetchFoods();
  }, []);

  // Derived state
  const filteredFoods = foods.filter((food) => {
    return tagFilter ? food.tags.includes(tagFilter) : true;
  });

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
      {tagFilter && (
        <p>
          {filteredFoods.length} food{filteredFoods.length > 1 && "s"} found.
        </p>
      )}
      <div className="flex flex-wrap">{filteredFoods.map(renderFood)}</div>
    </>
  );
}
