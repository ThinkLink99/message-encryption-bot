// https://discord.com/oauth2/authorize?client_id=123456789012345678&scope=bot

const channel_name = 'home-team-to-away-team-comms';
const encryption_key = 14;

const Discord = require('discord.js');
const Encryption = require('./encryption.js');
const secret = require('./secret.js');

const client  = new Discord.Client();

const token = secret;

function delete_last_message (channel) {
    var msgManager = channel.messages;
    var messages = get_messages(channel);
    lastMessage = messages[messages.length - 1]; 
    // console.log("Before:"); 
    // console.log(lastMessage); 

    msgManager.delete (lastMessage);
    // console.log("After:"); 
    // console.log(lastMessage); 
}
function delete_message (channel, message) {
    var msgManager = channel.messages;
    msgManager.delete(message);
}
function get_messages (channel) {
    var msgManager = channel.messages;
    return msgManager.cache.array();
}
client.on("ready", () => {
    // console.log(Encryption);
});
client.on("message", (message) => {
    // don't let the bot respond to itself
    if (message.author == client.user) {
        return;
    } 
    if (message.channel.name == channel_name){
        // receive messages
        if (message.content.includes ("decrypt")){
            var messages =  get_messages (message.channel);
            delete_message (message.channel, messages [messages.length - 1]);
            var last_encrypted_message = messages [messages.length - 2];
            // console.log(last_encrypted_message);
            var content = last_encrypted_message.content.split(':')[1].trim();

            var decrypted = Encryption.decrypt_phrase(Encryption.decrypt_phrase(Encryption.decrypt_phrase(content, encryption_key), encryption_key), encryption_key);
            message.author.send("ORIGINAL TEXT: " + content + '\nDECRYPTED: ' + decrypted);
        } else {
            // encrypt the message three levels deep
            var content = message.content;
            var author = message.author;
            delete_last_message(message.channel);

            var encrypted = Encryption.encrypt_phrase(Encryption.encrypt_phrase(Encryption.encrypt_phrase(content, encryption_key), encryption_key), encryption_key);
            message.channel.send(author.username + ': ' + encrypted);
        }       
    }
});

client.login(token);