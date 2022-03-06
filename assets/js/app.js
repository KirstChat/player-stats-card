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
          setPlayerImg(imgPath);
          setPlayerDetails(playerName, playerPosition);
          setPlayerStats(stats);
        }
      });
    });
  });
};

getPlayers();

// Player Image
const setPlayerImg = imgPath => {
  playerImg.setAttribute('src', `assets/images/p${imgPath}.png`);
};

// Update UI with player name and position
const setPlayerDetails = (playerName, playerPosition) => {
  playerStats.querySelector(
    'h1'
  ).textContent = `${playerName.first} ${playerName.last}`;

  const positionInfo = playerPosition.positionInfo.split(' ');
  playerStats.querySelector('.position').textContent = `${
    positionInfo[positionInfo.length - 1]
  }`;
};

// Update UI with player stats
const setPlayerStats = stats => {
  stats.forEach(stat => {
    console.log(stat.name, stat.value);

    // if(stat.name === )
  });
};

// Display list of players when menu is clicked
dropdownBtn.addEventListener('click', () => {
  dropdownList.classList.toggle('hidden');
});
