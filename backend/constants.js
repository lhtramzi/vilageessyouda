// backend/constants.js

const DEFAULT_ROLES = [
  { id: 'villager', name: 'Villager', description: 'A simple villager.', team: 'village' },
  { id: 'werewolf', name: 'Werewolf', description: 'Eats one villager at night.', team: 'werewolves' },
  { id: 'seer', name: 'Seer', description: 'Can check one player per night.', team: 'village' },
  { id: 'witch', name: 'Witch', description: 'Has a healing potion and a poison.', team: 'village' },
  { id: 'hunter', name: 'Hunter', description: 'Can kill someone when they die.', team: 'village' },
  { id: 'little_girl', name: 'Little Girl', description: 'Can peek at night.', team: 'village' },
  { id: 'guard', name: 'Guard', description: 'Protects one person per night.', team: 'village' }
];

const MAX_PLAYERS = 16;
const MIN_PLAYERS = 5;

module.exports = {
  DEFAULT_ROLES,
  MAX_PLAYERS,
  MIN_PLAYERS
};
