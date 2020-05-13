const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

// console.log(currentState);

const textNodes = [
  {
    id: 1,
    text:
      'You wake up on a pile of hay in a cart drawn by a horse. Looks like you approach a village. As you look around, you notice a ring laying nearby',
    options: [
      {
        text: 'Steal the ring',
        setState: { ring: true },
        nextText: 2,
      },
      {
        text: 'Give it to the driver',
        nextText: 1.5,
      },
    ],
  },
  {
    id: 1.1,
    text:
      'You seem to be living in Deja Vu. You woke up once again in a cart. Was your golden chest and wife just a weird dream? Golden ring lays beside you',
    options: [
      {
        text: 'Steal the ring once again',
        nextText: 1.12,
      },
      {
        text: 'Give it to the driver',
        nextText: 1.5,
      },
    ],
  },
  {
    id: 1.12,
    text:
      'You became a golum from Lord of the Rings and 2 hobbits are now chasing you',
    options: [
      {
        text: 'Thanks for playing this little game! No more hidden easter eggs after this point',
        nextText: 1.13,
      }
    ]
  },
  {
    id: 1.13,
    text:
     'Nope. Just go away',
    options: [
      {
        text: 'Aaaand back to the loop',
        nextText: 1,
      },
    ],
  },
  {
    id: 1.5,
    text: `driver thanks you and gives you a golden coin`,
    options: [
      {
        text: 'You leave the cart',
        setState: { gold: true },
        nextText: 2,
      },
    ],
  },

  {
    id: 2,
    text:
      'You are in the village. You see a dangerous looking castle and a inn',
    options: [
      {
        text: 'Go and explore the castle',
        nextText: 3.6,
      },
      {
        text: 'Ask for help in an inn',
        nextText: 3,
      },
    ],
  },

  {
    id: 3,
    text: 'You want to buy a Weapon but you have to somehow pay for it',
    options: [
      {
        text: 'Pay with the gold',
        requiredState: (currentState) => currentState.gold,
        setState: { gold: false, sword: true },
        nextText: 4,
      },
      {
        text: 'Try to pay with the ring',
        requiredState: (currentState) => currentState.ring,
        setState: { ring: false },
        nextText: 3.2,
      },
      {
        text: 'Can i have the weapon for free?',
        nextText: 3.3,
      },
    ],
  },

  {
    id: 3.2,
    text:
      'You are the one stealing from good people? You are banished and should never come back to this village',
    options: [
      {
        text: 'Better luck next time',
        nextText: -1,
      },
    ],
  },
  {
    id: 3.3,
    text: 'You are funny guy but no, no way',
    options: [
      {
        text: 'URGHHHHHH',
        nextText: 3,
      },
    ],
  },
  {
    id: 3.6,
    text: 'You explored the castle but died easily without proper weapon',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },

  {
    id: 4,
    text: 'You now have a proper weapon to fight in Castle!',
    options: [
      {
        text: 'Venture the Castle',
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text:
      'Your story ends here. You find a chest with lots of gold. You buy a house, marry and have lots of children',
    options: [
      {
        text: 'Do you want to restart the game (for some reason?)',
        nextText: 1.1,
      },
    ],
  },
];

startGame();
