import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { carSchema } from './CarSchema';

const schemas = appSchema({
  version: 2,
  tables: [
    userSchema,
    carSchema
  ]
});

export { schemas };
