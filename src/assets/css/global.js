import React from "react";
import { createGlobalStyle } from "styled-components";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

export default createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

  * {
    font-family: "Montserrat", sans-serif !important;
  }

  html, body {
    background: #F0F0F0;
    /* text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
  }
  
  .Toastify__toast--info {
    color: #f0f0f0;
    background: #00705C
  }

  /* input,
  button {
    font-family: "Montserrat", sans-serif;
  }
   */
  /* html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  #root {
    height: 100%;
    display: flex;
  } */

`;
