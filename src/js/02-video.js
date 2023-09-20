import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const iframe = document.querySelector('#vimeo-player');
  const player = new Player(iframe);

  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime).catch(error => {
      console.error('Failed to set saved time:', error);
    });
  }

  player.on(
    'timeupdate',
    throttle(function (data) {
      localStorage.setItem('videoplayer-current-time', data.seconds);
    }, 1000)
  );
});
