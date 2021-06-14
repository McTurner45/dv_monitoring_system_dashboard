import React, {useState} from 'react'
import {Avatar, Button, FormControl, Input, InputLabel, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../Backend/index";
import {loginStyles} from '../css/CustomStyles'



const Register = (props) => {
  const {classes} = props

  const [houseName, sethouseName] = useState('')
  const [plotN0, setplotN0] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  };

  return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Your House
          </Typography>
          <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="houseName">Full Name</InputLabel>
              <Input id="houseName" name="houseName" autoComplete="off" autoFocus value={houseName}
                     onChange={e => sethouseName(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="plotN0">Plot Number</InputLabel>
              <Input id="plotN0" name="plotN0" autoComplete="off" autoFocus value={plotN0}
                     onChange={e => setplotN0(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="city">City or Town</InputLabel>
              <Input id="city" name="city" autoComplete="off" autoFocus value={city}
                     onChange={e => setCity(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" name="phone" type="number" autoComplete="off" autoFocus value={phone}
                     onChange={e => setPhone(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="off" value={email}
                     onChange={e => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="off" value={password}
                     onChange={e => setPassword(e.target.value)}/>
            </FormControl>

            <div className={classes.dropzone}>
              <label>
                <Button variant="outlined" color="secondary">
                  <input type="file" onChange={handleChange} />
                  <span>Upload House Image</span>
                </Button>

              </label>

            </div>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onRegister}
                className={classes.submit}>
              Register
            </Button>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
                className={classes.submit}>
              Go back to Login
            </Button>
          </form>
        </Paper>
      </main>
  )

  async function onRegister() {

      try {
        await firebase.register(houseName, email, password)
        await firebase.addHouse(houseName, plotN0, city, phone, email)
        props.history.replace('/dashboard')
      } catch (error) {
        alert(error.message)
      }
    }
}

export default withRouter(withStyles(loginStyles)(Register))