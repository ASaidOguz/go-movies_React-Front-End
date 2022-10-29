import React,{Component} from'react'
import cine_gop from "./../images/Go_gopher_five_years.jpg"
import "./../images/image.css"
export default class Home extends Component{



render(){

    return(
       <div className='text-center'>
        <h1>This is the home Page</h1>
        <hr/>
        <img src={cine_gop} alt='gophers cinematography'/>
        </div> 
        
        
    );
}

}