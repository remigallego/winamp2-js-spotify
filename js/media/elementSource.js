
  /*const STATUS = {
  PLAYING: "PLAYING",
  STOPPED: "STOPPED",
  PAUSED: "PAUSED"
};

export default class ElementSource {
  on(event, callback) {
    const eventListeners = this._listeners[event] || [];
    eventListeners.push(callback);
    this._listeners[event] = eventListeners;
    const unsubscribe = () => {
      this._listeners[event] = eventListeners.filter(cb => cb !== callback);
    };
    return unsubscribe;
  }

  trigger(event) {
    const callbacks = this._listeners[event];
    if (callbacks) {
      callbacks.forEach(cb => cb());
    }
  }

  constructor(context, destination) {
    this._listeners = {};
    this._context = context;
    this._destination = destination;
    this._audio = document.createElement("audio");
    this._audio.crossOrigin = "anonymous";
    this._stalled = false;
    this._status = STATUS.STOPPED;

    this._audio.addEventListener("suspend", () => {
      this._setStalled(true);
    });

    this._audio.addEventListener("durationchange", () => {
      this.trigger("loaded");
      this._setStalled(false);
    });

    this._audio.addEventListener("ended", () => {
      this.trigger("ended");
      this._setStatus(STATUS.STOPPED);
    });

    // TODO: Throttle to 50 (if needed)
    this._audio.addEventListener("timeupdate", () => {
      this.trigger("positionChange");
    });

    this._audio.addEventListener("error", e => {
      switch (this._audio.error.code) {
        case 1:
          // The fetching of the associated resource was aborted by the user's request.
          console.error("MEDIA_ERR_ABORTED", e);
          break;
        case 2:
          console.error("MEDIA_ERR_NETWORK", e);
          // Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.
          break;
        case 3:
          // Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.

          // There is a bug in Chrome where improperly terminated mp3s can cuase this error.
          // https://bugs.chromium.org/p/chromium/issues/detail?id=794782
          // Related: Commit f44e826c83c74fef04c2c448af30cfb353b28312
          console.error("PIPELINE_ERROR_DECODE", e);
          break;
        case 4:
          console.error("MEDIA_ERR_SRC_NOT_SUPPORTED", e);
          // The associated resource or media provider object (such as a MediaStream) has been found to be unsuitable.
          break;
      }
      // Rather than just geting stuck in this error state, we can just pretend this is
      // the end of the track.

      this.trigger("ended");
      this._setStatus(STATUS.STOPPED);
    });

    this._source = this._context.createMediaElementSource(this._audio);
    //this._audio.loop = false;
    this._source.connect(destination);
  }

  _setStalled(stalled) {
    this._stalled = stalled;
    this.trigger("stallChanged");
  }

  disconnect() {
    this._source.disconnect();
  }

  // Async for now, for compatibility with BufferAudioSource
  // TODO: This does not need to be async
  async loadUrl(url) {
    this._audio.src = url;
  }

  async play() {
    if (this._status !== STATUS.PAUSED) {
      this.seekToTime(0);
    }
    try {
      await this._audio.play();
    } catch (err) {
      //
    }
    this._setStatus(STATUS.PLAYING);
  }

  pause() {
    this._audio.pause();
    this._setStatus(STATUS.PAUSED);
  }

  stop() {
    this._audio.pause();
    this._audio.currentTime = 0;
    this._setStatus(STATUS.STOPPED);
  }

  seekToTime(time) {
    // Make sure we are within range
    // TODO: Use clamp
    time = Math.min(time, this.getDuration());
    time = Math.max(time, 0);
    this._audio.currentTime = time;
    this.trigger("positionChange");
  }

  getStalled() {
    return this._stalled;
  }

  getStatus() {
    return this._status;
  }

  getDuration() {
    const { duration } = this._audio;
    return isNaN(duration) ? 0 : duration;
  }

  getTimeElapsed() {
    return this._audio.currentTime;
  }

  getNumberOfChannels() {
    return this._source.channelCount;
  }

  getSampleRate() {
    // This is a lie. This is the sample rate of the context, not the
    // underlying source media.
    return this._context.sampleRate;
  }

  getLoop() {
    return this._audio.loop;
  }

  setLoop(shouldLoop) {
    this._audio.loop = shouldLoop;
  }
  

  _setStatus(status) {
    this._status = status;
    this.trigger("statusChange");
  }
}
*/