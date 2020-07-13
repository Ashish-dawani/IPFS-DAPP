import React from "react";

// reactstrap components
import {
  Button,
  Container,
  UncontrolledTooltip
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import AppForm from '../App.js'

function LandingPage() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-contact-us text-center">
          <Container>
          <div className="button-container">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" ><Button
                className="btn-round btn-icon"
                color="info"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-github"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Github Repository
              </UncontrolledTooltip>
              </a>
            </div>
            <h2 className="title">Upload Your Files</h2>
            <p className="description">Your documents will be safely stored on IPFS network once the transaction is completed!</p>
            <AppForm/>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
