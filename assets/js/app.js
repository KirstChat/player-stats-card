const getData = async () => {
  const res = await fetch('../../data/player-stats.json');
  const data = await res.json();

  return data;
};

getData().then((data) => console.log('Players: ', data.players));
