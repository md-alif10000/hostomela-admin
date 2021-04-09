import React,{ useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions";
import { getAllRecharges } from "./actions/recharge.action";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


function App (props) {

  	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
		if(auth.authenticate){
			dispatch(getInitialData());
      			dispatch(getAllRecharges());
		}
		
	}, [auth.authenticate]);


    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
         
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
          
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props}/>}
                />
              
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }


export default App;
