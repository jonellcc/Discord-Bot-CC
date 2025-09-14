const express = require('express');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/dl', (req, res) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment('project.zip');
  archive.pipe(res);

  const exclude = ['node_modules', 'project.zip', 'dl'];

  function addFiles(dir, base = '') {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const relPath = path.join(base, file);
      if (exclude.includes(file)) return;
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        addFiles(fullPath, relPath);
      } else {
        archive.file(fullPath, { name: relPath });
      }
    });
  }

  addFiles('.');
  archive.finalize();
});
const { spawn } = require("child_process");

const botFiles = [
"main.js",
];

function startBot(file) {
  console.log(`Starting bot: ${file}`);
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", file], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (codeExit) => {
    console.log(`Bot process (${file}) exited with code: ${codeExit}`);
    if (codeExit !== 0) {
      setTimeout(() => startBot(file), 3000);
    }
  });

  child.on("error", (error) => {
    console.error(`An error occurred starting the bot (${file}): ${error}`);
  });
}

botFiles.forEach(startBot);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
