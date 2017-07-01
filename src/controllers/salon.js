import firebase from 'firebase'
import * as _ from 'lodash'
import { message } from 'antd'
import { ref, storageRef } from '../constants/firebase'

function makeDBSalon (salon) {
  const dbSalon = {
    address: salon.address,
    area: salon.area,
    contactPerson: salon.contactPerson,
    desciption: salon.desciption,
    email: salon.email,
    lat: salon.lat,
    lng: salon.lng,
    name: salon.name,
    phone: salon.phone,
    webSite: salon.site,
    services : salon.services,
    park : salon.park,
    appr_flag : '0',
    starttime : salon.starttime,
    endtime : salon.endtime,
    zip: salon.zipcode,
    appr_flag: 0
  }
  if (_.isUndefined(salon.site)) dbSalon.webSite = ''
  if (_.isUndefined(salon.desciption)) dbSalon.desciption = ''
  if (_.isUndefined(salon.contactPerson)) dbSalon.contactPerson = ''
  if (_.isUndefined(salon.email)) dbSalon.email = ''
  if (_.isUndefined(salon.park)) dbSalon.park = ''
  if (_.isUndefined(salon.services)) dbSalon.services = ''
  if (_.isUndefined(salon.starttime)) dbSalon.starttime = ''
  if (_.isUndefined(salon.endtime)) dbSalon.endtime = ''
  return dbSalon
}

export function createSalon (salon) {
  console.log('new salon action called')
  return function * (dispatch, getState) {
    console.log('add salon action', salon)
    const dbSalon = makeDBSalon(salon)
    console.log('db salon', dbSalon)
    try {
      yield ref.child('salonsForApprove').push(dbSalon)
      message.success(`New salon "${salon.name}" is created!`, 3)
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function uploadToStorage (file) {
  return function * (dispatch, getState) {
    console.log('uploadToStorage', file)
    const state = getState()
    const salonId = state.authData.id
    const uploadTask = storageRef.child('salonsImages').child(salonId).put(file)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      }, function (error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break

          case 'storage/canceled':
            // User canceled the upload
            break

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = uploadTask.snapshot.downloadURL
        console.log('SUCCESS: downloadURL', downloadURL)
        const assetInfo = {
          id: salonId,
          name: file.name,
          url: downloadURL,
          uploadedAt: firebase.database.ServerValue.TIMESTAMP
        }
        ref.child('salonsForApprove').child(salonId).child('image').set(assetInfo)
      })
  }
}

export function removeFromStorage (appId, fileId) {
  return function * (dispatch, getState) {
    const state = getState()
    const userId = state.authData.id
    yield storageRef.child('users').child(userId).child(fileId).delete()
    yield ref.child('users').child(userId).child('apps').child(appId).child('assets').child(fileId).set(null)
  }
}
