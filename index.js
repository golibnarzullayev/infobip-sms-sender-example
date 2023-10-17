const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sent', async (req, res) => {
	const token = process.env.API_KEY;

	const { message, phone } = req.body;
	const options = {
		messages: [
			{
				destinations: [
					{
						to: phone,
					},
				],
				from: 'Mohirdev',
				text: message,
			},
		],
	};

	const response = await axios.post(process.env.API_BASE_URL, options, {
		headers: {
			Authorization: `App ${token}`,
		},
	});

	res.json({ data: response.data });
});

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
