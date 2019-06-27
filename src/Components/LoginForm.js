import React, { Component } from 'react';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Text } from 'react-native';
import firebase from 'firebase';

 

class LoginForm extends Component {
    state = { email: '' , password: '', error: '', loading: false};

    onButtonPress()    
    {        
        const {email, password } = this.state;
        this.setState({ error: "", loading : true })        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLogin.bind(this))           
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLogin.bind(this)) 
                    .catch(this.onLoginFail.bind(this))
            });
           
             
    }

    onLogin() {        
        this.setState({ 
            error: '', 
            email: '', 
            password: '', 
            loading: false
        });
    }

    onLoginFail() {
        this.setState({
            loading: false,
            error: 'Authentication Failed'
        });
    }

    renderButton() {
        if (this.state.loading) {
            return ( <Spinner size = 'small' /> )
            }

        return (
            <Button 
            onPress = { this.onButtonPress.bind(this) }>
                Log In
            </Button>
        )

    }

    render() {
        return (          
                <Card>
                    <CardSection>
                    <Input 
                    labelText = "Email"
                    value = { this.state.email }
                    placeholder = "user@domain.com"
                    onChangeText = { email => this.setState({ email })}                    
                    />
                    </CardSection>
                    <CardSection>
                    <Input
                    placeholder = "password"
                    value = { this.state.password }
                    onChangeText = { password => this.setState({ password })}
                    labelText = "Password"
                    secureTextEntry                    
                    />
                    </CardSection>
                    <Text style={ styles.errorMessage }>
                        { this.state.error }
                    </Text>
                    <CardSection>
                        { this.renderButton() }
                    </CardSection>
        </Card>    )    
        
    }
}

const styles = {
    errorMessage: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}



export default LoginForm;