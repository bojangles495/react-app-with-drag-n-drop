import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import home from './home';
import router from './router';
import DevTools from './DevTools';
import components from '../components';

export default class App extends React.Component {
  //static displayName = 'App';

  constructor(props) {
    super(props);

    home.actionCreators.initializeHome(configureStore.dispatch);
    router.actionCreators.initializeRouter(configureStore.dispatch, { spinner: false, route: 'HOME' });

    this.pages = {
      [router.routes.HOME]: components.home.container,
    };
  };

  render() {
    return (
      <Provider store={configureStore}>
        <div>
          <router.container 
            components={this.pages} 
            />
          <DevTools />
        </div>
      </Provider>
    )
  };
}

App.displayName = 'App';
