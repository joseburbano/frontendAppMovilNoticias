import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Icon, Button } from "react-native-elements";
//importamos la navegacion para en caso de que se logue bien redireccione 
import {} from "@react-navigation/native";
//importamos lodash libreria para validar campos
import { isEmpty } from "lodash";
//iportamos la funcion que valida imail
import { validateEmail } from "../../utils/validation";
//importamos la funcion para conectar con el backen
import { signInApi } from "../../api/user";
//exportar contantes
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

export default function Login(props) {
    //mediante distructuri o con el const estraemos de los props toast
  const { toastRef } = props;
  //creamos los estado en el use estate  para que me muestre la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  //creamos const para la navegacion
  const navigation = useNavigation();
  //funcion para validar el estado del formulario
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  //funcion para ejecutar cuando de clieck en el boton comprueba o valida fomulario dato y envia al backend
  const onSubmit = async () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
        toastRef.current.show("Todos los campos son obligatorios.")
    } else if(!validateEmail(formData.email)) {
        toastRef.current.show("El email no es correcto.")
    } else {
        const result = await signInApi(formData.email, formData.password);
        if(result.message) {
            toastRef.current.show(result.message);
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
  
            toastRef.current.show("Iniciando Sesión");
            navigation.navigate("account");
        }
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onsubmit}
      />
    </View>
  );
}
//funcion para guardar el objeto en una variable
function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
