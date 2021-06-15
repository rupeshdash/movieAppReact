import React, { Component } from "react";
import List from './List';
import Pagination  from "./Pagination";

export default class moviepage extends Component {
  state = {
    movies: [],
    genres: [{id : 1, name:"All Genres"}],
    currSearchText: "",
    limit: 4,
    currentPage: 1,
    currentGenre: "All Genres"
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
filterGenre = (gName) =>{
    
    this.setState({
        currentGenre:gName,
        currSearchText:""
    })
}
async componentDidMount() {
    // console.log(2);
    let resp = await fetch("https://react-backend101.herokuapp.com/movies");
    let jsonMovies = await resp.json()
    this.setState({
        movies: jsonMovies.movies
    });

    resp = await fetch("https://react-backend101.herokuapp.com/genres");
    let jsonGenres = await resp.json();
    this.setState({
        genres : [...this.state.genres,...jsonGenres.genres]
    });
}
render() {
    let { movies, currSearchText, limit,currentPage ,genres,currentGenre } = this.state; 
    
    let filteredArr = movies;
    if (currentGenre != "All Genres") {
      
        filteredArr = movies.filter((movieObj)=>{
            return movieObj.genre.name == currentGenre;
        })
    }
    
    if (currSearchText != "") {
   
        filteredArr = movies.filter((movieObj) => {
            let title = movieObj.title.trim().toLowerCase();
            
            return title.includes(currSearchText.toLowerCase());
        })
    }
    
    

    let numberOfPages = Math.ceil(filteredArr.length / limit);
    

    let si = (currentPage - 1) * limit;
    let eidx = si + limit;
    filteredArr = filteredArr.slice(si, eidx);
    
    
    return (
        <div className="row">
            {/* 12 part */}
            <div className="col-3">
            <List genres = {genres} filterGenre = {this.filterGenre}></List>
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

                <Pagination
                        numberofPage={numberOfPages}
                        currentPage={currentPage}
                        changeCurrentPage={this.changePage}
                ></Pagination>


               
            </div>
        </div>

    )
}
}


