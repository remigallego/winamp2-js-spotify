import { combineReducers } from "redux";
import { BANDS } from "../constants";
import {
  PLAY,
  PLAY_TRACK,
  IS_PLAYING,
  PAUSE,
  STOP,
  IS_STOPPED,
  CLOSE_WINAMP,
  SET_BALANCE,
  SET_BAND_VALUE,
  SET_FOCUS,
  SET_BAND_FOCUS,
  SET_MEDIA,
  SET_SCRUB_POSITION,
  SET_SKIN_DATA,
  SET_VOLUME,
  START_WORKING,
  STEP_MARQUEE,
  STOP_WORKING,
  TOGGLE_DOUBLESIZE_MODE,
  SET_EQ_AUTO,
  SET_EQ_ON,
  SET_EQ_OFF,
  TOGGLE_LLAMA_MODE,
  TOGGLE_REPEAT,
  TOGGLE_MAIN_SHADE_MODE,
  TOGGLE_EQUALIZER_SHADE_MODE,
  TOGGLE_PLAYLIST_SHADE_MODE,
  TOGGLE_SHUFFLE,
  TOGGLE_TIME_MODE,
  TOGGLE_VISUALIZER_STYLE,
  UNSET_FOCUS,
  UPDATE_TIME_ELAPSED,
  SET_USER_MESSAGE,
  UNSET_USER_MESSAGE,
  SET_PLAYLIST_SCROLL_POSITION,
  PLAYLIST_SIZE_CHANGED,
  SET_AVALIABLE_SKINS,
  ADD_TRACK_FROM_URL,
  NETWORK_CONNECTED,
  NETWORK_DISCONNECTED,

  ADD_TRACK_FROM_URI,
  S_UPDATE_PLAYER_OBJECT,
  S_PLAY_URI,
  READY
} from "../actionTypes";

import playlist from "./playlist";
import windows from "./windows";
import explorer from "./explorer";

const defaultUserInput = {
  focus: null,
  bandFocused: null,
  scrubPosition: 0,
  userMessage: null
};

export const userInput = (state = defaultUserInput, action) => {
  switch (action.type) {
    case SET_FOCUS:
      return { ...state, focus: action.input, bandFocused: null };
    case SET_BAND_FOCUS:
      return { ...state, focus: action.input, bandFocused: action.bandFocused };
    case UNSET_FOCUS:
      return { ...state, focus: null, bandFocused: null };
    case SET_SCRUB_POSITION:
      return { ...state, scrubPosition: action.position };
    case SET_USER_MESSAGE:
      return { ...state, userMessage: action.message };
    case UNSET_USER_MESSAGE:
      return { ...state, userMessage: null };
    default:
      return state;
  }
};

const defaultDisplayState = {
  doubled: false,
  marqueeStep: 0,
  loading: true,
  llama: false,
  closed: false,
  mainShade: false,
  equalizerShade: false,
  playlistShade: false,
  working: false,
  skinImages: {},
  skinColors: null,
  skinCursors: null,
  skinPlaylistStyle: {},
  skinRegion: {},
  visualizerStyle: 2,
  playlistScrollPosition: 0,
  playlistSize: [0, 0]
};

const display = (state = defaultDisplayState, action) => {
  switch (action.type) {
    case TOGGLE_DOUBLESIZE_MODE:
      return { ...state, doubled: !state.doubled };
    case TOGGLE_MAIN_SHADE_MODE:
      return { ...state, mainShade: !state.mainShade };
    case TOGGLE_EQUALIZER_SHADE_MODE:
      return { ...state, equalizerShade: !state.equalizerShade };
    case TOGGLE_PLAYLIST_SHADE_MODE:
      return { ...state, playlistShade: !state.playlistShade };
    case TOGGLE_LLAMA_MODE:
      return { ...state, llama: !state.llama };
    case STEP_MARQUEE:
      // TODO: Prevent this from becoming huge
      return { ...state, marqueeStep: state.marqueeStep + 1 };
    case STOP_WORKING:
      return { ...state, working: false };
    case START_WORKING:
      return { ...state, working: true };
    case CLOSE_WINAMP:
      return { ...state, closed: true };
    case SET_SKIN_DATA:
      return {
        ...state,
        skinImages: action.skinImages,
        skinColors: action.skinColors,
        skinPlaylistStyle: action.skinPlaylistStyle,
        skinCursors: action.skinCursors,
        skinRegion: action.skinRegion,
        skinGenLetterWidths: action.skinGenLetterWidths
      };
    case TOGGLE_VISUALIZER_STYLE:
      return { ...state, visualizerStyle: (state.visualizerStyle + 1) % 3 };
    case SET_PLAYLIST_SCROLL_POSITION:
      return { ...state, playlistScrollPosition: action.position };
    case PLAYLIST_SIZE_CHANGED:
      return { ...state, playlistSize: action.size };
    case S_UPDATE_PLAYER_OBJECT:
      return { ...state, loading: false}
    default:
      return state;
  }
};

