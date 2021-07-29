import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Button } from "react-native-elements";
//para la notificiaciones
import Toast from "react-native-easy-toast";
//importamospara destruir la sesion
import { logout } from "../../api/auth";
//importamos componentes
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
//importando funciones para conectarnos a la backend y token
import { currentUserApi } from "../../api/user";
  //importamos peticion te token para permitir coexion con el backend
  import { getAccessTokenApi } from "../../../../api/auth";

export default function UserLogget() {
  //constante para referencia de toast de notificacion
  const toastRef = useRef();
  //creamos dos estados uno para el texto del loadin si es cargando contraseña o cargando inicio de sesion
  //uno para el ya que se ria dinamicotexto y uno para que se muestee
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  //utulizamo use stte para revisar el estado de los datos o guardar el usuario en el estaod
  const [userInfo, setUserInfo] = useState({});
  //usamos un useeffect para recuperar los datos del usuario de la base de datos
  useEffect(() => {
      (async () => {
          const user = await currentUserApi();
          setUserInfo(user);
      })
  }, [input]);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser />
      <Text>AccountOptions</Text>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => logout()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}
const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
