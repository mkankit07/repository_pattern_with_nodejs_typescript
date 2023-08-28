import mongoose from "mongoose";
import env from "../configs/env";
import logger from "./logger";
const db_connection = () => {
	mongoose.connect(env.DATABASE_URL, {
		dbName: env.DATABASE_NAME
	});

	mongoose.connection.on("connected", () => {
		logger.log({
			level: "info",
			message: ` ::Database Connected:: `
		});
	});

	mongoose.connection.on("connecting", () => {
		logger.log({
			level: "info",
			message: ` ::Database Connecting:: `
		});
	});

	mongoose.connection.on("close", () => {});

	mongoose.connection.on("error", error => {
		logger.log({
			level: "error",
			message: error.message,
			metadata: error
		});
		throw Error(error);
	});
};

export default db_connection;
