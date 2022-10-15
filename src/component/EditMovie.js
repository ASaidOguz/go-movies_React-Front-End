import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import './EditMovie.css'
import Input from './form-components/input';
import InputArea from './form-components/InputArea';
import Select from './form-components/Select';
import Alert from './ui-components/Alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export default class EditMovie extends Component{

   
     //Lifting state!!!!!
     //Now our form elements bound to our states, as we change value u can 
     //observe the changes in json object down below.
    constructor(props){
        super(props);
        this.state={
         movie:{
            id:0,
            title:"",
            release_date:"",
            runtime:"",
            mpaa_rating:"",
            rating:"",
            description:"",
               },
            mpaaOptions:[
                {id:'G',value:'G'},
                {id:'PG',value:'PG'},
                {id:'PG13',value:'PG13'},
                {id:'R',value:'R'},
                {id:'NC17',value:'NC17'},
            ],
            isLoaded:false,
            error:null,
            errors:[],
            alert:{
              type:"d-none",
              message:""
            }
          
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit=(evnt)=>{
      evnt.preventDefault()
      //clint side validation for "title" field...
      let errors =[]
      if(this.state.movie.title===""){
        errors.push("title")
      }
     

      this.setState({errors:errors});
      if(errors.length>0){
        return false
      }
     
     
      //This is how we submit our form ....
      //Default fetch is GET request , for post 
      //You need to create options of request and add it as it shown below.
      const data =new FormData(evnt.target)
      const payload=Object.fromEntries(data.entries())
      console.log(payload)
      
      const requestOptions={
        method:"POST",
        body:JSON.stringify(payload)
      }
      fetch("http://localhost:4000/v1/admin/editmovie",requestOptions)
           .then((response)=>response.json())
           .then((data)=>{
            if(data.error) {
              this.setState({
                alert:{type:"alert-danger",
                message:data.error.message},})
              }
               else{
                   this.props.history.push({
                  pathname:"/admin",
              })
              }
            })
          }
              
    handleChange=(evnt)=>{
        let value=evnt.target.value;
        let name =evnt.target.name
        this.setState((prevState)=>({
            movie:{
                ...prevState.movie,
                [name]:value,
            }
        }))
    }
    hasError(key){
      return this.state.errors.indexOf(key)!==-1
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        if (id > 0) {
          fetch("http://localhost:4000/v1/movie/" + id)
            .then((response) => {
              if (response.status !== '200') {
                let err = Error;
                console.log(response.status)
                err.Message = "Invalid response code: " + response.status;
                this.setState({ error: err })
                
              }
              return response.json();
            })
            .then((json) => {
              const releaseDate = new Date(json.movie.release_date);
    
              this.setState(
                {
                  movie: {
                    id: id,
                    title: json.movie.title,
                    release_date: releaseDate.toISOString().split("T")[0],
                    runtime: json.movie.runtime,
                    mpaa_rating: json.movie.mpaa_rating,
                    rating: json.movie.rating,
                    description: json.movie.description,
                  },
                  isLoaded: true,
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error,
                  });
                }
              );
            });
        } else {
            this.setState({ isLoaded: true });
          }
    }
confirmDelete=(e)=>{
  console.log("would delete this movie id :",this.state.movie.id)

  confirmAlert({
    title: 'Delete The Movie',
    message: 'Are you sure ?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          fetch("http://localhost:4000/v1/admin/deletemovie/"+this.state.movie.id,{method:"GET"})
          .then(response=>response.json())
          .then((data)=>{
            if (data.error){
               this.setState({
                alert:{type:"alert-danger",message:data.error.message}
               })
            }else{
              this.props.history.push({
                pathname:"/admin",
              })
            }
          })
        }
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  })
}

  render(){
    let { movie, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
     return(
        <Fragment>
            <h2>Add/Edit Movie</h2>
            <Alert 
             alertType={this.state.alert.type}
             alertMessage={this.state.alert.message}
            />
            <hr/>
            <form onSubmit={this.handleSubmit}>
              <input
              type='hidden'
              name='id'
              id='id'
              value={movie.id}
              onChange={this.handleChange}
              />
           
             <Input
               title={"Title"}
               className={this.hasError("title")?"is-invalid":""}
               type={"text"}
               name={'title'}
               value={movie.title}
               handleChange={this.handleChange}
               errorDiv={this.hasError("title")?"text-danger":"d-none"}
               errorMsg={"Please enter input for title"}
               />
          
            <Input
               title={"Release Date"}
               type={"date"}
               name={'release_date'}
               value={movie.release_date}
               handleChange={this.handleChange}
               />

            
            <Input
               title={"Run Time"}
               type={"text"}
               name={'runtime'}
               value={movie.runtime}
               handleChange={this.handleChange}
               />

         
            <Select 
                 title={'MPAA Rating'}
                 name={'mpaa_rating'}
                 options={this.state.mpaaOptions}
                 value={movie.mpaa_rating}
                 handleChange={this.handleChange}
                 placeholder={'Choose...'}
                
             />
          
            <Input
               title={"Rating "}
               type={"text"}
               name={'rating'}
               value={movie.rating}
               handleChange={this.handleChange}
               />
          
           <InputArea
                  title={"Description"}
                  id={"description"}
                  name={"description"}
                  rows={"3"}
                  handleChange={this.handleChange}
                  value={movie.description}
                  />
            <hr/>
            <button className='btn btn-primary'>Save</button>
            <Link to="/admin" className='btn btn-warning ms-1'>Cancel</Link>
            {movie.id>0 &&(
                    <a href="#!" onClick={()=>{this.confirmDelete()}}
                    className="btn btn-danger ms-1">Delete</a>)
              
            }
            </form>
            <div className='mt-3'>
            <pre>{JSON.stringify(this.state,null,3)}</pre>
            </div>
        </Fragment>
     )
     }
  }

}