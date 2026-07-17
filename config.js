const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "xVdmWaoQ#nnO8ZMuqNdSO2GL78yMu7dorjt6iEnFEQiX00Czcz6M",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/kawwagaming02/kawshala-md/blob/main/images/KAWSHALA-MD%20(1).jpg?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 AKASH-MD Is Alive Now😍*",
BOT_OWNER: '94764612317',  // Replace with the owner's phone number


};
