import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from "variables/Variables.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        stadium: '',
        order: '',
        team: '',      
    }
  
}

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  componentDidMount() {
    const requestOptions = {
      method: 'GET',
  };
    fetch("http://localhost:4000/admin/statistics",requestOptions)
    .then(res => res.json())
    .then(
        (result) => {
          if (result.code === 200) {
            this.setState({
              user : result.data.totalUser,
              stadium : result.data.totalStadium,
              order : result.data.totalOrder,
              team : result.data.totalTeam,
  
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
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-users fa-fw text-warning" />}
                statsText="Tổng Người dùng"
                statsValue={this.state.user}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-futbol-o text-success" />}
                statsText="Tổng Sân bóng"
                statsValue={this.state.stadium}

                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-cart-plus text-danger" />}
                statsText="Tổng Đặt hàng"
                statsValue={this.state.order}

                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-bug text-info" />}
                statsText="Tổng Đội bóng"
                statsValue={this.state.team}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
           
          </Row>

         
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
