/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import api from "../../services/apiClient";
import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        // zera os erros
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "Mínimo 6 dígitos"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        history.push("/");

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer seu logon no Gobarber!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "Ocorreu um erro ao fazer o cadastro, tente novamente.",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para Logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
