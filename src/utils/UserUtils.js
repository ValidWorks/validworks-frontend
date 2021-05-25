import moralis from "moralis";

const getProfilePhotoUrl = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = query.get(userId);
  const profilePhotoUrl = result.then((user) => {
    return user.get("profilePhoto");
  });

  return profilePhotoUrl;
};

const getEmailByUserId = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = query.get(userId);
  return result.then((user) => {
    return user.get("email");
  });
};

const getUserById = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = query.get(userId);
  return result.then((user) => {
    return user;
  });
};

const updateProfile = async (user, username, email, profilePhoto) => {
  user.setUsername(username);
  user.set("email", email);
  user.set("profilePhoto", profilePhoto);

  await user.save();
};

const getErdAddrByUserId = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = query.get(userId);
  const erdAddr = result.then((user) => {
    return user.get("erdAddress");
  });

  return erdAddr;
};

const getErdAddrByUser = (user) => {
  return user.get("erdAddress");
};

export {
  getProfilePhotoUrl,
  updateProfile,
  getErdAddrByUserId,
  getErdAddrByUser,
  getEmailByUserId,
  getUserById,
};
