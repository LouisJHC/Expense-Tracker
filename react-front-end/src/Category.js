import React, { Component } from 'react';
class Category extends Component {
    state = {
        isLoading: true,
        Categories: []
    }

    
    async componentDidMount() {
        let response = await fetch('/api/categories');
        let body = await response.json();
        this.setState({
            isLoading: false,
            Categories: body
        })
    }


    render() {
        const { isLoading, Categories } = this.state;
        if(isLoading) {
            return(
                <div>
                    Loading...
                </div>
            );
        }
            return (

                <div>
                    <h1>Categories</h1>
                    {
                        Categories.map(category => 
                            <div id={category.id}>
                                {category.categoryName}
                            </div>
                        )
                    }

                </div>   
            );
        }
    
}

export default Category;