import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayOut";
import AuthButton from "../components/auth/AuthButton";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;
const Logo = styled.Image`
  max-width: 50%;
  max-height: 100px;
  margin-bottom: 20px;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({navigation}) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton text="Create New Account" disabled={false} onPress={goToCreateAccount} />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}