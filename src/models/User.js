const { Schema, model } = require('mongoose')
const aesjs = require('aes-js');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

userSchema.methods.encryptPassword = password => {
    let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    // Convert text to bytes
    let text = password
    let textBytes = aesjs.utils.utf8.toBytes(text)

    // The counter is optional, and if omitted will begin at 1
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
    let encryptedBytes = aesCtr.encrypt(textBytes)

    // To print or store the binary data, you may convert it to hex
    let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
    return encryptedHex
}

userSchema.methods.decryptPassword = (encryptedPassword,password) => {
    let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    
    // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
    //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

    // When ready to decrypt the hex string, convert it back to bytes
    let encryptedBytes = aesjs.utils.hex.toBytes(encryptedPassword)

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
    let decryptedBytes = aesCtr.decrypt(encryptedBytes)

    // Convert our bytes back into text
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
    
    if(decryptedText === password){
        return true
    }else{
        return false
    }
}

module.exports = model('User', userSchema)