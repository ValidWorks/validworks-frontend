import { Button } from "react-bootstrap"

import { initCategories, initSubCategories } from "../../utils/MarketPlaceUtils"

const Init = () => {
  const onInit = () => {
    initCategories()
    initSubCategories()
  }
  
  return (
    <div>
      <h2>Initialise</h2>
      <Button variant="primary" onClick={onInit} disabled={true}>Initalise</Button>
    </div>
  )
}

export default Init