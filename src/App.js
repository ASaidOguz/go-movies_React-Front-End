
import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from 'react-router-dom';
import Admin from './component/Admin';
import Home from './component/Home';
import Movies from './component/Movies';
import Categories from './component/Categories';
import OneMovie from './component/OneMovie';
export default function App() {
  return (
    <Router>
    <div className="container">

      <div className="row">
        <h1 className="mt-3">
          Go Watch a Movie!
        </h1>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="list-group-item">
                <Link to="/by-categories">Categories</Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin">Manage Catalogue</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-md-10">
          <Switch>
            <Route path="/movies/:id" component={OneMovie} />
             
            <Route path="/movies">
             <Movies/>
            </Route>
            <Route exact path="/by-categories">
              <CategoryPage />
            </Route>
           
            <Route 
            exact
            path="/by-categories/drama"
            render={(props) => <Categories {...props} title={`Drama`} />}
            />

            <Route 
            exact
            path="/by-categories/comedy"
            render={(props) => <Categories {...props} title={`Comedy`} />}
            />
            
            

            <Route path="/admin">
              <Admin/>
            </Route>
            <Route path="/">
             <Home/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}



function CategoryPage(){
  let {path,url}=useRouteMatch();

  return(
    <div>
      <h2>Categories</h2>
      <ul>
        <li> <Link to={`${path}/drama`}>Drama</Link></li>
        <li> <Link to={`${url}/comedy`}>Comedy</Link></li>
     
      </ul>


    </div>
  )
}