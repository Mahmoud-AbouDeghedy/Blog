import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connecting to the database failed!" });
		return;
	}

	if (req.method === "POST") {
		const { email, name, comment } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim() === "" ||
			!comment ||
			comment.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input." });
			client.close();
			return;
		}
		const newComment = {
			email,
			name,
			comment,
			eventId,
		};

		let result;
		try {
			result = await insertDocument(client, "comments", newComment);
			newComment._id = result.insertedId;
			res.status(201).json({ message: "Added Comment.", comment: newComment });
		} catch (error) {
			res.status(500).json({ message: "Inserting comment failed!" });
		}
	}

	if (req.method === "GET") {
		let comments;
		try {
			comments = await getAllDocuments(
				client,
				"comments",
				{ _id: -1 },
				{ eventId }
			);
			res.status(200).json({ comments });
		} catch (error) {
			res.status(500).json({ message: "Getting comments failed." });
		}
	}

	client.close();
}

export default handler;
