import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Components
import Header from './components/header/header.component';

// Google
import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componenetWillUnmount() {
    this.unsubscribeFromAuth();
  } 

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInandSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
