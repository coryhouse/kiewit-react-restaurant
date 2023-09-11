import { Food, foods } from "./foods";
import { Heading } from "./shared/Heading";

export function App() {
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
      <div className="flex flex-wrap">{foods.map(renderFood)}</div>
    </>
  );
}
