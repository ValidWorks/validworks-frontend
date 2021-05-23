import { Button } from "react-bootstrap";

const Init = () => {
  return (
    <div>
      <h2>Initialise</h2>
      <Button variant='primary' onClick={onInit} disabled={true}>
        Initalise
      </Button>
    </div>
  );
};

export default Init;
