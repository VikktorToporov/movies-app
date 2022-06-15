import {Component, OnInit, Input} from '@angular/core';

@Component({
  template: '<youtube-player [videoId]="videoId"></youtube-player>',
  selector: 'youtube-player-wrapper',
})

export class YoutubePlayer implements OnInit {
  @Input('videoId') videoId = '';

  ngOnInit() {
      const tag = document.createElement('script');
      tag.src = 'http://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }