import React, { Component } from "react"
import { Container, Form, FormGroup, Button } from "reactstrap"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class Expense extends Component {
    state = { 
        date: new Date(),
        isLoading: true,
        Categories: [],
        Expenses: []
    }


    async componentDidMount() {
        let categoriesResponse = await fetch('/api/categories');
        let categoriesBody = await categoriesResponse.json();
        this.setState({
            isLoading: false,
            Categories: categoriesBody
        })


        let expenseResponse = await fetch('/api/expenses');
        let expenseBody = await expenseResponse.json()

        this.setState({
            Expenses: expenseBody
        })
    }
    render() {
        const { isLoading, Categories } = this.state;
        let title = <h2>Expense Page</h2>

        if(isLoading) {
            return (
            <div>Loading...</div>
            );
        } 
        return(
            <Container>
                {title}
                <Form>
                    <Form onSubmit="onSubmitChange"></Form>
                    <FormGroup>
                        <label for="title">Title</label>{" "}
                        <input type="text" name="title" placeholder="Expense Title" onChange={this.handleChange}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="category">Categories</label>{" "}
                        <select>
                            {
                                Categories.map(category => 
                                    <option id={category.id}>
                                        {category.category}
                                    </option>
                                )
                            }
                        </select>
                    </FormGroup>


                    <FormGroup>
                        <label for="date">Date</label>{" "}
                        <DatePicker selected={this.state.date} onChange={this.handleChange}></DatePicker>
                    </FormGroup>

                    <FormGroup>
                        <label for="location">Location</label>{" "}
                        <input type="text" name="location" placeholder="Location" onChange={this.handleChange}></input>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary">Submit</Button>{" "}
                        <Link to="/home">
                            <Button color="success">Cancel</Button>
                        </Link>
                    </FormGroup>
                </Form>
            </Container>
        );   
    }
}

export default Expense;