import React, {createContext, useReducer} from 'react';

const initialState = {
  email: null,
  name: null,
  id: null,
  applications: [],
  loggedIn: false,
  username: '',
  employerEmail: '',
  company: "",
  jobTypes: ['QA', 'Developer', 'Manager', 'DevOps', 'PM'],

};

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
      case 'LOGIN_SUCCESSFUL':
        return Object.assign({}, state, {
          loggedIn: true,
          username: action.username,
          company: action.username,
          employerEmail: action.email,
        });
      case 'GET_COMPANY_NAME':
        return Object.assign({}, state, {
          company: action.company,
        });

      default:
        throw new Error();
    }

  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {Store, StateProvider}