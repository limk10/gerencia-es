const getUserType = type => {
  switch (type) {
    case 0:
      return "Administrador";
      break;
    case 1:
      return "Usuário Padrão";
      break;

    default:
      return "-";
      break;
  }
};

export { getUserType };
