import { red } from "@mui/material/colors";
import React, { useState, useEffect, Component } from "react";
import { Button } from "react-bootstrap";
import logo from "../logo.png";
import { COLORS } from "./css";
import "./App.css";

function Home(props) {
  const [registred, setRegistered] = useState(false);
  const [userId, setUserId] = useState(0);

  async function handleReg() {
    if (registred) {
      console.log("registred");
    } else {
      console.log("1st time registring");
    }
    await props.contract.methods
      .RegisterUser()
      .send({ from: props.account })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    setRegistered(true);
    window.localStorage.setItem(props.account, 1);
  }

  async function getUserId() {
    console.log("reg state", registred);
    const id = await props.contract.methods
      .GetUserId()
      .call({ from: props.account });
    // .then(function(res){
    //     //console.log(res);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    setUserId(JSON.stringify(id._hex).slice(3, 5));
    console.log("id after call-> ", userId);
    //console.log("new->", this.props.account)
    //return id._hex;
  }

  if (window.localStorage.getItem(props.account) !== 1) {
    return (
      <div
        style={{
          opacity: 0.8,
          backgroundSize: "cover",
          height: window.innerHeight,
          backgroundSize: window.innerWidth,
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(" +
            "https://www.assetservicingtimes.com/assetservicesnews/images/ThursdayNovember2520211637850769.jpg" +
            ")",
        }}
      >
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="h1">Vshare</h1>
                <h3 className="h3">
                  a Decentralized Ethereum DApp with IPFS Storage system{" "}
                </h3>

                <p>&nbsp;</p>

                <div>
                  <Button
                    value="Register"
                    variant="secondary"
                    onClick={handleReg}
                  >
                    Register here
                  </Button>
                </div>
                <div>
                  <p>address: {props.account} </p>
                </div>
                {/* <Button onClick={ console.log(this.state.assetCount)}>count</Button> */}
              </div>
            </main>
          </div>
        </div>
        )
      </div>
    );
  } //if
  else {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <p>Welcome Back!</p>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p>&nbsp;</p>
                {
                  //console.log("user id in home ", this.state.userId)
                }
                <div style={{ marginTop: 5 }}>
                  <Button onClick={getUserId}>Get Id</Button>
                </div>
                <div>
                  <p>
                    {" "}
                    user id: {userId} address: {props.account}{" "}
                  </p>
                </div>
                {/* <Button onClick={ console.log(this.state.assetCount)}>count</Button> */}
              </div>
            </main>
          </div>
        </div>
        )
      </div>
    );
  }
}

export default Home;
