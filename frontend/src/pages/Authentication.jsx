import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../App.css";

const defaultTheme = createTheme();

export default function Authentication() {
  const navigate = useNavigate();

  /* ------------------------------ STATE ------------------------------ */
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [messageType, setMessageType] = React.useState("success");
  const [loading, setLoading] = React.useState(false);

  /* --------------------------- AUTH CONTEXT --------------------------- */
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  /* ------------------------ SUCCESS / ERROR UI ------------------------ */
  const showSuccess = (msg) => {
    setError("");
    setMessage(msg);
    setMessageType("success");
    setOpen(true);
  };

  const showError = (msg) => {
    setError(msg);
    setMessage(msg);
    setMessageType("error");
    setOpen(true);
  };

  /* -------------------------- LOGIN / REGISTER ------------------------- */
  const handleAuth = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (loading) {
      return;
    }

    setError("");
    setMessage("");

    /* Basic validation */
    if (!username.trim()) {
      showError("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      showError("Please enter your password.");
      return;
    }

    if (formState === 1 && !name.trim()) {
      showError("Please enter your full name.");
      return;
    }

    setLoading(true);

    try {
      /* Login */
      if (formState === 0) {
        const result = await handleLogin(username.trim(), password);

        console.log("Login response:", result);

        showSuccess(result || "Login successful. Welcome to CONNECTA!");

        setPassword("");

        return;
      }

      /* Register */
      if (formState === 1) {
        const result = await handleRegister(
          name.trim(),
          username.trim(),
          password,
        );

        console.log("Registration response:", result);

        /* Clear registration fields */
        setName("");
        setUsername("");
        setPassword("");
        setError("");

        showSuccess(result || "Registration successful. Please sign in.");

        /* Switch to Sign In */
        setFormState(0);
      }
    } catch (err) {
      console.error("Authentication error:", err);

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";

      showError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------- SNACKBAR CLOSE -------------------------- */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  /* ------------------------------ TABS -------------------------------- */
  const resetForm = (state) => {
    setFormState(state);
    setName("");
    setUsername("");
    setPassword("");
    setError("");
    setMessage("");
    setOpen(false);
  };

  const handleSignIn = () => resetForm(0);
  const handleSignUp = () => resetForm(1);

  /* -------------------------------- UI -------------------------------- */
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <div className="connecta-auth-page">
        {/* Background decoration */}
        <div className="connecta-orb connecta-orb-one" />
        <div className="connecta-orb connecta-orb-two" />
        <div className="connecta-grid-bg" />

        {/* Top bar: back button + app name */}
        <header className="connecta-auth-header">
          <div className="connecta-header-left">
            <button
              type="button"
              className="connecta-back-btn"
              onClick={() => navigate("/")}
              aria-label="Go back"
            >
              <ArrowBackIcon fontSize="small" />
              <span>Back</span>
            </button>

            <Link
              to="/home"
              className="connecta-auth-logo"
              aria-label="CONNECTA"
            >
              <img
                src="/ConnectaLogo.png"
                alt="CONNECTA"
                className="connecta-logo-image"
              />
            </Link>
          </div>

          <span className="connecta-logo-tagline">
            VIDEO CALLING · MEET · COLLABORATE
          </span>
        </header>

        {/* Main content */}
        <main className="connecta-auth-main">
          {/* Left text */}
          <section className="connecta-auth-intro">
            <div className="connecta-status">
              <span className="connecta-status-dot" />
              Your connection starts here
            </div>

            <h1>
              Welcome to CONNECTA
              <br />
              <span>Let’s connect.</span>
            </h1>

            <p>
              Connect with your team, friends and communities through seamless
              video meetings.
            </p>

            <div className="connecta-intro-features">
              <div>
                <span>✓</span>
                HD Video Meetings
              </div>

              <div>
                <span>✓</span>
                Connect Anywhere
              </div>

              <div>
                <span>✓</span>
                Simple & Secure
              </div>
            </div>
          </section>

          {/* Laptop */}
          <section className="connecta-laptop-area">
            <div className="connecta-laptop">
              <div className="connecta-laptop-screen">
                <div className="connecta-camera" />

                <div className="connecta-screen-content">
                  <div className="connecta-screen-logo">
                    <span>●</span>
                    CONNECTA
                  </div>

                  {/* Auth card */}
                  <div className="connecta-auth-card">
                    <Avatar className="connecta-auth-avatar">
                      <LockOutlinedIcon />
                    </Avatar>

                    <h2>
                      {formState === 0 ? "Welcome back" : "Create your account"}
                    </h2>

                    <p className="connecta-card-subtitle">
                      {formState === 0
                        ? "Sign in to continue to CONNECTA"
                        : "Join CONNECTA and start connecting"}
                    </p>

                    {/* Tabs */}
                    <div className="connecta-tabs">
                      <button
                        type="button"
                        className={formState === 0 ? "active" : ""}
                        onClick={handleSignIn}
                      >
                        Sign In
                      </button>

                      <button
                        type="button"
                        className={formState === 1 ? "active" : ""}
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </button>
                    </div>

                    {/* Form */}
                    <Box
                      component="form"
                      noValidate
                      className="connecta-screen-form"
                      onSubmit={handleAuth}
                    >
                      {formState === 1 && (
                        <TextField
                          required
                          fullWidth
                          id="fullName"
                          label="Full Name"
                          name="fullName"
                          value={name}
                          autoFocus
                          autoComplete="name"
                          onChange={(e) => setName(e.target.value)}
                          disabled={loading}
                        />
                      )}

                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        autoFocus={formState === 0}
                        autoComplete={
                          formState === 1 ? "new-username" : "username"
                        }
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                      />

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        value={password}
                        type="password"
                        id="password"
                        autoComplete={
                          formState === 1 ? "new-password" : "current-password"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                      />

                      {error && <div className="connecta-error">{error}</div>}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="connecta-submit"
                        disabled={loading}
                      >
                        {loading
                          ? "Please wait..."
                          : formState === 0
                            ? "Login to CONNECTA"
                            : "Create Account"}
                      </Button>
                    </Box>

                    <div className="connecta-secure">
                      <span>🔒</span>
                      Your connection is secure
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div className="connecta-laptop-base">
                <div className="connecta-trackpad" />
              </div>
            </div>

            <div className="connecta-laptop-shadow" />
          </section>
        </main>

        {/* Footer */}
        <footer className="connecta-auth-footer">
          © 2026 CONNECTA · Bringing people together
        </footer>
      </div>

      {/* Success / error snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageType}
          variant="filled"
          sx={{
            width: "100%",
            minWidth: "280px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
