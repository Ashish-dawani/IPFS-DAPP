import React from "react";
// import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="#home"
              id="navbar-brand"
            >
              HOME
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Designed And Coded by Ashish/Fasih/Salman
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
            <NavItem>
                <NavLink
                  href="#about"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("about-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons travel_info"></i>
                  <p>About IPFS</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#team"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("team-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons users_circle-08"></i>
                  <p>Team</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#tab"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("download-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Download</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  href="landing-page"
                  color="info"
                  id="upgrade-to-pro"
                >
                  
                  <p><i className="now-ui-icons arrows-1_cloud-upload-94"></i>  Upload</p>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
