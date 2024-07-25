const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib08zem16dDFRR3lmNkpTVU9NYjFyZmZEbkJkZXpZREVMRldwenpydkZGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXB1R1hxS04yRDN3TndLbkNVcDRtNktNNUZpck5HNEdCTnFhYUlEMGJTST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQzU2K3ZQQURpb3ZoT3FtSkdNV1JuUE1ERXZuM2dhTGpqNDFqN0ZDNVZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQVlOVmZZd2RUdENwWngyK3YxRythV1lBeEZXNlpscHI4SThBQjJzZzBJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNJeGFMendPR3l6ZFNlei9Hc2thek56VUxRZndaSUlvd1o4ZlVVN2tYMkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4vcEhYTkVCM0tWakZiSG5mdmxyVzhjbzcwUXhrNkd5TlpZRmFvUnQ1RVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUV5NEw5ditkQ1oxYkdOWXl6cXhHTGJBdU9id0Q1WXJycWRkT2kwaWdWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEw4QXZBUTh6MXhuSk5CZG9DNStTMjlsWldIcUZUeFdMT2pyODhCUjB5UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImowazdCYlZhOWsvaDQ2eDJ3SHYwWW55Zk41L2szenBlZXJMQkxOUkRVbHBFSTBwZnNLcU95UG9RQUVET09uMWlwdSt4Wmc5UVY1Tk5YT1QySGE0RmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6ImJOVFNDQkFZakRwb004bHdoeTBxYTNWNUwvSkhUV1g2Z0ttS0xPTUl3K0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImtkbUxQajg5UUEtRjROTHRKT0NrX1EiLCJwaG9uZUlkIjoiOTQzNGU4Y2QtZjg5My00NzY2LWI5MDQtZTQwMmI1YTgxM2Y2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9ZQnlOelUvSHI4WURPWHh4VklqYVZuUDZhaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJheFFyQThkMEo1N3k0Ync3c205TDU3NkhlRnc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNFI1VEZCUlkiLCJtZSI6eyJpZCI6IjIzNDkxNTk4OTY0MDI6OTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5NDN2QUNFTHpBaTdVR0dCd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhJZXYzdWR0NXdNcmdiOWRud1ZaYU5zRktVek9BU3NMclJXUzduTlE4bFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkEwSXdXcnozb2duM3BiMk9uK3cxV240WGprU1g3YlhzL1RUYTZjMmRtbWg2a0tWVHVKSVpENXZqdGRPVWR2VkphbFZXaXpwa3ZhZUdHVFBydDBnempRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnSUdDam1WK3dEZW1BcUFPc29oUUppaXZ2Wnp0RkVkRklXVi9XVTZBUjdyeCtsa240QUQvMGlmYXlkNVk0ZTJwZFpEYWtlVWRZRjhKNXpOYkFGSXBoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNTk4OTY0MDI6OTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY1NIcjk3bmJlY0RLNEcvWFo4RldXamJCU2xNemdFckM2MFZrdTV6VVBKVSJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTUwMjgxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0zdCJ9',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "Hardeaymorlar💙",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349159896402",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Ademola❤️-Md',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
