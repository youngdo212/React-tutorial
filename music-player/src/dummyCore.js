export default class DummyCore {
  constructor(music) {
    this.runningTime = music.runningTime;
    this.currentTime = 0;
    this.intervalID = null;
    this.onReturnCurrentTime = null;
  }

  play() {
    this.intervalID = setInterval(() => {
      if(this.currentTime >= this.runningTime) {
        this.currentTime = this.runningTime;
        this.pause();
      }
      else {
        this.currentTime += 100;
        this.onReturnCurrentTime(this.currentTime);
      }
    }, 100);
  }

  pause() {
    clearInterval(this.intervalID);
  }

  set(time) {
    this.currentTime = time;
  }
}