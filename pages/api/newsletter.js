import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
	if (req.method == "POST") {
		const { email } = req.body;

		if (!email || !email.includes("@")) {
			res.status(422).json({ message: "Invalid email address." });
			return;
		}

		let client;

		try {
			client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: "connecting to the database failed" });
			return;
		}

		try {
			await insertDocument(client, "newsLetter", { email });
			client.close();
		} catch (error) {
			res.status(500).json({ message: "inserting data failed" });
			return;
		}

		res.status(200).json({ message: "Signed up!" });
	}
}

export default handler;
