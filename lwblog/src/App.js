import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';
import { GlobalFontStyle } from './statics/iconfont/iconfont';
import { GlobalStyle } from './style';

class App extends Component {
  render() {
    return (
      /* App is enclosed by Provider. Provider provides a store that make sure that all components in it can use this store */
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* this shows how you use GlobalStyle in styled component*/}
            <GlobalFontStyle />
            <GlobalStyle />
            <Header />
            {/* exact means only the path is exactly what is written here, then the component will be used*/}
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
