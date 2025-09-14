# 🤖 Discord Bot Documentation 

## 🚀 Introduction
This is a modular **Discord.js v15 bot by Jonell Hutchin Magallanes** with support for:
- **Prefix commands** (`!ping`)  
- **Mention commands** (`@BotName ping`)  
- **Slash commands** (`/ping`)  
- **Event system** (custom `config + events` format)  
- **Cooldown system**  
- **JSON database** (users, servers, stickers, emoji)  
- **Logging system**  

The bot is designed to be **extensible**, so you can add commands, slash commands, and events easily.
**Lightweight**, so can run where the server you want like linux or localhost
---

## ⚙️ How It Works
1. **Initialization**  
   - Loads config from `config.json`.  
   - Starts the Discord client with required intents.  

2. **Database System**  
   - JSON files stored in `./database/json/`.  
   - Auto-created if missing.  

3. **Command System**  
   - Prefix commands: use `!command`.  
   - Mention commands: use `@BotName command`.  
   - Slash commands: use `/command`.  

4. **Event System**  
   - Events are stored in `./modules/events/`.  
   - Each event has its own `config` and `events` function.  

5. **Cooldowns**  
   - Prevents spam.  
   - Sends embed if command is on cooldown.  

6. **Logging**  
   - Logs messages and command usage.  

---

## ▶️ How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/your-bot.git
cd your-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure `config.json`
Create `config.json` in the root directory:
```json
{
  "token": "YOUR_BOT_TOKEN",
  "prefix": "!",
  "autorestart": 0
}
```

### 4. Start the Bot
```bash
node index.js
```

---

## 📜 How to Make Commands & Events

### 1. **Prefix + Mention Commands**
Located in `./modules/commands/`.

All commands work with **prefix** (`!ping`) and **mention** (`@BotName ping`).  

**Example:** `ping.js`
```js
module.exports = {
    config: {
        name: "ping",
        aliases: ["p"],
        description: "Replies with Pong!",
        cooldown: 5,
        usePrefix: true
    },
    letStart: async function ({ message }) {
        await message.reply("🏓 Pong!");
    }
};
```

✅ Usage:  
- `!ping`  
- `!p`  
- `@BotName ping`  

---

### 2. **Event Commands**
Located in `./modules/events/`.

Events use **`config + events`** structure.  

**Example:** `prefix.js`
```js
module.exports = {
    config: {
        name: "prefix",
        description: "Displays the current command prefix."
    },

    events: ({ discord }) => {
        const client = discord.client;

        client.on("messageCreate", (message) => {
            if (message.content === "!prefix" || message.content === `<@${client.user.id}> prefix`) {
                const prefix = require("../../config.json").prefix;
                message.reply(`🔧 The current prefix is: \\`${prefix}\\``);
            }
        });
    }
};
```

✅ Works with both `!prefix` and `@BotName prefix`.

---

### 3. **Slash Commands**
Located in `./modules/slash/`.

**Example:** `hello.js`
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Replies with a greeting!"),

    async execute(interaction) {
        await interaction.reply("👋 Hello there!");
    }
};
```

✅ Usage:  
- Type `/hello` in chat.  

---

## 📂 Folder Structure
```
project-root/
│── index.js
│── config.json
│── database/
│   └── json/
│       ├── users.json
│       ├── servers.json
│       ├── stickers.json
│       └── emoji.json
│── modules/
│   ├── commands/
│   │   └── ping.js
│   ├── events/
│   │   └── prefix.js
│   └── slash/
│       └── hello.js
│── utils/
│   ├── commandLoader.js
│   ├── eventLoader.js
│   └── logger.js
```

---

## 🛠️ Features
- **Prefix Commands**: `!ping`  
- **Mention Commands**: `@BotName ping`  
- **Slash Commands**: `/ping`  
- **Events (`config + events`)**: run automatically  
- **Dynamic Command Reloading**:
  ```js
  global.cc.reloadCommand("ping");
  ```
- **Cooldown System**: prevents spam, shows embed with remaining time  
- **JSON Database**: auto-created for users, servers, stickers, emoji  

---

✅ Your bot now supports:  
- Prefix commands  
- Mention commands  
- Slash commands  
- Custom event system  
- Cooldowns  
- JSON database  
