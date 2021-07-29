import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
//importamos libreria de react-native-keyboard-aware-scroll-view que nos servira para que no se nos
//esconda el input cuando se active el teclado ynos sirve en ios para que se active el teclado
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// importamos libreria react-native-easy-toast nos sirve para generar notificacion en androis y ios
import Toast from "react-native-easy-toast";
//importamos componente
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
    //nos sirve para usar de referencia y activar el toast
  const toastRef = useRef();

  return (
    //el keyboardwareskroll es para que cuando demos en un input no se nos oculte el input con el teclado
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/svg/Regionalonair.svg")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

//funcion para agregarle estilos al formulario
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginLeft: 40,
    marginRight: 40,
  },
});
