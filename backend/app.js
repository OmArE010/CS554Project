const express = require('express');
const app = express();
const configRoutes = require("./routes");
const cors = require('cors');

configRoutes(app);

app.use(cors());

app.listen(4000, () => {
	console.log("Server is now running on http://localhost:4000");
});

