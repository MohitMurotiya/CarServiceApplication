import React from "react";
import "./Contact.css";
import { Card, CardContent } from "@material-ui/core";

function Contact() {
  return (
    <div className="container">
      <h1 className="text-center">We're all Listening!</h1>

      <div className="contact-details">
        <div className="row_container">
          <div className="row">
            <div className="column">
              <Card>
                <CardContent>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <h2>Call Us</h2>
                  <h5>+91 62 6262 8520</h5>
                </CardContent>
              </Card>
            </div>
            <div className="column">
              <Card>
                <CardContent>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  </svg>
                  <h2>Our Office</h2>
                  <h5>Chittorgarh, Rajasthan</h5>
                </CardContent>
              </Card>
            </div>
            <div className="column">
              <Card>
                <CardContent>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <h2>Send Us Mail</h2>
                  <h5>mohitmurotiya98@gmail.com</h5>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
