import { useMoralis } from "react-moralis";

import {
  Alert,
  CloseButton,
} from 'react-bootstrap';

import Login from '../../components/Login/login';
import SignUp from '../../components/SignUp/signup';

function Auth() {
  const { authError } = useMoralis();

  return (
    <div>
      {authError && (
        <Alert status="error">
          <Alert.Heading>Authentication has failed</Alert.Heading>
          <p display="block">{authError.message}</p>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      <SignUp />
      <p textAlign="center">
        <em>or</em>
      </p>
      <Login />
    </div>
  );
};

export default Auth;