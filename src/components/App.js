import React, {Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Vshare from '../abis/Vshare.json'
import { create } from 'ipfs-http-client';
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,Link
} from "react-router-dom";

import { Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import { useAlert } from 'react-alert';
//import Alert from '@mui/material';
import Request from './Requests';
import Home from './Home';

// const ipfsclient = require('ipfs-http-client')
// const ipfs = ipfsclient({host: 'ipfs.infura.io', port: 5001, protocol:'https'})
const client = create({host:'ipfs.infura.io',port:5001, protocol:'https'} )
//console.log(client)



class App extends Component {

  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    //await this.GetUserId()
    //await this.GetAssetCount()
    await this.ReadAsset()
   
    //await this.handleReg()
    
    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0]);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    console.log("---->", accounts);
    const networkData = Vshare.networks[networkId];
    //console.log(".......", Vshare.networks);
    if(networkData) {
      //console.log("abi",Vshare.abi)
      const address = networkData.address;
      const contract = await web3.eth.Contract(Vshare.abi, address)
      
      this.setState({ contract })
      
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }  
  }


  constructor(props){
    super(props);
    this.state={
      Registred: false,
      buffer: null,
      contract: null,
      ipfshash: '',
      account: null,
      assettype: "",
      AllAssets: [],
      userId: 0,
      Reqs: [],
      assetId:"",
      requserId:"",
      assetCount:-1,
    }
    this.handleType = this.handleType.bind(this);
    this.handleAssetId = this.handleAssetId.bind(this);
    this.handleUserId = this.handleUserId.bind(this);
    this.ReadAsset = this.ReadAsset.bind(this);
    
    //this.Home = this.Home.bind(this);
    this.Add = this.Add.bind(this);
    this.Reqs = this.Reqs.bind(this);
    this.requestForm = this.requestForm.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.Requests = this.Requests.bind(this);
    this.MyAssets = this.MyAssets.bind(this);
    
  };


  captureFile = (event) =>{
    event.preventDefault()
    console.log("file captured")
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
      console.log('buffer', this.state.buffer)
    }


  }
