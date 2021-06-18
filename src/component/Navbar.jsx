import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class navbar extends Component {
    render() {
        return (
            <div className="navbar-container ">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between">
                


                <Link className="navbar-brand" to="/"><h3 className="display-6">Movie Rentals</h3></Link>
                <div className="login-btn">
                <Link to="/new"><button className="btn btn-success my-2 my-sm-0 add-btn" type="submit">Add movies</button></Link>
                    
                    <button className="btn btn-success my-2 my-sm-0 " type="submit">Login</button>
                </div>
                
            </nav>
            
    </div>
        )
    }
}
