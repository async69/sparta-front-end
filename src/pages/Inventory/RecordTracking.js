import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getRecords, getExistingCategories } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import type from '../../constant/transactions'

class RecordTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getCategory = this.getCategory.bind(this)
    }

    componentDidMount() {
        this.props.getExistingCategories()
        this.props.getRecords()
    }

    getCategory = (id) => {
        const found = this.props.categories.find(item => item.catagoryId === id)
        return found.catagory
    }

    render() {
        if (this.props.loading_categories || this.props.loading_records) return <PageSpinner />
        const receievedOrdes = this.props.records.filter(order => { return order.transactionType === type.in })
        return (
            <Page
                title="Record Tracking"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Received Items</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Cost</th>
                                            <th>Product Category</th>
                                            <th>Order ID</th>
                                            <th>Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receievedOrdes.slice(0).reverse(0).map((item, index) => (
                                            <tr>
                                                <td>{item.transactionId}</td>
                                                <td>{item.purchaseItem.masterData.productId}</td>
                                                <td>{item.purchaseItem.masterData.productName}</td>
                                                <td>{item.purchaseItem.masterData.cost}</td>
                                                <td>{this.getCategory(item.purchaseItem.masterData.productCategory)}</td>
                                                <td>{item.orderId}</td>
                                                <td>{item.transactionDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading_categories: state.inventoryReducer.loading_categories,
        loading_records: state.inventoryReducer.loading_records,
        records: state.inventoryReducer.records,
        categories: state.inventoryReducer.categories,
    }
}

export default connect(mapStateToProps, { getExistingCategories, getRecords })(RecordTracking)