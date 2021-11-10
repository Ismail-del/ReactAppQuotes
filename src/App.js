import React, {Suspense} from 'react';
import { Route, Switch,Redirect } from 'react-router-dom'; 
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
// import NewQuote from './pages/NewQuote';
import PageError from './pages/PageError';
import Quotes from './pages/Quotes';
import QuotesId from './pages/QuotesId';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));



function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"/>
          </Route>
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuotesId />
          </Route>
          <Route path="/newQuote">
            <NewQuote />
          </Route>
          <Route path='*'>
            <PageError />
          </Route>
        </Switch>
      </Suspense>
    </Layout>

  );
}

export default App;
