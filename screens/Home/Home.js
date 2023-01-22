import React from 'react';
import { SafeAreaView, View, Text, StyleSheet,  StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Home(props) {
    return (
       
        <SafeAreaView style={styles.container}>
            
            <View style={{flex : 1}}>
                <Text>Hello Home</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        top : 40,
        
    }
})

export default Home;