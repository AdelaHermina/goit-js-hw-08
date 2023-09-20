import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelector('#vimeo-player');
  const player = new Player(iframe);

  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    try {
      player.setCurrentTime(savedTime);
    } catch (error) {
      console.error('Failed to set saved time:', error);
    }
  }

  const throttleUpdate = throttle((seconds) => {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000);

  player.on('timeupdate', ({ seconds }) => {
    throttleUpdate(seconds); 
  });
});