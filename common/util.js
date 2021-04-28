const moment = require('moment-timezone')

const sanitizeFileNameCharacters = (fileName) => {
  return fileName.replace(/([^a-zA-Z0-9._-\s]+)/gi, '')
}

const saveAs = (uri, filename) => {
  const link = document.createElement('a')
  if (typeof link.download === 'string') {
    document.body.appendChild(link) // Firefox requires the link to be in the body
    link.download = filename
    link.href = uri
    link.click()
    document.body.removeChild(link) // remove the link when done
  } else {
    location.replace(uri)
  }
}

const getDateMMDDYYYY = (date) => {
  if (date) {
    return moment(date).format('MM-DD-YYYY')
  } else {
    return moment().format('MM-DD-YYYY')
  }
}

module.exports = {
  saveAs,
  sanitizeFileNameCharacters,
  getDateMMDDYYYY
}
