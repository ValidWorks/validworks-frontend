import { useHistory } from 'react-router-dom'
import moralis from 'moralis'

const Logout = () => {
  const history = useHistory()

  moralis.User.logOut()
    .then(() => {
      const currentUser = moralis.User.current()
      console.log(currentUser)
      console.log("User logged out")
      history.push('/')
    })
  
  return (<h2>Logout</h2>)
}

export default Logout