import "./environment";
import { config } from "dotenv";
config();

import { GetUser, GetUserTopBeers } from "./UntappdClient";

// GetUser(process.env.UNTAPPD_DEFAULT_USERNAME).then((user) => {
//     console.log(JSON.stringify(user.checkins.items.length));
// });

// GetUserTopBeers(process.env.UNTAPPD_DEFAULT_USERNAME).then((data) => {
//     console.log(JSON.stringify(data[0]));
// });
