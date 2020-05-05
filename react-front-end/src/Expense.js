import React, { Component } from "react"
import { Container, Form, FormGroup, Button } from "reactstrap"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class Expense extends Component {
    state = { 
        date: new Date()
    }
    render() {

        let title = <h2>Expense Page</h2>
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
                        <input type="text" name="category" placeholder="Category" onChange={this.handleChange}></input>
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