const { assert } = require('chai');


const Vshare = artifacts.require("Vshare");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Vshare', (accounts) => {
let vshare;

before(async ()=>{
    vshare = await Vshare.deployed()
})

describe('deployment', async()=>{
    it('deploys successfully', async()=> { 
    const address = vshare.address;
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, 0x0)
    assert.notEqual(address, undefined)
    })
})
})   
 