import React, { Component } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  // state
  // state = {
  //     items: [
  //         {id: uuid(), name: 'Eggs'},
  //         {id: uuid(), name: 'Milk'},
  //         {id: uuid(), name: 'Steak'},
  //         {id: uuid(), name: 'Water'}
  //     ]
  // }
  // render
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }
  componentDidMount () {
    this.props.getItems()
  }
  onDeleteClick = (id) => {
  this.props.deleteItem(id)
}
  render () {
    const { items } = this.props.item
    return (
      <Container>
        {/* <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item')
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }))
            }
          }
          }>
                            Add Item
        </Button> */}
        <ListGroup>
          {items.map(({ _id, name }) => (
            <ListGroupItem>
              { this.props.isAuthenticated ? <Button
                className=''
                color='danger'
                size='sm'
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                                        &times;
              </Button>
            : null  
            }
              
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    )
  }
  // return
}


const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)
// = state => ({
//     item: state.item
// })
