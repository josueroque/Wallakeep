import React, { Component } from 'react';
const UserContext=React.createContext();
export const UserConsumer=UserContext.Consumer;

class UserProvider extends Component {

    state = { 
        name:'',
        surname:'',
        tag:'',
        idDetail:''

     }

     componentDidMount(){
       // this.setUser();
    }
     

setUser=(e)=>{
console.log(e);
    this.setState({
        name:e.name,
        surname:e.surname,
        tag:e.tag,
        idDetail:''

    })
}

setId=(id)=>{
    console.log(id);
        this.setState({
            name:this.state.name,
            surname:this.state.surname,
            tag:this.state.tag,
            idDetail:id
    
        })
    }


    render() { 
        return ( 
            <UserContext.Provider
            value={{
                name:this.state.name,
                surname:this.state.surname,
                tag:this.state.tag,
                setUser:this.setUser
            }}
            >
                {this.props.children}
            </UserContext.Provider>

         );
    }
}
 

export default UserProvider;