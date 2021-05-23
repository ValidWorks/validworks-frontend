import moralis from "moralis";

import { GIG_CATEGORIES } from "../data/marketplace.data.js";

// Database Objects
const Category = moralis.Object.extend("Category", {
  getId: function() {
    return this.id.toString();
  },
  getTitle: function() {
    return this.get("title").toString();
  },
  getThumbnail: function() {
    return this.get("thumbnail");
  },
});

const SubCategory = moralis.Object.extend("SubCategory", {
  getId: function() {
    return this.id.toString();
  },
  getTitle: function() {
    return this.get("title").toString();
  },
  getThumbnail: function() {
    return this.get("thumbnail");
  },
  getCategory: function() {
    return this.get("category");
  },
});

// Functions
const initCategories = async () => {
  const cats = Object.keys(GIG_CATEGORIES);

  for (let cat of cats) {
    const newCat = new Category();

    newCat.set("title", cat);
    newCat.set("thumbnail", null);

    await newCat.save();
  }
};

const initSubCategories = async () => {
  const cats = Object.keys(GIG_CATEGORIES);

  for (let cat of cats) {
    for (let sub of GIG_CATEGORIES[cat]) {
      const newSub = new SubCategory();

      newSub.set("title", sub);
      newSub.set("thumbnail", null);
      newSub.set("category", cat);

      await newSub.save();
    }
  }
};

const getListings = () => {};

const getGigCategories = async () => {
  const catQuery = new moralis.Query(Category);
  catQuery.limit(10);
  const results = await catQuery.find();

  return results;
};

const getGigSubCategories = async (cat) => {
  const subQuery = new moralis.Query(SubCategory);
  subQuery.equalTo("category", cat);
  const results = await subQuery.find();

  return results;
};

const getAllGigSubCategories = async (cat) => {
  const subQuery = new moralis.Query(SubCategory);
  subQuery.limit(100);
  const results = await subQuery.find();

  return results;
};

export {
  initCategories,
  initSubCategories,
  getListings,
  getGigCategories,
  getGigSubCategories,
  getAllGigSubCategories,
};
