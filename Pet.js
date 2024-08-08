export default function Pet({ pet }) {
  return `
    <div id="pet">
      <img src="pet-image.png" alt="Virtual Pet" id="pet-image">
      <p id="happiness">Happiness: ${pet.happiness}</p>
      <p id="hunger">Hunger: ${pet.hunger}</p>
      <p id="energy">Energy: ${pet.energy}</p>
    </div>
  `;
}
