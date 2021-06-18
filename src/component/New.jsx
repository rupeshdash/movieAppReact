import React, { Component } from 'react'

export default class New extends Component {
    
    state = {
        data: {
            title: "",
            genre: "",
            stock: "",
            rate: ""
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMovie(this.state.data);
        //after submiting the form take the form to previous state
        this.setState({
            data: {
                title: "",
                genre: "",
                stock: "",
                rate: ""
            }
        })
    }
    handleChange = (e) => {
        let id = e.currentTarget.id;
        // console.log(id)
        let value = e.target.value;
        let newobject = { ...this.state.data };
        newobject[id] = value;

        this.setState({
            data: newobject
        })
    }
    render() {
        let{title ,genre,rate,stock} = this.state.data;
        
        return (
            <>
            
           <div className="form-container">
           <form class="row g-3" onSubmit={this.handleSubmit}>
                       
                        <div class="col-md-6">
                            <label  class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Enter title here.." value={title} onChange={this.handleChange}/>
                        </div>
                        <label  class="form-label">Genre</label>
                        <select  className="form-control" id="genre" value={genre} onChange={this.handleChange}>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        
                        
                        <div class="col-md-4">
                             <label  class="form-label">Rate</label>
                            <input type="number" class="form-control" id="rate" placeholder="Stock"value={rate} onChange={this.handleChange}/>
                        </div>
                        <div class="col-md-4">
                            <label  class="form-label">Rate</label>
                            <input type="number" class="form-control" id="stock" placeholder="Rate" value={stock} onChange={this.handleChange}/>
                        </div>
                       
                        <div class="col-12">
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" for="gridCheck">
                                Confirm
                            </label>
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-success" >Add movie</button>
                        </div>
            </form>
           </div>

           </>

       
        )
    }
}
