import React from "react";
// reactstrap components
import {
    Container,
    Row,
    Col
  } from "reactstrap";

  function WhoAreWe()
  {
    return(
      <div className="section section-about-us" id="about-section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h2 className="title">What is IPFS?</h2>
            <h5 className="description">
            The InterPlanetary File System is a protocol
            and peer-to-peer network for storing and sharing data in a 
            distributed file system. IPFS uses content-addressing to uniquely 
            identify each file in a global namespace connecting all computing devices.
            </h5>
          </Col>
        </Row>
        <div className="separator separator-primary"></div>
        <div className="section-story-overview">
          <Row>
            <Col md="6">
              <div
                className="image-container image-left"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/ipfs-eth.png") + ")",
                }}
              >
                <p className="blockquote blockquote-info">
                  "The Web as I envisaged it, we have not seen it yet. 
                  The future is still so much bigger than the past" <br></br>
                  <br></br>
                  <small>-Tim Berners-Lee</small>
                </p>
              </div>
             
            </Col>
            <Col md="5">
              <div
                className="image-container image-right"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/react_blue.png") + ")"
                }}
              ></div>
              <h3>
                So what does the new record for the lowest level of winter
                ice actually mean
              </h3>
              <p>
                The Arctic Ocean freezes every winter and much of the
                sea-ice then thaws every summer, and that process will
                continue whatever happens with climate change. Even if the
                Arctic continues to be one of the fastest-warming regions of
                the world, it will always be plunged into bitterly cold
                polar dark every winter. And year-by-year, for all kinds of
                natural reasons, there’s huge variety of the state of the
                ice.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
    );

  } 
  export default WhoAreWe;