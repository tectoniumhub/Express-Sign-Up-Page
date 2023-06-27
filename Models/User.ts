import mongo from "mongoose";

interface SubType extends mongo.Document
{
	Username: string;
	Email: string;
	Password: string;
}

let theSchema = new mongo.Schema({
	Username: { type: String, required: false },
	Email: { type: String, required: false, unique: true },
	Password: { type: String, required: false }
});

export const User = mongo.model<SubType>("users", theSchema);