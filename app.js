document.addEventListener('DOMContentLoaded', () => {
  const pets = {
    dog: { happiness: 50, hunger: 50, energy: 50, image: 'dog.png' },
    cat: { happiness: 50, hunger: 50, energy: 50, image: 'cat.png' },
    dragon: { happiness: 50, hunger: 50, energy: 50, image: 'dragon.png' },
  };

  let currentPet = pets.dog;
  let coins = 100;

  const petImageEl = document.getElementById('pet-image');
  const happinessEl = document.getElementById('happiness');
  const hungerEl = document.getElementById('hunger');
  const energyEl = document.getElementById('energy');
  const adventureOutputEl = document.getElementById('adventure-output');

  const updatePetStats = () => {
    happinessEl.textContent = `Happiness: ${currentPet.happiness}`;
    hungerEl.textContent = `Hunger: ${currentPet.hunger}`;
    energyEl.textContent = `Energy: ${currentPet.energy}`;
  };

  const showModal = (title, message) => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = 'block';

    document.querySelector('.close').onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  };

  const handleFeed = () => {
    currentPet.hunger = Math.max(0, currentPet.hunger - 10);
    currentPet.happiness = Math.min(100, currentPet.happiness + 5);
    updatePetStats();
    showModal('Feeding', 'You have fed your pet!');
  };

  const handlePlay = () => {
    currentPet.energy = Math.max(0, currentPet.energy - 15);
    currentPet.happiness = Math.min(100, currentPet.happiness + 10);
    updatePetStats();
    showModal('Playtime', 'You played with your pet!');
  };

  const handleRest = () => {
    currentPet.energy = Math.min(100, currentPet.energy + 20);
    currentPet.happiness = Math.max(0, currentPet.happiness - 5);
    updatePetStats();
    showModal('Resting', 'Your pet is resting.');
  };

  const handlePetSelection = () => {
    const petType = document.getElementById('pet-type').value;
    currentPet = pets[petType];
    petImageEl.src = currentPet.image;
    updatePetStats();
    showModal('Pet Selected', `You have selected a ${petType}!`);
  };

  const initializeApp = () => {
    const userName = prompt('Welcome! Please enter your name:');
    if (userName) {
      const petType = prompt('Choose a pet: Dog, Cat, or Dragon').toLowerCase();
      if (pets[petType]) {
        currentPet = pets[petType];
        petImageEl.src = currentPet.image;
        updatePetStats();
        document.title = `${userName}'s Virtual Pet App`;
        showModal('Welcome', `Hello, ${userName}! You have selected a ${petType}. Enjoy the app!`);
      } else {
        showModal('Error', 'Invalid pet type selected. Defaulting to Dog.');
        document.title = `${userName}'s Virtual Pet App`;
      }
    } else {
      showModal('Error', 'No name provided. Using default name.');
    }
  };

  document.getElementById('feed').addEventListener('click', handleFeed);
  document.getElementById('play').addEventListener('click', handlePlay);
  document.getElementById('rest').addEventListener('click', handleRest);
  document.getElementById('choose-pet').addEventListener('click', handlePetSelection);

  updatePetStats();
  initializeApp();

  // Mini-Games
  document.getElementById('math-quiz').addEventListener('click', () => {
    const answer = prompt('What is 5 + 3?');
    if (answer == '8') {
      currentPet.happiness += 5;
      updatePetStats();
      showModal('Math Quiz', 'Correct! Pet is happier.');
    } else {
      showModal('Math Quiz', 'Wrong answer! Try again.');
    }
  });

  document.getElementById('vocabulary-game').addEventListener('click', () => {
    const answer = prompt('What is the synonym of "happy"?');
    if (answer.toLowerCase() == 'joyful') {
      currentPet.happiness += 5;
      updatePetStats();
      showModal('Vocabulary Game', 'Correct! Pet is happier.');
    } else {
      showModal('Vocabulary Game', 'Wrong answer! Try again.');
    }
  });

  // Story Mode
  document.getElementById('start-adventure').addEventListener('click', () => {
    const scenarios = [
      {
        story: "You encounter a river. Do you want to cross it or go around?",
        options: ["Cross", "Go Around"],
        outcomes: {
          Cross: { text: "The river was shallow. You crossed easily.", happiness: 10, energy: -5 },
          "Go Around": { text: "It took longer, but you stayed safe.", happiness: 5, energy: -10 },
        },
      },
      {
        story: "A wild animal appears! Do you want to fight or run?",
        options: ["Fight", "Run"],
        outcomes: {
          Fight: { text: "You defeated the animal. Your pet is proud!", happiness: 15, energy: -20 },
          Run: { text: "You escaped safely, but your pet is scared.", happiness: -5, energy: 10 },
        },
      },
    ];

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const choice = prompt(`${scenario.story} (${scenario.options.join(" / ")})`);
    const outcome = scenario.outcomes[choice];

    if (outcome) {
      adventureOutputEl.textContent = outcome.text;
      currentPet.happiness = Math.min(100, currentPet.happiness + outcome.happiness);
      currentPet.energy = Math.max(0, currentPet.energy + outcome.energy);
      updatePetStats();
      showModal('Adventure Result', outcome.text);
    } else {
      adventureOutputEl.textContent = "Invalid choice. The adventure ends.";
      showModal('Adventure Result', "Invalid choice. The adventure ends.");
    }
  });

  // Pet Accessories
  document.getElementById('buy-hat').addEventListener('click', () => {
    if (coins >= 10) {
      coins -= 10;
      showModal('Accessory Purchased', "Hat purchased! Your pet looks stylish.");
    } else {
      showModal('Accessory Purchase Failed', "Not enough coins!");
    }
  });

  document.getElementById('buy-glasses').addEventListener('click', () => {
    if (coins >= 15) {
      coins -= 15;
      showModal('Accessory Purchased', "Glasses purchased! Your pet looks cool.");
    } else {
      showModal('Accessory Purchase Failed', "Not enough coins!");
    }
  });

  // Social Sharing
  document.getElementById('share-button').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my virtual pet!',
        text: `My pet is so happy with a happiness level of ${currentPet.happiness}!`,
        url: window.location.href,
      }).then(() => {
        showModal('Shared!', 'Your pet was shared successfully!');
      }).catch((error) => {
        showModal('Sharing Failed', `Could not share: ${error}`);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      const shareUrl = `https://twitter.com/intent/tweet?text=Check out my virtual pet! Happiness level: ${currentPet.happiness} &url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  });
});
