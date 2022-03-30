


const child_precess = require("child_process");


child_precess.exec('cp -r ./lib ./demo', () => {
    console.log('serve is ok', "http://localhost:8009");
    child_precess.exec(`cd demo && serve -p 8009`)
})