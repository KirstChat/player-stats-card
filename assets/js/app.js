const dropdownBtn = document.querySelector('.dropdown__btn');
const dropdownText = document.querySelector('.dropdown__text');
const dropdownList = document.querySelector('.dropdown__list');
const playerProfile = document.querySelector('.player__profile');
const playerImg = document.querySelector('.player');
const playerStats = document.querySelector('.player-stats');

// Get data from player-stats.json
const getData = async () => {
  const res = await fetch('../../data/player-stats.json');
  const data = await res.json();

  return data;
};

// Create a list of player names
const getPlayers = () => {
  getData().then(data => {
    const { players } = data;

    players.forEach(player => {
      const playerName = player.player.name;
      const playerPosition = player.player.info;
      const imgPath = player.player.id;
      const stats = player.stats;
      const li = document.createElement('li');

      li.textContent = `${playerName.first} ${playerName.last}`;
      li.classList.add('box--grey');
      dropdownList.appendChild(li);

      // Add click event to player name
      li.addEventListener('click', e => {
        dropdownText.textContent = e.target.textContent;
        dropdownList.classList.add('hidden');
        playerProfile.classList.remove('hidden');

        if (dropdownText.textContent === li.textContent) {
          setPlayerImg(imgPath, playerName);
          setPlayerDetails(playerName, playerPosition);
          setPlayerStats(stats);
        }
      });
    });
  });
};

getPlayers();

// Set player image
const setPlayerImg = (imgPath, playerName) => {
  playerImg.setAttribute('src', `assets/images/p${imgPath}.png`);
  playerImg.setAttribute('alt', `${playerName.first} ${playerName.last}`);
};

// Update UI with player name and position
const setPlayerDetails = (playerName, playerPosition) => {
  playerStats.querySelector(
    'h1'
  ).textContent = `${playerName.first} ${playerName.last}`;

  // Return last word in the string
  const positionInfo = playerPosition.positionInfo.split(' ');
  playerStats.querySelector('.position').textContent = `${
    positionInfo[positionInfo.length - 1]
  }`;
};

// Update UI with player stats
const setPlayerStats = stats => {
  stats.forEach(stat => {
    if (stat.name === 'appearances') {
      playerStats.querySelector('#appearances').textContent = `${stat.value}`;
    }

    if (stat.name === 'goals') {
      playerStats.querySelector('#goals').textContent = `${stat.value}`;
    }

    if (stat.name === 'goal_assist') {
      playerStats.querySelector('#goal_assist').textContent = `${stat.value}`;
    }
  });
  // const fwdPass = stats.filter(stat => {
  //   if ((stat.name = 'fwd_pass')) {
  //     return stat.value;
  //   }
  // });
  // console.log(fwdPass);
};

// passes per minute = fwd + bck / mins_played
// goals = goals / appearances

// Display list of players when menu is clicked
dropdownBtn.addEventListener('click', () => {
  dropdownList.classList.toggle('hidden');
});
