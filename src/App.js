import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import {useTheme} from './Context/ThemeContext'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import UserPage from "./Pages/UserPage";

function App() {

  const {theme} = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      <GlobalStyles />
    
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
    </Routes>
    
    </ThemeProvider>
  );
}

export default App;
