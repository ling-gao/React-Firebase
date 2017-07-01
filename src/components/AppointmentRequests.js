import React, { Component, PropTypes } from 'react'
import { Button, Select, message, Menu, Icon, Input, DatePicker, TimePicker } from 'antd'
const Option = Select.Option
import { logout } from '../controllers/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as _ from 'lodash'
import '../App.css'
import moment from 'moment'

class AppointmentRequests extends Component {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  renderRequest (request, key, employeeNames) {

    return (
      <div key={key} style={styles.requestContainer}>
        <div style={styles.clientNameText}>{request.clientName}</div>
        <div>{moment(request.requestedDate).format('MMM Do YY')}</div>
        <TimePicker style={styles.rightMargin} placeholder='Select Appointment Time' format={'HH:mm A'} size="large" />
        <span style={styles.heading}>assign to: </span>
        <Select
          style={{ width: '20%', marginRight: 15 }}
          placeholder="Please select a stylist"
        >
          {employeeNames}
        </Select>
        <Button type="primary" icon="check" size={"large"}>Confirm Booking</Button>
      </div>
    )
  }

  render () {
    const { requests, employees } = this.props
    console.log('employees  in AppointmentRequests ', employees)
    const employeeNames = employees.map((employee, key) => (<div key={key}>{employee.title}</div>) )
    const incomingRequests = requests.map((req, key) => {
      return this.renderRequest(req, key, employeeNames)
    })

    return (
      <div style={styles.container}>
        <div style={styles.titleText}>Incoming Appointment Requests</div>
        {incomingRequests}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    padding: '40px 50px',
    backgroundColor: 'white',
    border: '0.5px solid #bde2fd',
    borderRadius: 5,
    WebkitBoxShadow: '4px 3px 13px -1px rgba(189,226,253,0.8)',
    MozBoxShadow: '4px 3px 13px -1px rgba(189,226,253,0.8)',
    boxShadow: '4px 3px 13px -1px rgba(189,226,253,0.8)'
  },
  requestContainer: {
    display: 'flex',
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf6fd',
    border: '1px solid #d2eafb',
    borderRadius: 5,
    padding: '1em 5em',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    marginBottom: 10
  },
  titleText: {
    color: 'rgba(102,102,102,1)',
    fontWeight: '500',
    fontSize: '1.8em',
    marginBottom: '20',
    alignSelf: 'center'
  },
  clientNameText: {
    fontWeight: '500',
    fontSize: '1.2em',
  },
  heading: {


  }
}

AppointmentRequests.defaultProps = {
  requests: [
    { clientName: 'Melissa Kalanick', profilePic: '', requestedDate: moment() },
    { clientName: 'Paula Kumetz', profilePic: '', requestedDate: moment().add(2, 'days') },
    { clientName: 'Christine Cousineau', profilePic: '', requestedDate: moment().add(4, 'hours') },

  ]
}

AppointmentRequests.propTypes = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(AppointmentRequests)