const defaultSettingsState = {
  avaliableSkins: []
};

const settings = (state = defaultSettingsState, action) => {
  switch (action.type) {
    case SET_AVALIABLE_SKINS:
      return { ...state, avaliableSkins: action.skins };
    default:
      return state;
  }
};

const equalizer = (state, action) => {
  if (!state) {
    state = {
      on: true,
      auto: false,
      sliders: {
        preamp: 50
      }
    };
    BANDS.forEach(band => {
      state.sliders[band] = 50;
    });
    return state;
  }
  switch (action.type) {
    case SET_BAND_VALUE:
      const newSliders = { ...state.sliders, [action.band]: action.value };
      return { ...state, sliders: newSliders };
    case SET_EQ_ON:
      return { ...state, on: true };
    case SET_EQ_OFF:
      return { ...state, on: false };
    case SET_EQ_AUTO:
      return { ...state, auto: action.value };
    default:
      return state;
  }
};

  
const media = (state, action) => {
  if (!state) {
    return {
      player: null,
      id: null,
      timeMode: "ELAPSED",
      timeElapsed: 0,
      length: null, // Consider renaming to "duration"
      kbps: "360",
      khz: 48,
      // The winamp ini file declares the default volume as "200".
      // The UI seems to show a default volume near 78, which would
      // math with the default value being 200 out of 255.
      volume: Math.round(200 / 255 * 100),
      balance: 0,
      channels: null,
      shuffle: false,
      repeat: false,
      // TODO: Enforce possible values
      status: "STOPPED"
    };
  }
  switch (action.type) {
    // TODO: Make these constants
    case PLAY:
    case IS_PLAYING:
    case S_PLAY_URI: 
    case PLAY_TRACK:
      return { ...state, status: "PLAYING"};
    case PAUSE:
      return { ...state, status: "PAUSED" };
    case STOP:
    case IS_STOPPED:
      return { ...state, status: "STOPPED" };
    case TOGGLE_TIME_MODE:
      const newMode = state.timeMode === "REMAINING" ? "ELAPSED" : "REMAINING";
      return { ...state, timeMode: newMode };
    case UPDATE_TIME_ELAPSED:
      return { ...state, timeElapsed: action.elapsed };
    case ADD_TRACK_FROM_URL:
      return {
        ...state,
      };
    case ADD_TRACK_FROM_URI:
    return {
      ...state,
    };
    case SET_MEDIA:
      return {
        ...state,
        length: action.length,
        kbps: action.kbps,
        khz: action.khz,
        channels: action.channels
      };
    case SET_VOLUME:
      return { ...state, volume: action.volume };
    case SET_BALANCE:
      return { ...state, balance: action.balance };
    case TOGGLE_REPEAT:
      return { ...state, repeat: !state.repeat };
    case TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };
    case S_UPDATE_PLAYER_OBJECT:
      return { ...state, player: action.player, id: action.id, 
      getOAuthToken: action.getOAuthToken, 
      volume: action.volume, name: action.name, 
      balance: action.balance, channels: action.channels, shuffle: action.shuffle, 
      repeat: action.repeat}
    default:
      return state;
  }
};

const network = (state = { connected: true }, action) => {
  switch (action.type) {
    case NETWORK_CONNECTED:
      return { ...state, connected: true };
    case NETWORK_DISCONNECTED:
      return { ...state, connected: false };
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInput,
  windows,
  display,
  settings,
  equalizer,
  playlist,
  media,
  network,
  explorer
});

export default reducer;
