import {
  ProxyProvider,
  Address,
  Account,
  Balance,
  HWProvider,
  Transaction,
  AddressValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  U64Value,
  GasLimit,
  BigUIntValue,
} from "@elrondnetwork/erdjs"
import BigNumber from "bignumber.js"

import ADDRESSES from "./addresses"

const contractAddr = ADDRESSES["validworks-testnet"]
const proxy = "https://testnet-gateway.elrond.com"

export default class GigContract {
  constructor(callerAddr, gigId) {
    this.caller = new Account(new Address(callerAddr))
    this.gigId = gigId
    this.scAddr =  new Address(contractAddr)
    this.proxyProvider = new ProxyProvider(proxy)
    this.hwWalletP = new HWProvider(this.proxyProvider)
  }

  async sync() {
    // SYNC NONCE
    await this.caller.sync(this.proxyProvider)
    return true
  }

  async listGig(deadline, price) {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("list")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    payload_builder.addArg(new U64Value(new BigNumber(deadline))); // deadline
    payload_builder.addArg(
      new BigUIntValue(new BigNumber(price / 1000000000000000000))
    ); // price
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.scAddr,
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });

    console.log("contract call")

    // SEND IT
    const result = this.hwWalletP.sendTransaction(tx)

    return result
  }

  async unlistGig() {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("list")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    await this.hwWalletP.sendTransaction(tx)

    return true
  }

  async deliverGig() {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("deliver")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }

  async claimPayment() {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("claim")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }

  async orderGig(sellerAddr, price) {
    await this.sync()
    
    const payment = price * 1.2
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("order")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    payload_builder.addArg(new AddressValue(new Address(sellerAddr))); // seller_address
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      value: new Balance(payment),
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }

  async refund(sellerAddr) {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("refund")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    payload_builder.addArg(new AddressValue(new Address(sellerAddr))); // seller_address
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }

  async dispute(sellerAddr) {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("dispute")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    payload_builder.addArg(new AddressValue(new Address(sellerAddr))); // seller_address
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }

  async acceptGig(sellerAddr) {
    await this.sync()
    
    // LOAD PAYLOAD
    let payload_builder = new ContractCallPayloadBuilder();
    payload_builder.setFunction(new ContractFunction("accept")); // function
    payload_builder.addArg(new U64Value(new BigNumber(this.gigId))); // gig-id
    payload_builder.addArg(new AddressValue(new Address(sellerAddr))); // seller_address
    // BUIDL
    let payload = payload_builder.build();
    // MAKE TRANSACTION
    let tx = new Transaction({
      receiver: this.contract.getAddress(),
      nonce: this.caller.nonce,
      gasLimit: new GasLimit(50000000),
      data: payload,
    });
    // SEND IT
    const result = await this.hwWalletP.sendTransaction(tx)
    return result
  }
}