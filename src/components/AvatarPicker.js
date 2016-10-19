import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import Message from 'tetris-iso/Message'
import startsWith from 'lodash/startsWith'
import {pushAlertMessageAction} from '../actions/push-alert-message-action'

const {PropTypes} = React
const BORDER_WIDTH = 25
const btStyle = {position: 'relative'}
const inputRangeStyle = {margin: '1em 0'}
const inputFileStyle = {
  display: 'block',
  position: 'absolute',
  opacity: 0,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const AvatarPicker = React.createClass({
  displayName: 'Avatar-Picker',
  contextTypes: {
    tree: PropTypes.object
  },
  propTypes: {
    width: PropTypes.number,
    height: PropTypes.number,
    image: PropTypes.string
  },
  getDefaultProps () {
    return {
      image: null,
      width: 320,
      height: 320
    }
  },
  getInitialState () {
    return {
      image: this.props.image,
      scale: 1
    }
  },
  alert (message, level = 'warning') {
    pushAlertMessageAction(this.context.tree, message, level)
  },
  onChangeFile ({target: {files: [image]}}) {
    if (!image) {
      return this.alert('imageIsRequired')
    }

    if (!startsWith(image.type, 'image/')) {
      return this.alert('invalidImageType')
    }

    this.setState({
      image: window.URL.createObjectURL(image)
    })
  },
  onChangeScale ({target: {value}}) {
    this.setState({scale: Number(value)})
  },
  hasImage () {
    return Boolean(this.state.image)
  },
  /**
   * @return {HTMLCanvasElement} canvas
   */
  getCanvas () {
    return this.refs.avatar.getImage()
  },
  /**
   * @return {Promise.<Blob>} image as blob
   */
  getImageAsBlob () {
    return new Promise((resolve, reject) =>
      this.getCanvas().toBlob(function onConverted (blob) {
        resolve(blob)
      }, 'image/jpeg'))
  },
  /**
   * @return {String} image as data url string
   */
  getImageAsDataUrl () {
    return this.getCanvas().toDataURL()
  },
  /**
   * @return {String} image as string
   */
  getImageAsString () {
    return this.getCanvas().toString()
  },
  render () {
    const {width, height} = this.props
    const {image, scale} = this.state
    const wrapperStyle = {
      width: width + (BORDER_WIDTH * 2),
      overflow: 'hidden',
      textAlign: 'center',
      margin: '2em auto'
    }

    return (
      <div style={wrapperStyle}>
        <AvatarEditor
          ref='avatar'
          border={BORDER_WIDTH}
          image={image}
          scale={scale}
          width={width}
          height={height}/>

        <input
          style={inputRangeStyle}
          type='range'
          onChange={this.onChangeScale}
          min={1}
          max={4}
          step={0.01}
          value={scale}/>

        <button type='button' className='btn btn-block btn-default' style={btStyle}>
          <input
            type='file'
            style={inputFileStyle}
            onChange={this.onChangeFile}/>
          <Message>pickNewImage</Message>
        </button>
      </div>
    )
  }
})

export default AvatarPicker