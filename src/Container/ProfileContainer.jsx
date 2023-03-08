import React from 'react'
// import Button from '../Components/Common/Button'
import { withRouter } from 'react-router-dom'
import Stack from '../Components/Common/stack'
import Table from '../Components/Table';
import { msalConfig } from '../config/auth';
import apiEndpoints from '../constants/apiEndpoints';
import { PublicClientApplication } from '@azure/msal-browser';
import Button from '../Components/Common/Button';
import Text from '../Components/Common/Text';
import AppBar from '../Components/Common/AppBar';
import SearchBox from '../Components/Common/SearchBox';
import { debounce } from 'lodash';
// import { Button } from '@mui/material'

class ProfileContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataList:[],
      userDetails:{},
      token:'',
      counter:0,
      loading:false
    }
  }

  componentDidMount() {
    this.getData();
  }

  handleLogout = () => {
    const myMsal = new PublicClientApplication(msalConfig);
    myMsal
      .logoutPopup()
      .then(function (logoutResponse) {
        this.setState({token:''})
        localStorage.removeItem("token");
      })
      .catch(function (error) {
        //logout failure
        console.log("Logout error | ProfileContainer.js | Line no. 48",error);
      });
  };

  inputSearchHandler = debounce((e) => {
    this.getData(e);
   }, 500);


  getData = async (keyword="Miami") => {
    this.setState({loading:true});
    const headers = new Headers();
    let accessToken = localStorage.getItem("token");
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const res = await fetch(apiEndpoints.college.replace(":keyword",keyword), options);
      const result = await res.json();
      console.log("Api response | ProfileContainer.js | Line no. 67",result);
      this.setState({dataList:result??[],counter: this.state.counter + 1})
    } catch (error) {
      this.setState({dataList:[],counter: this.state.counter + 1})
      console.log("Api error | ProfileContainer.js | Line no. 71",error);
    }
    this.setState({loading:false})
  };

  columns = [
    { field: "name", headerName: "University name" },
    {
      field: "state-province",
      headerName: "Location",
      valueGetter: (v) => {
        return <Text>{v??'N/A'}</Text>;
      },
    },
    {
      field: "web_pages",
      headerName: "Website",
      valueGetter: (v) => {
        let link = v.length > 0 ? v[0] : "www.google.com"
        return <a target="_blank" href={link}>{link}</a>;
      },
    },
    {
      field: "country",
      headerName: "Country",
    },
  ];

  render() {
    return (
      <>
       
         
          {this.state.userDetails?.displayName ? (
            <Text sx={{ fontSize: 24, mt: 10,ml:3 }}>
              Hello {this.state.userDetails?.displayName}
            </Text>
          ) : null}
          <Stack justifyContent="center"
            alignItems="center" padding={0}>
              <AppBar
                style={{
                  background:"black",
                  padding:"10px"
                }}
                position="sticky"
                elevation={0}>
                   <Stack
                   
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                   >
                     <Text
                      sx={{
                        fontWeight:"bold"
                      }}
                     >
                     University Data
                     </Text>
                     <SearchBox onInputChange={this.inputSearchHandler} />
                     <Button color="primary" variant="contained" onClick={this.handleLogout}>
              Sign out
            </Button>
                   </Stack>
                </AppBar>
            
         {this.state.loading ? <Text>
           Loading Data...
         </Text> : <Table
            columns={this.columns}
            data={this.state.dataList}
            dataChangedCounter={this.state.counter}
            sx={{
              // minWidth: "400px",
              marginTop:"10px"
            }}
            th_sx={{
              p: "1px 10px",
              backgroundColor: "#F1F1F1",
              color: "#808591",
              borderRight: "1px solid #F1F1F1",
              fontWeight: "unset",
              fontSize: "12px",
            }}
            td_sx={{
              p: "10px",
              borderRight: "1px solid #F1F1F1",
              borderBottom: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />}

          
          </Stack>
  
      </>
    )
  }
}

export default withRouter(ProfileContainer)
