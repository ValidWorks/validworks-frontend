import moralis from 'moralis'
import GigContract from '../contract/GigContract'

import { Gig, Order } from './Models'
import { getErdAddrByUserId } from './UserUtils'

// Functions
export const createNewGig = async (thumbnail, title, price, deliveryTime, category, description, sellerId) => {
  const newGig = new Gig()
  
  newGig.set("thumbnail", thumbnail)
  newGig.set("title", title.toString())
  newGig.set("price", parseFloat(price))
  newGig.set("deliveryTime", parseFloat(deliveryTime))
  newGig.set("description", description.toString())
  newGig.set("category", category.toString())
  newGig.set("sellerId", sellerId.toString())
  newGig.set("status", "created")

  const gig = await newGig.save()

  // List the gig on chain
  const erdAddr = await getErdAddrByUserId(sellerId)
  const contract = new GigContract(erdAddr, gig.id)
  const deliveryNonce = deliveryTime * 14400
  contract.listGig(deliveryNonce, price)
    .then((reply) => {
      const txHash = reply.getHash().toString()
      gig.set("txHash", txHash)
      gig.set("status", "listed")
      return gig.save()
    })
    .catch((err) => {
      console.error("Error listing gig on chain: " + err);
    });
  
  return gig
}

export const editGig = async (gigId, title, price, deliveryTime, category, description) => {
  const gigQuery = new moralis.Query(Gig)
  const existingGig = await gigQuery.get(gigId)
  const result = existingGig.then((gig) => {
      console.log("Gig was retrieved successfully")
      gig.set("title", title)
      gig.set("price", price)
      gig.set("deliveryTime", deliveryTime)
      gig.set("description", description)
      gig.set("category", category)
      return gig.save()
    }, (error) => {
      console.log("Failed to retrieve Gig, with the error: ", error.message)
    })
  
  return result 
}

export const orderGig = async (gigId, buyerId, sellerId) => {
  // Find the seller address using the seller id
  const sellerErdAddr = await getErdAddrByUserId(sellerId)
  const price = selectGigById(gigId).then(gig => gig.getPrice())

  // order the gig onchain using erdjs
  const contract = new GigContract()
  await contract.sync()
  await contract.orderGig(sellerErdAddr, price)

  // get the status of the order using the elrond api
  const txHash = ""
  const status = "ordered"

  // add the order to the database as well as the status
  const newOrder = new Order()

  newOrder.set("gigId", gigId.toString())
  newOrder.set("buyerId", buyerId.toString())
  newOrder.set("sellerId", sellerId.toString())
  newOrder.set("txHash", txHash.toString())
  newOrder.set("status", status.toString())

  const order = await newOrder.save()

  return order
}

export const selectGigById = async (gigId) => {
  const gigQuery = new moralis.Query(Gig)
  try {
    const result = await gigQuery.get(gigId)
    return result
  } catch (error) {
    console.log("Failed to retrieve Gig, with the error: ", error.message)
  }
}

export const selectGigsByBuyerId = async (buyerId) => {
  // Buyer orders from the Order database
  // TODO: Should set ACL to only allow the buyer to query his own orders
  const orderQuery = new moralis.Query(Order)
  orderQuery.equalTo("buyerId", buyerId)
  const results = await orderQuery.find()

  return results
}

export const selectGigsBySellerId = async (sellerId) => {
  // Seller listings from the Gig database
  const gigQuery = new moralis.Query(Gig)
  gigQuery.equalTo("sellerId", sellerId)
  const results = await gigQuery.find()

  return results
}
