const { exec } = require("child_process");

module.exports = {
  config: {
    name: "shell",
    description: "Execute terminal commands (restricted).",
  },

  letStart: async ({ message, args }) => {
    const allowedUIDs = ["910196206414753792"];
    if (!allowedUIDs.includes(message.author.id)) {
      return message.reply("You are not allowed to use this command.");
    }

    const command = args.join(" ");
    if (!command) return message.reply("Please provide a command to execute.");

    exec(command, (error, stdout, stderr) => {
      if (error) return message.reply(`Error: ${error.message}`);
      if (stderr) return message.reply(`Stderr: ${stderr}`);
      message.reply(`\`\`\`bash\n${stdout}\n\`\`\``);
    });
  },
};