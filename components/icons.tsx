import Icon from "@mui/material/Icon";
import * as React from "react";

export const searchIcon = <Icon>search</Icon>;
export const logoutIcon = <Icon>logout</Icon>;
export const maleIcon = (action: () => void) => <Icon onClick={action}>male</Icon>
export const femaleIcon = (action: () => void) => <Icon onClick={action}>female</Icon>
export const transIcon = (action: () => void) => <Icon onClick={action}>transgender</Icon>
