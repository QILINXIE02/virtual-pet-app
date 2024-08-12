document.addEventListener('DOMContentLoaded', () => {
  const pets = {
    dog: { happiness: 50, hunger: 50, energy: 50, image: 'dog.png' },
    cat: { happiness: 50, hunger: 50, energy: 50, image: 'cat.png' },
    dragon: { happiness: 50, hunger: 50, energy: 50, image: 'dragon.png' },
  };

  let currentPet = pets.dog;

  const petImageEl = document.getElementById('pet-image');
  const happinessEl = document.getElementById('happiness');
  const hungerEl = document.getElementById('hunger');
  const energyEl = document.getElementById('energy');

  const updatePetStats = () => {
    happinessEl.textContent = `Happiness: ${currentPet.happiness}`;
    hungerEl.textContent = `Hunger: ${currentPet.hunger}`;
    energyEl.textContent = `Energy: ${currentPet.energy}`;
  };

  const handleFeed = () => {
    currentPet.hunger = Math.max(0, currentPet.hunger - 10);
    currentPet.happiness = Math.min(100, currentPet.happiness + 5);
    updatePetStats();
  };

  const handlePlay = () => {
    currentPet.energy = Math.max(0, currentPet.energy - 15);
    currentPet.happiness = Math.min(100, currentPet.happiness + 10);
    updatePetStats();
  };

  const handleRest = () => {
    currentPet.energy = Math.min(100, currentPet.energy + 20);
    currentPet.happiness = Math.max(0, currentPet.happiness - 5);
    updatePetStats();
  };

  const handlePetSelection = () => {
    const petType = document.getElementById('pet-type').value;
    currentPet = pets[petType];
    petImageEl.src = currentPet.image;
    updatePetStats();
  };

  document.getElementById('feed').addEventListener('click', handleFeed);
  document.getElementById('play').addEventListener('click', handlePlay);
  document.getElementById('rest').addEventListener('click', handleRest);
  document.getElementById('choose-pet').addEventListener('click', handlePetSelection);

  updatePetStats();

  // Mini-Games
  document.getElementById('math-quiz').addEventListener('click', () => {
    const answer = prompt('What is 5 + 3?');
    if (answer == '8') {
      currentPet.happiness += 5;
      updatePetStats();
      alert('Correct! Pet is happier.');
    } else {
      alert('Wrong answer! Try again.');
    }
  });

  document.getElementById('vocabulary-game').addEventListener('click', () => {
    const answer = prompt('What is the synonym of "happy"?');
    if (answer.toLowerCase() == 'joyful') {
      currentPet.happiness += 5;
      updatePetStats();
      alert('Correct! Pet is happier.');
    } else {
      alert('Wrong answer! Try again.');
    }
  });

  // Social Sharing
  document.getElementById('share-button').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Virtual Pet',
        text: `Check out my pet! Happiness: ${currentPet.happiness}, Hunger: ${currentPet.hunger}, Energy: ${currentPet.energy}.`,
        url: window.location.href,
      });
    } else {
      alert('Sharing not supported in this browser.');
    }
  });
});
