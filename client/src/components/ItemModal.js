// imports
import React, { Component } from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'

// object creation
class ItemModal extends Component {
  // setting state
  state = {
      modal: false,
      Name: ''
  }
  toggle = () => {
      this.setState({
          modal: !this.state.modal
      })
  }
  onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = e => {
      e.preventDefault()
      const newItem = {
          name: this.state.name
          // add item via add item action
        }
          this.props.addItem(newItem)
          //Close modal
          this.toggle()
  }
  render(){
      return(
          <div>
              <Button onClick={this.toggle}> Add Item </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}> Add to Shopping List</ModalHeader>
                  <ModalBody >
                      <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                              <Label for='item'> Item </Label>
                              <Input
                               type='text'
                               name='name'
                               id= 'item'
                               placeholder='Add Item here'
                               onChange={this.onChange}
                               />
                               <Button block >Add Item</Button>
                          </FormGroup>

                      </Form>

                  </ModalBody>

              </Modal>
          </div>
      )
  }
}
const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal)