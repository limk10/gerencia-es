import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Fade,
  IconButton
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles, Container } from "./styles";
import moment from "moment";
import { getUserType } from "~/helpers/user";
import api from "~/services/api";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

function List() {
  const classes = useStyles();
  const [collection, setCollection] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const init = async () => {
    const { data } = await api.get("/users");
    const collection = data.map((item, index) => {
      return {
        ...item,
        birthdate: moment(item?.birthdate).format("DD/MM/YYYY"),
        userType: getUserType(item?.userType),
        active: item?.active ? "Sim" : "Não"
      };
    });
    setCollection(collection);
  };

  const remove = () => {};

  const edit = () => {};

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
      displayName: "Hello",
      renderCell: function buttonActions() {
        return (
          <div>
            <IconButton onClick={edit()}>
              <EditOutlinedIcon />
            </IconButton>
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
              <MenuItem onClick={remove()}>Excluir</MenuItem>
            </Menu>
          </div>
        );
      }
    }
  ];

  return (
    <Fade in={true}>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Gerenciar Usuário
            </Typography>
          </Grid>
          <Grid className={classes.gridButtons} item xs={6}>
            <Button
              onClick={() => navigateTo("/user/create")}
              variant="outlined"
              color="primary"
            >
              Novo Cliente
            </Button>
          </Grid>
        </Grid>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={collection}
            columns={columns}
            pageSize={10}
            checkboxSelection={false}
          />
        </div>
      </Container>
    </Fade>
  );
}

export default List;
