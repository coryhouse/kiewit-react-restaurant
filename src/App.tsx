import { Food, foods } from "./foods";

export function App() {
  function renderFood(food: Food) {
    return (
      <div
        key={food.id}
        className="p-2 m-2 bg-cyan-100 w-80 border rounded shadow-md"
      >
        <h2 className="text-xl font-bold">{food.name}</h2>
        <p>{food.description}</p>
        <p className="font-bold">${food.price}</p>
      </div>
    );
  }

  return (
    <>
      <h1>Menu</h1>
      <div className="flex flex-wrap">{foods.map(renderFood)}</div>
    </>
  );
}
