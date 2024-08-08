document.addEventListener('DOMContentLoaded', () => {
  const pet = {
    happiness: 50,
    hunger: 50,
    energy: 50,
  };

  const updatePetStats = () => {
    document.getElementById('pet').innerHTML = `
      <img src="pet-image.png" alt="Virtual Pet">
      <p>Happiness: ${pet.happiness}</p>
      <p>Hunger: ${pet.hunger}</p>
      <p>Energy: ${pet.energy}</p>
    `;
  };

  const handleFeed = () => {
    pet.hunger = Math.max(0, pet.hunger - 10);
    pet.happiness = Math.min(100, pet.happiness + 5);
    updatePetStats();
  };

  const handlePlay = () => {
    pet.energy = Math.max(0, pet.energy - 15);
    pet.happiness = Math.min(100, pet.happiness + 10);
    updatePetStats();
  };

  const handleRest = () => {
    pet.energy = Math.min(100, pet.energy + 20);
    pet.happiness = Math.max(0, pet.happiness - 5);
    updatePetStats();
  };

  document.getElementById('controls').innerHTML = `
    <button onclick="handleFeed()">Feed</button>
    <button onclick="handlePlay()">Play</button>
    <button onclick="handleRest()">Rest</button>
  `;

  updatePetStats();
});
