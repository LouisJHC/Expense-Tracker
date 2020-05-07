import React, { Component } from 'react';
import { Container, Form, FormGroup, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    editButton: {
        background: 'linear-gradient(50deg, #c4b20e 40%, #ff8e53 75%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 40,
        padding: '0 15px'
    },

    submitButton: {
        background: 'linear-gradient(50deg, #6bb7fe 40%,  #598e94 75%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 40,
        padding: '0 15px'
    },

    cancelButton: {
        background: 'linear-gradient(50deg, #598e94 40%, #ff8e53 75%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 40,
        padding: '0 15px'
    }

})
class Expense extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            date: new Date(),
            isLoading: false,
            Categories: [],
            Expenses: [],
            items: {
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
        }).then(response => response.json()).then(data => console.log(data));
        
        // event.preventDefault();
        // this.props.history.push("/expenses")
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

    async update(id) {
        let items = {...this.state.items};
        // since id is undefined in the state, setting items["id"] = id will edit the existing value, instead of creating a new id.
        items["id"] = id;
        await fetch('/api/expense/' + id, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        })
        
        window.location.reload()
    }

    async componentDidMount() {
        this.getCategories();
        this.getExpenses();
    }

    async getCategories() {
        let categoriesResponse = await fetch('/api/categories');
        let categoriesBody = await categoriesResponse.json();
        this.setState({
            isLoading: false,
            Categories: categoriesBody
        })
    }

    async getExpenses() {
        let expenseResponse = await fetch('/api/expenses');
        let expenseBody = await expenseResponse.json()

        this.setState({
            isLoading: false,
            Expenses: expenseBody
        })
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

        
        if(value === 'Travel') {
            items['category']['id'] = 1;
        } else if (value === 'Auto Loan') {
            items['category']['id'] = 2;
        } else {
            items['category']['id'] = 3;
        }

        // instead of updating category.categoryName like below, directly, I can just update the category.id and it will update the category value
        // since it is the primary key.
        // items["category"]["categoryName"] = event.target.value;

        this.setState({
            items
        });
    }

    render() {
        const { classes } = this.props; 
        const { isLoading, Categories, Expenses } = this.state;
        let title = <h2>Expense Page</h2>

        if(isLoading) {
            return(<h3>Loading...</h3>)
        }
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
                        <Button className={classes.submitButton} type="submit">Submit</Button>{" "}
                        <Link to="/home">
                            <Button className={classes.cancelButton}>Cancel</Button>
                        </Link>
                    </FormGroup>
                </Form>

                <Table striped>
                    <thead>
                        <tr>
                            <th width>Description</th>
                            <th width>Date</th>
                            <th width>Location</th>
                            <th width>Category</th>
                            <th width>Edit</th>
                            <th width>Delete</th>
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
                                    <th><Button scope="row" className = {classes.editButton} color="info" onClick={() => this.update(expense.id)}>Edit</Button></th>
                                    <th><IconButton aria-label="delete" onClick={() => this.remove(expense.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
         
            </Container>


        );   
    }
}

export default withStyles(styles) (Expense);