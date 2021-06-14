import React, {useState} from 'react'
import firebase from "../Backend/index";
import {Avatar, Button, FormControl, Input, InputLabel, Paper, Typography} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import {loginStyles} from '../css/CustomStyles'
import withStyles from "@material-ui/core/styles/withStyles";
import GoogleLogin from "react-google-login";


const Login = (props) => {
    const { classes } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async googleData => {
        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        // store returned user somehow
    }

    return (
      <main className={classes.main}>
          <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign in
              </Typography>
              <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                  </FormControl>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={login}
                      className={classes.submit}>
                      Sign in
                  </Button>
                  <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Log in with Google"
                      onSuccess={handleLogin}
                      onFailure={handleLogin}
                      cookiePolicy={'single_host_origin'}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/register"
                      className={classes.submit}>
                      Register
                  </Button>
              </form>
          </Paper>
      </main>
  )

    async function login() {
        try {
            await firebase.login(email, password)
            props.history.replace('/dashboard')
        } catch(error) {
            alert(error.message)
        }
    }
}

export default withRouter(withStyles(loginStyles)(Login))
