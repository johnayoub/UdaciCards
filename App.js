import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppStatusBar from './components/AppStatusBar';
import HomeView from './components/HomeView';
import DeckView from './components/DeckView';
import AddDeckView from './components/AddDeckView';
import AddCardView from "./components/AddCardView";
import { StackNavigator } from 'react-navigation';
import * as colors from './utils/colors';
import QuizView from "./components/QuizView";
import { setLocalNotification } from "./utils/notifications";

const StackNavigatorStyle = {
    headerTintColor: colors.white,
    headerStyle: {
        backgroundColor: colors.red
    }
};

const MainNavigator = StackNavigator({
    Home: {
        screen: HomeView,
        navigationOptions: {
            title: 'Decks',
            ...StackNavigatorStyle
        }
    },
    Deck: {
        screen: DeckView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.deckTitle}`,
            ...StackNavigatorStyle
        })
    },
    AddDeck: {
        screen: AddDeckView,
        navigationOptions: {
            title: 'Add Deck',
            ...StackNavigatorStyle
        }
    },
    AddCard: {
        screen: AddCardView,
        navigationOptions: {
            title: 'Add Card',
            ...StackNavigatorStyle
        }
    },
    Quiz: {
        screen: QuizView,
        navigationOptions: {
            title: 'Quiz',
            ...StackNavigatorStyle
        }
    }
});

export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification();
    }

    render() {
        return (
            <View style={styles.container}>
                <AppStatusBar/>
                <MainNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
