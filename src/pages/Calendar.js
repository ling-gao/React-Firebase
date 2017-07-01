import React, { Component } from 'react';
import { Button, notification } from 'antd'
import NavBar from '../components/NavBar'
import ShiftCalendar from '../components/ShiftCalendar'
import DetailsView from '../components/DetailsView'
import AddTimeSlot from '../components/AddTimeSlot'
import AppointmentRequests from '../components/AppointmentRequests'
import moment from 'moment'
import * as _ from 'lodash'

import '../App.css';
import '../index.css';

class Calendar extends Component {

  componentDidMount () {
    // this.displayNotifications(this.props.notifications)
    // this.displayNotifications(this.props.secondNotification)
  }

  displayNotifications (notifications) {

    const key = `open${Date.now()}`;
    const btnClick = function () {
      // to hide notification box
      notification.close(key);
    };
    const btn = (
      <Button type="primary" size="small" onClick={btnClick}>
        Confirm Booking Request
      </Button>
    );
    notification.open({
      message: notifications.message,
      description: notifications.message,
      btn,
      key: notifications.key,
      onClose: close,
      duration: 0
    });

  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={styles.container}>
          <AppointmentRequests employees={this.props.groups} />
          <ShiftCalendar
            items={this.props.items}
            groups={this.props.groups} />
          <DetailsView />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    padding: 30,
    backgroundColor: 'aliceblue'
  }
}

Calendar.defaultProps = {
  notifications: {
    message: 'Booking Request from Samantha Bee',
    description: '5:00pm PST 1/3/17',
    key: '1'
  },
  secondNotification: {
    message: 'Booking Request from Larry Wilmore',
    description: '7:10pm PST 1/4/17',
    key: '2'
  },
  items: [
    { id: 1, group: 1, title: 'Time slot 1', canMove: true, start_time: moment().valueOf(), end_time: moment().add(3, 'hour').valueOf() },
    { id: 2, group: 1, title: 'cool here is item 1', canMove: true, start_time: moment().valueOf(), end_time: moment().add(1, 'hour').valueOf() },
    { id: 3, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour').valueOf(), end_time: moment().add(0.5, 'hour').valueOf() },
    { id: 4, group: 3, title: 'item 3 should be ORANGE', className: 'analysis', start_time: moment().add(2, 'hour').valueOf(), end_time: moment().add(3, 'hour').valueOf() },
    { id: 5, group: 5, title: 'Another booking 4', className: 'weekend', start_time: moment().add(3, 'hour').valueOf(), end_time: moment().add(3.5, 'hour').valueOf() }

  ],
  groups: [
    // {id: 1, title: 'Salon Name'},
    {id: 1, title: 'Tom Ford'},
    {id: 2, title: 'Vera Wang'},
    {id: 3, title: 'Horatio Alger'},
    {id: 4, title: 'Alexander McQueen'},
    {id: 5, title: 'Giovanni Versace'},
    {id: 6, title: 'Stella McCartney'},

  ],
  keys: [
    {
      // groupIdKey: 'id',
      // groupTitleKey: 'title',
      // itemIdKey: 'id',
      // itemTitleKey: 'title',    // key for item div content
      // itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
      // itemGroupKey: 'group',
      // itemTimeStartKey: 'start_time',
      // itemTimeEndKey: 'end_time'
    }
  ]
}

export default Calendar;
