import React, { Component } from 'react';
import '../assets/css/login.css';
import { CommonLoading } from 'react-loadingg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChange(e) {
        this.setState({
            phone: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    render() {
        const login = async () => {

            this.setState({
                isLoading: true
            })

            const formData = new FormData();
            formData.append('phone', this.state.phone);
            formData.append('password', this.state.password);

            const requestOptions = {
                method: 'POST',
                body: formData
            };
            fetch("http://localhost:4000/users/sign-in-phone", requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.code === 200) {
                            window.location.href = '/admin/dashboard'
                        } else {
                            alert(result.message);
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
        return (

            <form className="form">

                <h3 className="title">Footcer Admin</h3>

                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="phone" className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChangePassword} />
                </div>
                <button type="button" onClick={login} className="btn btn-primary btn-block btn-wide btn-pill btn-shadow btn-hover-shine btn-lg">
                    {this.state.isLoading ? <i className="fa fa-refresh fa-spin" style={{ marginRight: "0px", fontSize: "20px" }}/> : "Đăng nhập"}


                </button>
            </form>
        )
    }
}

export default Login
