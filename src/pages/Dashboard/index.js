import React, { useEffect } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { Container, useStyles } from "./styles";
import { useDispatch } from "react-redux";
import actionDrawer from "~/actions/drawer";

function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = localStorage.getItem("gerencia-es.user");
  const parsedUser = JSON.parse(user);

  function getWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    } else if (
      document.documentElement &&
      document.documentElement.clientHeight
    ) {
      return document.documentElement.clientWidth;
    } else if (document.body) {
      return document.body.clientWidth;
    }
    return 0;
  }

  useEffect(() => {
    console.log(getWidth());
    if (getWidth() < 1000) dispatch(actionDrawer.drawerApp(false));
    else dispatch(actionDrawer.drawerApp(true));
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container>
            <Grid xs={12} lg={6}>
              <Typography variant="h6" gutterBottom>
                Olá, {parsedUser?.firstname} {parsedUser?.lastname}
                <div className={classes.dividerApresentation} />
              </Typography>
              <Typography
                className={classes.resumeBox}
                variant="h6"
                gutterBottom
              >
                Um breve resumo do sistema
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                O sistema é um simples CRUD de usuário usando a biblioteca{" "}
                <b>React ❤</b>, com as tecnologias, <b>ESLint</b> com padrão
                standart para organização do código, <b>Babel Root Import </b>
                para organização de importações, <b>Redux Thunk</b> para
                controle de estados, <b>Material UI</b> para Kit de UI, as
                validações de formulários esta por conta do <b>Yup</b>,{" "}
                <b>Axios</b> para integração com o backend, implementado
                tratamento de erros no interceptor, <b>Moment</b> para
                tratamento de datas, também foi feito controle de permissões nas
                rotas, no login usado <b>JWT</b>, o backend foi adaptado para
                retornar um <b>token</b> para a autenticação do usuário... entre
                outras tecnologias.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Tenha um bom uso :)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard;
