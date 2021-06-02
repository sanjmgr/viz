export const fromNow = date => {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000)
  let days = Math.floor(seconds / 86400)
  let hours = Math.floor(seconds / 3600)

  if (hours >= 36 && days <= 25) {
    return new Date(date).toDateString()
  }
  if (hours >= 22 && hours <= 35) {
    return 'a day ago'
  }

  let minutes = Math.floor(seconds / 60)

  if (minutes >= 90 && hours <= 21) {
    return hours + ' hours ago'
  }
  if (minutes >= 45 && minutes <= 89) {
    return 'an hour ago'
  }
  if (seconds >= 90 && minutes <= 44) {
    return minutes + ' minutes ago'
  }
  if (seconds >= 45 && seconds <= 89) {
    return 'a minute ago'
  }
  if (seconds >= 0 && seconds <= 45) {
    return 'a few seconds ago'
  }
}
