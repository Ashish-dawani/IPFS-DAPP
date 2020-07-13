/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
              >
                Blockchain Project
              </a>
            </li>
            <li>
              <a
                href="#team"
                target="_blank"
              >
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="#"
            target="_blank"
          >
            Team_BLN
          </a>
          . Coded by{" "}
          <a
            href="#"
            target="_blank"
          >
            Ashish/Fasih/Salman
          </a>
          .
        </div>
      </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
