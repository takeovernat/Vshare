import React, { useEffect, useState } from "react";
import logo from "../logo.png";
import "./App.css";
import Web3 from "web3";
import Vshare from "../abis/Vshare.json";
import { create } from "ipfs-http-client";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Buffer } from "buffer";
import Requests from "./Requests";
import MyAssets from "./MyAssets";
import RequestForm from "./RequestForm";
import Add from "./Add";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAlert } from "react-alert";
//import Alert from '@mui/material';
import Home from "./Home";

const projectId = "22a59a28932a40b5b875bd4786f93bec";
const projectSecret = "ced617de927c46b3b65029b60246eed1";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
// const ipfsclient = require('ipfs-http-client')
// const ipfs = ipfsclient({host: 'ipfs.infura.io', port: 5001, protocol:'https'})
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
//console.log(client)
function App() {
  const [registered, setRegistered] = useState(false);
  const [buffer, setBuffer] = useState(null);
  const [contract, setContract] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [account, setAccount] = useState(null);
  const [assetType, setAssetType] = useState("");
  const [allAssets, setAllAssets] = useState([]);
  const [userId, setUserId] = useState(0);
  const [requests, setRequets] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [requestId, setRequetId] = useState("");
  const [assetCount, setAssetCount] = useState(0);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    //await this.GetUserId()
    //await this.GetAssetCount()
    //ReadAsset();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log("---->", accounts);
    const networkData = Vshare.networks[networkId];
    //console.log(".......", Vshare.networks);
    if (networkData) {
      console.log("abi", Vshare.abi);
      const address = networkData.address;
      const localcontract = await new web3.eth.Contract(Vshare.abi, address);

      setContract(localcontract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  const captureFile = (event) => {
    event.preventDefault();
    console.log("file captured");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log("buffer", buffer);
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting asset to IPFS", buffer);
    console.log("Type: ", assetType);
    const { cid } = await client.add(buffer, (error, result) => {
      if (error) {
        console.log("error uploading file to ipfs");
        window.alert("error uploading file to ipfs!");
      }
    });
    setIpfsHash(cid._baseCache.get("z"));
    contract.methods
      .AddAsset(ipfsHash, assetType)
      .send({ from: account }, function (error, result) {
        if (error) {
          window.alert("error uploading asset to blockchain");
        } else {
          window.alert("successfully uploaded asset to blockchain");
        }
      });

    //console.log("hash-> ", cid._baseCache.get('z'));
    window.alert("successfuly uploaded asset to IPFS");
    console.log("hash after ipfs upload: ", ipfsHash);
  };

  const ReadAsset = async () => {
    console.log("reading asset from blockchain");
    //console.log(this.state.account);
    const assets = await contract.methods.ListAssets().call({ from: account });
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
    console.log("resfr", assets);
    if (assets.length !== 0) {
      setAllAssets([...allAssets, ...assets]);
    }
  };

  const GetAssetCount = async () => {
    const count = await contract.methods
      .GetAssetCount()
      .call({ from: account });

    console.log("count-", count);
    setAssetCount(count);
  };

  function handleType(event) {
    setAssetType(event.target.value);
  }
  function handleAssetId(event) {
    setAssetId(event.target.value);
  }
  function handleUserId(event) {
    setRequetId(event.target.value);
  }

  const Reqs = async () => {
    const Reqs = await contract.methods.ListRequests().call({ from: account });

    setRequets([...requests, ...Reqs]);
    this.setState({ Reqs: [...this.state.Reqs, ...Reqs] });
  };

  //check requestid
  const sendRequest = async () => {
    console.log("pars->", assetId, requestId);
    await contract.methods
      .RequestAsset(assetId, requestId)
      .send({ from: account }, function (error, result) {
        if (error) {
          window.alert("error sending asset request");
        } else {
          window.alert("successfully sent request");
        }
      });
  };

  const GetUserId = async () => {
    const id = await contract.methods.GetUserId().call({ from: account });
    setUserId(id._hex);
    console.log("id in call ", id._hex);
  };

  return (
    <div>
      <Router>
        <Navbar expand="md" className="custom-nav-bg fixed-top">
          <Navbar.Brand expand="lg" href="#home">
            <Link to="/">
              <img
                className="custom-nav-logo"
                src={logo}
                alt="StatHero Logo"
                width="80px"
                height="50px"
              />
            </Link>
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
            <p style={{}}>address: {account}</p>
          </Nav>
        </Navbar>

        <Routes>
          <Route
            exact
            path="/"
            element={<Home contract={contract} account={account}></Home>}
          />
          <Route
            exact
            path="/Add"
            element={
              <Add
                onSubmit={onSubmit}
                captureFile={captureFile}
                handleType={handleType}
              />
            }
          />
          <Route
            exact
            path="/Requests"
            element={<Requests requests={requests} />}
          />
          <Route
            exact
            path="/Assets"
            element={<MyAssets allAssets={allAssets} />}
          />
          <Route
            exact
            path="/RequestForm"
            element={
              <RequestForm
                sendRequest={sendRequest}
                assetId={assetId}
                handleAssetId={handleAssetId}
                userId={handleAssetId}
                handleUserId
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
