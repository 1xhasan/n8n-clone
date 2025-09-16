const express = require('express');
// const http = require('https')
const runWorkflow = require('./workflows/sampleWorkflow');

// const path = require('path');
// const runWorkflow = require(path.join(__dirname, 'workflows', 'sampleWorkflow'));

// const agent = new https.Agent({ family: 4 }); // IPv4 only

const app = express();
const PORT = 3002;

app.get('/run', async (req, res) => {
  try {
    await runWorkflow();
    res.send('Workflow executed!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/run`));
