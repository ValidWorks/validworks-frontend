const Moralis = require('moralis')

const createNewGig = (title, price, category, description, sellerId) => {
  const Gig = Moralis.Object.extend("Gig")
  const newGig = new Gig()
  
  newGig.set("title", title.toString())
  newGig.set("price", parseFloat(price))
  newGig.set("description", description.toString())
  newGig.set("category", category.toString())
  newGig.set("sellerId", sellerId.toString())

  const gigId = newGig.save()
  .then((newGig) => {
    console.log("New Gig created with the gigId: ", newGig.id)
    return newGig.id.toString()
  }, (error) => {
    console.error("Failed to create new Gig, with the error: ", error.message)
  })

  return gigId
}

const editGig = (gigId, title, price, category, description) => {
  const Gig = Moralis.Object.extend("Gig")
  const gigQuery = new Moralis.Query(Gig)
  gigQuery.get(gigId)
  .then((gig) => {
    console.log("Gig was retrieved successfully")
    gig.set("title", title)
    gig.set("price", price)
    gig.set("description", description)
    gig.set("category", category)
  }, (error) => {
    console.log("Failed to retrieve Gig, with the error: ", error.message)
  })
}

const selectGigById = (gigId) => {
  const Gig = Moralis.Object.extend("Gig", {
    getId: function() {
      return this.getId().toString()
    },
    getTitle: function() {
      return this.get('title').toString()
    },
    getPrice: function() {
      return this.get('price').toString()
    },
    getSeller: function() {
      return this.get('sellerId').toString()
    },
    getDesc: function() {
      return this.get('description').toString()
    },
    getCategory: function() {
      return this.get('category').toString()
    }

  })
  const gigQuery = new Moralis.Query(Gig)
  try {
    const result = gigQuery.get(gigId)
    return result
  } catch (error) {
    console.log("Failed to retrieve Gig, with the error: ", error.message)
  }
}

const selectGigsByBuyerId = (buyerId) => {

}

const selectGigsBySellerId = (sellerId) => {

}

export { createNewGig, editGig, selectGigById, selectGigsByBuyerId, selectGigsBySellerId }