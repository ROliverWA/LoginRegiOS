import firebase from 'firebase';
import React, {Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection, Card } from './Components/common';
import LoginForm from './Components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: ''
            authDomain: ''
            databaseURL: '''
            projectId: '''
            storageBucket: '',
            messagingSenderId: '''
            appId: ''
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