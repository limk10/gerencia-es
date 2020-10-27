import * as yup from "yup";

const schemaUsuario = yup.object().shape({
  firstname: yup.string().required("O campo primeiro nome é obrigatório!"),
  lastname: yup.string().required("O campo último nome é obrigatório!"),
  birthdate: yup.string().required("O campo data de nascimento é obrtaório!"),
  email: yup
    .string()
    .email()
    .required("O campo email é obrigatório!"),
  generatePassword: yup.boolean()
});

export { schemaUsuario };
