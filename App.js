import React,{useState, useEffect,useRef} from "react";
import { Text,View,StyleSheet,SafeAreaView, TextInput, TouchableOpacity,FlatList, Alert,Keyboard} from "react-native";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from './src/services/firebaseConnection'
import Feather from 'react-native-vector-icons/Feather'



export default function App() {

    
      const [user, setUser] = useState(null)
      const inputRef  = useRef(null)
      const [tasks,setTasks] = useState([])
      const [newTask, setNewTask]= useState(' ')
      const  [key, setkey] = useState('')


       useEffect(() =>{

        function getUser() {
          
          if (!user) {

              return
          }

          firebase.database().ref('tarefas').child(user).once('value', (snapshot)=> {

            setTasks([])

            snapshot?.forEach((childItem) =>{

              let data ={
                key: childItem.key,
                nome: childItem.val().nome

              }
              setTasks(oldTasks => [...oldTasks, data])
            })

          })

        }

        getUser();


       },[user])

       function cancel() {
        
        setkey('');
        setNewTask('')
        Keyboard.dismiss();

       }



      function handleDelete(key) {

        firebase.database().ref('tarefas').child(user).child(key).remove()

        .then(() =>{

          const findTasks = tasks.filter(item => item.key !== key)
          setTasks(findTasks)

        })
        
      }

      function handleEdit(data) {
          setkey(data.key)
        setNewTask(data.nome)
        inputRef.current.focus()
        

      }
      
      function handleAdd() {

        if (newTask === ' ') {
          return
        }

        if (key !== '') {

          firebase.database().ref('tarefas').child(user).update({

            nome: newTask
          })
          .then(() => {

            const taskIndex = tasks.findIndex(item => item.key === key )

            let taskClone = tasks;
            taskClone[taskIndex].nome = newTask

            setTasks([...taskClone])

          })

          Keyboard.dismiss()
          setNewTask('');
          setkey('')
          return 

        }



        let tarefas = firebase.database().ref('tarefas').child(user)
        let chave = tarefas.push().key
        
        tarefas.child(chave).set({

          nome: newTask

        })
        .then(() =>{

          const data ={

            key: chave,
            nome: newTask 
          }

          setTasks(oldTasks => [...oldTasks, data])
        })
        Keyboard.dismiss()
        setNewTask('')
      }


      if (!user) {
        return <Login  changeStatus={(user) => setUser(user)} />
      }





    return(

      <SafeAreaView style={styles.container}>

       {
        key.length > 0 && (

          <View  style={{flexDirection:"row", marginBottom:8}}>
            <TouchableOpacity onPress={cancel}>
            <Feather name='x-circle' size={20} color="#ff0000"/>
            </TouchableOpacity>
            <Text style={{marginLeft:10, color:'#ff0000'}}>
              Você está editando uma tarefa!</Text>
          </View>
        )
       }
         
        <View style={styles.containerInput}>
          <TextInput
          style={styles.input}
          placeholder="Oque vai fazer hoje?"
          value={newTask}
          onChangeText={(e) => setNewTask(e)}
          ref={inputRef}
          />

          <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.txt}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
        data={tasks}  
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (

          <TaskList 
          data={item}
          deleteItem={handleDelete}
          editItem={handleEdit}
          />

        )}

        />


            

      </SafeAreaView>


    )


}

const styles =StyleSheet.create({

  container:{
    flex:1,
    paddingTop:25,
    paddingHorizontal:10,
    backgroundColor:'#f2f6fc'

  },
  containerInput:{

    flexDirection:"row"

  },
  input:{

    flex:1,
    marginBottom:10,
    padding:10,
    backgroundColor:'white',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#141414',
    height:45
  },
  buttonAdd:{

    backgroundColor:'#141414',
    alignItems:'center',
    height:45,
    justifyContent:"center",
    marginLeft:7,
    paddingHorizontal:20,
    borderRadius:5
  },
  txt:{

    color:"white",
    fontSize:30


  }


})