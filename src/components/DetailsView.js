import React, { Component, PropTypes } from 'react'
import { Button, Select, message, Menu, Icon, Input, TimePicker, Radio } from 'antd'
import { logout } from '../controllers/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as _ from 'lodash'
import '../App.css'
import moment from 'moment'
const Option = Select.Option

class DetailsView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      appointmentStatus: this.props.selectedAppointment.status
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onChange () {
    console.log('time changed')
  }

  handleStatusChange (e) {
    console.log("status change clicked ", e)
    this.setState({ appointmentStatus: e.target.value })
  }

  // customer name
  // phone number
  // profile photo
  // Segmented button: “No Show”, “Completed”.
  // Notes field (new field only editable by a Prete admin)

  render () {
    const stylistOptions = (this.props.stylists).map((stylist, key) => {
      return <Option key={key}>{stylist}</Option>
    })
    return (
      <div style={styles.container}>

        <div>{this.props.selectedAppointment.title}</div>
        <div style={styles.formContainer}>
          <Select
            multiple
            style={{ width: '100%', marginRight: 20 }}
            placeholder="Selected stylist(s)"
            defaultValue={[]}
            onChange={() => console.log('handle change function goes here')}
            >
            {stylistOptions}
          </Select>
          <Input style={styles.input} size='large' placeholder='Client Name' />
          <Input style={styles.input} size='large' placeholder='Phone number' />
          <Input style={styles.input} size='large' autosize={{ minRows: 3 }} type='textarea' placeholder='Notes from Prete administrator' />

          <Radio.Group value={this.state.appointmentStatus} onChange={this.handleStatusChange.bind(this)}>
            <Radio.Button value="noshow">No Show</Radio.Button>
            <Radio.Button value="completed">Completed</Radio.Button>
          </Radio.Group>

        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: 25,
    padding: '25px 40px',
    border: '1px black solid',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '60%',
    whiteSpace: 'nowrap',
    padding: '0.5em 3em'
  },
  input: {
    marginRight: 20
  }

}

DetailsView.defaultProps = {
  selectedAppointment: {
    title: 'Jonathan Roberts booking January 23, 2017 10:30am at Amazing Salon',
    status: 'noshow'
  },
  stylists: [
    'Tom Ford',
    'Vera Wang',
    'Horatio Alger',
    'Alexander McQueen',
    'Giovanni Versace',
    'Stella McCartney'
  ],
}

DetailsView.propTypes = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(DetailsView)
