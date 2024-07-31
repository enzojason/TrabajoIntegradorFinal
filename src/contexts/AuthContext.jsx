import { createContext, useContext, useReducer } from "react";
//import Login from "../components/Auth/Login";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};
function reducer(state, action){ //Puede tener cualquier nombre. (el reducer) por convencion se lo llama asi por que es una funcion reductora.
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                //...state,                     puede ser ...state. PERO Como se cerro secion todo lo demas se borra.
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
function AuthProvider({children}){                  // cualquier orto componente 
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
    });

    const actions = {                               // usamos el dispatch de nuestra funcion reductora.
        login: (token) => dispatch({type: ACTIONS.LOGIN, payload: token}),
        logout: () => dispatch({type: ACTIONS.LOGOUT}),
    };

    return (
        <AuthContext.Provider value={{state, actions}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(type){
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context[type];
}

export {AuthContext, AuthProvider, useAuth};