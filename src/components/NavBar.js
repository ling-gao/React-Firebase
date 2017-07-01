import React, { Component, PropTypes } from 'react'
import { Button, Select, message, Menu, Icon, Badge } from 'antd'
import { logout } from '../controllers/auth'
import { connect } from 'react-redux'
import { browserHistory, withRouter } from 'react-router'
import * as _ from 'lodash'
const Option = Select.Option
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

import logo from '../assets/prete-logo.png'

class NavBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: props.router.location.pathname
    }
  }

  componentDidMount () {
    this.setState({
      current: this.props.router.location.pathname
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      current: nextProps.router.location.pathname
    })
  }

  handleClick (e) {
    this.props.router.push(e.key)
    // browserHistory.push('/' + this.state.current)
  }

  handleLogoutButton () {
    this.props.dispatch(logout())
  }

  renderLogoutButton () {
    return (
      <Button onClick={this.handleLogoutButton.bind(this)}>Logout</Button>
    )
  }

  renderMenu () {
    return (
      <Menu onClick={this.handleClick.bind(this)}
        selectedKeys={[this.state.current]}
        mode='horizontal'
        theme='dark'
      >
        <Menu.Item style={styles.menuItemContainer} key='/calendar'>
          <Icon type='calendar' />
          <div style={styles.menuText}>Calendar</div>
        </Menu.Item>
        <Menu.Item style={styles.menuItemContainer} key='/requests'>
          <Icon type='clock-circle-o' />
          <div style={styles.menuText}>History</div>
        </Menu.Item>
        <Menu.Item style={styles.menuItemContainer} key='/profile'>
          <Icon type='user' />
          <div style={styles.menuText}>Profile</div>
        </Menu.Item>

      </Menu>
    )
  }

  handleLogoClick () {
    browserHistory.push('/home')
  }

  render () {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer} onClick={this.handleLogoClick.bind(this)}>
          <img src={logo} style={{width: 185}} />
          <div style={styles.logoText}>Salons</div>
        </div>
        {this.renderMenu()}
        {this.renderLogoutButton()}
        <div></div>

      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    padding: '15px 25px 15px 25px',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottom: '1px solid #9B9B9B',
    WebkitBoxShadow: '0px 0px 2px 1px #9B9B9B',
    MozBoxShadow: '0px 0px 2px 1px #9B9B9B',
    boxShadow: '0px 0px 2px 1px #9B9B9B',
    // backgroundColor: '#F8F8F8'
    backgroundColor: '#201a16'
  },
  logoText: {
    // color: '#4990E2',
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
    cursor: 'pointer',
    letterSpacing: 2,
    margin: '0 0 -5px 20px'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // marginRight: 50
  },
  menuItemContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  menuText: {
    fontSize: 16,
    fontWeight: '400'
  }
}

NavBar.defaultProps = {

}

NavBar.propTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(withRouter(NavBar))
