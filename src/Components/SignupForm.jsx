import { Box, Button, TextField } from "@mui/material"
import React, { useState } from 'react'
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig"
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {theme} = useTheme();

    const handleSubmit = ({handleClose}) => {
        // if all the fields are not filled
        if(!email || !password || !confirmPassword) {
            toast.warn("Please fill in all the details");

            return;
        }
        // confirm password doesn't match
        if(password !== confirmPassword) {
            toast.warn("Password doesn't match");

            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res);
            toast.success("User created");
            handleClose();
        }).catch((err) =>{
            toast.error(errorMapping[err.code] || "Some error occured");
        });


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
                onChange={(e) => setEmail(e.target.value)}
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
            <TextField
                variant="outlined"
                type="password"
                label="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={InputStyle}
            InputProps={InputStyle}

            />
            <Button
                variant="contained"
                size="large"
                style={ButtonStyle}
                onClick={handleSubmit}
            >Sign Up</Button>
        </Box>
    )
}

export default SignupForm