export async function getFoods() {
  // TODO: How do we know we're getting the JSON back that we expect?
  // TODO: Show alternative to fetch
  // TODO: What about errors
  const resp = await fetch("http://localhost:3001/foods");
  return resp.json();
}
