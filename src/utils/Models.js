import moralis from 'moralis'

// Database Objects
export const Gig = moralis.Object.extend("Gig", {
    getId: function() {
      return this.id.toString()
    },
    getThumbnail: function() {
      return this.get('thumbnail')
    },
    getTitle: function() {
      return this.get('title').toString()
    },
    getPrice: function() {
      return this.get('price').toString()
    },
    getDeliveryTime: function() {
      return this.get('deliveryTime').toString()
    },
    getSellerId: function() {
      return this.get('sellerId').toString()
    },
    getDesc: function() {
      return this.get('description').toString()
    },
    getCategory: function() {
      return this.get('category').toString()
    },
  })
  
export const Order = moralis.Object.extend("Order", {
    getId: function() {
      return this.id.toString()
    },
    getGigId: function() {
      return this.get("gigId").toString()
    },
    getBuyerId: function() {
      return this.get("buyerId").toString()
    },
    getSellerId: function() {
      return this.get("sellerId").toString()
    },
    getTxHash: function() {
      return this.get("txHash").toString()
    },
    getStatus: function() {
      return this.get("status").toString()
    }
  })