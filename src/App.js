
import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route, Link,} from 'react-router-dom';
import Admin from './component/Admin';
import Home from './component/Home';
import Movies from './component/Movies';
import OneGenre from './component/OneGenre';
import OneMovie from './component/OneMovie';
import Genres from './Genres';
import EditMovie from './component/EditMovie';
import Login from './component/Login';
import Graphql from './component/Graphql';
export default class App extends Component {
  constructor(props){
   super(props)
    this.state={
      jwt:"",
    }
    this.handleJWTchange(this.handleJWTchange.bind(this))
  }
  componentDidMount(){
    let t=window.localStorage.getItem("jwt")
    if(t){
      if(this.state.jwt===""){
        this.setState({jwt:JSON.parse(t)})
      }
    }
  }
  handleJWTchange=(jwt)=>{
    this.setState({jwt:jwt})
  }
  logout=()=>{
    this.setState({jwt:""});
    window.localStorage.removeItem("jwt");
  }
  render(){
    let loginLink;
    if(this.state.jwt===""){
      loginLink=<Link to="/login">Login</Link>
    }else{
      loginLink=<Link to="/logout" onClick={this.logout}>Logout</Link>
    }
  return (
    <Router>
    <div className="container">

      <div className="row">
        <div className='col mt-3'>
        <h1 className="mt-3">
          Go Watch a Movie!
        </h1>
        </div>
        <div className='col mt-5 text-end'>
        {loginLink}
        </div>
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
                <Link to="/genres">Genres</Link>
              </li>

              {this.state.jwt!==""&&
              <Fragment>
              <li className="list-group-item">
                <Link to="/admin/movie/0">Add Movie</Link>
              </li>

              <li className="list-group-item">
                <Link to="/admin">Manage Catalogue</Link>
              </li>
              </Fragment>
                }
                <li className='list-group-item'>
                 <Link to="/graphql">Graphql</Link>
                </li>
            </ul>

            <pre>
              {JSON.stringify(this.state,null,3)}
            </pre>
          </nav>
        </div>

        <div className="col-md-10">
          <Switch>
            <Route path="/movies/:id" component={OneMovie} />
             
            <Route path="/movies">
             <Movies/>
            </Route>
            <Route path="/genre/:id" component={OneGenre} />
            <Route exact path="/login" component={(props)=>
                  <Login {...props} handleJWTchange={this.handleJWTchange}/>}/>
            
            <Route exact path="/genres">
              <Genres />
            </Route>
            <Route exact path="/graphql">
              <Graphql/>
            </Route>
           <Route path="/admin/movie/:id" component={(props)=>
                   <EditMovie{...props} jwt={this.state.jwt}/>}/>
           <Route path="/admin" component=
           {(props)=><Admin{...props}jwt={this.state.jwt}/>}/> 
            <Route path="/">
             <Home/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}}



