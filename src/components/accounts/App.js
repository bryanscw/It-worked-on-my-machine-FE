// import React, { Component } from 'react';
// // import './App.css';
// import { Provider } from 'react-redux';
// import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Login from './components/Login';
// import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminTable from './components/AdminTable';
// import { PrivateRoute } from './components/PrivateRoute';

// class App extends Component {
//   render() {
//     return (
      
//       <Provider store={store}>
//           <BrowserRouter>
//               <Switch>
//                     <PrivateRoute exact path="/" component={AdminTable} />
//                     <Route path="/login" component={Login} />
//                     <Route path= "/users" component={AdminTable}/>
//                     <Redirect from="*" to="/" />
//                 </Switch>
//             {/* <Switch>
//             <Route path= "/users" component={ AdminTable}/>
//             <Route path= "/login" component={ Login }/>
//             </Switch> */}
//             </BrowserRouter>
//   </Provider>
//     );
//   }
// }

// export default App;