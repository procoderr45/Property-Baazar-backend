import app from "./app.js";
import { getEnv, getTypedEnv } from "./config/env.js";

const env = getTypedEnv()

app.listen(env.PORT, () => {
    console.log("App listening on PORT", env.PORT);
});
