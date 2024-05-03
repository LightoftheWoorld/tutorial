const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017", {
	dbName: process.env.DB_NAME || "school_management_system",
})
.then(() => {
	console.log("MongoDB connected");
})
.catch((error) => {
	console.log(error.message);
});

mongoose.connection.on('connected', () => {
	console.log('mongoose connected to db!'); 
});

mongoose.connection.on('error', (error) => {
	console.log(error.message);
});

mongoose.connection.on('disconnected', () => {
	console.log('mongoose disconnected from db!');
});

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});
