import React, {Suspense} from 'react';
import './App.scss';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
});

const App = () => {

    const routes = (
        <Switch>
            <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
            <Route path="/orders" render={(props) => <Orders {...props}/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
    );

  return (
        <div className="App">
          <Layout>
              <Suspense fallback={<p>Loading...</p>}>
                  {routes}
              </Suspense>
          </Layout>
        </div>
  );
};

export default App;
