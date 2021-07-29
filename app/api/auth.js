import { basePath } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}
//conexion con la api para validar accetoken en el bakend y poder generar unoo nuevo en caso de quela sesion se caiga
export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params).then(response => {
      if(response.status !==200) {
          return null;
      }
      return response.json();
  })
  .then(result => {
      if(!result) {
        // Desloguear usuario
        logout();
      } else {
          //genera nuevo stoken y lo guarda en el localStoge
          const { accessToken, refreshToken } = result;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
  });
}
//funcion para desloguear y eliminar token de localstorage
export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

//comprovacion de expireacion de token
function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
