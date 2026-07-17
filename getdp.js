const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'getdp',
    aliases: ['dp', 'getprofile'],
    category: 'utility',
    desc: 'Gets the profile picture of a user or group.',
    async execute(client, msg, args) {
        try {
            let targetId = '';

            // 1. Check if replying to a message
            if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage();
                targetId = quotedMsg.author || quotedMsg.from;
            } 
            // 2. Check if mentioning someone (e.g., .dp @9477xxxxxxx)
            else if (msg.mentionedIds && msg.mentionedIds.length > 0) {
                targetId = msg.mentionedIds[0];
            } 
            // 3. Default to the chat itself (Group DP) or the sender (Private Chat DP)
            else {
                targetId = msg.from;
            }

            // Status message
            const statusMsg = await msg.reply('Fetching profile picture... 🔄');

            // Fetch the high-resolution profile picture URL
            const profilePicUrl = await client.getProfilePicUrl(targetId);

            if (profilePicUrl) {
                // Load the image from URL as MessageMedia
                const media = await MessageMedia.fromUrl(profilePicUrl);
                
                // Send the image back to the chat
                await client.sendMessage(msg.from, media, {
                    caption: `📸 Requested Profile Picture.`
                });
                
                // Delete status loading message to keep chat clean
                await statusMsg.delete(true);
            } else {
                await statusMsg.edit('❌ This user/group does not have a public profile picture or it is hidden by privacy settings.');
            }

        } catch (error) {
            console.error('Error fetching DP:', error);
            msg.reply('❌ Failed to fetch profile picture. Please try again.');
        }
    }
};
