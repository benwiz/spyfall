import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Spotify from 'spotify-web-api-js';
import Util from './util';
import './App.css';

// Set theme color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#91ddfc',
    },
    secondary: {
      main: '#fcaf91',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

// Set up Spotify. This must execute immediately incase a redirect is necessary.
// There is maybe a better practice for where this function should be called.
const spotify = new Spotify();
Util.setupSpotify(spotify);

class GameLengthSelect extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render = () => {
    const style = {
      display: this.props.gameHasStarted ? 'none' : 'default',
    };

    return (
      <FormControl
        className="select-form-control"
        variant="outlined"
        style={style}
      >
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="game-length"
        >
          Game Length
        </InputLabel>
        <Select
          native
          value={this.props.value}
          onChange={this.props.onChange}
          className="config-select"
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="game-length"
              id="game-length"
            />
          }
        >
          <option value={10}>10 minutes</option>
          <option value={20}>20 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={40}>40 minutes</option>
          <option value={50}>50 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={70}>70 minutes</option>
          <option value={80}>80 minutes</option>
          <option value={90}>90 minutes</option>
        </Select>
      </FormControl>
    );
  };
}

class ShotIntervalSelect extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render = () => {
    return (
      <FormControl className="select-form-control" variant="outlined">
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="shot-interval"
        >
          Shot Interval
        </InputLabel>
        <Select
          native
          value={this.props.value}
          onChange={this.props.onChange}
          className="config-select"
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="shot-interval"
              id="shot-interval"
            />
          }
        >
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
          <option value={120}>120 seconds</option>
          <option value={150}>150 seconds</option>
          <option value={180}>180 seconds</option>
        </Select>
      </FormControl>
    );
  };
}

class DeviceSelect extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    if (this.props.devices.length > 0) {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
   }
  }

  createOptions() {
    const options = [];
    for (const device of this.props.devices) {
      const option = (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      );
      options.push(option);
    }
    return options;
  }

  render() {
    let component;
    if (this.props.devices.length > 0) {
    component = (
      <FormControl className="select-form-control" variant="outlined">
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="device"
        >
          Device
        </InputLabel>
        <Select
          native
          value={this.props.value}
          onChange={this.props.onChange}
          className="config-select"
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="device"
              id="device"
            />
          }
        >
          {this.createOptions()}
        </Select>
      </FormControl>
    );
    } else {
        component = <p>Open Spotify on this or another device</p>;
    }

    return component;
  }
}

class StartButton extends React.Component {
  render = () => {
    const text = this.props.gameHasStarted
      ? this.props.gameIsPaused
        ? 'play_arrow'
        : 'pause'
      : 'play_arrow';
    return (
      <Fab variant="round" color="primary" onClick={this.props.onClick}>
        <Icon>{text}</Icon>
      </Fab>
    );
  };
}

class Timer extends React.Component {
  render = () => {
    const minutes = this.props.minutes.toString().padStart(2, '0');
    const seconds = this.props.seconds.toString().padStart(2, '0');
    return (
      <span className="timer">
        {minutes}:{seconds}
      </span>
    );
  };
}

class TrackInformation extends React.Component {
  render = () => {
    return (
      <div className="track-information">
        <img
          src={this.props.albumImage}
          alt={this.props.albumName}
          width="175"
          height="175"
        />
        <p className="song-name">{this.props.songName}</p>
        <p className="artists">{this.props.artists}</p>
      </div>
    );
  };
}

class RestartButton extends React.Component {
  render() {
    const styles = {
      visibility: this.props.gameHasStarted ? 'visible' : 'hidden',
      marginTop: '12px',
      marginBottom: '12px',
    };

    return (
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        style={styles}
        onClick={this.props.onClick}
      >
        Restart
      </Button>
    );
  }
}

class Config extends React.Component {
  render = () => {
    return (
      <div className="config">
        <GameLengthSelect
          value={this.props.gameLengthMinutes}
          onChange={this.props.gameLengthSelectChangeHandler}
          gameHasStarted={this.props.gameHasStarted}
        />
        <ShotIntervalSelect
          value={this.props.shotIntervalSeconds}
          onChange={this.props.shotIntervalSelectChangeHandler}
        />
        <DeviceSelect
          value={this.props.currentDeviceID}
          onChange={this.props.deviceSelectChangeHandler}
          devices={this.props.devices}
        />
      </div>
    );
  };
}

class Game extends React.Component {
  render = () => {
    return (
      <div className="game">
        <StartButton
          onClick={this.props.startButtonClickHandler}
          gameHasStarted={this.props.gameHasStarted}
          gameIsPaused={this.props.gameIsPaused}
        />
        <Timer minutes={this.props.minutes} seconds={this.props.seconds} />
        <TrackInformation
          songName={this.props.songName}
          artists={this.props.artists}
          albumImage={this.props.albumImage}
          albumName={this.props.albumName}
        />
        <RestartButton
          onClick={this.props.restartButtonClickHandler}
          gameHasStarted={this.props.gameHasStarted}
        />
      </div>
    );
  };
}

