import moralis from "moralis";
import { getErdAddrByUserId } from "./UserUtils";

// Database Objects
const Gig = moralis.Object.extend("Gig", {
  getId: function() {
    return this.id.toString();
  },
  getThumbnail: function() {
    return this.get("thumbnail");
  },
  getTitle: function() {
    return this.get("title").toString();
  },
  getPrice: function() {
    return this.get("price").toString();
  },
  getSellerId: function() {
    return this.get("sellerId").toString();
  },
  getBuyerId: function() {
    if (!this.get("buyerId")) {
      return false;
    }

    return this.get("buyerId").toString();
  },
  getDesc: function() {
    return this.get("description").toString();
  },
  getCategory: function() {
    return this.get("category").toString();
  },
  getStatus: function() {
    return this.get("status").toString();
  },
  setStatus: function(newStatus) {
    return this.set(newStatus);
  },
  getOnChainId: function() {
    return this.get("onChainId");
  },
});

const Order = moralis.Object.extend("Order", {
  getId: function() {
    return this.id.toString();
  },
  getGigId: function() {
    return this.get("gigId").toString();
  },
  getBuyerId: function() {
    return this.get("buyerId").toString();
  },
  getSellerId: function() {
    return this.get("sellerId").toString();
  },
  getTxHash: function() {
    return this.get("txHash").toString();
  },
  getStatus: function() {
    return this.get("status").toString();
  },
});

// Functions
const createNewGig = async (
  thumbnail,
  title,
  price,
  description,
  sellerId,
  onChainId
) => {
  const newGig = new Gig();

  newGig.set("thumbnail", thumbnail);
  newGig.set("title", title.toString());
  newGig.set("price", parseFloat(price));
  newGig.set("description", description.toString());
  newGig.set("sellerId", sellerId.toString());
  newGig.set("onChainId", onChainId.toString());
  const gig = await newGig.save();

  return gig;
};

const editGig = async (gigId, title, price, category, description) => {
  const gigQuery = new moralis.Query(Gig);
  const existingGig = await gigQuery.get(gigId);
  existingGig.then(
    (gig) => {
      console.log("Gig was retrieved successfully");
      gig.set("title", title);
      gig.set("price", price);
      gig.set("description", description);
      gig.set("category", category);
    },
    (error) => {
      console.log("Failed to retrieve Gig, with the error: ", error.message);
    }
  );
};

const orderGig = async (gigId, buyerId, sellerId) => {
  // Find the seller address using the seller id
  const sellerErdAddr = getErdAddrByUserId(sellerId);

  // order the gig onchain using erdjs

  // get the status of the order using the elrond api
  const txHash = "";
  const status = "ordered";

  // add the order to the database as well as the status
  const newOrder = new Order();

  newOrder.set("gigId", gigId.toString());
  newOrder.set("buyerId", buyerId.toString());
  newOrder.set("sellerId", sellerId.toString());
  newOrder.set("txHash", txHash.toString());
  newOrder.set("status", status.toString());

  const order = await newOrder.save();

  return order;
};

const selectGigById = async (gigId) => {
  const gigQuery = new moralis.Query(Gig);
  try {
    const result = await gigQuery.get(gigId);
    return result;
  } catch (error) {
    console.log("Failed to retrieve Gig, with the error: ", error.message);
  }
};

const selectGigsByBuyerId = async (buyerId) => {
  // Buyer orders from the Order database
  // TODO: Should set ACL to only allow the buyer to query his own orders
  const orderQuery = new moralis.Query(Order);
  orderQuery.equalTo("buyerId", buyerId);
  const results = await orderQuery.find();

  return results;
};

const selectGigsBySellerId = async (sellerId) => {
  // Seller listings from the Gig database
  const gigQuery = new moralis.Query(Gig);
  gigQuery.equalTo("sellerId", sellerId);
  const results = await gigQuery.find();

  return results;
};

const listGigs = async () => {
  // Seller listings from the Gig database
  const gigQuery = new moralis.Query(Gig);
  const results = await gigQuery.find();

  return results;
};

export {
  createNewGig,
  editGig,
  orderGig,
  selectGigById,
  selectGigsByBuyerId,
  selectGigsBySellerId,
  listGigs,
};
