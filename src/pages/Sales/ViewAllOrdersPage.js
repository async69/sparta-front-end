import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../../store/sales/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'

const Order = ({ order, id }) => {
    return (
        <tr align="center">
            <th scope="row">{id}</th>
            <td>{order.company}</td>
            <td>{order.salesPerson}</td>
            <td>{order.shipmentAddress}</td>
            <td>{order.orderDate}</td>
            <td>{order.status}</td>
            <td>
                <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
                    <Button size='sm' color='primary'>
                        See Order
                    </Button>
                </Link>
            </td>
        </tr>
    )
}


class ViewAllOrdersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.lists,
            passedOrders: false
        }
    }
    
    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getAllOrder()
            this.setState({ passedOrders: true })
            console.log(this.props.orders[0])
        } else this.setState({ passedOrders: true })
    }

    render() {
        if (!this.props.lists) {
            if (!this.props.orders[0]) return <PageSpinner />
        }
        return (
            <Page title="View All Orders" breadcrumbs={[{ name: 'All Orders', active: true }]}>
                    <Card className="mb-3">
                        <CardHeader>All Orders</CardHeader>
                        <CardBody>
                            <Table responsive >
                                <thead>
                                    <tr align='center'>
                                        <th>Order #</th>
                                        <th>Customer</th>
                                        <th>Sales Person</th>
                                        <th>Shipment Address</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.lists? this.props.lists.map((order, index) => (
                                        <Order order={order} id={index + 1} />
                                    )) : this.props.orders.map((order, index) => (
                                        <Order order={order} id={index + 1} />
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loading: state.salesReducer.loading,
      errors: state.salesReducer.errors,
      items: state.salesReducer.items,
      companys: state.salesReducer.companys,
      success: state.salesReducer.success,
      orders:state.salesReducer.orders
    }
}
const mapDispatchToProps = {
    createOrder: actions.createOrder,
    getAllItem: actions.getAllItem,
    getAllCompany: actions.getAllCompany,
    getAllOrder: actions.getAllOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllOrdersPage)