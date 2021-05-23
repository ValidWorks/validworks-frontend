import moralis from 'moralis'

export const getProfilePhotoUrl = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = await query.get(userId);
  const profilePhotoUrl = result.then((user) => {
    return user.get("profilePhoto")
  })

  return profilePhotoUrl
}

export const updateProfile = async (user, username, email, profilePhoto) => {
  user.setUsername(username)
  user.set("email", email)
  user.set("profilePhoto", profilePhoto)

  await user.save()
}

export const getErdAddrByUserId = async (userId) => {
  const query = new moralis.Query(moralis.User);
  const result = query.get(userId);
  const erdAddr = result.then((user) => {
    return user.get("erdAddress")
  })

  return erdAddr
}

export const getErdAddrByUser = (user) => {
  return user.get("erdAddress")
}
