import firebase from 'firebase';
import React, {Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection, Card } from './Components/common';
import LoginForm from './Components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDF3slgpMqQn591D7w6Rn2LE9JNBkPrzO0',
            authDomain: 'auth-db481.firebaseapp.com',
            databaseURL: 'https://auth-db481.firebaseio.com',
            projectId: 'auth-db481',
            storageBucket: '',
            messagingSenderId: '716608092360',
            appId: '1:716608092360:web:75a023aee583f009'
          });

        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                this.setState({ loggedIn: true });
            }

            else {
                this.setState({ loggedIn: false })
            }
          });
    }

    renderContent() {
        switch ( this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}> Log Out </Button>   
                        </CardSection>
                    </Card>                  
                );         
            case false:
                return <LoginForm />;
            default:                               
                return <Spinner size='large' />
        }       
    }



    render() {        
        return (
                    
                <View>
                <Header headerText="Authentication" />     
                { this.renderContent() }
                </View>
            
        );
    }
}



export default App;