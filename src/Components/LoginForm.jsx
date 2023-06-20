import { Box, Button, TextField } from "@mui/material"
import React, { useState } from 'react'
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

const LoginForm = ({handleClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {theme} = useTheme();

    const handleSubmit = () => {
        if(!email || !password) {
            toast.warn("Please enter email and password");
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
        .then((res)=> {
            console.log(res);
            toast.success("Logged In");
            handleClose();

        }).catch((err)=> {
            console.log(err);
            toast.warn(errorMapping[err.code]);

        })
    }
    
    const InputStyle = {
        style: {
            color: theme.textColor
        }
    }

    const ButtonStyle = {
        backgroundColor: theme.textColor,
        color: theme.background
    }
    
  return (
    <Box
        p={3}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}
    >
          <TextField 
            variant="outlined"
            type="email"
            label="Enter email"
            onChange={(e)=> setEmail(e.target.value)}
            InputLabelProps={InputStyle}
            InputProps={InputStyle}
          />
          <TextField
          variant="outlined"
          type="password"
          label="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={InputStyle}
              InputProps={InputStyle}

          />
          <Button
            variant="contained"
            size="large"
            style={ButtonStyle}
            onClick={handleSubmit}
          >Login</Button>
    </Box>
  )
}

export default LoginForm