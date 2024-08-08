document.addEventListener('DOMContentLoaded', () => {
  const pet = {
    happiness: 50,
    hunger: 50,
    energy: 50,
  };

  const happinessEl = document.getElementById('happiness');
  const hungerEl = document.getElementById('hunger');
  const energyEl = document.getElementById('energy');

  const updatePetStats = () => {
    happinessEl.textContent = `Happiness: ${pet.happiness}`;
    hungerEl.textContent = `Hunger: ${pet.hunger}`;
    energyEl.textContent = `Energy: ${pet.energy}`;
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

  document.getElementById('feed').addEventListener('click', handleFeed);
  document.getElementById('play').addEventListener('click', handlePlay);
  document.getElementById('rest').addEventListener('click', handleRest);

  updatePetStats();
});
