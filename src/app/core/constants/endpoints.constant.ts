export const endpoints = {
  auth: {
    basePath: 'auth',
    login: 'google/login',
    callback: 'google/callback',
  },
  baseGame: {
    basePath: 'base-game',
    generateTeams: 'generate-teams',
    randomMap: 'random-map',
  },
  player: {
    basePath: 'player',
    updateGame: 'update-game',
  },
};
