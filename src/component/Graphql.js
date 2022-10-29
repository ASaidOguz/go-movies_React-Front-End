import  { Component, Fragment } from 'react'

export default class Graphql extends Component{
    constructor(props){
        super(props)
        this.state={
            movies:[],
            isLoaded:false,
            error:null,
            alert:{
                type:"d-none",
                message:"",
            }
        }
    }
    componentDidMount(){
        const payload=`{
            list{
               id
               title
               runtime
               year
            }
        }`
       const myHeaders=new Headers();
       myHeaders.append("Content-Type","application/json");
        
       const requestOptions={
        method:"POST",
        body:payload,
        Headers:myHeaders,
       }

       fetch("http://localhost:4000/v1/graphql/list",requestOptions)
       .then((response)=>response.json())
       .then((data)=>{
        console.log(data.data.list)
        let theList=Object.values(data.data.list)
        return theList
       })
       .then((theList)=>{
        
        this.setState({movies:theList})
       })
    }
    render(){
        let {movies}=this.state
        return(
            <Fragment>
                <h2>Graphql</h2>
                <hr/>

                <div className='list-group'>
                    {movies.map((m)=>(<a 
                        key={m.id}
                        className='list-group-item '
                        href='#!'>
                            <strong>{m.title}</strong>
                        </a>
                    ))}

                    
                </div>
            </Fragment>
            )
    }
}