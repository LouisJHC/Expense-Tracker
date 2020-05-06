import React, { Component } from "react"
import { Container, Form, FormGroup, Button, Table } from "reactstrap"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class Expense extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            date: new Date(),
            isLoading: false,
            Categories: [],
            Expenses: [],
            items: this.emptyItems
        }

        this.handleChange = this.handleChange.bind(this);
    }

    emptyItems = {
        id: 100,
        description: "",
        expenseDate: new Date(),
        location: "",
        category: {
            id: 1,
            name: 'travel'
        }
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
            isLoading: false,
            Expenses: expenseBody
        })
    }

    async remove(id) {
        let updatedExpenses = []
        await fetch('/api/expense/' + id,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id),

            this.setState({
                Expenses: updatedExpenses
            })
        )
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        let items = {...this.state.items};

        items[name] = value;

        this.setState({
            items
        });
        console.log(items)



    }

    render() {
        const { isLoading, Categories, Expenses } = this.state;
        let title = <h2>Expense Page</h2>

        return(
            <Container>
                {title}
                <Form>
                    <Form onSubmit="onSubmitChange"></Form>
                    <FormGroup>
                        <label for="description">Title</label>{" "}
                        <input type="text" name="description" placeholder="Expense Title" onChange={this.handleChange}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="category">Categories</label>{" "}
                        <select>
                            {
                                Categories.map(category => 
                                    <option id={category.id}>
                                        {category.categoryName}
                                    </option>
                                )
                            }
                        </select>
                    </FormGroup>


                    <FormGroup>
                        <label for="date">Date</label>{" "}
                        <DatePicker selected={this.state.date} onChange={this.handleDateChange}></DatePicker>
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

                <Table>
                    <thead>
                        <tr>
                            <th width="30%">Description</th>
                            <th width="10%">Date</th>
                            <th width="10%">Location</th>
                            <th width="20%">Category</th>
                            <th width="20%">User</th>
                            <th width="20%">Delete</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            Expenses.map(expense => 
                                <tr key={expense.id}>
                                    <th>{expense.description}</th>
                                    <th>{expense.expenseDate}</th>
                                    <th>{expense.location}</th>
                                    <th>{expense.category.categoryName}</th>
                                    <th>{expense.user.name}</th>
                                    <Button color="danger" onClick={() => this.remove(expense.id)}>Remove</Button>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
         
            </Container>


        );   
    }
}

export default Expense;