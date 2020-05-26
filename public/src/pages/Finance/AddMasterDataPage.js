import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    Row,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import './Finance.scss'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addMasterData, getMasterData } from '../../store/company/action'
import { getExistingCategories } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import Error from '../../components/error'
import Loader from '../../components/loader'
import routes from '../../config/routes'

class AddMasterDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_items: [],
            items: '', lockPage: false,
            can_be_manufactured: false, can_be_sold: false, can_be_purchased: false,
            productName: '', productType: '', productCategory: '', productPrice: '', unitOfMeasurement: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.ItemNameChange = this.ItemNameChange.bind(this)
        this.ItemUnitChange = this.ItemUnitChange.bind(this)
        this.ItemQuantityChange = this.ItemQuantityChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleAddItem = () => {
        this.setState({
            order_items: this.state.order_items.concat([
                { product: 0, materialName: "", materialQuantity: 1, materialUnitOfMeasurement: "" },
            ])
        })
    }

    componentDidMount() {
        this.props.getMasterData()
        this.props.getExistingCategories()
    }

    componentDidUpdate(prevProps, prevState) {
        const { can_be_manufactured, lockPage } = this.state
        if (can_be_manufactured && !lockPage) {
            this.setState({ lockPage: true })
            this.handleAddItem()
        }
    }

    handleRemoveItem = (idx) => {
        this.setState({
            order_items: this.state.order_items.filter((s, sidx) => idx !== sidx),
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    ItemNameChange = (evt, idx) => {
        const { value } = evt.target
        console.log(value)
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                product: this.props.masterData[value]['productId'],
                materialName: this.props.masterData[value]['productName'],
                materialUnitOfMeasurement: this.props.masterData[value]['unitOfMeasurement']
            };
        });

        this.setState({ order_items: neworder_items })
    }

    ItemUnitChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, materialUnitOfMeasurement: evt.target.value };
        });

        this.setState({ order_items: neworder_items });
    }

    ItemQuantityChange = (idx) => (evt) => {
        const neworder_items = this.state.order_items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, materialQuantity: evt.target.value };
        });

        this.setState({ order_items: neworder_items });
    }

    calculateCost = () => {
        const TotalCost = this.state.order_items.map((item, index) => {
            var found = this.props.masterData.find(data => data.productId === item.product)
            if (found) {
                return found.productPrice
            }
        })
        var sum = 0
        TotalCost.forEach(cost => sum += cost)
        return sum
    }

    submit = () => {
        var cost = 1
        if (this.state.can_be_manufactured) {
            cost = this.calculateCost()
        }
        const {
            productName, productCategory, can_be_manufactured, can_be_purchased, can_be_sold,
            order_items, productType, productPrice, unitOfMeasurement
        } = this.state
        const data = {
            productName, productCategory, isManufactured: can_be_manufactured,
            canBePurchased: can_be_purchased, canBeSold: can_be_sold, productType,
            productPrice, unitOfMeasurement, product_material: order_items,
            cost
        }
        console.log(data)
        this.props.addMasterData(data)
    }

    render() {
        if (this.props.loading || this.props.loading_categories) return <PageSpinner />
        if (this.props.success) {
            return <Redirect to={routes.ViewAllMasterData} />
        }
        let { can_be_manufactured } = this.state
        console.log(this.props.masterData)
        return (
            <Page
                title="Finance"
                breadcrumbs={[{ name: 'Add Master Data', active: true }]}
            >
                <Col lg={12} md={12}>
                    <Card>
                        <CardHeader>Add Master Data</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup >
                                    <Label for="productName" sm={2}>Product Name</Label>
                                    <Col sm={12}>
                                        <Input id="productName" placeholder="Product Name" onChange={this.handleChange} name="productName" />
                                        {this.props.errors.errors?
                                            <Error error={this.props.errors.errors.productName} /> : ''
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="productType" sm={2}>Product Type</Label>
                                    <Col sm={12}>
                                        <Input
                                            id="productType"
                                            type="select"
                                            name="productType"
                                            onChange={this.handleChange}
                                            defaultValue={""}
                                        >
                                            <option disabled></option>
                                            <option value="Consumable">Consumable</option>
                                            <option value="Stored">Stored</option>
                                            <option value="Service">Service</option>
                                        </Input>
                                        {this.props.errors.errors?
                                            <Error error={this.props.errors.errors.productType} /> : ''
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="productCategory" sm={2}>Product Category</Label>
                                    <Col sm={12}>
                                        <Input id="productCategory" defaultValue={""} type="select" placeholder="Product Category" name="productCategory" onChange={this.handleChange}>
                                            <option disabled selected></option>
                                            {this.props.categories.map((item, index) => (
                                                <option value={item.catagoryId} key={index}>{item.catagory}</option>
                                            ))}
                                        </Input>
                                        {this.props.errors.errors?
                                            <Error error={this.props.errors.errors.productCategory} /> : ''
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="unitOfMeasurement" sm={2}>Unit of Measurment</Label>
                                    <Col sm={12}>
                                        <Input type='select' defaultValue={""} id="unitOfMeasurement" name="unitOfMeasurement" onChange={this.handleChange}>
                                            <option disabled selected></option>
                                            <option>Litre</option>
                                            <option>KM</option>
                                            <option>Kilos</option>
                                        </Input>
                                        {this.props.errors.errors?
                                            <Error error={this.props.errors.errors.unitOfMeasurement} /> : ''
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Label for="price" sm={2}>
                                        Price
                                    </Label>
                                    <Col sm={12}>
                                        <Input
                                            placeholder="Price"
                                            id="price"
                                            name="productPrice"
                                            type="number"
                                            onChange={this.handleChange}
                                        />
                                        {this.props.errors.errors?
                                            <Error error={this.props.errors.errors.productPrice} /> : ''
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Row className='isManufactured'>
                                        <Col sm={12} md={4}>
                                            <Input name="can_be_manufactured" type="checkbox" id="checkbox1" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked } })
                                            } />
                                            <Label for="checkbox1">Can Be Manufactured</Label>
                                        </Col>
                                        <Col sm={4} md={4}>
                                            <Input name="can_be_sold" type="checkbox" id="checkbox2" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked } })
                                            } />
                                            <Label for="checkbox2">Can Be Sold</Label>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Input name="can_be_purchased" type="checkbox" id="checkbox3" onChange={
                                                (event) => this.handleChange({ target: { name: event.target.name, value: event.target.checked } })
                                            } />
                                            <Label for="checkbox3">Can Be Purchased</Label>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <hr></hr>
                                <FormGroup>
                                    <h2 style={{ display: can_be_manufactured ? "flex" : "none" }}>BOM</h2>
                                    {this.state.order_items.map((v, index) => (
                                        <Row style={{ display: can_be_manufactured ? "flex" : "none" }} key={index}>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12} for="item_name">Item Name</Label>
                                                    <Col md={12}>
                                                        <Input type="select" id="item_name" name="item_name" onChange={(event) => this.ItemNameChange(event, index)}>
                                                            <option disabled selected></option>
                                                            {this.props.masterData.map((item, index) => (
                                                                <option key={index} value={index}>{item.productName}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label md={12} for="unit_of_measurement">Unit Of Measurment</Label>
                                                    <Col md={12}>
                                                        <Input disabled value={this.state.order_items[index]['materialUnitOfMeasurement']} defaultValue={""} id="unit_of_measurement" name="unit_of_measurement" onChange={this.ItemUnitChange(index)}>
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label md={12} for="item_quantity">Quantity</Label>
                                                    <Col md={12}>
                                                        <Input type='number' id="item_quantity" onChange={this.ItemQuantityChange(index)} />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col md={1}>
                                                <FormGroup className="removeButton">
                                                    <Button onClick={() => this.handleRemoveItem(index)}>-</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button onClick={() => this.handleAddItem()} color='primary'
                                        style={{ display: can_be_manufactured ? "flex" : "none", marginLeft: "1%" }}
                                    >Add Another One</Button>
                                </FormGroup>
                                <FormGroup align='center'>
                                    <Col >
                                        <Button onClick={this.submit} color='primary'>
                                            {this.props.loading_addMasterdata ? <Loader /> : "Add to Product"}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.inventoryReducer.categories,
    loading_categories: state.inventoryReducer.loading_categories,
    loading_addMasterdata: state.companyReducer.loading_addMasterdata,
    loading: state.companyReducer.loading,
    masterData: state.companyReducer.masterData,
    success: state.companyReducer.success,
    errors: state.companyReducer.errors
})

export default connect(mapStateToProps, { addMasterData, getMasterData, getExistingCategories })(AddMasterDataPage)