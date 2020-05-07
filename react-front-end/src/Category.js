import React, { Component } from 'react';
import { Container, Form, FormGroup, Table } from 'reactstrap';
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
                <Container>
                    <Table striped>
                    <thead>
                        <tr>
                            <th width>Categories</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            Categories.map(category => 
                                <tr key={category.id}>
                                    <th>{category.categoryName}</th>
                                </tr>
                            )
                        }
                    </tbody>
                    </Table>
                </Container>
        );
    }
    
}

export default Category;