import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
//importamos fucnion de util para validar email
import { validateEmail } from "../../utils/validation";
//importamos libreria nueva para validar formularios
import { size, isEmpty } from "lodash";
//importamos la conexion al backend
import { signUpApi } from "../../api/user";
//importamos la navegacion
import { useNavigation } from "@react-navigation/native";
//importamos loadin para que haga el efecto cuando uno esta creando la cuenta mientras el backend responde
import Loading from "../Loading";

//creamos componente para crear formularion para registro
export default function RegisterForm(props) {
  //hacemos estructuri oara recuperar la referencia
  const { toastRef } = props;
  //estos dos estadoslo utilizamos para que nos muestre o no la contraseña en passwoord y repeatpasword
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  //creamos otro estado para que se active el efecto de creando cuenta mientra sle backend responde
  const [loading, setLoading] = useState(false);
  //un estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState(defaultFormValue());
    //constante para la navegacion  
    const navigation = useNavigation();

  //funcuin const onSubmit se ejecuta cuando precione el button
  onSubmit = () => {
    //aca utilizamos la libreria para validad y con el iff
    //isEmpty es la funcion de la libreria lodash  que es para que nos diga si tiene mas 6 caracteres
    //la funcion lo que hace es primero comparar que todas tenga un minimo de 6 caracteres
    //despues compara que el imail cumpla los parametros de correo
    //despues compara que passowrd sea igual a repeatpassword
    //funcion size de lodash la libreria da el total de caracter minimos  o cuenta caracteres password
    if (
      isEmpty(formData.names) ||
      isEmpty(formData.surnames) ||
      isEmpty(formData.address) ||
      isEmpty(formData.phone) ||
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto.");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Ñas contraseñas tienen que ser iguales.");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "Las contraseñas tienen que tener almenos 6 caracteres."
      );
    } else {
      setLoading(true);
        const result = await signUpApi(formData);
        if (!result.ok) {
            toastRef.current.show(result.message);
            setLoading(false);
            navigation.navigate("account");
      } else {
        setLoading(false);
        toastRef.current.show(err.message);
      }
    }
  };
  //funcion que se ocupa para ctualizar el estado
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Nombres"
        //aca le damos los estilos al input
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "text")}
        //aca le damos el icono que queremos
        rightIcon={
          <Icon
            type="material-community"
            name="account-plus-outline"
            //aca le damos stilos al icono con la funcion de abajo
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Apellidos"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "text")}
        rightIcon={
          <Icon
            type="material-community"
            name="account-plus-outline"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Direccion"
        onChange={(e) => onChange(e, "text")}
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="crosshairs-gps"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Celular"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "text")}
        rightIcon={
          <Icon
            type="material-community"
            name="cellphone"
            iconStyle={styles.iconRight}
          />
        }
      />
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
        placeholder="Constraseña"
        containerStyle={styles.inputForm}
        password={true}
        //aca mostramos y ocultamos la contraseña con el estado
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            //aca le damos funcionalida al icono para que muestre contraseña cambiar iconoc con estado
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Constraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        rightIcon={
          <Icon type="material-community" name="account-plus-outline" />
        }
        onPress={onsubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta." />
    </View>
  );
}

//funcion para crearnos todos los datos en el estado
function defaultFormValue() {
  return {
    names: "",
    surnames: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}

//aca funcion para los estilos del formulario
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
  btnContainerRegister: {
    marginTop: 20,
    width: "95",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
