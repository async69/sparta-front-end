import React, { Component } from 'react';
import Page from "../../components/Page";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';

class CreateOrderManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_items: [],
            dropdown: false,
        }
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }


    render() {
        let { dropdown } = this.state

        return (
            <Page title="Manufacturing" breadcrumbs={[{ name: 'Create Order', active: true }]}>
                <Col md={12}>
                    <Card>
                        <CardHeader>Order Information</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="exampleSelect" sm={12}>
                                                Required Product
                                    </Label>
                                            <Col sm={12}>
                                                <Input name="dropdown" type="select" id="checkbox1"
                                                    onChange={
                                                        (event) => this.handleChange({ target: { name: event.target.name, value: event.target.value } })
                                                    } >
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>
                                                    <option value='123'>Some Item Name</option>


                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={6}>

                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Personnel
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    disabled
                                                    placeholder="The Person Requesting The Order"
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div style={{ display: dropdown ? "" : "none" }}>
                                    <Col>
                                    </Col>
                                    <h4>Bill Of Materials</h4>
                                    <hr />



                                    <Row >

                                        <Col sm={12} md={3}>
                                            <FormGroup >
                                                <Label for="exampleSelect" sm={12}>
                                                    Material Name
                                            </Label>
                                                <Col sm={12}>
                                                    <Input disabled type="text" placeholder='Material Name' name="select" />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={3}>
                                            <FormGroup >
                                                <Label for="exampleSelect" sm={12}>
                                                    Quantity
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="number" />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={3}>
                                            <FormGroup >
                                                <Label for="exampleSelect" sm={12}>
                                                    Unit Of Measurment
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="text" disabled />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={3}>
                                            <FormGroup >
                                                <Label for="exampleSelect" sm={12}>
                                                    Price
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="text" disabled />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                                <FormGroup >
                                    <Label for="examplePassword" sm={12}>
                                        Description
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            type='textarea'
                                            placeholder="Description"
                                        />
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="exampleSelect" sm={12}>
                                                Manufactuting Start Date
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="date" name="select" />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <FormGroup >
                                            <Label for="exampleSelect" sm={12}>
                                                Manufacturing End Date
                                            </Label>
                                            <Col sm={12}>
                                                <Input type="date" name="select" />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup align='center'>
                                    <Button color='primary'>Submit</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        );
    }
}

export default CreateOrderManufacturingPage;