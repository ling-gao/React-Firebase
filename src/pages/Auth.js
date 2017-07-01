import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  signInByEmailPassword,
  signUp
} from '../controllers/auth'
import { Form, Input, Button } from 'antd'
import * as _ from 'lodash'

const FormItem = Form.Item

class SignIn extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isSignInMode: true
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!')
        return
      }
//      console.log(values)
      const { dispatch } = this.props
      console.log('handle submit signIn', values)
      dispatch(signInByEmailPassword(values))
    })
  }

  handleSubmitSignUp (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!')
        return
      }
//      console.log(values)
      const { dispatch } = this.props
      console.log('handle submit signUp', values)
      dispatch(signUp(values))
    })
  }

  renderSignInByEmailPassword () {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={styles.signInEmailPasswordContainer}>
        <Form vertical>

          <FormItem>
            {getFieldDecorator('email', {rules: [ {required: true, type: 'email'} ]})(
              <Input
                placeholder={'Email'}
                id={'email'}
                style={styles.inputField}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', { rules: [ {required: true} ] })(
              <Input
                placeholder={'Password'}
                id={'password'}
                type={'password'}
                style={styles.inputField}
                onContextMenu={false}
                onPaste={false}
                onCopy={false}
                onCut={false}
                autoComplete={'off'}
              />
            )}
          </FormItem>

          <div style={styles.loginButtonContainer}>
            <Button
              type={'primary'}
              htmlType={'submit'}
              style={styles.loginButton}
              onClick={this.handleSubmit.bind(this)}>
              Log in
            </Button>
          </div>

          <div style={styles.toSignUp}>
            Or sign up <a style={{marginLeft: 5}} onClick={() => this.setState({isSignInMode: false})}>here</a>
          </div>
        </Form>
      </div>
    )
  }

  renderSignUp () {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={styles.signUpContainer}>
        <Form>

          <FormItem hasFeedback>
            {getFieldDecorator('signUpEmail', {rules: [ {required: true, type: 'email', message: 'Please input your email!'} ]})(
              <Input
                placeholder={'Email'}
                style={styles.inputField}
              />
            )}
          </FormItem>

          <FormItem hasFeedback>
            {getFieldDecorator('signUpPassword', { rules: [ {required: true, message: 'Please input your Password!', min: 6} ] })(
              <Input
                placeholder={'Password'}
                type={'password'}
                style={styles.inputField}
                onContextMenu={false}
                onPaste={false}
                onCopy={false}
                onCut={false}
                autoComplete={'off'}
              />
            )}
          </FormItem>

          <div style={styles.loginButtonContainer}>
            <Button
              type={'primary'}
              htmlType={'submit'}
              onClick={this.handleSubmitSignUp.bind(this)}>
              Sign Up
            </Button>
          </div>

          <div style={styles.toSignUp}>
            Already has an account? <a onClick={() => this.setState({isSignInMode: true})}>Sign in</a>
          </div>
        </Form>
      </div>
    )
  }

  renderBullet (iconName, size, text) {
    return (
      <div style={styles.bulletText}>
        <div style={{
          width: '1.5em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* <Icon size={size} name={iconName} /> */}
        </div>
        <div style={{marginLeft: 10}}>{text}</div>
      </div>
    )
  }

  render () {
    if (this.state.isSignInMode) {
      return (
        <div style={styles.body}>
          <div style={styles.container}>
            {this.renderSignInByEmailPassword()}
          </div>
        </div>
      )
    } else {
      return (
        <div style={styles.container}>
          {this.renderSignUp()}
        </div>
      )
    }
  }
}


const styles = {
  body: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    position: 'absolute',
  //  backgroundImage: `url(${loginBackground})`,
    backgroundPosition: '21% 5%',
    backgroundAttachment: 'fixed',
    backgroundSize:  'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '50px auto',
    // padding: 50,
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    width: '50%',
    marginTop: '20em',
  },
  leftHalf: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '35px 70px',
    width: '50%',
  //  backgroundImage: `url(${leftBackground})`,
    backgroundPosition: '21% 5%',
    backgroundRepeat: 'no-repeat',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,

  },
  rightHalf: {
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    // border: '3px black',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  logoText: {
    // color: '#0288d1',
    color: 'white',
    fontWeight: '300',
    fontSize: 40,
    letterSpacing: 2.5
  },
  subHeadingText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 24,
    marginTop: 8
  },
  hr: {
    display: 'flex',
    alignSelf: 'center',
    height: 1,
    width: '75%',
    backgroundColor: '#999',
    margin: '4em auto'
  },
  bulletText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '200',
    marginBottom: 20
  },
  fbButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    padding: '1em 1.2em',
    backgroundColor: '#3c5699',
    color: 'white',
    fontSize: 13,
    fontWeight: '100',
    borderRadius: 4,
    border: 'none'
  },
  googleButton: {
    marginTop: 15
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    width: 250
  },
  loginButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  loginButton: {
    padding: '0.8em 7.4em',
    fontSize: 14
  },
  or: {
    margin: 20
  },
  toSignUp: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpContainer: {
    marginTop: 20
  },
  signInEmailPasswordContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
}


SignIn.propTypes = {
  form: PropTypes.object.isRequired
}

SignIn = Form.create({})(SignIn)

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch,
    authData: state.authData
  })

export default connect(mapStateToProps)(SignIn)
