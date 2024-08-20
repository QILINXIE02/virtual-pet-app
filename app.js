document.addEventListener('DOMContentLoaded', () => {
  const pets = {
    dog: { happiness: 50, hunger: 50, energy: 50, image: 'dog.png' },
    cat: { happiness: 50, hunger: 50, energy: 50, image: 'cat.png' },
    dragon: { happiness: 50, hunger: 50, energy: 50, image: 'dragon.png' },
  };

  let currentPet = pets.dog;
  let coins = 100;
  let userName = '';

  const petImageEl = document.getElementById('pet-image');
  const happinessEl = document.getElementById('happiness');
  const hungerEl = document.getElementById('hunger');
  const energyEl = document.getElementById('energy');
  const adventureOutputEl = document.getElementById('adventure-output');
  const userNameEl = document.createElement('p');
  userNameEl.id = 'user-name';
  document.getElementById('app').insertBefore(userNameEl, document.getElementById('pet'));

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
    userName = prompt('Welcome! Please enter your name:');
    if (userName) {
      const petType = prompt('Choose a pet: Dog, Cat, or Dragon').toLowerCase();
      if (pets[petType]) {
        currentPet = pets[petType];
        petImageEl.src = currentPet.image;
        updatePetStats();
        document.title = `${userName}'s Virtual Pet App`;
        userNameEl.textContent = `Welcome, ${userName}!`;
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

  document.getElementById('math-quiz').addEventListener('click', () => {
    const answer = prompt('What is 2 + 2?');
    if (answer === '4') {
      currentPet.happiness += 5;
      updatePetStats();
      showModal('Math Quiz', 'Correct! Pet is happier.');
    } else {
      showModal('Math Quiz', 'Wrong answer! Try again.');
    }
  });

  document.getElementById('vocabulary-game').addEventListener('click', () => {
    const word = prompt('What is the opposite of "hot"?');
    if (word.toLowerCase() === 'cold') {
      currentPet.happiness += 5;
      updatePetStats();
      showModal('Vocabulary Game', 'Correct! Pet is happier.');
    } else {
      showModal('Vocabulary Game', 'Wrong answer! Try again.');
    }
  });

  document.getElementById('start-adventure').addEventListener('click', () => {
    const adventures = ['Explored a magical forest!', 'Found a hidden treasure!', 'Met a friendly dragon!'];
    const adventure = adventures[Math.floor(Math.random() * adventures.length)];
    adventureOutputEl.textContent = `Adventure Result: ${adventure}`;
  });

  document.getElementById('buy-hat').addEventListener('click', () => {
    if (coins >= 10) {
      coins -= 10;
      showModal('Purchase', 'You bought a hat!');
    } else {
      showModal('Purchase', 'Not enough coins!');
    }
  });

  document.getElementById('buy-glasses').addEventListener('click', () => {
    if (coins >= 15) {
      coins -= 15;
      showModal('Purchase', 'You bought glasses!');
    } else {
      showModal('Purchase', 'Not enough coins!');
    }
  });

  document.getElementById('share-button').addEventListener('click', () => {
    alert('Sharing your pet on social media!');
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌕' : '🌙';
  });

  // Initialize app with user name and default pet selection
  initializeApp();
});
