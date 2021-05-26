import moralis from "moralis";

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
    console.log("status run");
    this.set("status", newStatus);
    this.save().then(
      (gig) => {
        // Execute any logic that should take place after the object is saved.
        alert("New object created with gigId: " + gig.id);
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  },
  setBuyerId: function(newBuyerId) {
    this.set("buyerId", newBuyerId);
    this.save();
  },
  removeBuyerId: function() {
    this.set("buyerId", "nil");
    this.save();
  },
  getOnChainId: function() {
    return this.get("onChainId");
  },
  getListTxHash: function() {
    return this.get("listTxHash");
  },
  getSellerAddr: function() {
    return this.get("sellerAddr");
  },
  getDeliveryTime: function() {
    return this.get("deliveryTime");
  },
});

// Functions
const createNewGig = async (
  thumbnail,
  title,
  price,
  description,
  sellerId,
  onChainId,
  listTxHash,
  sellerAddr
) => {
  const newGig = new Gig();

  newGig.set("thumbnail", thumbnail);
  newGig.set("title", title.toString());
  newGig.set("price", parseFloat(price));
  newGig.set("description", description.toString());
  newGig.set("sellerId", sellerId.toString());
  newGig.set("onChainId", onChainId.toString());
  newGig.set("listTxHash", listTxHash.toString());
  newGig.set("sellerAddr", sellerAddr.toString());
  const gig = await newGig.save();

  return gig;
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
  const orderQuery = new moralis.Query(Gig);
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
  selectGigById,
  selectGigsByBuyerId,
  selectGigsBySellerId,
  listGigs,
};
