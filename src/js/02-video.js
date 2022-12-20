import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerTimeUpdate(data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
}

const savedTime = localStorage.getItem(CURRENT_TIME_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
