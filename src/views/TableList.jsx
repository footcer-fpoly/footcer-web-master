/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = { stadium: [] }
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    const requestOptions = {
      method: 'GET'
    };
    fetch("http://localhost:4000/stadium/list", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data);
          if (result.code === 200) {
            this.setState({
              stadium: result.data
            })
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

  accept(satdiumID){
    const requestOptions = {
      method: 'GET',
    };
    fetch("http://localhost:4000/admin/accept-stadium/" + satdiumID, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.code === 200) {
            this.onLoad();
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

  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Danh sách Sân bóng"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.stadium.map((prop, key) => {
                        return (
                          <>
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{prop.stadiumName}</td>
                              <td>{prop.address}</td>
                              <td>{prop.category}</td>
                              <td><img src={prop.image} style={{ height: 20, width: 20 }} /></td>
                              <td> {prop.verify === "0" ? <button type="button" onClick={() => this.accept(prop.stadiumId)} className="btn btn-primary btn-block">Chấp nhận</button> : null}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>


          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
