import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Fade,
  IconButton,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Card,
  CardContent,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  Divider,
  InputAdornment
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles, Container } from "./styles";
import moment from "moment";
import { getUserType, generatePassword } from "~/helpers/user";
import api from "~/services/api";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmDialog from "~/components/ModalConfirmDialog";
import { useDispatch } from "react-redux";
import actionModals from "~/actions/modals";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { schemaUsuario } from "~/helpers/formValidation";

function List() {
  const classes = useStyles();
  const [collection, setCollection] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userCollection, setUserCollection] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [values, setValues] = useState({
    showPassword: false
  });
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const user = localStorage.getItem("gerencia-es.user");
  const parsedUser = JSON.parse(user);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();

  const navigateTo = route => {
    history.push(route);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [filter]);

  const init = async () => {
    setLoading(true);
    try {
      // Por conta do Json Server, não foi possível fazer a paginação pois ele não
      // retorna os dados necessarios para paginação
      const { data } = await api.get(`/users`, {
        params: {
          ...filter
        }
      });
      const collection = data.map((item, index) => {
        return {
          ...item,
          birthdate: moment(item?.birthdate).format("DD/MM/YYYY"),
          userType: getUserType(item?.userType),
          codeUserType: item?.userType,
          active: item?.active ? "Sim" : "Não"
        };
      });
      setCollection(collection);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = (prop, value) => {
    userCollection[prop] = value;
    setUserCollection({ ...userCollection });
  };

  const handleChangeFilter = (prop, value) => {
    filter[prop] = value;
    setFilter({ ...filter });
  };

  useEffect(() => {
    if (userCollection?.newPassword || userCollection?.generatePassword) {
      const _password = userCollection?.generatePassword
        ? ""
        : generatePassword();

      handleChange("password", _password);
    }
  }, [userCollection?.newPassword, userCollection?.generatePassword]);

  const remove = async ({ id, codeUserType }) => {
    setLoading(true);

    handleClose();
    if (codeUserType === 0) {
      return toast.warn(`Opss.. não é possível deletar um ADMINISTRADOR`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
    }

    try {
      await api.delete(`/users/${id}`);
      init();
      toast.info(`Usuário deletado com sucesso :)`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
      setLoading(false);
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

  const edit = async id => {
    setLoading(true);
    try {
      const { data: collection } = await api.get(`/users/${id}`);
      setUserCollection({
        ...collection,
        userType: getUserType(collection?.userType),
        codeUserType: collection?.userType,
        isEdit: true,
        titleConfirmDialog: `Editar ${
          collection.firstname
        } - Tipo: ${getUserType(collection?.userType)}`
      });

      dispatch(actionModals.modalConfirmDialog(true));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const submitEdit = async () => {
    setLoading(true);
    let errors = {};

    await schemaUsuario
      .validate(userCollection, { abortEarly: false })
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
      setLoading(false);
      return;
    }

    const data = {
      firstname: userCollection?.firstname,
      lastname: userCollection?.lastname,
      birthdate: userCollection?.birthdate,
      email: userCollection?.email,
      active: userCollection?.active,
      userType: userCollection?.codeUserType,
      ...(userCollection?.newPassword
        ? { password: userCollection?.password }
        : "")
    };

    try {
      const result = await api.patch(`/users/${userCollection.id}`, data);
      init();
      dispatch(actionModals.modalConfirmDialog(false));
      setLoading(false);
      toast.info(`Usuário ${userCollection?.firstname} editado com sucesso!`, {
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

  const details = async id => {
    setLoading(true);
    try {
      const { data: collection } = await api.get(`/users/${id}`);
      setUserCollection({
        ...collection,
        isEdit: false,
        titleConfirmDialog: `Detalhes do ${
          collection.firstname
        } - Tipo: ${getUserType(collection?.userType)}`
      });

      dispatch(actionModals.modalConfirmDialog(true));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "firstname", headerName: "Primeiro Nome", width: 180 },
    { field: "lastname", headerName: "Último Nome", width: 230 },
    { field: "userType", headerName: "Tipo de Usuário", width: 160 },
    { field: "active", headerName: "Ativo", width: 160 },
    {
      field: "birthdate",
      headerName: "Data de Nascimento",
      width: 250
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 250,
      renderCell: function buttonActions({ rowModel }) {
        const { data } = rowModel;

        return (
          <div>
            <IconButton onClick={() => details(data.id)}>
              <VisibilityOutlinedIcon />
            </IconButton>
            {parsedUser.userType === 0 && (
              <IconButton onClick={() => edit(data.id)}>
                <EditOutlinedIcon />
              </IconButton>
            )}
            {parsedUser.userType === 0 && data.codeUserType !== 0 && (
              <>
                <IconButton
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => remove(data)}>Excluir</MenuItem>
                </Menu>
              </>
            )}
          </div>
        );
      }
    }
  ];

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <ModalConfirmDialog
        content={
          <form noValidate autoComplete="false">
            <Grid container>
              <Grid xs={12} md={4}>
                <TextField
                  disabled={!userCollection?.isEdit}
                  value={userCollection?.firstname}
                  onChange={e => handleChange("firstname", e.target.value)}
                  className={classes.textField}
                  variant="outlined"
                  label="Primeiro Nome"
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  disabled={!userCollection?.isEdit}
                  value={userCollection?.lastname}
                  onChange={e => handleChange("lastname", e.target.value)}
                  className={classes.textField}
                  variant="outlined"
                  label="Último Nome"
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  disabled={!userCollection?.isEdit}
                  value={userCollection?.birthdate}
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
              <Grid xs={12}>
                <TextField
                  disabled={!userCollection?.isEdit}
                  value={userCollection?.email}
                  onChange={e => handleChange("email", e.target.value)}
                  type="email"
                  className={classes.textField}
                  variant="outlined"
                  label="E-mail"
                />
              </Grid>
              <Grid className={classes.gridSwitch} xs={12}>
                <FormControlLabel
                  className={classes.switchActive}
                  p={5}
                  control={
                    <Switch
                      disabled={!userCollection?.isEdit}
                      checked={userCollection?.active}
                      onChange={e => handleChange("active", e.target.checked)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Ativar usuário?"
                />
              </Grid>
              <Grid className={classes.gridSwitch} xs={12}>
                <FormControlLabel
                  className={classes.switchActive}
                  p={5}
                  control={
                    <Switch
                      disabled={!userCollection?.isEdit}
                      checked={userCollection?.newPassword}
                      onChange={e =>
                        handleChange("newPassword", e.target.checked)
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Definir nova senha"
                />
              </Grid>

              <Collapse
                className={classes.gridPassword}
                in={userCollection?.newPassword}
              >
                <Divider className={classes.dividerForm} light />
                <Grid className={classes.gridPassword} container>
                  <Grid xs={12}>
                    <Typography
                      className={classes.textgeneratePassword}
                      variant="body1"
                      gutterBottom
                    >
                      Definir uma nova senha de forma manual?
                    </Typography>
                    {userCollection.generatePassword && (
                      <Typography
                        className={classes.gridPassword}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Insira uma <b>nova senha</b> para o usuário, essa senha
                        será usada para entrar no sistema
                      </Typography>
                    )}
                    {!userCollection.generatePassword && (
                      <Typography
                        className={classes.gridPassword}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Ao escolher a modalidade <b>automatica</b>, é gerado uma
                        senha randomicamente de 4 digitos.
                      </Typography>
                    )}

                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      className={classes.gridSwitch}
                    >
                      <Grid item>Não</Grid>
                      <Grid item>
                        <Switch
                          value={userCollection.generatePassword}
                          onChange={e =>
                            handleChange("generatePassword", e.target.checked)
                          }
                          name="checkedB"
                          color="primary"
                        />
                      </Grid>
                      <Grid item>Sim</Grid>
                    </Grid>

                    <Fade in={!userCollection.generatePassword}>
                      <Typography
                        id="senha-gerada"
                        variant="body1"
                        gutterBottom
                      >
                        <b>Senha gerada:</b> {userCollection?.password}
                      </Typography>
                    </Fade>

                    <Collapse in={userCollection.generatePassword}>
                      <Grid container>
                        <Grid spacing={5} xs={12}>
                          <TextField
                            className={[classes.textFieldPass]}
                            id="outlined-password"
                            label="Senha"
                            autoComplete={false}
                            variant="outlined"
                            type={values.showPassword ? "text" : "password"}
                            value={userCollection.password}
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
                    </Collapse>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          </form>
        }
        title={userCollection.titleConfirmDialog}
        disableActionConfirm={!userCollection.isEdit}
        actionConfirm={submitEdit}
      />
      <Fade in={true}>
        <Container>
          <Grid className={classes.gridHeader} container>
            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom>
                Gerenciar Usuário
              </Typography>
            </Grid>
            <Grid className={classes.gridButtons} item xs={6}>
              {parsedUser.userType === 0 && (
                <Button
                  onClick={() => navigateTo("/user/create")}
                  variant="outlined"
                  color="primary"
                >
                  Novo Cliente
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => handleFilter()}
                variant="outlined"
                color="primary"
              >
                {showFilter && <span>Ocultar Filtro</span>}
                {!showFilter && <span>Adicionar Filtro</span>}
              </Button>
            </Grid>
          </Grid>

          <Collapse in={showFilter}>
            <Card className={classes.cardFilter}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Filtro
                </Typography>
                <Grid container>
                  <Grid xs={12} md={4}>
                    <TextField
                      value={filter?.firstname_like}
                      onChange={e =>
                        handleChangeFilter("firstname_like", e.target.value)
                      }
                      className={classes.textField}
                      variant="outlined"
                      label="Primeiro Nome"
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <TextField
                      value={filter?.lastname_like}
                      onChange={e =>
                        handleChangeFilter("lastname_like", e.target.value)
                      }
                      className={classes.textField}
                      variant="outlined"
                      label="Ultimo nome"
                    />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <FormControl
                      variant="outlined"
                      className={[classes.formControl, classes.textField]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Tipo
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={filter?.userType}
                        onChange={e =>
                          handleChangeFilter("userType_like", e.target.value)
                        }
                        label="Tipo"
                      >
                        <MenuItem value="">
                          <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={0}>Administrador</MenuItem>
                        <MenuItem value={1}>Usuário Padrão</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Collapse>

          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              loading={loading}
              rows={collection}
              columns={columns}
              pageSize={10}
              pagination
              checkboxSelection={false}
            />
          </div>
        </Container>
      </Fade>
    </>
  );
}

export default List;