//https://ipfs.infura.io/ipfs/..hash
   onSubmit = async (event) =>{
    event.preventDefault()
    console.log("submitting asset to IPFS", this.state.buffer)
    console.log("Type: ", this.state.assettype)
    const { cid } = await client.add(this.state.buffer, (error, result)=>{
      if(error){
        console.log("error uploading file to ipfs");
        window.alert("error uploading file to ipfs!");
       
      }
    })
    this.setState({ ipfshash: cid._baseCache.get('z')})
    this.state.contract.methods.AddAsset(this.state.ipfshash, this.state.assettype).send({ from: this.state.account }, function(error, result){
      if(error){ window.alert("error uploading asset to blockchain")}
      else{
        window.alert("successfully uploaded asset to blockchain")
      }
    })
    
    //console.log("hash-> ", cid._baseCache.get('z'));
    window.alert("successfuly uploaded asset to IPFS");
    console.log("hash after ipfs upload: ", this.state.ipfshash)
    }
  
  
  
  ReadAsset = async ()=>{
    
    console.log("reading asset from blockchain")
    //console.log(this.state.account);
    const assets = await this.state.contract.methods.ListAssets().call({from:this.state.account})
  //   , function(error, result){
  //     if(error){
  //     console.log('error: ' + error);
  //     window.alert("error reading assets from blockchain")
  //     return
  //     }
  //     else{
  //       window.alert("succesfully read assets from blockchain")
  //       console.log("res-> ",result[0].hash);
        
  //       //this.setState({AllAssets: assets})
  //       //return result;
  //     }      
  // })
  console.log("resfr",assets);
  if(assets.length !== 0){
  this.setState({AllAssets: [...this.state.AllAssets, ...assets]});
  }
   
  }

  GetAssetCount = async () => {
    const count = await this.state.contract.methods.GetAssetCount().call({from:this.state.account})
    
    console.log("count-", count);
    this.setState({assetCount: count})

  }

   


  handleType(event) {
    this.setState({assettype: event.target.value});
  }
  handleAssetId(event){
    this.setState({assetId: event.target.value})
  }
  handleUserId(event){
    this.setState({requserId: event.target.value})
  }

  Add = ()=>{
    return(
      <div style={{marginTop:110}}>
        <p>&nbsp;</p>
        <h3 className="h3">Asset types</h3>
        <ul>
          <li>1. word documents</li>
          <li>2. images and gifs</li>
          <li>3. videos</li>
        </ul>
          <h3 className="h3">Add Assets! </h3>
          <p>&nbsp;</p>
         
          <Form onSubmit={this.onSubmit}>
          
          <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>choose file to upload to IPFS</Form.Label>
           <Form.Control type="file" onChange={this.captureFile} />
          </Form.Group>

          <Form.Control width='2' as="select" aria-label="Default select example" onChange={this.handleType}>
          <option>Asset Type</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
           </Form.Control>
           <p>&nbsp;</p>
           <Button variant="primary" type="submit">
            Submit
          </Button>

          </Form>
          
    
          {/* <form onSubmit={this.onSubmit}>  
            <input type='file' onChange={this.captureFile} />
            <label >
              Asset type: 
              <input type='text' value={this.state.assettype} onChange={this.handleType}/>
            </label>
            
            <p>&nbsp;</p>
            <input type='submit'/>


          </form> */}
      </div>
      
    )
  }

  

  Reqs = async ()=>{
    const Reqs = await this.state.contract.methods.ListRequests().call({from:this.state.account})

    this.setState({Reqs: [...this.state.Reqs, ...Reqs]});
  }

  

  Requests= ()=>{
    
    return(
      <div>
        <h2>Requests</h2>
        <p>&nbsp;</p>
        {console.log("all-> ", this.state.Reqs)}
      
      {this.state.Reqs.map((item, index)  => (

        
        <><Card style={{ width: '18rem' }}>
        <Card.Img variant="top" height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" />
        <Card.Body>
          <Card.Title>Request #{index+1}</Card.Title>
          <Card.Text>
            Asset type: {JSON.stringify(item).slice(11,13)}
          </Card.Text>
          <Button variant="primary"><a href={`https://ipfs.infura.io/ipfs/${item.hash}`}></a> Link</Button>
        </Card.Body>
      </Card><p>&nbsp;</p></>
         ))}

      </div>
      
    );

  }

  sendRequest = async()=>{
   console.log("pars->", this.state.assetId, this.state.requserId)
    await this.state.contract.methods.RequestAsset(this.state.assetId, this.state.requserId).send({ from: this.state.account }, function(error, result){
      if(error){ window.alert("error sending asset request")}
      else{
        window.alert("successfully sent request")
      }
    })
  }

  requestForm = ()=>{
    return(
      <div style={{marginTop:110}}>
        <p>&nbsp;</p>
        <p>Request Form</p>
        <p>&nbsp;</p>
       
        <Form onSubmit={this.sendRequest}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Id of Asset</Form.Label>
    <Form.Control type="text" placeholder="i.e. '1' " value={this.state.assetId} onChange={this.handleAssetId}/>
    <Form.Text className="text-muted">
      Enter a valid Id
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>User Id</Form.Label>
    <Form.Control type="text" placeholder="i.e. '2'" value={this.state.requserId} onChange={this.handleUserId} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
          {/* <form onSubmit={this.sendRequest}>  
            <label >
              Asset id: 
              <input type='text' value={this.state.assetId} onChange={this.handleAssetId}/>
            </label>
            <label >
              User id: 
              <input type='text' value={this.state.requserId} onChange={this.handleUserId}/>
            </label>
            
            <p>&nbsp;</p>
            <input type='submit'/>


          </form> */}
      </div>
    )}

  GetUserId = async ()=>{
    const id = await this.state.contract.methods.GetUserId().call({from:this.state.account})
    this.setState({userId: id._hex})
       
    console.log("in in call ", id._hex)
    
   
  }


  MyAssets = ()=>{
    return(
      <div style={{marginTop:110}}>
        <h3 className="h3">Assets list</h3>
        <p>&nbsp;</p>
        {console.log("all-> ", this.state.AllAssets)}
        

      {this.state.AllAssets.map((item, index)  => (

        
        <><Card key={item} style={{ width: '18rem' }}>
        <Card.Img variant="top" height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" />
        <Card.Body>
          <Card.Title>Asset #{index+1}</Card.Title>
          <Card.Text className="pp">
            Asset type: {JSON.stringify(item.Atype).slice(11,13)}
          </Card.Text>
          
         <a className="link" href={`https://ipfs.infura.io/ipfs/${item.hash}`}>Link</a> 
        </Card.Body>
      </Card><p>&nbsp;</p></>
         ))}
        {/* <ul>
          {this.state.AllAssets.map(item => (

            
            <><li key={item}>Asset type: {JSON.stringify(item.Atype)}
            </li> <a href={`https://ipfs.infura.io/ipfs/${item.hash}`}>click to see</a></>
          ))}
        </ul> */}

      </div>
      
    );
  }

  render() {
    return (
      <div>


       {/* <Navbar bg="dark" variant="dark" expand="lg">
       <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/Add">Add Assets</Nav.Link>
        <Nav.Link href="/Requests">Requests</Nav.Link>
        <Nav.Link href="/Assets">MyAssets</Nav.Link>
        
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/RequestForm">Request Asset</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Help</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
         </NavDropdown>
       </Nav>
      </Navbar.Collapse>
         </Container>
  </Navbar> */}
<Router>
<Navbar expand="md" className="custom-nav-bg fixed-top">
        <Navbar.Brand expand="lg" href="#home">
        <Link to="/"><img className="custom-nav-logo"
            src={logo}
            alt="StatHero Logo"
            width="80px"
            height="50px"
          /></Link>
        </Navbar.Brand>
        <Nav className="collapse navbar-collapse mr-auto justify-content-end">
          
          <Nav.Link className="custom-nav-text" href="/">
          <Link to="/">Home</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="/Add">
          <Link to="/Add">Add Assets</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="/Requests">
          <Link to="/Requests">Requests</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="/Assets">
          <Link to="/Assets">My Assets</Link>
          </Nav.Link>

          <Nav.Link className="custom-nav-text" href="/RequestForm">
          <Link to="/Requestform">Send request</Link>
          </Nav.Link>
          <p style={{}}>address: {this.state.account}</p>

        </Nav>

    </Navbar>

    <Routes>
                                
        <Route exact path ='/' element={<Home contract= {this.state.contract} account={this.state.account}></Home>} />
        <Route exact path ='/Add' element={<this.Add/>} />
        <Route exact path ='/Requests' element={<this.Requests/>} />
        <Route exact path ='/Assets' element={<this.MyAssets/>} /> 
        <Route exact path = '/RequestForm' element={<this.requestForm/>}/>   
        </Routes>  

</Router>

      </div>
      
    );
  }
  

}

export default App;
