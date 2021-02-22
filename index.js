


const fetch = require('node-fetch');
const fs = require('async-file');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const checking = (email) => new Promise((resolve, reject) => {

    fetch(`https://api.twitter.com/i/users/email_available.json?email=${email}`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA`,
            "Origin": `https://twitter.com`,
            "Referer": "https://twitter.com/i/flow/signup",
            "Sec-Fetch-Mode": "cors",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
            "x-csrf-token": "ab07b56686b83e0c165ba917731a0927",
            "x-guest-token": "1185937517071060992",
            "x-twitter-active-user": "yes",
            "x-twitter-client-language": "en"
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});
// فنكشن الفحص
(async () => {
    console.log(chalk.red('Made By @9wmm / @2088'));
    const file = ("./list.txt")
    const getak = await fs.readFile(file, 'utf8');
    let listemail = [];
    await listemail.push(getak.toString().replace(/\r\n|\r|\n/g, " ").split(" "));
    if(listemail[0].length > 0) {
        console.log(chalk.green('Loaded ('+listemail[0].length+') Email'));
        console.log("Checking started.")
       
        
        console.log("")
	    for (var i = 0; i < listemail[0].length; i++) {
        
            const listch = listemail[0][i];
	    const fku = listch.split('|');
	    const email = fku[0];
        const check = await checking(email);
        if(check.taken === false){

            console.log(chalk.green(`[Available]-=> ${email}`));
            const goodlist = await fs.appendFile('Available.txt',`${email}\n`, function (err) {
                if (err) throw err;
                console.log('try again');});
        }else{

            console.log(chalk.red(`[taken]-=> ${email}`));
            const badlist = await fs.appendFile('taken.txt',`${email}\n`, function (err) {
                if (err) throw err;
                console.log('try again ');});
            
        }
        
        
	   }
    } else {
        
    }
})();
