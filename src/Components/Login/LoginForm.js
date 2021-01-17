import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm(); //da acesso ao value, setValue e onChange
  const password = useForm(); //passar o type pelos parenteses por ex: useForm('email')

  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        {/* passando o value, setValue e onChange */}
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Criar conta</Link>
    </section>
  );
};

export default LoginForm;
