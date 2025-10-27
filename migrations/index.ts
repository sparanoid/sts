import * as migration_20251027_140609 from './20251027_140609';
import * as migration_20251027_150150 from './20251027_150150';

export const migrations = [
  {
    up: migration_20251027_140609.up,
    down: migration_20251027_140609.down,
    name: '20251027_140609',
  },
  {
    up: migration_20251027_150150.up,
    down: migration_20251027_150150.down,
    name: '20251027_150150'
  },
];
