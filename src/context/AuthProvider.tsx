import React, { createContext, useReducer } from "react";

type AppState = typeof initialState
type Action = {authToken: string} 

interface InputProviderProps {
    children: React.ReactNode;
}
      
interface TokenContextType extends AppState {
    dispatch: React.Dispatch<Action>

} 
interface TokenType{

    authToken: string
}

const initialState: TokenType = {

  authToken: "",
  

};

const reducer = (state: AppState, action: Action) => {
 

  return {
    ...state,
    authToken: action.authToken
  };
  
  
};

const AuthContext = createContext<TokenContextType>(initialState as TokenContextType);

function InputValueProvider({children}: InputProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}


export { AuthContext, InputValueProvider };

