/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

type AuthButtonProps = {
  title: string,
  color: string,
  iconName: string,
  action: () => void,
};

const AuthButton = (props: AuthButtonProps) => {
  return (
    <View style={styles.authButton}>
      <Icon.Button
        name={props.iconName}
        backgroundColor={props.color}
        onPress={props.action}
        >
        {props.title}
      </Icon.Button>
    </View>
  );
};


const EmailSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{ padding: 6 }}>
      <View style={styles.signupWithEmail}>
        <Text style={[styles.signupWithEmailTitle,{color: isDarkMode ? Colors.lighter : Colors.darker}]}>Sign Up with Mail</Text>
        <View style={{ padding: 6 }}>
          <TextInput
            style={[styles.emailForm, { color: isDarkMode ? Colors.lighter : Colors.darker}]}
            placeholder="Please Type your email"
            onChangeText={(newText) => setEmail(newText)}
          />
        </View>
        <View style={{ padding: 6 }}>
          <TextInput
            style={[styles.emailForm,{ color: isDarkMode ? Colors.lighter : Colors.darker}]}
            placeholder="Please Type password"
            secureTextEntry={true}
            onChangeText={(newText) => setPassword(newText)}
          />
        </View>
        <View style={{ padding: 8 }}>
          <Icon.Button
            name="check"
            backgroundColor="purple"
            onPress={() => {
              auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    console.log('User account created & signed in!');
                  })
                  .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                      console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                      console.log('That email address is invalid!');
                    }

                    console.error(error);
                  });
            }}>
            Sign Up with Mail
          </Icon.Button>
        </View>
      </View>
    </View>
  );
};

const Instruction = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text style={[styles.instruction,{ color: isDarkMode ? Colors.lighter : Colors.darker}]}>Please touch{'\n'}Any sign up button</Text>
  );
};

type ContentProps = {
  type: string,
};

const Content = (props: ContentProps) => {
  switch (props.type) {
    case 'mail':
      return <EmailSignUpForm />;
    default:
      return <Instruction />;
  }
};

function App(): JSX.Element {
  const [authType, setAuthType] = useState('ready');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

            <Content type={authType} />
            <AuthButton
              title="Sign Up with Mail"
              color="tomato"
              iconName="envelope"
              action={() => {
                setAuthType('mail');
              }}
            />

            <AuthButton
              title="Sign Up with Google"
              color="green"
              iconName="google"
              action={() => {
                // onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
              }}
            />
            <AuthButton
              title="Sign Up with Facebook"
              color="#3b5998"
              iconName="facebook-square"
              action={() => {
                // onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))
              }}
            />
            <AuthButton
              title="Sign Up with Apple"
              color="black"
              iconName="apple"
              action={() => {
                // Platform.OS == 'ios' ? 
                //   onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))
                //   : console.debug('can not sign up in android platform')
              }}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  authButton: {
    padding: 6,
  },
  instruction: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 80,
  },
  emailForm: {
    height: 40,
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  signupWithEmail: {
    padding: 12,
    borderWidth: 1.8,
    borderRadius: 10,
    borderColor: 'gray',
    height: 240,
  },
  signupWithEmailTitle: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 100,
  },
});

export default App;
