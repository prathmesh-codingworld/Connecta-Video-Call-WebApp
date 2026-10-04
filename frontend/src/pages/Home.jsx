import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    const code = meetingCode.trim();
    if (!code) return;

    await addToUserHistory(code);
    navigate(`/${code}`);
  };

  return (
    <>
      <div className="navBar">
        <div className="connecta-header-left">
          {/* Back goes to the landing page (not the login screen) */}
          <button
            type="button"
            className="connecta-back-btn"
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <ArrowBackIcon fontSize="small" />
            <span>Back</span>
          </button>

          <Link to="/home" className="connecta-auth-logo" aria-label="CONNECTA">
            <img
              src="/public/ConnectaLogo.png"
              alt="CONNECTA"
              className="connecta-logo-image"
            />
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleJoinVideoCall();
                }}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