class Footer extends React.Component {
  render = () => {
    return (
      <div className="footer">
        <IconButton>
          <Icon>home</Icon>
        </IconButton>
        <IconButton>
          <SvgIcon viewBox={'0 0 16 16'}>
            <path
              // fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </SvgIcon>
        </IconButton>
      </div>
    );
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      // Configs
      gameLengthMinutes: 60,
      shotIntervalSeconds: 60,
      // Other, unsorted stuff
      minutes: 60, // NOTE: Must match gameLengthMinutes
      seconds: 0,
      devices: [],
      currentDeviceID: '',
      gameIsPaused: true,
      gameHasStarted: false,
      gameHasEnded: false,
      tickIntervalID: null,
      songName: null,
      artists: null,
      albumImage: null,
      albumName: null,
    };
  };

  componentDidMount = async () => {
    // Load data from Spotify
    const [{ devices }, { device }] = await Promise.all([
      spotify.getMyDevices(),
      spotify.getMyCurrentPlaybackState(),
    ]);
    this.setState({ devices, currentDeviceID: device ? device.id : '' });

    // Keep an eye on available devices
    setInterval(() => this.getDevices(), 5000);

    // Keep an eye on current track and play status
    setInterval(() => this.getCurrentTrack(), 900);
  };

  getDevices = async () => {
    const { devices } = await spotify.getMyDevices();
    this.setState({ devices });
  };

  getCurrentTrack = async () => {
    const result = await spotify.getMyCurrentPlayingTrack();

    // Only update gameIsPaused if the game is started
    let gameIsPaused = this.state.gameIsPaused;
    if (this.state.gameHasStarted) {
      gameIsPaused = !result.is_playing;
    }

    // Always update track info
    const songName = result.item ? result.item.name : '';
    let artists = '';
    if (result.item && result.item.artists) {
      for (let i = 0; i < result.item.artists.length; i++) {
        const artist = result.item.artists[i];
        artists += artist.name;
        if (i < result.item.artists.length - 1) {
          artists += ', ';
        }
      }
    }
    const albumImage = result.item ? result.item.album.images[0].url : ''; // TODO: Change index to 1 for a smaller image
    let albumName = '';
    if (result && result.item && result.item.album && result.item.album.name) {
      albumName = result.item.album.name;
    }

    // Update the state
    this.setState({ gameIsPaused, songName, artists, albumImage, albumName });
  };

  gameLengthSelectChangeHandler = event => {
    const gameLengthMinutes = event.target.value;
    const minutes = gameLengthMinutes;
    this.setState({ gameLengthMinutes, minutes });
  };

  shotIntervalSelectChangeHandler = event => {
    const shotIntervalSeconds = event.target.value;
    this.setState({ shotIntervalSeconds });
  };

  deviceSelectChangeHandler = async event => {
    // Update the state
    this.setState({ currentDeviceID: event.target.value });
    // Switch Spotify play to selected device
    await spotify.transferMyPlayback([event.target.value]);
  };

  startButtonClickHandler = async () => {
    // If the game has not yet started, start the game
    if (!this.state.gameHasStarted) {
      const intervalID = setInterval(() => this.tick(), 1000);
      this.setState({ gameHasStarted: true, tickIntervalID: intervalID });
    }

    if (this.state.gameIsPaused) {
      // Pause Spotify using the selected device
      await spotify.play({ device_id: this.state.currentDeviceID });
    } else {
      // Play Spotify using the selected device
      await spotify.pause();
    }
  };

  tick = () => {
    // If the game is not active, exit the function
    if (this.state.gameIsPaused) {
      return;
    }

    // Update the counter
    let seconds = this.state.seconds - 1;
    let minutes = this.state.minutes;
    if (seconds < 0) {
      seconds = 59;
      minutes -= 1;
    }
    this.setState({ seconds, minutes });

    // Skip to next track if shotIntervalSeconds has passed since the last shot
    const ellapsedMinutes = this.state.gameLengthMinutes - this.state.minutes;
    const ellapsedSeconds = 60 * ellapsedMinutes + (60 - this.state.seconds);
    const timeForShot =
      ellapsedSeconds % this.state.shotIntervalSeconds === 0 || // Interval
      (minutes === 0 && seconds === 0); // End of game
    if (timeForShot) {
      spotify.skipToNext();
      // TODO: Maybe play a sound
    }

    // If game is over, update the state to say so
    if (minutes === 0 && seconds === 0) {
      this.setState({ gameHasEnded: true });
      clearInterval(this.state.tickIntervalID);
    }
  };

  restartButtonClickHandler = () => {
    // // Stop tick interval
    // clearInterval(this.state.tickIntervalID);
    // // Reset state
    // const state = this.getInitialState();
    // // TODO: Overwrite state with configs from this.state so that the settings
    // // are not lost.
    // this.setState(state);
    // // Call component did mount again
    // this.componentDidMount();

    // For now, just reload the page
    window.location = window.location.href;
  };

  render = () => {
    const style = { backgroundImage: `url(${this.state.albumImage})` };

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App" style={style}>
          <div className="dimmer">
            <div className="container">
              <h2>Power Hour</h2>
              <Config
                gameHasStarted={this.state.gameHasStarted}
                gameLengthMinutes={this.state.gameLengthMinutes}
                gameLengthSelectChangeHandler={
                  this.gameLengthSelectChangeHandler
                }
                shotIntervalSeconds={this.state.shotIntervalSeconds}
                shotIntervalSelectChangeHandler={
                  this.shotIntervalSelectChangeHandler
                }
                currentDeviceID={this.state.currentDeviceID}
                deviceSelectChangeHandler={this.deviceSelectChangeHandler}
                devices={this.state.devices}
              />
              <Game
                startButtonClickHandler={this.startButtonClickHandler}
                gameHasStarted={this.state.gameHasStarted}
                gameIsPaused={this.state.gameIsPaused}
                minutes={this.state.minutes}
                seconds={this.state.seconds}
                songName={this.state.songName}
                artists={this.state.artists}
                albumImage={this.state.albumImage}
                albumName={this.state.albumName}
                restartButtonClickHandler={this.restartButtonClickHandler}
              />
              <Footer />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;