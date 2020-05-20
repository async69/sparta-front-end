import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Modal, ModalFooter, Table, Row, Button, ModalHeader, ModalBody } from 'reactstrap';
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { connect } from 'react-redux'
import { deleteCompany, getCompany } from '../../store/company/action'
import PageSpinner from '../../components/PageSpinner'
import Swal from "sweetalert2"

const Customer = ({ company, index, deleteCompany, toggle }) => {
    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td>{company.customerName}</td>
            <td>{company.generalManger}</td>
            <td>{company.email}</td>
            <td>{company.contactPerson}</td>
            <td>{company.workingField}</td>
            <td>{company.paymentOption}</td>
            <td>{company.tinNumber}</td>
            <td >
                <Row >
                    <Button color='danger' size='sm' onClick={() => deleteCompany(company.customerId)}>
                        <MdDelete />
                    </Button>
                    <Button onClick={toggle()} color='primary' size='sm' >
                        <MdRemoveRedEye />
                    </Button>
                </Row>
            </td>
        </tr>
    )
}

class ViewAllCustomersPage extends Component {

    state = {
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
        backdrop: true,
    };

    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
        this.deleteCustomer = this.deleteCustomer.bind(this)
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getCompany()
        }
    }

    deleteCustomer(id) {
        this.props.deleteCompany(id).then(res => {
            if (res) {
                Swal.fire({
                    title: "Delteing Account...",
                    icon: "warning",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    onDestroy: () => this.componentDidMount()
                })
            }
        })
    }

    render() {
        if (!(this.props.companys[0])) return <PageSpinner />
        if (this.props.update) {
            if (!this.props.companys[0]) return <PageSpinner />
        }
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Customer', active: true }]}>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                  </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle()}>
                            Do Something
                    </Button>{' '}
                        <Button color="secondary" onClick={this.toggle()}>
                            Cancel
                    </Button>
                    </ModalFooter>
                </Modal>


                <Col>
                    <Card className="mb-3">
                        <CardHeader>All Customers</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr align='left'>
                                        <th>#</th>
                                        <th>Customer Name</th>
                                        <th>General Manager</th>
                                        <th>Email</th>
                                        <th>Contact Person</th>
                                        <th>Working Field</th>
                                        <th>Payment Option</th>
                                        <th>Tin-Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.lists ? this.props.lists.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} toggle={this.toggle} />
                                    )) : this.props.companys.slice(0).reverse().map((item, index) => (
                                        <Customer key={index} company={item} index={index} deleteCompany={this.deleteCustomer} toggle={this.toggle} />
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companyReducer.companys,
    errors: state.companyReducer.errors,
})

export default connect(mapStateToProps, { getCompany, deleteCompany })(ViewAllCustomersPage)