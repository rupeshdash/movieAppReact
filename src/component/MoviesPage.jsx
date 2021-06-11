import React, { Component } from "react";
import { getMovies } from "../temp/moviesList";

export default class moviepage extends Component {
  state = {
    movies: [],
    currSearchText: "",
    limit: 4,
    currentPage: 1
}
deleteEntry = (id) => {
    let filtereMovies =this.state.movies.filter((movieObj) => {
            return movieObj._id != id;
        })
    this.setState({
        movies: filtereMovies
    })
}
setCurrentText = (e) => {
    let task = e.target.value;
// filter 
    this.setState({
        currSearchText: task
    })
}
sortByStock = (e) =>{
    let className = e.target.className;
    let {movies} = this.state;
    let sortedMovies;
    if(className == "fas fa-sort-up"){
        sortedMovies = movies.sort((movieObjA, movieObjB) =>{
            return movieObjA.numberInStock - movieObjB.numberInStock;
        })
    }else{
        sortedMovies = movies.sort((movieObjA, movieObjB) =>{
            return movieObjB.numberInStock - movieObjA.numberInStock;
        })
    }

    this.setState({
        movies : sortedMovies
    })
}
sortByRating = (e)=>{

    let className = e.target.className;
    let {movies} = this.state;
    let sortedMovies;
    if(className == "fas fa-sort-up"){
        sortedMovies = movies.sort((movieObjA, movieObjB) =>{
            return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
        })
    }else{
        sortedMovies = movies.sort((movieObjA, movieObjB) =>{
            return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
        })
    }

    this.setState({
        movies : sortedMovies
    })
}
changeLimit = (e) => {
    let changeLimit = e.target.value;
    this.setState({
        limit : changeLimit
    })
}

changePage = (pageNumber) => {
    
    this.setState({
        currentPage : pageNumber
    })
}
async componentDidMount() {
    // console.log(2);
    let resp = await fetch("https://react-backend101.herokuapp.com/movies");
    let jsonMovies = await resp.json()
    this.setState({
        movies: jsonMovies.movies
    });
}
render() {
    let { movies, currSearchText, limit,currentPage } = this.state; 
    let filteredArr = movies.filter((movieObj) => {
        let title = movieObj.title.trim().toLowerCase();
        console.log(title);
        return title.includes(currSearchText.toLowerCase());
    })
    if (currSearchText == "") {
        filteredArr = this.state.movies;
    }

    let numberOfPages = Math.ceil(filteredArr.length / limit);
    let pageArr = [];
    for(let i=0; i<numberOfPages; i++){
        pageArr[i] = i+1;
    }

    let si = (currentPage - 1) * limit;
    let eidx = si + limit;
    filteredArr = filteredArr.slice(si, eidx);
    
    return (
        <div className="row">
            {/* 12 part */}
            <div className="col-3">
                
            </div>
            <div className="col-9">
                <input type="search" value={currSearchText}
                    onChange={this.setCurrentText} />

                <input type="number" className="col-1" placeholder = "Number of elements" value={limit} onChange={this.changeLimit}/>
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">
                                <i className="fas fa-sort-up" onClick={this.sortByStock}></i>
                                Stock
                                <i className="fas fa-sort-down" onClick={this.sortByStock}> </i>
                            </th>
                            <th scope="col">
                                <i className="fas fa-sort-up" onClick={this.sortByRating}></i>
                                Rate
                                <i className="fas fa-sort-down" onClick={this.sortByRating}></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArr.map((movieObj) => {
                            return (<tr scope="row" key={movieObj._id}>
                                <td>{movieObj.title} </td>
                                <td>{movieObj.genre.name}</td>
                                <td>{movieObj.numberInStock}</td>
                                <td>{movieObj.dailyRentalRate}</td>
                                <td><button type="button" className="btn btn-danger"
                                    onClick={() => {
                                        this.deleteEntry(movieObj._id);
                                    }}>Delete</button></td>
                            </tr>)
                        })}
                    </tbody>
                </table>

                <nav aria-label="...">
                    <ul class="pagination pagination-sm">

                        {
                            pageArr.map((page) => {
                                let additional = page == currentPage ? "page-item active" : "page-item";
                                return(
                                    
                                    <li class={additional} onClick= {()=> {this.changePage(page)}}>
                                        <span class="page-link">{page}</span>
                                     </li>
                                )
                            })
                        }
                        
                        
                    </ul>
                </nav>
            </div>
        </div>

    )
}
}
