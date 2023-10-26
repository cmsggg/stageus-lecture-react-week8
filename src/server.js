const app = require("./app");
const env = require("./config/env");

app.listen(env.HTTP_PORT, '0.0.0.0', () => {
    console.log(`server open || port: ${env.HTTP_PORT}`);
});
