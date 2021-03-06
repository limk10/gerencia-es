import React, { useState, useEffect } from "react";
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
  InputAdornment,
  IconButton,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { Container, useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { schemaUsuario } from "~/helpers/formValidation";
import { generatePassword } from "~/helpers/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import ModalConfirmDialog from "~/components/ModalConfirmDialog";
import api from "~/services/api";
import { useDispatch } from "react-redux";
import actionsModal from "~/actions/modals";
import moment from "moment";
import { getUserType } from "~/helpers/user";

function Form() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    showPassword: false
  });
  const [form, setForm] = useState({
    active: true,
    password: "",
    userType: 1
  });

  const user = localStorage.getItem("gerencia-es.user");
  const parsedUser = JSON.parse(user);

  useEffect(() => {
    if (parsedUser.userType !== 0) navigateTo("/");
  }, []);

  const navigateTo = route => {
    history.push(route);
  };

  const handleChange = (prop, value) => {
    form[prop] = value;
    setForm({ ...form });
  };

  const submit = async e => {
    e.preventDefault();
    let errors = {};

    const _password = form?.generatePassword
      ? form?.password
      : await generatePassword();

    handleChange("password", _password);

    if (!_password) {
      errors["password"] = "O campo senha é obrigatório";
    }

    await schemaUsuario
      .validate(form, { abortEarly: false })
      .catch(({ inner }) => {
        inner.map(({ path, message }) => {
          errors[path] = message;
        });
      });

    if (!_.isEmpty(errors)) {
      Object.keys(errors).map(item => {
        toast.error(`${errors[item]}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
      });
      return;
    }

    dispatch(actionsModal.modalConfirmDialog(true));
  };

  const confirmSubmit = async () => {
    dispatch(actionsModal.modalConfirmDialog(false));

    setLoading(true);

    const data = {
      firstname: form?.firstname,
      lastname: form?.lastname,
      birthdate: form?.birthdate,
      email: form?.email,
      active: form?.active,
      userType: form?.userType,
      password: form?.password
    };

    try {
      const result = await api.post("/register", data);
      setLoading(false);
      navigateTo("/user");

      toast.info(`Usuário ${form?.firstname} criado(a) com sucesso!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <>
      <ModalConfirmDialog
        content={
          <div>
            <Typography variant="h6" gutterBottom>
              Use <b>email</b> e <b>senha</b> para efetuar o login!
            </Typography>

            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Primeiro Nome:</b> {form?.firstname}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Ultimo nome:</b> {form?.lastname}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Tipo Usuário:</b> {getUserType(form?.userType)}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Date de Nascimento:</b>{" "}
                  {moment(form?.birthdate).format("DD/MM/YYYY")}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Email:</b> {form?.email}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Ativo:</b> {form?.active ? "Sim" : "Não"}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <b>Senha:</b> {form?.password}
                </Typography>
              </li>
            </ul>
          </div>
        }
        title={"Resumo do Cadastro"}
        actionConfirm={confirmSubmit}
      />
      <Fade in={true}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Cadastrar Usuário
          </Typography>
          <Card>
            <CardContent>
              <form noValidate autoComplete="false">
                <Grid container>
                  <Grid xs={12} md={4}>
                    <TextField
                      value={form.firstname}
                      onChange={e => handleChange("firstname", e.target.value)}
                      className={classes.textField}
                      variant="outlined"
                      label="Primeiro Nome"
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <TextField
                      value={form.lastname}
                      onChange={e => handleChange("lastname", e.target.value)}
                      className={classes.textField}
                      variant="outlined"
                      label="Último Nome"
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <TextField
                      value={form.birthdate}
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
                  <Grid xs={12} md={4}>
                    <TextField
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      type="email"
                      className={classes.textField}
                      variant="outlined"
                      label="E-mail"
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <FormControl
                      variant="outlined"
                      className={[classes.textField]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Tipo
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={form?.userType}
                        onChange={e => handleChange("userType", e.target.value)}
                        label="Tipo"
                      >
                        <MenuItem value={0}>Administrador</MenuItem>
                        <MenuItem value={1}>Usuário Padrão</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid className={classes.gridSwitch} xs={12} md={4}>
                    <FormControlLabel
                      className={classes.switchActive}
                      p={5}
                      control={
                        <Switch
                          checked={form?.active}
                          onChange={e =>
                            handleChange("active", e.target.checked)
                          }
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Ativar usuário?"
                    />
                  </Grid>
                </Grid>
                <Divider className={classes.dividerForm} light />
                <Grid container>
                  <Grid xs={12}>
                    <Typography
                      className={classes.textgeneratePassword}
                      variant="body1"
                      gutterBottom
                    >
                      Deseja definir uma senha para o úsuario?
                    </Typography>
                    {form.generatePassword && (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Insira uma senha para úsuario
                      </Typography>
                    )}
                    {!form.generatePassword && (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
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
                            value={form.generatePassword}
                            onChange={e =>
                              handleChange("generatePassword", e.target.checked)
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </Grid>
                        <Grid item>Sim</Grid>
                      </Grid>
                      <Fade in={form.generatePassword}>
                        <Grid container>
                          <Grid xs={4}>
                            <TextField
                              className={[classes.textFieldPass]}
                              id="outlined-password"
                              label="Senha"
                              autoComplete={false}
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
                      disabled={loading}
                    >
                      Voltar
                    </Button>
                    <Button
                      className={classes.buttonBack}
                      type="submit"
                      onClick={e => submit(e)}
                      variant="outlined"
                      color="primary"
                      disabled={loading}
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
    </>
  );
}

export default Form;
