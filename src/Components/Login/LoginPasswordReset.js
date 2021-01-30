import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { PASSWORD_RESET } from "../../Api";
import { useNavigate } from "react-router-dom";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = useForm();
  const { data, loading, request } = useFetch();
  const navigate = useNavigate();

  //pegar os parâmetros da url para resetar a senha (a pagina de login de password lost redireciona para esta página com a key e o login nos parâmetros)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); //do próprio JS
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
    }
  }

  return (
    <div>
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Resetar senha</Button>
        )}
      </form>
    </div>
  );
};

export default LoginPasswordReset;
