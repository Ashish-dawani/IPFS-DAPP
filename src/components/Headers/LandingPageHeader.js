import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header  page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header-ipfs.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Looking for our git 
            repository?</h1>
            <div className="text-center">
            <i className="fas fa-arrow-down" style={{fontSize:30,marginTop:35}}></i>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
