import React, { Component, PropTypes } from 'react'
import { Button, Select, message, Menu, Icon, Radio } from 'antd'
import { logout } from '../controllers/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as _ from 'lodash'
import '../App.css'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import AddTimeSlot from '../components/AddTimeSlot'

class ShiftCalendar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      items: this.props.items,
      employees: this.props.groups,
      visibleTimeStart: moment().valueOf(),
      visibleTimeEnd: moment().add(3, 'days').valueOf(),
      selectedRange: 3
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  itemResized (itemId, time, edge) {
    const prevItems = this.state.items
    let newItems = prevItems.map((item) => {
      if (item.id == itemId) {
        (edge == 'left') ? item.start_time = time : item.end_time = time
      }
      return item
    })
    this.setState({ items: newItems })
  }

  itemMoved (itemId, dragTime, newGroupOrder) {
    const prevItems = this.state.items
    let newItems = prevItems.map((item) => {
      if (item.id == itemId) {
        const timeSlotLength = moment(item.start_time).diff(item.end_time).valueOf() * -1
        item.group = (newGroupOrder + 1)
        item.start_time = dragTime
        item.end_time = (dragTime + timeSlotLength)
      }
      return item
    })
    this.setState({ items: newItems })
  }

  changeRange (e) {
    this.setState({
      selectedRange: e.target.value,
      visibleTimeEnd: moment().add((e.target.value), 'days').valueOf()
    })
  }

  render () {
    return (
      <div style={styles.container}>
        <div style={styles.modifiersContainer}>
          <AddTimeSlot groups={this.props.groups} />
          <div style={styles.rangeButtons}>
            <RadioGroup onChange={this.changeRange.bind(this)} value={this.state.selectedRange} defaultValue={this.state.selectedRange} size="large">
              <RadioButton value={1}>Day</RadioButton>
              <RadioButton value={3}>3 days</RadioButton>
              <RadioButton value={7}>Week</RadioButton>
            </RadioGroup>
          </div>

        </div>
        <Timeline
          groups={this.state.employees}
          items={this.state.items}
          // keys={this.props.keys}
          // defaultTimeStart={moment()}
          // defaultTimeEnd={moment().add(3, 'days')}
          visibleTimeStart={this.state.visibleTimeStart}
          visibleTimeEnd={this.state.visibleTimeEnd}
          canResize
          fixedHeader='absolute'
          useResizeHandle
          lineHeight={70}
          canMove
          stackItems
          onItemMove={this.itemMoved.bind(this)}
          onItemResize={this.itemResized.bind(this)}
        />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  rangeButtons: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 15
  },
  modifiersContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

ShiftCalendar.defaultProps = {

}

ShiftCalendar.propTypes = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(ShiftCalendar)
