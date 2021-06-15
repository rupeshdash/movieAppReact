import React, { Component } from "react";
export default class Pagination extends Component{

    render(){
        let { numberofPage, currentPage, changeCurrentPage } = this.props;
        let pageArr = [];
        for(let i=0; i<numberofPage; i++){
            pageArr[i] = i+1;
        }
        return(<nav aria-label="...">
        <ul class="pagination pagination-sm">

            {
                pageArr.map((page) => {
                    let additional = page == currentPage ? "page-item active" : "page-item";
                    return(
                        
                        <li class={additional} onClick= {()=> {changeCurrentPage(page)}}>
                            <span class="page-link">{page}</span>
                         </li>
                    )
                })
            }
            
            
        </ul>
    </nav> 
    )
}
    
}