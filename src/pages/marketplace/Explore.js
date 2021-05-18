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
      <h2>Explore</h2>
      <hr/>
      <Categories />
    </div>
  )
}

export default Explore;