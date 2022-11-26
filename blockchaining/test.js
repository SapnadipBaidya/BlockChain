const Blockchain = require("./Blockchain");
const SHA256 = require("sha256");

let dreamCoin = new Blockchain();

let sender = SHA256("Gourav Sharma").toString();
let reciever = SHA256("Sapnadip Baidya").toString();

dreamCoin.createNewTransaction("100",sender,reciever)//amount,sender,reciever

for (let index = 1 ; index <= 10; index++) {
    dreamCoin.createNewTransaction(1*100,sender,reciever)//amount,sender,reciever
    dreamCoin.createNewBlock();
    }

    console.log("\n\n\n");
    console.log("second block transaction" , dreamCoin.chain[6]);
