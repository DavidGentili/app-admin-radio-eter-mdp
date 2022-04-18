import { createContext } from "react";

const UserContext = createContext({
    name: null,
    email: null,
    securityLevel: null,
    state: null,
})

export default UserContext;