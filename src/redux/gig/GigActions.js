import GigActionsTypes from './GigActionsTypes'

const listGig = gig => ({
  type: GigActionsTypes.LIST_GIG,
  payload: gig
})

const unlistGig = gig => ({
  type: GigActionsTypes.UNLIST_GIG,
  payload: gig
})

const deliver = gig => ({
  type: GigActionsTypes.DELIVER,
  payload: gig
})

const claimPayment = gig => ({
  type: GigActionsTypes.CLAIM_PAYMENT,
  payload: gig
})

const orderGig = gig => ({
  type: GigActionsTypes.ORDER_GIG,
  payload: gig
})

const cancelOrder = gig => ({
  type: GigActionsTypes.CANCEL_ORDER,
  payload: gig
})

const disputeGig = gig => ({
  type: GigActionsTypes.DISPUTE_GIG,
  payload: gig
})

const acceptDelivery = gig => ({
  type: GigActionsTypes.ACCEPT_DELIVERY,
  payload: gig
})

export {listGig, unlistGig, deliver, claimPayment, orderGig, cancelOrder, disputeGig, acceptDelivery}