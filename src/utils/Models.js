import moralis from 'moralis'

const getString = result => result ? result.toString() : "undefined"

// Database Objects
export const Gig = moralis.Object.extend("Gig", {
    getId: function() {
      return getString(this.id)
    },
    getThumbnail: function() {
      return this.get('thumbnail')
    },
    getTitle: function() {
      return getString(this.get('title'))
    },
    getPrice: function() {
      return getString(this.get('price'))
    },
    getDeliveryTime: function() {
      return getString(this.get('deliveryTime'))
    },
    getSellerId: function() {
      return getString(this.get('sellerId'))
    },
    getDesc: function() {
      return getString(this.get('description'))
    },
    getCategory: function() {
      return getString(this.get('category'))
    },
  })
  
export const Order = moralis.Object.extend("Order", {
    getId: function() {
      return getString(this.id)
    },
    getGigId: function() {
      return getString(this.get("gigId"))
    },
    getBuyerId: function() {
      return getString(this.get("buyerId"))
    },
    getSellerId: function() {
      return getString(this.get("sellerId"))
    },
    getTxHash: function() {
      return getString(this.get("txHash"))
    },
    getStatus: function() {
      return getString(this.get("status"))
    }
  })

// Database Objects
export const Category = moralis.Object.extend("Category", {
  getId: function() {
    return getString(this.id)
  },
  getTitle : function() {
    return getString(this.get('title'))
  },
  getThumbnail: function() {
    return this.get('thumbnail')
  }
})

export const SubCategory = moralis.Object.extend("SubCategory", {
  getId: function() {
    return getString(this.id)
  },
  getTitle: function() {
    return getString(this.get('title'))
  },
  getThumbnail: function() {
    return this.get('thumbnail')
  },
  getCategory: function() {
    return getString(this.get('category'))
  }
})