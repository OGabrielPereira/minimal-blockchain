import { sha256 } from 'js-sha256';

class Block { // Main class
    index: number
    timestamp: Date
    data: any
    previousHash: any
    nonce: any
    hash: any

    constructor(index: any, data: any, previousHash: any) {
        this.index = index
        this.timestamp = new Date()
        this.data = data
        this.previousHash = previousHash
        this.nonce, this.hash = this.computeHashWithProofOfWork()
    }

    computeHashWithProofOfWork(difficulty = "000") {
        var nonce = 0
        while (true) {
            var hash = this.calcHashWithNonce(nonce)
            if (hash.startsWith(difficulty))
                return hash // proof of work if hash starts with leading zeros (000)
            else
                nonce += 1 // keep trying (and trying and trying)
        }
    }

    calcHashWithNonce(nonce = 0) {
        var sha = sha256.create()
        sha.update(nonce.toString() + this.index.toString() + this.timestamp.toString() + this.data + this.previousHash)
        return sha.hex()
    }


    static first(data = "Genesis Block") {    // create genesis block(first block)
        // uses index zero (0) and arbitrary previousHash ("0")
        return new Block(0, data, "0")
    }

    static next(previous: any, data: any) { // create next block
        return new Block(previous.index + 1, data, previous.hash)
    }
}

let bs: Array<Block> = []
let blockchain: Array<Block> = []
for (let i = 0; i < 10; i++) {
    if (i == 0) {
        bs[i] = Block.first()
        blockchain.push(bs[i])
    } else {
        bs[i] = Block.next(bs[i - 1], "Some data")
        blockchain.push(bs[i])
    }
}

console.log(blockchain)

