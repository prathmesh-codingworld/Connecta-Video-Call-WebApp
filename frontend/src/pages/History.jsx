import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="historyPage">
      {/* Nav bar: back button + CONNECTA logo (same as the other pages) */}
      <div className="navBar historyNavBar">
        <div className="connecta-header-left">
          <button
            type="button"
            className="connecta-back-btn"
            onClick={() => routeTo("/home")}
            aria-label="Go back"
          >
            <ArrowBackIcon fontSize="small" />
            <span>Back</span>
          </button>

          <Link to="/home" className="connecta-auth-logo" aria-label="CONNECTA">
            <img
              src="/ConnectaLogo.png"
              alt="CONNECTA"
              className="connecta-logo-image"
            />
          </Link>
        </div>
      </div>

      <div className="historyHeader">
        <IconButton
          className="historyHomeButton"
          onClick={() => {
            routeTo("/home");
          }}
        >
          <HomeIcon />
        </IconButton>

        <div>
          <h1>Meeting History</h1>
          <p>Your previous CONNECTA meetings</p>
        </div>
      </div>

      <div className="historyList">
        {meetings.length !== 0 ? (
          meetings.map((e, i) => {
            return (
              <Card key={e._id || i} className="historyCard" variant="outlined">
                <CardContent>
                  <Typography
                    className="historyMeetingCode"
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Code: {e.meetingCode}
                  </Typography>

                  <Typography
                    className="historyDate"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                  >
                    Date: {formatDate(e.date)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="emptyHistory">
            <h2>No Meeting History</h2>

            <p>Your previous meetings will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
