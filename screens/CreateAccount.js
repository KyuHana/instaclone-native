import React, {useRef, useEffect} from "react";
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayOut";
import { TextInput } from "../components/auth/AuthShared"; 

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error 
    }
  }
`;

export default function CreateAccount({navigation}) {
  const {register, handleSubmit, setValue, getValues} = useForm();
  const onCompleted = (data) => {
    const {createAccount: {ok}} = data;
    if(ok) {
      const {username, password} = getValues();
      navigation.navigate("Login", {
        username,
        password
      })
    }
  }
  const [createAccountMutation, {loading}] = useMutation(
    CREATE_ACCOUNT_MUTATION, {
      onCompleted
    }
  );
  
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done");
  };
  const onValid = (data) => {
    if(!loading) {
      createAccountMutation({
        variables: {
          ...data 
        }
      })
    }
  };

  useEffect(() => {
    register("firstName", {
      required: true
    });
    register("lastName", {
      required: true
    });
    register("username", {
      required: true
    })
    register("email", {
      required: true
    });
    register("password", {
      required: true
    });
  }, [register])

  return (
    <AuthLayout>
        <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("firstName", text)}
        />
        <TextInput 
          ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("lastName", text)}
        />
        <TextInput 
          ref={usernameRef}
        placeholder="Username"
        autoCapitalize={"none"}
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("username", text)}
        />
        <TextInput 
          ref={emailRef}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("email", text)}
        />
        <TextInput 
          ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("password", text)}
        lastOne={true}
        />
        <AuthButton text="Create Account" onPress={handleSubmit(onValid)}></AuthButton>
    </AuthLayout>
  )
}