import React, {createContext, useReducer} from 'react';

const initialState = {email: null, name: null, id: null, applications: []};
const Store = createContext(initialState);
const {Provider} = Store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_CANDIDATE_INFO':
        const newState = Object.assign({}, state, {
          email: action.email, name: action.name, id: action.id
        });
        return newState;
      case 'UPDATE_CANDIDATE_APPLICATIONS':
        return Object.assign({}, state, {
          applications: action.applications
        });

      default:
        throw new Error();
    }
    ;
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {Store, StateProvider}