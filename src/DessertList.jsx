import Dessert from "./Dessert";
export default function DessertList({ data }) {
  // Implement the component here.
  const filteredData = data.filter(({ calories }) => calories < 500);
  const sortedData = filteredData.sort(
    ({ calories: a }, { calories: b }) => a - b
  );
  return (
    <>
      {sortedData.map((dessert, index) => {
        const { name, calories } = dessert;
        const dessertItem = `${name} - ${calories}`;
        return <Dessert key={index} dessertItem={dessertItem} />;
      })}
    </>
  );
}
