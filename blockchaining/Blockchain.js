const SHA256  = require("sha256");

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; // this chain array will contain every Block or group of Transactions added to the network
        this.pendingTransactions = []; // this array will hold all transactions that have noy been added to a block yet
        // point to remember :: blockchain starts with a genesis block
        // thats why the chain array is initialized with an array containing a func that creates the genesis block

    }

    //building the genesis block
    // this function will only run once since constructor only runs once . 
    createGenesisBlock(){
        return {
            index:1,
            timestamp : Date.now(),
            transactions:[],
            nonce:0,
            hash:"hash",
            previousBlockHash:"previousBlockHash"
        }
    };

// this will enable us to access the details of the most recent block added
    getLastBlock(){
        return this.chain[this.chain.length - 1];
    };


 //generating hash

 generateHash(previousBlockHash,timestamp,pendingTransactions){
    console.log("inside")
    let hash="";
    let nonce = 0;
    while (hash.substring(0,3)!=="009") {
        nonce++;
        console.log(nonce)
        hash = SHA256(previousBlockHash+timestamp+JSON.stringify(pendingTransactions)+nonce).toString();
    }
    console.log("holllaaa",hash)
    return {hash,nonce};
 }

 // creates transactions and add them to the list of pending transactions

 createNewTransaction(amount,sender,recipient){
    const newTransaction ={
        amount,
        sender,
        recipient
    };

    this.pendingTransactions.push(newTransaction);
 };

 // creating BLOCK

 createNewBlock(){
    const timestamp = Date.now();
    const transactions = this.pendingTransactions;
    const previousBlockHash = this.getLastBlock().hash; // access the previous block 

    const generateHash = this.generateHash(previousBlockHash,timestamp,transactions); // calculate hash of current block 

    const newBlock ={ //add details of new block in an object 
        index:this.chain.length + 1 ,
        timestamp,
        transactions,
        nonce:generateHash.nonce,
        hash:generateHash.hash,
        previousBlockHash
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock); // adds new block to the chain
    return newBlock;
 }
}

module.exports  = Blockchain ; 