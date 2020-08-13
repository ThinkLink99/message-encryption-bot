var letters = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function encrypt_word (word, key) {
    var encrypted_string = '';
    if (word == '' || key == null || key == 0){
        return 'ERROR: Word or Key was blank';
    }
    for (i in word) {
        var current_letter = word[i];
        var letter_position = letters.indexOf(current_letter.toUpperCase());
        if (letter_position != -1) {
            var new_position = letter_position + key;
            if (new_position >= letters.length){
                new_position = new_position - letters.length;
            }
            // console.log("current_letter:", current_letter, "letter_position:", letter_position, "new_position:", new_position);
    
            var new_letter = letters[new_position];
            encrypted_string += new_letter; 
        }
    }
    return encrypted_string;
}
function encrypt_phrase (phrase, key) {
    if (phrase == '' || key == null || key == 0) {
        return "ERROR: Phrase or Key is empty";
    }
    var encrypted_phrase = '';
    var words = phrase.split(' ');
    for(i in words){
        var word = words[i];

        encrypted_phrase += encrypt_word(word, key) + ' ';
    }
    return encrypted_phrase.trim();
}
function decrypt_word (word, key) {
    var encrypted_string = '';
    if (word == '' || key == null || key == 0){
        return 'ERROR: Word or Key was blank';
    }
    for (i in word) {
        var current_letter = word[i];
        var letter_position = letters.indexOf(current_letter.toUpperCase());
        if (letter_position != -1) {
            var new_position = letter_position - key;
            if (new_position <= 0){
                new_position = new_position + letters.length;
            }
            // console.log("current_letter:", current_letter, "letter_position:", letter_position, "new_position:", new_position);
            var new_letter = letters[new_position];
            encrypted_string += new_letter; 
        }
    }
    return encrypted_string;
}
function decrypt_phrase (phrase, key) {
    if (phrase == '' || key == null || key == 0) {
        return "ERROR: Phrase or Key is empty";
    }
    var encrypted_phrase = '';
    var words = phrase.split(' ');
    for(i in words){
        var word = words[i];

        encrypted_phrase += decrypt_word(word, key) + ' ';
    }
    return encrypted_phrase.trim();
}
module.exports = {
    encrypt_phrase: encrypt_phrase,
    encrypt_word: encrypt_word,
    decrypt_phrase: decrypt_phrase,
    decrypt_word: decrypt_word,
}