import React, { Component } from 'react';
import Page from '../../components/Page';

import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';


class ViewAllOrdersPage extends Component {
    state = {}
    render() {
        return (
            <Page title="View All Orders" breadcrumbs={[{ name: 'All Orders', active: true }]}>

                    <Card className="mb-3">
                        <CardHeader>All Orders</CardHeader>
                        <CardBody>
                            <Table responsive >
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Company</th>
                                        <th>Sales Person</th>
                                        <th>Shipment Address</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Delivered</td>
                                        <td>
                                            <Button size='sm' color='primary'>
                                                See Order
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td>Mark</td>
                                        <td>Issued</td>
                                        <td>
                                            <Button size='sm' color='primary'>
                                                See Order
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                        <td>Mark</td>
                                        <td>Issued</td>
                                        <td>
                                            <Button size='sm' color='primary'>
                                                See Order
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
            </Page>
        );
    }
}

export default ViewAllOrdersPage;