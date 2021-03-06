import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setContext} from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const Token = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(Token, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(Token);
  isLoggedInVar(false);
  tokenVar(null);
}

const httpLink = createHttpLink({
  uri:"http://localhost:4000/graphql"
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      Token: tokenVar()
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;