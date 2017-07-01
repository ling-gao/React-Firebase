'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Select, Icon, Form, Input, TimePicker, Upload } from 'antd'
import NavBar from '../components/NavBar'
import SalonMap from '../components/SalonMap'
import { createSalon, uploadToStorage } from '../controllers/salon'
import PlacesAutocomplete from 'react-places-autocomplete'
const Option = Select.Option
const FormItem = Form.Item
const format = 'HH:mm A'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

class Profile extends Component {

  constructor (props) {
    super(props)

    this.state = {
      address: (this.props.salon) ? this.props.salon.address : '',
      lat: (this.props.salon) ? this.props.salon.lat : '-',
      lng: (this.props.salon) ? this.props.salon.lng : '-',
      starttime: '',
      endtime: '',
      zipcode: '',
      area: '',
      buttonTitle: 'ADD',
      imageUrl: ''
    }
  }

  handleChange (e) {
    console.log(e)
  }

  resetForm () {
    this.props.form.resetFields()
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('form values', values)
      if (!err) {
        console.log('Received values of form: ', values)
        values.lat = this.state.lat
        values.lng = this.state.lng
        values.zipcode = this.state.zipcode
        values.area = this.state.area
        if (values.starttime) values.starttime = values.starttime.format('HH:mm')
        if (values.endtime) values.endtime = values.endtime.format('HH:mm')
        console.log('values', values)
        const { dispatch } = this.props
        dispatch(createSalon(values))
        this.resetForm()
        return
      } else {
        console.log(err)
      }
    })
  }

  handeServiceTypeChange (value) {
    console.log('select service type changed to: ', value)
  }

  beforeUpload (file) {
    const { dispatch } = this.props
    dispatch(uploadToStorage(file))
    getBase64(file, imageUrl => this.setState({ imageUrl }))
    return false
  }

  renderImage () {
    if (this.state.imageUrl) {
      return (
        <img src={this.state.imageUrl} alt={''} className={'salon-image'} />
      )
    } else {
      return (
        <Icon className={'salon-image-uploader-trigger'} type={'plus'} />
      )
    }
  }

  renderForm () {
    const { getFieldDecorator } = this.props.form
    const defaultProps = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
      hasFeedback: true
    }

    return (
      <Form vertical onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label={'Image'} {...defaultProps}>
          {getFieldDecorator('image', {rules: [ {required: false, message: 'Upload salon logo image'} ]})(
            <Upload
              className={'salon-image-uploader'}
              accept={'image'}
              listType={'picture'}
              name={'salon'}
              showUploadList={false}
              beforeUpload={this.beforeUpload.bind(this)}
            >
              {this.renderImage()}
            </Upload>
          )}
        </FormItem>

        <FormItem label={'Name'} {...defaultProps}>
          {getFieldDecorator('name', {rules: [ {required: true, message: 'Enter salon name'} ]})(
            <Input placeholder={'Name'} />
          )}
        </FormItem>
        
        <FormItem label={'Address'} {...defaultProps}>
          {getFieldDecorator('address', {rules: [ {required: true, message: 'Enter address'} ]})(
            <PlacesAutocomplete
              placeholder={'Address'}
              //  value={this.state.address}
              onChange={this.onChange.bind(this)}
              hideLabel
            >
              <Input placeholder={'Address'} />
            </PlacesAutocomplete>
          )}
        </FormItem>

        <FormItem {...defaultProps} label={'Phone: '} >
          {getFieldDecorator('phone', {rules: [ {required: true, message: 'Enter phone number'} ]})(
            <Input placeholder={'Phone'} />
          )}
        </FormItem>

        <FormItem {...defaultProps} label={'Website Url: '} >
          {getFieldDecorator('site', {rules: [ {required: false} ]})(
            <Input placeholder={'Website Url'} />
          )}
        </FormItem>

        <FormItem {...defaultProps} label={'Email: '} >
          {getFieldDecorator('email', {rules: [ {required: false} ]})(
            <Input placeholder={'Email'} />
          )}
        </FormItem>

        <FormItem {...defaultProps} label={'Contact person: '} >
          {getFieldDecorator('contactPerson', {rules: [ {required: false} ]})(
            <Input placeholder={'Contact person'} />
          )}
        </FormItem>

        <FormItem {...defaultProps} label={'Description: '} >
          {getFieldDecorator('description', {rules: [ {required: false} ]})(
            <Input placeholder={'Description'} />
          )}
        </FormItem>

        <FormItem label={'Parking'} {...defaultProps}>
          {getFieldDecorator('parking', {rules: [ {required: false} ]})(
            <Input placeholder={'Parking'} />
          )}
        </FormItem>

        <FormItem label={'Service(s) Offered'} {...defaultProps}>
          {getFieldDecorator('services', {rules: [ {required: false} ]})(
            <Select
              multiple
              id={'services'}
              style={{ width: '100%' }}
              placeholder={'Please select'}
              onChange={this.handleChange}
            >
              <Option key={1}>Blowouts</Option>
              <Option key={2}>Extensions</Option>
              <Option key={3}>Coloring</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label={'Hours of operation'} {...defaultProps}>
          {getFieldDecorator('hoursOfOperations', {rules: [ {required: false, message: 'Hours of operation'} ]})(
            <div style={{display: 'flex', flexDirection: 'row'}} >

              <TimePicker
                id={'starttime'}
                format={format}
                // onChange={this.handleStartTime}
              />
              <TimePicker
                id={'endtime'}
                format={format}
                // onChange={this.handleEndTime}
              />
            </div>
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 3, offset: 6 }}>
          <Button
            type={'primary'}
            htmlType={'submit'}
            style={{'width': '130px'}}
            onClick={this.handleSubmit.bind(this)}
          >
            {this.state.buttonTitle}
          </Button>
        </FormItem>

      </Form>
    )
  }

  defaultLocation () {
    if (this.props.salon) {
      return this.state
    } else {
      return null
    }
  }

  renderMap () {
    return (
      <SalonMap
        onSelectMarker={this.onMarkerClick.bind(this)}
        location={this.defaultLocation()}
      />
    )
  }

  onChange (address) {
    this.setState({ address })
  }

  render () {
    return (
      <div>
        <NavBar />
        <div style={styles.container}>
          <div style={styles.formContainer}>
            {this.renderForm()}
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-around'
  },
  mapContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
    // width: 500
  },
  formContainer: {
    width: '50%'
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    dispatch: state.dispatch
  }
)

export default connect(mapStateToProps)(Form.create({})(Profile))
