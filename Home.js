import React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, Pressable } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('./assets/img/cover.png')} style={styles.cover}></Image>
        <Text style={styles.title}>INFM308 Разработка на мобилни приложения</Text>
        <Text style={styles.text}>
        Това е игра за двама играчи, кръстени 'Морски шах',
        които се редуват да маркират пространствата в мрежа 3×3.
        Играчът, който успее да постави три от своите маркери в диагонален,
        хоризонтален или вертикален ред, е победителят.
        Това е стратегическа игра, чийто изход може да е победа, загуба или равенство за всеки от играчите.
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Tic-Tac-Toe')}><Text style={styles.buttonTitle}>Започни игра</Text></Pressable>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    cover: {
        width: 198,
        height: 112,
        marginTop: 20
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 20,
        marginBottom: 20
    },

    text: {
        textAlign: 'center',
        width: 480,
        height: 100,
        marginBottom: 10
    },

    button: {
        padding: 10,
        marginTop: 60,
        backgroundColor: 'grey',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTitle: {
        color: 'white',
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"
      }
});