import React, { Component } from "react";
export default class List extends Component{
    
    render(){
        let {genres , filterGenre} = this.props;
        return(
            
            <ul class="list-group">
                    
                    {
                        genres.map((gObj)=>{
                            return (<li className="list-group-item" key={gObj.id} onClick = {() => {filterGenre(gObj.name)}}>{gObj.name}</li>)
                        })
                    }
                    
            </ul>
        )
        
    }
}