import process from "node:process";
import DB from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import { User } from "./Models/User";

let URI: any = process.env.URI;
let app = express();
let router = express.Router();

app.use(express.static("./website"));
app.use(express.json());
app.use(router);

DB.connect(URI, { keepAlive: true })
	.then(() => console.log("\x1b[1;92m" + "[STATUS]: Connected"));

router.get("/", async function(_, res) {
	await res.status(200).sendFile("./website/index.html", { root: "." });
});

router.post("/", async function(req, res) {
	let Username = req.body.username;
	let Email = req.body.email;
	let Password = req.body.password;

	let checkUser = await User.findOne({ Email: Email });

	if(checkUser)
	{
		return res.status(400).json({ message: "This account is already exist!" });
	}

	try 
	{
		let newUser = new User({ Username: Username, Email: Email, Password: Password });
		await newUser.save();
		await res.status(200).json({ message: "Success to create this account!" });
	} 
	catch (error) 
	{
		if(error)
		{
			return res.status(500).send(error);
		}
	}
});

app.listen(5000, () => console.log("\x1b[1;92m" + "[STATUS]: Online!"))