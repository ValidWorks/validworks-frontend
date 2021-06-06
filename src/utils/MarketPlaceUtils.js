import moralis from 'moralis'

import { Gig, Category, SubCategory } from './Models'
import { GIG_CATEGORIES } from '../data/marketplace.data'

// Functions
export const initCategories = async () => {
  const cats = Object.keys(GIG_CATEGORIES)

  for (let cat of cats) {
    const newCat = new Category()

    newCat.set("title", cat)
    newCat.set("thumbnail", null)
    
    await newCat.save()
  }
}

export const initSubCategories = async () => {
  const cats = Object.keys(GIG_CATEGORIES)

  for (let cat of cats) {
    for (let sub of GIG_CATEGORIES[cat]) {
      const newSub = new SubCategory()

      newSub.set("title", sub)
      newSub.set("thumbnail", null)
      newSub.set("category", cat)

      await newSub.save()
    }
  }
}

export const getGigListings = async () => {
  const gigQuery = new moralis.Query(Gig)
  gigQuery.limit(100)
  const results = gigQuery.find()
  
  return results
}

export const getGigListingsBySub = async (sub) => {
  const gigQuery = new moralis.Query(Gig)
  gigQuery.equalTo("SubCategory", sub)
  gigQuery.limit(100)
  const results = gigQuery.find()
  
  return results
}

export const getGigCategories = async () => {
  const catQuery = new moralis.Query(Category)
  catQuery.limit(10)
  const results = catQuery.find()
  
  return results
}

export const getGigSubCategories = async (cat) => {
  const subQuery = new moralis.Query(SubCategory)
  subQuery.equalTo("category", cat)
  const results = subQuery.find()
  
  return results
}

export const getAllGigSubCategories = async (cat) => {
  const subQuery = new moralis.Query(SubCategory)
  subQuery.limit(100)
  const results = subQuery.find()
  
  return results
}