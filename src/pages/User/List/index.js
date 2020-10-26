import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles, Container } from "./styles";
import moment from "moment";
import { getUserType } from "~/helpers/user";
import api from "~/services/api";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";

function List() {
  const classes = useStyles();
  const [collection, setCollection] = useState([]);

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

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "firstname", headerName: "First name", width: 180 },
    { field: "lastname", headerName: "Last name", width: 230 },
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
          <Button variant="contained" color="primary" size="small">
            Open
          </Button>
        );
      }
    }
  ];

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            Gerenciar Usuário
          </Typography>
        </Grid>
        <Grid className={classes.gridButtons} item xs={6}>
          <Button variant="outlined" color="primary">
            Novo Cliente
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={collection}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </Container>
  );
}

export default List;
