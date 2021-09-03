import React from 'react'
import PropTypes from 'prop-types'

const messageStyle = {
  color: 'white',
  background: 'black',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({ notifMessage }) => {

  if(notifMessage != null){
    return (
      <div style = {messageStyle}>
        {notifMessage}
      </div>
    )
  } else return null
}

Notification.propTypes = {
  notifMessage: PropTypes.string,
}

export default Notification