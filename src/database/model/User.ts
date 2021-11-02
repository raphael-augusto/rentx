import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

/* model is the representation of the object that travels between the database and the application. */
class User extends Model {
  /* Name table */
  static table = 'users';

  /* Name column */
  @field('user_id')
  user_id!: string;

  @field('name')
  name!: string;

  @field('email')
  email!: string;

  @field('driver_license')
  driver_license!: string;

  @field('avatar')
  avatar!: string;

  @field('token')
  token!: string;
};

export { User };
