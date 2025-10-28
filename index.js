// const express = require('express');
// const axios  = require('axios');
// // const http = require('https')
// const runWorkflow = require('./workflows/sampleWorkflow');
// const { message } = require('telegraf/filters');

// // const path = require('path');
// // const runWorkflow = require(path.join(__dirname, 'workflows', 'sampleWorkflow'));

// // const agent = new https.Agent({ family: 4 }); // IPv4 only

// const app = express();
// const PORT = 3000;

// app.use(express.json());



// app.post('/webhook/notify', async (req, res) => {

//   try {

//     const {repo, pusher, commits }  = req.body;
//     if(!commits || commits.length ===0) {
//       return res.status(400).json({message: "No commits found"});
//     }
//     // get latest commits
//     const latestCommit = commits[commits.length-1];
//     const commitMsg = latestCommit.message;
//     const author = latestCommit.author.name;
//     const repoName = repo.name;

//     const msg = `New commit in *${repoName}* by *${author}*\n Commit Message: ${commitMsg}`;

//     const response = await axios.get('/run', {
//       params: {msg, author},
//     });

//     console.log("Response Received ", response.data);

//     res.status(200).json({ status: "success", fromRun: response.data });

  
//   } catch(err) {
//     console.error(err);
//   }
// });

// app.get('/run', async (req, res) => {
//   try {
//     await runWorkflow(req);
//     res.send('Workflow executed!');
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/run`));


const express = require('express');
const axios = require('axios');
const runWorkflow = require('./workflows/sampleWorkflow');

const app = express();
const PORT = 3000;

app.use(express.json()); // 👈 necessary for reading JSON payloads

// ✅ GitHub webhook endpoint
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

    // ✅ Trigger your workflow
    const response = await axios.get(`http://localhost:${PORT}/run`, {
      params: { msg, author },
    });

    console.log("Response Received:", response.data);

    res.status(200).json({ status: "success", fromRun: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Workflow runner
app.get('/run', async (req, res) => {
  try {
    await runWorkflow(req);
    res.send('Workflow executed!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}/run`)
);
