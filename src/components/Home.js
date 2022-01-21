import { red } from '@mui/material/colors';
import React, {useState, useEffect, Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from '../logo.png';
import {COLORS} from './css';
import './App.css'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            Registred:false,
            userId:0,
            
        }
       this.handleReg = this.handleReg.bind(this);
       this.GetUserId = this.GetUserId.bind(this);

    }
    
    async componentWillMount(){
       // this.GetUser()
                  
    }
        
    

    handleReg = async () => {
       
        this.state.Registred ? console.log("already reg") : console.log("reging 1st time")
        //console.log("meth-> ", this.state.contract.methods)//.jsonInterface.abi.methods.RegisterUser)
        await this.props.contract.methods.RegisterUser().send({from:this.props.account}).then(function(res){
         //console.log(res);
     }).catch(function(err) {
         console.log(err);
     });
        this.setState({Registred:true});
        window.localStorage.setItem(this.props.account, 1);
        
     
     }
    //  GetUser = async () =>{
    //     const n = window.localStorage.getItem(this.props.account);
    //     console.log("n ", n, this.props.account)
    //     if(n === 1){this.setState({Registred:true})}

    //  }

     GetUserId = async () => {
         console.log(this.state.Registred)
            const id = await this.props.contract.methods.GetUserId().call({from:this.props.account})
            // .then(function(res){
            //     //console.log(res);
            // }).catch(function(err) {
            //     console.log(err);
            // });
            this.setState({userId: JSON.stringify(id._hex).slice(3,5) })
            console.log("id after call-> ", this.state.userId)
            //console.log("new->", this.props.account)
            //return id._hex;

        

     }

    render() {
        {console.log(this.props.account)}
        {console.log("status-> " ,this.state.Registred)}
        if(window.localStorage.getItem(this.props.account) !== 1){
      return (
        <div style={{ opacity:0.8, backgroundSize: 'cover', height: window.innerHeight, backgroundSize:window.innerWidth, backgroundRepeat: 'no-repeat',  backgroundImage: "url(" + "https://www.assetservicingtimes.com/assetservicesnews/images/ThursdayNovember2520211637850769.jpg" + ")"}}>
        <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <h1 className="h1" >Vshare</h1>
            <h3 className="h3" >a Decentralized Ethereum DApp with IPFS Storage system </h3>
           
            <p>&nbsp;</p>
            
            <div>
            
            <Button value="Register"  variant="secondary" onClick={ this.handleReg}>Register here</Button>
              
            
                
            </div>
            <div>
        
               <p>address: {this.props.account} </p>
              
              </div>
              {/* <Button onClick={ console.log(this.state.assetCount)}>count</Button> */}
          </div>
        </main>
      </div>
    </div>
    )
          
        </div>
      );
        }//if

        else{
            return (
                <div>
                      <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                      <p>Welcome Back!</p>
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={logo} className="App-logo" alt="logo" />
                    </a>
                    <p>&nbsp;</p>
                    {//console.log("user id in home ", this.state.userId)
                    }
                    <div style={{marginTop:5}}>
                    <Button onClick={this.GetUserId}>Get Id</Button>
                    </div>
                    <div>
                
                       <p> user id: {this.state.userId} address: {this.props.account} </p>
                      
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
    
  
  }
  export default Home;