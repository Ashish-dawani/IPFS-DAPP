import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip, Input } from "reactstrap";

// core components

function Download() {
  let hash;
  let url;
  return (
    <>
      <div
        className="section section-download"
        data-background-color="black"
        id="download-section"
      >
        <Container>
         <br></br>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="8">
              <h2>Want To Download File?</h2>
              <h5 className="description">
                 Put Your File Has Below To Download the file from ipfs server.
              </h5>
            </Col>
            <Col className="ml-auto mr-auto" md="7">
            <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter HASH HERE"
                      onChange = {(e)=> {hash=e.target.value;
                      url = "https://gateway.ipfs.io/ipfs/"+hash;}}
            ></Input>
            </Col>
            <Col md="12">
              <Button
                className="btn-neutral btn-round"
                color="info"
                size="lg"
                onClick={()=> {
                  if(url)
                  {
                    window.open(url, "_blank");
                  }
                  else
                  {
                    alert("Hash URL Error");
                  }
                }}
              >
               Download Now
              </Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Social Networks</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="github"
                href="#"
                id="tooltip331904895"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip331904895">
                Star on Github
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Download;
