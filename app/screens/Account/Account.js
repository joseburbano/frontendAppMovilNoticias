import React, { useState, useEffect } from "react";

//importamo la funcion que nos conecta con la api
import { signInApi } from '../../api/user';

//importsmos componentes
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

//exportar contantes
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
    !user ? setLogin(false): setLogin(true);
    });
  }, []);

  if(login == null) return <Loading isVisible={true} />;

  return login ? <UserLogged /> : <UserGuest />
}
