const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("Logged you in! Successful match")
    } else {
        console.log('Incorrect')
    }
}

//hashPassword('monkey');
login('monkey', '$2b$12$iN9.gQPTgol9hagkORzcauTmOJLm.YYVUivfxgzqOE.sCzSaHHEde');