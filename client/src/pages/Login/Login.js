import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";


class Login extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        username: "",
        password: ""
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {

    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    login() {

    }
    createAccount() {

    }

    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
        //HANDLE API WORK HERE
        // if (this.state.title && this.state.author) {
        //     API.saveBook({
        //         title: this.state.title,
        //         author: this.state.author,
        //         synopsis: this.state.synopsis
        //     })
        //         .then(res => this.loadBooks())
        //         .catch(err => console.log(err));
        // }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>LOGIN</h1>
                        </Jumbotron>
                        <form>
                            Username
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="USERNAME"
                            />
                            Password
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="PASSWORD"
                            />
                            <FormBtn
                                onClick={this.handleFormSubmit}
                            >
                                Log in
                            </FormBtn>

                            <FormBtn
                                onClick={this.handleFormSubmit}
                            >
                                Create Account
                            </FormBtn>

                        </form>
                        {/* <form>
                            Login
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="search"
                                placeholder="Username"
                            />
                 
                                Password
                            <Input
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="search"
                                    placeholder="Password"
                                />
                       
                                <FormBtn
                                    onClick={this.login}
                                >
                                    Login
                                </FormBtn>
                                <FormBtn
                                    onClick={this.createAccount}
                                >
                                    Create Account
                                </FormBtn>
                           
                        </form> */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
