import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Backend is running in TypeScript!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
