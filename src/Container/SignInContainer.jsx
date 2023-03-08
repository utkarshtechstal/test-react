import React from 'react'
import Text from '../Components/Common/Text'
import { withRouter } from 'react-router-dom'
import Stack from '../Components/Common/stack'
import Button from '../Components/Common/Button'
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from '../config/auth'
import AuthSideView from '../Components/SignIn/AuthSideView'

class SignInContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token:''
    }
  }

  componentDidMount(){
    let authToken = localStorage.getItem("token");
    if(authToken!=null) this.props.history.push("/profile");
  }

  handleSignIn = async ()=>{
    const myMsal = new PublicClientApplication(msalConfig);

    try{
      let loginResponse = await myMsal
      .loginPopup(loginRequest);
      const token = loginResponse.accessToken;
        this.setState({token:token})
        localStorage.setItem("token", token);
        this.props.history.push("/profile");

    }catch(error){
      console.log("Login error | SignInContainer.js | Line no. 36",error);
    }
  }

  render() {
    return (
      <>
        <Stack
           direction="row"
           justifyContent="center"
           alignItems="center"
        >
        <AuthSideView/>
          
          <Stack
           direction="column"
           justifyContent="center"
           alignItems="center"
           sx={{
             position:"relative",
             right:20
           }}
        >
          <Text sx={{
            marginBottom:"30px"
          }}>
            Welcome! Glad that you landed here. We have best colleges for your future. Please login to check colleges .
          </Text>
          <Button
            onClick={this.handleSignIn}
          >
            Sign In
          </Button>
          </Stack>
        </Stack>
      </>
    )
  }
}

export default withRouter(SignInContainer)
