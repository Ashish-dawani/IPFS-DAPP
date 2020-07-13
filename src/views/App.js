
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  Alert,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Progress,
  Modal,
  ModalBody
} from "reactstrap";
import React, { Component } from 'react';
//import logo from './logo.svg';
import Web3 from 'web3';
import ipfs from './ipfs';
import storehash from './storehash';
//header
//Setting Web3
const web3 = new Web3(window.web3.currentProvider);
class App extends Component {
  state = {
      ipfsHash:null,
  }
  constructor(props)
  {
    super(props);
    this.state = {
      viewHash: 'Waiting For Confirmation.',
      buffer:'',
      ethAddress:'',
      blockNumber:'0',
      transactionHash:'',
      gasUsed:'0',
      txReceipt: '',                  
      percent: 1,
      visible: 'none',
      message:'Choose File...',
      accessAlert: false,
      reminderAlert: false,
      successAlert: false,
      uploadAlert: false,
      errorAlert: false,
      modal: false,
      btnVisible: 'none',
      modelTxProcess: 'none'
                  };
  }
 
  updateProgress = () => {
    const min = 5;
    const max = 100;
    let rand = min + Math.floor(Math.random() * (max - min));
    if(rand > 50)
    {
      rand = rand-28;
    }
    let value = this.state.percent + rand;
    if(value > 100)
    {
      let temp = value-100;
      value = value-temp;
      clearInterval(this.interval);
    }
    this.setState({ percent: value });
    if(this.state.percent == 100)
    {
      setTimeout(() => this.setState({ visible: 'none' }),1650);
      setTimeout(() => this.setState({ reminderAlert: true }),1000);
      if(this.state.uploadAlert) this.setState({ uploadAlert: false });
    }
  };
  resetForm = () => {
    if(prompt("Are You Sure? Type Y"))
    {
    this.setState ({
      ipfsHash: '',
      viewHash: 'Waiting For Confirmation.',
      buffer:'',
      ethAddress:'',
      blockNumber:'0',
      transactionHash:'',
      gasUsed:'0',
      txReceipt: '',                  
      percent: 1,
      visible: 'none',
      message:'Choose File...',
      accessAlert: false,
      reminderAlert: false,
      successAlert: false,
      uploadAlert: false,
      errorAlert: false,
      modal: false,
      btnVisible: 'none',
      modelTxProcess: 'none'
      });
    }
  }
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let  value = event.target.value,
        message;
        message = value.split( '\\' ).pop();
        if(message) this.setState({...this.state,message});
        let reader = new window.FileReader()
        reader.onloadend = () => this.convertToBuffer(reader)    
        reader.readAsArrayBuffer(file)
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClick = async () => {
    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed}); 
        if(this.state.blockNumber)
        {
          this.setState({viewHash: this.state.ipfsHash});
        }   
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

    onSubmit = async (event) => {
      event.preventDefault();
      if(!this.state.buffer)
      {
        this.setState({ uploadAlert: true });
      }
      else if (window.ethereum) {
        this.setState({ visible: 'block' });
        this.interval = setInterval(() => {
           this.updateProgress();
         }, 300);
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            
                 //bring in user's metamask account address
                const accounts = await web3.eth.getAccounts();
              
                console.log('Sending from Metamask account: ' + accounts[0]);

                //obtain contract address from storehash.js
                const ethAddress= await storehash.options.address;
                this.setState({ethAddress});

                //save document to IPFS,return its hash#, and set hash# to state
                //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
                await ipfs.add(this.state.buffer, (err, ipfsHash) => {
                  console.log(err,ipfsHash);
                  //setState by setting ipfsHash to ipfsHash[0].hash 
                 
                 //This will Set The IPFS HASH
                 this.setState({ ipfsHash:ipfsHash[0].hash });

                  // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
                  //return the transaction hash from the ethereum contract
                  //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
                  
                  storehash.methods.sendHash(this.state.ipfsHash).send({
                    from: accounts[0]
                  }, (error, transactionHash) => {
                    if(!error)
                    {
                      this.setState({ errorAlert: false });
                      this.setState({ successAlert: true });
                      this.setState({transactionHash});
                      this.setState({ btnVisible: 'block' });
                      setTimeout(() => this.setState({ modal: true }), 1700);
                    }
                    else
                    {
                      this.setState({ errorAlert: true });
                      this.setState({ accessAlert: false });
                      this.setState({ reminderAlert: false });
                      this.setState({ successAlert: false });
                      console.log(error);
                    }

                  }); //storehash 
                }) //await ipfs.add 
        } catch (error) {
            if(error.code == 4001)
            {
              this.setState({ accessAlert: true });
            }
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
        this.setState({ successAlert: true })
    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

      
    }; //onSubmit 
    render() {
      
      return (
        <div>
        <Container>
        <Alert color="danger" isOpen={this.state.errorAlert}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Oh Snap!</strong> Something went wrong, Please report this error to us. Err-000<button
              type="button"
              className="close"
              onClick={() => this.setState({accessAlert: false})}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
        <Alert color="danger" isOpen={this.state.uploadAlert}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Alert!</strong> Please choose a file to upload before submitting.<button
              type="button"
              className="close"
              onClick={() => this.setState({uploadAlert: false})}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
        <Alert color="danger" isOpen={this.state.accessAlert}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons objects_key-25"></i>
            </div>
            <strong>Access Deined!</strong> Please allow DAPP to access metamask to process transaction.<button
              type="button"
              className="close"
              onClick={() => this.setState({accessAlert: false})}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
        <Alert color="warning" isOpen={this.state.reminderAlert}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons ui-1_bell-53"></i>
            </div>
            <strong>Reminder :</strong> IPFS Hash will be provided when the transaction gets atleast 1 confirmation. Thank You :)
            <button
              type="button"
              className="close"
              onClick={() => this.setState({reminderAlert: false})}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
        <Alert color="success" isOpen={this.state.successAlert}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons ui-2_like"></i>
            </div>
            <strong>Well done!</strong> Your transaction processed successfully, Thank You.
            <button
              type="button"
              className="close"
              onClick={() => this.setState({successAlert: false})}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form action="" className="form form-group" onSubmit={this.onSubmit}>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Upload
                  </CardTitle>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="github"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      <i className="now-ui-icons arrows-1_cloud-upload-94"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <InputGroup>
                    <InputGroupText text-align="center" style={{"width" : "100%"}}>
                    {this.state.message}
                      </InputGroupText>
                    <Input
                      type="file"
                      className="form-control"
                      onChange = {this.captureFile}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    type="submit"
                    size="lg"
                  > 
                  Submit
                  </Button>
              
              <div className="progress-container progress-neutral" style={{'margin':'1%','margin-top':'20px','display': this.state.visible}}>
              <span className="progress-badge">Uploading</span>
                <Progress animated max="100" value={this.state.percent} >
                  <span className="progress-value">{this.state.percent}%</span>
                </Progress>
              </div>
                </CardFooter>
              </Form>

            </Card>
          </Row>
        <div style={{display: this.state.btnVisible}}>
        <hr/>
          <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => this.setState({modal:false})}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Transaction Receipt</h4>
                </div>
                <ModalBody>
                <h5 >IPFS Hash : </h5>
                <h6 style={{textTransform:"none"}}>{this.state.viewHash}<span style={{float:"right"}} onClick={() => {navigator.clipboard.writeText(this.state.viewHash)}}><i className="now-ui-icons design_scissors"></i></span></h6>
                <h5 >Contract Address : </h5>
                <h6>{this.state.ethAddress}</h6>
                <hr/>
                <h5 >Txn ID : </h5>
                <h6>{this.state.transactionHash}</h6>
                <h5 >Block Number : <strong>{this.state.blockNumber}</strong></h5>
                <h5 >Gas Used : <strong>{this.state.gasUsed}</strong></h5>
                </ModalBody>
                <div className="modal-footer">
                <Button color="info" type="button" onClick = {this.onClick}> Get Txn Details </Button>
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => this.setState({modal:false})}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
              <Button onClick = {this.resetForm}> Reset Form </Button>
              <Button
                  color="primary"
                  className="mr-1"
                  onClick={() => this.setState({modal:true})}
                >
                  Get Transaction Receipt 
                </Button>
            </div>
        </Container>
    </div>
      );
    } //render
}

export default App;