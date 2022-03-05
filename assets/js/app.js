const dropdownBtn = document.querySelector('.dropdown__btn');
const dropdownList = document.querySelector('.dropdown__list');
const player = document.querySelectorAll('.player');

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

    players.forEach((player, i) => {
      const playerName = player.player.name;

      const li = document.createElement('li');
      li.textContent = `${playerName.first} ${playerName.last}`;
      li.classList.add('box--grey', 'player');
      dropdownList.appendChild(li);
    });
  });
};

// Call function to populate dropdown menu with player names
getPlayers();

dropdownBtn.addEventListener('click', () => {
  dropdownList.classList.toggle('hidden');
});
