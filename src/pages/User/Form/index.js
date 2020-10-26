import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Card,
  CardContent,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  withStyles,
  InputAdornment,
  IconButton,
  Fade
} from "@material-ui/core";
import { Container, useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Form() {
  let history = useHistory();
  const [values, setValues] = useState({
    showPassword: false
  });
  const [form, setForm] = useState({
    active: true
  });

  const _handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const navigateTo = route => {
    history.push(route);
  };

  const handleChange = (prop, value) => {
    form[prop] = value;
    setForm({ ...form });
  };

  const submit = e => {
    e.preventDefault();
    console.log(form);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <Fade in={true}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Cadastrar Usuário
        </Typography>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <Grid container>
                <Grid xs={4}>
                  <TextField
                    value={form.firstname}
                    onChange={e => handleChange("firstname", e.target.value)}
                    className={classes.textField}
                    variant="outlined"
                    label="Primeiro Nome"
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    value={form.lastname}
                    onChange={e => handleChange("lastname", e.target.value)}
                    className={classes.textField}
                    variant="outlined"
                    label="Último Nome"
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    value={form.email}
                    onChange={e => handleChange("birthdate", e.target.value)}
                    id="date"
                    label="Data de Nascimento"
                    type="date"
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={8}>
                  <TextField
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                    type="email"
                    className={classes.textField}
                    variant="outlined"
                    label="E-mail"
                  />
                </Grid>
                <Grid className={classes.gridSwitch} xs={4}>
                  <FormControlLabel
                    p={5}
                    control={
                      <Switch
                        value={form.active}
                        onChange={e => handleChange("ative", e.target.checked)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Úsuario Ativo ?"
                  />
                </Grid>
              </Grid>
              <Divider className={classes.dividerForm} light />
              <Grid container>
                <Grid xs={12}>
                  <Typography
                    className={classes.textUserPass}
                    variant="body1"
                    gutterBottom
                  >
                    Deseja definir uma senha para o úsuario?
                  </Typography>
                  {form.userPass && (
                    <Typography variant="caption" display="block" gutterBottom>
                      Insira uma senha para úsuario
                    </Typography>
                  )}
                  {!form.userPass && (
                    <Typography variant="caption" display="block" gutterBottom>
                      Será gerado uma senha para o úsuario, ao clicar em
                      &quot;cadastrar&quot; será gerado e exibido a senha
                    </Typography>
                  )}

                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>Não</Grid>
                      <Grid item>
                        <Switch
                          // checked={sta}
                          value={form.userPass}
                          onChange={e =>
                            handleChange("userPass", e.target.checked)
                          }
                          name="checkedB"
                          color="primary"
                        />
                      </Grid>
                      <Grid item>Sim</Grid>
                    </Grid>
                    <Fade in={form.userPass}>
                      <Grid container>
                        <Grid xs={4}>
                          <TextField
                            className={[classes.textFieldPass]}
                            id="outlined-password"
                            label="Senha"
                            variant="outlined"
                            type={values.showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={e =>
                              handleChange("password", e.target.value)
                            }
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
                        </Grid>
                      </Grid>
                    </Fade>
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid className={classes.gridButtons} item xs={6}>
                  <Button
                    onClick={() => navigateTo("/user")}
                    className={classes.buttonBack}
                    variant="outlined"
                    color="primary"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    onClick={e => submit(e)}
                    variant="outlined"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Fade>
  );
}

export default Form;
