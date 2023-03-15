import React,{useState} from "react";
import { Text,View,StyleSheet,SafeAreaView, TextInput,TouchableOpacity, Alert } from "react-native";
import firebase from "../../services/firebaseConnection";


export default function Login({changeStatus}){


        const [type, setType] = useState('login')
    
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')



    function goLogin() {
          
        if (type === 'login') {
            
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) =>{
               
               changeStatus(user.user.uid)

            })

            .catch ((err) =>{

                console.log(err)
                Alert.alert('Erro ao fazer login!')
                return
            })         

        }else{
        
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=>{

            console.log(user.user)
            Alert.alert('Usuário criado!')
            })

            .catch((err) =>{

                console.log(err)
                Alert.alert('Algo deu errado!')
                return
            })

        }



    }


    return(


      <SafeAreaView style={styles.container}>
         
        <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(e) => setEmail(e)}

        />

        <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}

        />     

        <TouchableOpacity style={[styles.handleLogin, {backgroundColor: type==='login'?'#3ea6f2': '#141414'} ]}
        onPress={goLogin}

        >
            <Text style={styles.loginText}>
                         {type ==='login' ? 'Acessar': 'Casdastrar' }      
            </Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=> setType(type === 'login' ? 'cadastrar' :'login')}>
            <Text style={{textAlign:"center"}}>
                        {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}             
            </Text>
        </TouchableOpacity>





      </SafeAreaView>


    )


}

const styles =StyleSheet.create({

    container:{
      flex:1,
      paddingTop:40,
      paddingHorizontal:10,
      backgroundColor:'#f2f6fc'
  
  
    },
    input:{

        marginBottom:10,
        backgroundColor:'#fff',
        borderRadius:4,
        height:45,
        padding:10,
        borderWidth:2,
        borderColor:'#141414'

    },
    handleLogin:{

        alignItems:"center",
        justifyContent:'center',
        height:45,
        borderRadius:4,
        marginBottom:10,
        borderWidth:2,
        borderColor: '#141414'

    },
    loginText:{
        color:'#fff',

    }

  
  
  })