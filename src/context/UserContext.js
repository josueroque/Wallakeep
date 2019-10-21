import React, { Component } from 'react';
const UserContext=React.createContext();
export const UserConsumer=UserContext.Consumer;

class UserProvider extends Component {

    state = { 
        name:'',
        surname:'',
        tag:''

     }

     componentDidMount(){
        this.setUser();
    }
     

setUser=()=>{

    this.setState({
        name:'Josue',
        surname:'Roque',
        tag:'work'

})
 

}

    render() { 
        return ( 
            <UserContext.Provider
            value={{
                name:this.state.name,
                surname:this.state.surname,
                tag:this.state.tag
        
            }}
            >
                {this.props.children}
            </UserContext.Provider>

         );
    }
}
 

export default UserProvider;