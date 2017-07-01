import React, { Component, PropTypes } from 'react'
import { Button, Select, message, Menu, Icon, Input, DatePicker, TimePicker } from 'antd'
const Option = Select.Option
import { logout } from '../controllers/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as _ from 'lodash'
import '../App.css'
import moment from 'moment'

class AddTimeSlot extends Component {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  render () {
    const {groups} = this.props
    const format = 'HH:mm A'

    let employees = (groups).map((employee) => {
      return <Option key={employee.id}>{employee.title}</Option>
    })
    employees.unshift(<Option key={'all'}>All</Option>)

    return (
      <div style={styles.container}>
        <span style={styles.formContainer}>
          <span style={styles.heading}>Add a timeslot of availability</span>
          <TimePicker style={styles.rightMargin} placeholder='Start time' format={format} size="large" />
          <TimePicker style={styles.rightMargin} placeholder='End time' format={format} size="large" />
          <div style={styles.heading}>on</div>
          <DatePicker style={styles.rightMargin} />
          <span style={styles.heading}>for employee(s)</span>
          <Select
            multiple
            style={{ width: '20%', marginRight: 15 }}
            placeholder="Please select"
          >
            {employees}
          </Select>
          <Button type="primary" icon="plus" size={"large"}>Add Timeslot</Button>
        </span>

      </div>
    )
  }
}

const styles = {
  container: {
    // display: 'flex',
    // flex: 1,
    // flexDirection: 'column',
    marginBottom: 20,
    padding: '10px 50px',
    backgroundColor: '#ebf8f2',
    border: '1px solid #cfefdf',
    borderRadius: 5
  },
  heading: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 15,
    flexWrap: 'nowrap',
    // marginBottom: 15
  },
  formContainer: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap'

  },
  rightMargin: {
    marginRight: 15
  }

}

AddTimeSlot.defaultProps = {

}

AddTimeSlot.propTypes = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(AddTimeSlot)
