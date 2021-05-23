import {
  SmartContract,
  ProxyProvider,
  Address,
  Account,
  Balance,
  HWProvider,
  Transaction,
  AddressValue,
} from "@elrondnetwork/erdjs"

// Change network (test/dev/main)
const proxyProvider = new ProxyProvider("https://testnet-gateway.elrond.com");
// Ledger integration
const hwWalletP = new HWProvider(proxyProvider);
const smartContractAddress = new Address(
  "erd1qqqqqqqqqqqqqpgqqr37qsc5lyue3ketjjh90jnwwsaypx9md8ss4w9n7k"
);

/* 
@param caller_address: String
@param gig_id: number
@param deadline: number
@param price (in eGLD): number 
*/
const seller_list = async (caller_address, gig_id, deadline, price) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("list")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  payload_builder.addArg(new U64Value(new BigNumber(deadline))); // deadline
  payload_builder.addArg(
    new BigUIntValue(new BigNumber(price / 1000000000000000000))
  ); // price
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
*/
const seller_unlist = async (caller_address, gig_id) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("list")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
*/
const seller_deliver = async (caller_address, gig_id) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("deliver")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
*/
const seller_claim = async (caller_address, gig_id) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("claim")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
@param seller_address: String
@param payment: String
*/
const buyer_order = async (caller_address, gig_id, seller_address, payment) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("order")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  payload_builder.addArg(new AddressValue(new Address(seller_address))); // seller_address
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    value: new Balance(payment),
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
@param seller_address: String
*/
const buyer_refund = async (caller_address, gig_id, seller_address) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("refund")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  payload_builder.addArg(new AddressValue(new Address(seller_address))); // seller_address
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
@param seller_address: String
*/
const buyer_dispute = async (caller_address, gig_id, seller_address) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("dispute")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  payload_builder.addArg(new AddressValue(new Address(seller_address))); // seller_address
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};

/* 
@param caller_address: String
@param gig_id: number
@param seller_address: String
*/
const buyer_accept = async (caller_address, gig_id, seller_address) => {
  // SYNC NONCE
  caller = new Account(new Address(caller_address));
  await caller.sync(proxyProvider);
  // LOAD PAYLOAD
  let payload_builder = new ContractCallPayloadBuilder();
  payload_builder.setFunction(new ContractFunction("accept")); // function
  payload_builder.addArg(new U64Value(new BigNumber(gig_id))); // gig-id
  payload_builder.addArg(new AddressValue(new Address(seller_address))); // seller_address
  // BUIDL
  let payload = payload_builder.build();
  // MAKE TRANSACTION
  let tx = new Transaction({
    receiver: smartContractAddress,
    nonce: caller.nonce,
    gasLimit: new GasLimit(50000000),
    data: payload,
  });
  // SEND IT
  hwWalletP
    .sendTransaction(tx)
    .then((reply) => {
      console.log(reply.getHash().hash);
    })
    .catch((err) => {
      console.warn(err);
    });
};
