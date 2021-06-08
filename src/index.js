import express from "express";
const app = express();
import layouts from "express-ejs-layouts";

import { createServer } from "http";
const server = createServer(app);

import helmet from "helmet";

import routers from "./modules/routers.js";

import { serverSettings as config, home, errors, dev } from "./config.js";
import { join } from "path";

app.set("view engine", "ejs");
app.set("views", join(home, "views"));
app.set("layout extractScripts", true);
app.set("layout extractMetas", true);
app.set("layout extractStyles", true);

app.use(helmet({ xssFilter: false }));
app.use(layouts);

app.use((req, res, next) => {
	if(req.hostname.toLowerCase() !== config.MAIN_DOMAIN.toLowerCase()) {
		res.redirect(`${config.MAIN_HREF}/${req.baseUrl}${req.path}`);
	}
	next();
});

app.use(routers.staticRouter);
app.use(routers.clientRouter);
app.use("/api/v1/", routers.apis.v1);

app.use((req, res) => {
	res.data.error = errors[404];
	res.status(404).render("error", {
		data: res.data,
	});
});

server.listen(config.PORT, () => {
	console.log(
		"Listening on port %s at \n\t%s\nStarting at %s UTC time\nRunning '%s' version",
		config.PORT,
		config.locations().join("\n\t"),
		new Date().toLocaleString(),
		dev ? "DEVELOPMENT" : "PRODUCTION"
	);
});
