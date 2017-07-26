// Built functions
const togglePlay = (video) => {
  const method = video.paused ? 'play' : 'pause'
  video[method]()

  return method
}

const updateButton = (video, toggle) => {
  const icon = video.paused ? '>' : '||'
  toggle.textContent = icon

  return icon
}

const skip = (button, video) => {
  const time = parseFloat(button.dataset.skip)
  video.currentTime += time

  return time
}

const handleRangeUpdate = (range, video) => {
  const prop = range.name
  const value = range.value

  video[prop] = value

  return { prop, value }
}

const handleProgress = (video, progBar) => {
  const percent = (video.currentTime / video.duration) * 100

  progBar.style.flexBasis = `${percent}%`

  return percent
}

const scrub = (e, video) => {
  const scrubTime = (e.offsetX / e.target.offsetWidth) * video.duration
  video.currentTime = scrubTime

  return scrubTime
}

// Get elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = [ ...player.querySelectorAll('[data-skip]') ]
const ranges = [ ...player.querySelectorAll('.player__slider') ]

// Hool up event listeners
video.addEventListener('click', (e) => togglePlay(e.target))
video.addEventListener('play', (e) => updateButton(e.target, toggle))
video.addEventListener('pause', (e) => updateButton(e.target, toggle))
video.addEventListener('timeupdate', (e) => handleProgress(e.target, progressBar))

toggle.addEventListener('click', () => togglePlay(video))

skipButtons.map(button => button.addEventListener('click', e => skip(e.target, video)))

ranges.map(range => range.addEventListener('change', e => handleRangeUpdate(e.target, video)))
ranges.map(range => range.addEventListener('mousemove', e => handleRangeUpdate(e.target, video)))

let mousedown = false
progress.addEventListener('click', (e) => scrub(e, video))
progress.addEventListener('mousemove', (e) => mousedown && scrub(e, video))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
