import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  // lets the clickable <p> items work with the keyboard too
  const onKey = (path) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router(path);
    }
  };
  {
    /* <Link to="/home" className="connecta-auth-logo" aria-label="CONNECTA">
            <span className="connecta-logo-icon">C</span>
            <span className="connecta-logo-text">CONNECTA</span>
          </Link> */
  }
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <Link to="/home" className="connecta-auth-logo" aria-label="CONNECTA">
            <img
              src="/ConnectaLogo.png"
              alt="CONNECTA"
              className="connecta-logo-image"
            />
          </Link>
        </div>

        <div className="navlist">
          <p
            role="link"
            tabIndex={0}
            onClick={() => router("/guest")}
            onKeyDown={onKey("/guest")}
          >
            Join as Guest
          </p>
          <p
            role="link"
            tabIndex={0}
            onClick={() => router("/auth")}
            onKeyDown={onKey("/auth")}
          >
            Register
          </p>
          <div role="button">
            <p
              role="link"
              tabIndex={0}
              onClick={() => router("/auth")}
              onKeyDown={onKey("/auth")}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            People Connect.
            <br />
            <span>Ideas Grow.</span>
            <br />
            Together.
          </h1>

          <p>
            Seamless video meetings for teams, friends, and communities around
            the world.
          </p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img
            src="/laptop.png"
            alt="Connecta video meeting on a laptop"
            decoding="async"
          />
        </div>
      </div>
      {/* Footer */}
      <footer className="connecta-auth-footer">
        © 2026 CONNECTA · Bringing people together
      </footer>
    </div>
  );
}
