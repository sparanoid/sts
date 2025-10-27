import * as migration_20251027_140609 from './20251027_140609';

export const migrations = [
  {
    up: migration_20251027_140609.up,
    down: migration_20251027_140609.down,
    name: '20251027_140609'
  },
];
