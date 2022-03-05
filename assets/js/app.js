const dropdownBtn = document.querySelector('.dropdown__btn');
const dropdownList = document.querySelector('.dropdown__list');

// Get data from player-stats.json
const getData = async () => {
  const res = await fetch('../../data/player-stats.json');
  const data = await res.json();

  return data;
};

// Create list of player names
const listPlayers = () => {
  getData().then(data => {
    const { players } = data;

    players.forEach((player, i) => {
      const playerName = player.player.name;
      console.log(playerName.first, playerName.last);

      const ul = document.createElement('ul');
      ul.innerHTML = `
        <li class="box--grey">${playerName.first} ${playerName.last}</li>
      `;
      dropdownList.appendChild(ul);
    });
  });
};

listPlayers();

dropdownBtn.addEventListener('click', () => {
  dropdownList.classList.toggle('hidden');
});
