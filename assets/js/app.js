const dropdownBtn = document.querySelector('.dropdown__btn');
const dropdownText = document.querySelector('.dropdown__text');
const dropdownList = document.querySelector('.dropdown__list');
const playerProfile = document.querySelector('.player');
const playerImg = document.querySelector('.player__img');
const playerBadge = document.querySelector('.player__badge');
const playerStats = document.querySelector('.player__details');

let appearances;
let goals;
let fwdPass;
let backwardPass;
let minsPlayed;

// Fetch raw json data from github repo
const getData = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/KirstChat/player-stats-card/master/data/player-stats.json'
  );
  const data = await res.json();

  return data;
};

// Create a list of player names from fetched data
const getPlayers = () => {
  getData().then(data => {
    const { players } = data;

    // Loop through player names and create a new li element for each name
    players.forEach(player => {
      const playerName = player.player.name;
      const playerPosition = player.player.info;
      const imgPath = player.player.id;
      const teamName = player.player.currentTeam;
      const stats = player.stats;
      const li = document.createElement('li');

      li.textContent = `${playerName.first} ${playerName.last}`;
      li.classList.add('box--grey');
      dropdownList.appendChild(li);

      // Add click event to player name and update UI with player details/stats
      li.addEventListener('click', e => {
        dropdownText.textContent = e.target.textContent;
        dropdownList.classList.add('hidden');
        playerProfile.classList.remove('hidden');

        if (dropdownText.textContent === li.textContent) {
          setPlayerImg(imgPath, playerName);
          setBadge(teamName);
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

// Set player badge
const setBadge = teamName => {
  playerBadge
    .querySelector('img')
    .setAttribute('src', `assets/images/${teamName.id}.png`);
  playerBadge.querySelector('img').setAttribute('alt', `${teamName.name}`);
};

// Set player name and position
const setPlayerDetails = (playerName, playerPosition) => {
  playerStats.querySelector(
    'h1'
  ).textContent = `${playerName.first} ${playerName.last}`;

  // Return last word in the string
  const positionInfo = playerPosition.positionInfo.split(' ');
  playerStats.querySelector('p').textContent = `${
    positionInfo[positionInfo.length - 1]
  }`;
};

// Set player stats
const setPlayerStats = stats => {
  stats.forEach(stat => {
    if (stat.name === 'appearances') {
      appearances = stat.value;
      playerStats.querySelector('#appearances').textContent = `${appearances}`;
    }

    if (stat.name === 'goals') {
      goals = stat.value;
      playerStats.querySelector('#goals').textContent = `${goals}`;
    }

    if (stat.name === 'goal_assist') {
      playerStats.querySelector('#goal_assist').textContent = `${stat.value}`;
    }

    if (stat.name === 'fwd_pass') {
      fwdPass = stat.value;
    }

    if (stat.name === 'backward_pass') {
      backwardPass = stat.value;
    }

    if (stat.name === 'mins_played') {
      minsPlayed = stat.value;
    }
  });

  goalsPerMatch(appearances, goals);
  passesPerMinute(fwdPass, backwardPass, minsPlayed);
};

// Calculate goals per match
const goalsPerMatch = (appearances, goals) => {
  const goalsPerMatch = goals / appearances;
  playerStats.querySelector(
    '#goals_per_match'
  ).textContent = `${goalsPerMatch.toFixed(2)}`;
};

// Calculate passes per minute
const passesPerMinute = (fwdPass, backwardPass, minsPlayed) => {
  const passes = (fwdPass + backwardPass) / minsPlayed;
  playerStats.querySelector('#passes').textContent = `${passes.toFixed(2)}`;
};

// Display list of players on click
dropdownBtn.addEventListener('click', () => {
  dropdownList.classList.toggle('hidden');
});
