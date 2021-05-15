import { Redirect } from 'react-router-dom'

import Categories from './Categories'

import moralis from 'moralis'

const Explore = ()  => {
  const currentUser = moralis.User.current()

  if (!currentUser) {
    return <Redirect to='/auth'/>
  }

  return (
    <div>
      <h2>You are in the explore page.</h2>
      <Categories />
    </div>
  )
}

export default Explore;