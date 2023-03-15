import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,TouchableNativeFeedback} from "react-native";
import Feather from 'react-native-vector-icons/Feather'


export default function TaskList({data, deleteItem, editItem}) {
    return(

        <View style={styles.container}>
                <TouchableOpacity style={{marginRight:14}} onPress={() => deleteItem(data.key)}>
                    <Feather name="trash" color="#fff" size={20}/>
                </TouchableOpacity>



                <View style={{paddingRight:10, }}>

                    <TouchableNativeFeedback onPress={() => editItem(data)}>
                            <Text style={{color:'#fff',paddingRight:10, fontSize:16}}>{data.nome}</Text>
                    </TouchableNativeFeedback>

                </View>

        </View>
        


    )
}

const styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        backgroundColor:'#121212',
        marginBottom:10,
        padding:10,
        borderRadius:5
    }

})