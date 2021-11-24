import { Context, createContext } from "react";

export const GlobalStateContext = createContext({
    update: (data: any) => {}
}) as Context<any>;