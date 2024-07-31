import { useReducer } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state, action) {   //state (el estado actual) y action (un objeto que describe lo que sucedió).
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                isError: false,
                isLoading: true,
            };
        case ACTIONS.FETCH_SUCCESS:    // devuelve un nuevo estado con las propiedades data, isError y isLoading.
            return {
                data: action.payload,  // Represetna la actualizacion de los datos a una solitcitud exitosa.
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;              // se devuelve el estado actual.
    }
}

function useFetch(url, options = {}) {
    const [state, dispatch] = useReducer(reducer, {isError: false, isLoading: true,});

    function doFetch(newOptions) {
        dispatch({ type: ACTIONS.FETCH_INIT });

        fetch(url, { ...options, ...newOptions })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error("Error al relizar la petición");
            })
            .then((data) => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            })
            .catch((e) => {
                dispatch({ type: ACTIONS.FETCH_FAILURE });
            });
    }

    return [state, doFetch];
}

export default useFetch;
