import { useEffect, useState } from "react";
import { Food, FoodTag, foodTags } from "./foods.types";
import { Heading } from "./shared/Heading";
import { deleteFood, getFoods } from "./api/foods.service";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

  async function handleDelete(food: Food) {
    await deleteFood(food.id);
    // Remove the deleted food from the list of foods
    setFoods((prevFoods) => {
      return prevFoods.filter((f) => f.id !== food.id);
    });
    toast.error(`${food.name} deleted.`);
  }

  function renderFood(food: Food) {
    return (
      <div
        key={food.id}
        className="p-2 m-2 border rounded shadow-md bg-cyan-100 w-80"
      >
        <Heading tag="h2">
          <Link to={`/admin/${food.id}`}> {food.name}</Link>
        </Heading>
        <img
          src={`images/${food.image}`}
          alt={food.name}
          className="max-h-36"
        />
        <p>{food.description}</p>
        <p className="font-bold">${food.price}</p>
        <button
          aria-label={`Delete ${food.name}`}
          onClick={() => handleDelete(food)}
        >
          Delete
        </button>
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
