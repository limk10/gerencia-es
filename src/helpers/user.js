const getUserType = type => {
  switch (type) {
    case 0:
      return "Administrador";
    case 1:
      return "Usuário Padrão";

    default:
      return "-";
  }
};

const generatePassword = () => {
  var length = 4;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export { getUserType, generatePassword };
