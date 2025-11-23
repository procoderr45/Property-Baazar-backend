import app from "./app.js";
import connectToDb from "./config/db.js";
import { getTypedEnv } from "./config/env.js";

const env = getTypedEnv();

connectToDb()
    .then(() => {
        app.listen(env.PORT, () => {
            console.log("App listening on PORT", env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
