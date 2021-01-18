import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm(); //("password")

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    try {
      const { response } = await request(url, options);
      if (response.ok) userLogin(username.value, password.value);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        
      </form>
    </section>
  );
};

export default LoginCreate;
