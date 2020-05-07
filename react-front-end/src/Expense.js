import React, { Component } from "react";
import { Container, Form, FormGroup, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
class Expense extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            date: new Date(),
            isLoading: false,
            Categories: [],
            Expenses: [],
            items: {
                id: 100,
                description: '',
                expenseDate: new Date(),
                location: '',
                category: {
                    id: 1,
                    categoryName: ''
                }
            } 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    async handleSubmit(event) {
        let items = {...this.state.items};

        await fetch('/api/expense', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        }).then(console.log("Submitted"));

        event.preventDefault();
        

        // this.props.history.push("/expenses")
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
            method: 'DELETE',
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
            items // items = items
        });
    }

    handleDateChange(date) {
        let items = {...this.state.items};
        items["expenseDate"] = date;
        this.setState({
            date,
            items
        });
    };

    handleCategoryChange(event) {
        let items = {...this.state.items}
        let value = event.target.value;

        
        if(value == 'Travel') {
            items['category']['id'] = 1;
        } else if (value == 'Auto Loan') {
            items['category']['id'] = 2;
        } else {
            items['category']['id'] = 3;
        }
        // instead of updating category.categoryName directly, I can just update the category.id and it will update the category value since it is the primary key.
        //items["category"]["categoryName"] = event.target.value;

        console.log(items)

        this.setState({
            items
        });

    




        // items.category.name = event.target.value;
        // let name = event.target.name;
        // items[name] = event.target.value;
        // console.log(items)
        // this.setState({
        //     items
        // })
    }

    render() {
        const { isLoading, Categories, Expenses } = this.state;
        let title = <h2>Expense Page</h2>

        return(
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label for="description">Title</label>{" "}
                        <input type="text" name="description" placeholder="Expense Title" onChange={this.handleChange}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="category">Categories</label>{" "}
                        <select onChange={this.handleCategoryChange} name="category">
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
                        <Button color="primary" type="submit">Submit</Button>{" "}
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
                            <th width="20%">Delete</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            Expenses.map(expense => 
                                <tr key={expense.id}>
                                    <th>{expense.description}</th>
                                    <th><Moment format="YYYY/MM/DD" date={expense.expenseDate}/></th>
                                    <th>{expense.location}</th>
                                    <th>{expense.category.categoryName}</th>
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