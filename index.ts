import express from "express";
import axios from "axios";

import runWorkflow from "./workflows/sampleWorkflow";

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.post('/webhook/notify', async (req, res) => {
  try {
    const { repository, pusher, commits } = req.body;

    if (!commits || commits.length === 0) {
      return res.status(400).json({ message: "No commits found" });
    }

    const latestCommit = commits[commits.length - 1];
    const commitMsg = latestCommit.message;
    const author = latestCommit.author.name;
    const repoName = repository.name;

    const msg = `New commit in *${repoName}* by *${author}*\nCommit Message: ${commitMsg}`;

    const response = await axios.get(`http://localhost:${PORT}/run`, {
      params: { msg, author },
    });

    console.log("Response Received:", response.data);

    res.status(200).json({ status: "success", fromRun: response.data });
  } catch (err : unknown) {
    console.error(err);

    if(err instanceof Error)
      res.status(500).json({ error: err.message });
    console.error('Unknown error', err);
  }
});

app.get('/run', async (req, res) => {
  try {
    const result = await runWorkflow(req, res);
    return res.status(200).json({ status: 'success', result });
  } catch (err : unknown) {
    if(err instanceof Error)
      return res.status(500).send(err.message);
    console.error('Unknown error', err);
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/run`)
);
