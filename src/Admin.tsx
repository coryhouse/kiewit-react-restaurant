import { Heading } from "./shared/Heading";

export function Admin() {
  return (
    <form>
      <Heading tag="h1">Admin</Heading>
      <label className="block" htmlFor="name">
        Name
      </label>
      <input className="mb-2" id="name" type="text" />

      <label className="block" htmlFor="description">
        Description
      </label>
      <input className="mb-2" id="description" type="text" />

      <input className="block" type="button" value="Add Food" />
    </form>
  );
}
