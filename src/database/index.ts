import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import { schemas } from "./schema";
import { User } from "./model/User";


const adapter = new SQLiteAdapter({
  schema: schemas,
  // jsi: Platform.OS === 'ios'
});

export const database = new Database({
  adapter,
  modelClasses: [User],
  actionsEnabled: true,
});
