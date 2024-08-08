export default function Stats({ pet }) {
  return `
    <div id="stats">
      <p>Happiness: ${pet.happiness}</p>
      <p>Hunger: ${pet.hunger}</p>
      <p>Energy: ${pet.energy}</p>
    </div>
  `;
}
