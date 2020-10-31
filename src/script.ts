import "./environment";
import { config } from "dotenv";
config();

import { GetUser } from "./UntappdClient";

GetUser(process.env.UNTAPPD_DEFAULT_USERNAME).then((user) => {
    console.log(JSON.stringify(user.checkins.items.length));
});
