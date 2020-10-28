import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  Typography,
  CircularProgress,
  Hidden,
  FormControl
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import businessGirlGreen from "~/assets/images/business-girl-green.png";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import api from "~/services/api";
import { signin, isAuthenticated } from "~/services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const login = async () => {
    setLoading(true);
    const data = {
      email: values?.email,
      password: values?.password
    };

    try {
      const { data: collection } = await api.post("/signin", data);
      const { accessToken } = collection;
      if (accessToken) {
        // Implementado pois o endpoint /signin não retorna os dados do usuario
        const { data: collection } = await api.get("/users", {
          params: { email: values?.email }
        });

        const [item] = collection;

        const { password, ...rest } = item;

        if (item.active) {
          localStorage.setItem("gerencia-es.user", JSON.stringify(rest));
          await signin(accessToken);
        } else {
          toast.error(
            `Usuário encontra-se desativado, entre em contato com um administrador para reativa-lo!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false
            }
          );
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className={classes.loginContainer}>
      <Container
        classes={{
          root: classes.container
        }}
        maxWidth="lg"
      >
        <Box className={classes.box} bgcolor="#FAFAFA">
          <Grid container>
            <Hidden xsDown>
              <Grid className={classes.gridImage} item xs={12} sm={6}>
                <img className={classes.image} src={businessGirlGreen} />
              </Grid>
            </Hidden>
            <Grid className={classes.gridTextFields} item xs={12} sm={6}>
              <Typography pb={2} align="center" variant="h5" gutterBottom>
                Bem-vindo(a) de volta!
              </Typography>

              <form style={{ display: "grid" }}>
                <TextField
                  className={[classes.textField, classes.paddingTop2_5]}
                  value={values.email}
                  onChange={handleChange("email")}
                  type="email"
                  id="outlined-email"
                  label="E-Mail"
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  id="outlined-password"
                  label="Senha"
                  variant="outlined"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Grid container>
                  <Grid xs={6}>
                    <Checkbox
                      classes={{
                        root: classes.checkboxForgotPass
                      }}
                      defaultChecked
                      color="primary"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    Lembrar de mim
                  </Grid>
                  <Grid className={classes.gridForgotPassword} xs={6}>
                    <Button
                      size="small"
                      href="javascript:void();"
                      color="primary"
                    >
                      Esqueceu sua senha?
                    </Button>
                  </Grid>
                </Grid>

                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    onClick={() => login()}
                    className={classes.paddingTop1_5}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth={true}
                  >
                    ENTRAR :)
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
