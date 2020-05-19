import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Label,
} from 'reactstrap';
import './Finance.scss'
import Error from '../../components/error'
import { connect } from 'react-redux'
import { addSupplier, getSupplier } from '../../store/company/action'
import Loader from '../../components/loader'
import PageSpinner from '../../components/PageSpinner'
import ViewAllSuppliers from './viewAllSuppliersPage'

class AddSupplierPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "",
            email: "",
            tinNumber: "",
            companys: [],
            loading: 0,
            update: false
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getSupplier()
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    submit = async (e) => {
        e.preventDefault();
        const newCompany = {
            suplierName: this.state.companyName,
            generalManger: this.state.generalManger,
            contactPerson: this.state.contactPerson,
            workingField: this.state.workingField,
            paymentOption: this.state.paymentOption,
            email: this.state.email,
            tinNumber: this.state.tinNumber
        }
        this.setState({ loading: this.state.loading + 1 })
        this.props.addSupplier(newCompany).then(res => {
            this.setState({ loading: this.state.loading + 1 })
        })
        this.componentDidMount()
        if (this.props.success) {
          this.setState({
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "",
            email: "",
            tinNumber: ""
          })
        }
    }

    render() {
        console.log(this.props.suppliers.length)
        if (!this.props.suppliers[0]) return <PageSpinner />
        return (
            <Page title="Add Supplier" breadcrumbs={[{ name: 'Add Supplier', active: true }]}>
                <Col lg={12} md={12} className='padding'>
                    <Card>
                        <CardHeader>ADD A NEW SUPPLIER TO WORK WITH</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Supplier Name
                                    </Label>
                                            <Col sm={12}>
                                                <Input placeholder="Enter Supplier Name" name="companyName" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.companyName
                                                        ? this.props.errors.companyName
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                General Manager
                                            </Label>
                                            <Col sm={12}>
                                                <Input placeholder="General Manager" name="generalManger" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.generalManger
                                                        ? this.props.errors.generalManger
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Contact Person</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Contact Person" name="contactPerson" onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Error
                                                error={
                                                this.props.errors.contactPerson
                                                    ? this.props.errors.contactPerson
                                                    : null
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Tin Number
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="number"
                                                    placeholder="Tin Number"
                                                    name="tinNumber"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                        this.props.errors.tinNumber
                                                        ? this.props.errors.tinNumber
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Supplier Email
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Supplier Email"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.email ? this.props.errors.email : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={12} for="exampleSelect">Payment Option</Label>
                                            <Col>
                                                <Input type="select" name="paymentOption" placeholder="Select payment option" onChange={this.handleChange}>
                                                    <option aria-label="None" value="Select payment option" />
                                                    <option>TOT</option>
                                                    <option>VAT</option>
                                                </Input>
                                                <Error
                                                    error={
                                                        this.props.errors.paymentOption
                                                        ? this.props.errors.paymentOption
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Field Of Work</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Field Of Work"
                                                    name="workingField"
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.workingField
                                                        ? this.props.errors.workingField
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup >
                                    <Col align='center'>
                                        <Button color='primary' onClick={this.submit}>
                                            {this.state.loading === 1 ? <Loader /> : "Add Supplier"}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <ViewAllSuppliers lists={this.props.suppliers} />
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    suppliers: state.companyReducer.suppliers,
    errors: state.companyReducer.errors,
    success: state.companyReducer.success
})

export default connect(mapStateToProps, { addSupplier, getSupplier })(AddSupplierPage)