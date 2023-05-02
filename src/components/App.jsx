import React, { useState, useRef } from 'react';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import UploadButton from './UploadButton';
import { encode, decode, loadImage } from '../steganography';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import DragDropFiles from './DragDropFiles';
import './app.css';

export default function App() {
  const [option, setOption] = useState('home');
  const [message, setMessage] = useState('');
  const [encodedImageSrc, setEncodedImageSrc] = useState('');
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };

  function handleClick(event) {
    const { name } = event.currentTarget;
    if (name === 'home') {
      setOption('home');
      setEncodedImageSrc('');
      setMessage('');
    } else if (name === 'encode') {
      setOption('encode');
    } else if (name === 'decode') {
      setOption('decode');
    }
    setShowShareButtons(false);
  }

  function handleEncode() {
    setIsLoading(true);
    axios
      .post('http://localhost:5000/api/encrypt', { data: message })
      .then((response) => {
        setMessage(response.data.result);
        console.log(message);
        setEncodedImageSrc(document.getElementById('canvas').toDataURL());
        encode(message);
        setIsLoading(false);
        setShowShareButtons(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }

  function handleDecode() {
    setIsLoading(true);
    if (!document.getElementById('canvas')) {
      console.error('Canvas element not found.');
      setIsLoading(false);
      return;
    }
    const decodedMessage = decode();
    console.log(decodedMessage);
    axios
      .post('http://localhost:5000/decrypt', { data: decodedMessage })
      .then((response) => {
        setMessage(response.data.result);
        alert('Decoded message: ' + message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }

  function handleClear() {
    setOption('home');
    setEncodedImageSrc('');
    setMessage('');
    window.location.reload();
  }

  return (
    <>
      <div className="content">
        <h1>
          IMAGE<span id="word"> STEGO</span>
        </h1>
        <canvas id="canvas"></canvas>
        <div className="drag-drop-div">
          <DragDropFiles />
        </div>
        {isLoading && <CircularProgress className="loading-spinner" />}
        {option === 'home' && (
          <div className="button-group">
            <Button className="option-button primary" name="encode" onClick={handleClick} variant="contained">
              Encode
            </Button>
            <Button className="option-button primary" name="decode" onClick={handleClick} variant="contained">
              Decode
            </Button>
          </div>
        )}
        {option === 'encode' && (
          <TextField
            variant="outlined"
            multiline
            type="text"
            id="secret"
            name="secret"
            placeholder="Enter secret message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
        {option !== 'home' && <UploadButton onImageUpload={loadImage} />}
        {option === 'encode' && (
          <Button className="action-button secondary" onClick={handleEncode} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Encode'}
          </Button>
        )}
        {option === 'decode' && (
          <Button className="action-button secondary" onClick={handleDecode} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Decode'}
          </Button>
        )}
        {option !== 'home' && (
          <Button className="return-button primary" name="home" onClick={handleClear} variant="contained">
            Return
          </Button>
        )}
        {encodedImageSrc && (
          <div className="image-container">
            <img id="encoded-image" alt="encoded output" src={encodedImageSrc} />
            {showShareButtons && (
              <div className="share-buttons">
                <FacebookShareButton url={encodedImageSrc}>
                  <Button variant="contained" color="primary" className="primary">
                    Share on Facebook
                  </Button>
                </FacebookShareButton>
                <TwitterShareButton url={encodedImageSrc}>
                  <Button variant="contained" color="primary" className="primary">
                    Share on Twitter
                  </Button>
                </TwitterShareButton>
                <EmailShareButton url={encodedImageSrc}>
                  <Button variant="contained" color="primary" className="primary">
                    Share via Email
                  </Button>
                </EmailShareButton>
              </div>
            )}
            <Button
              className="download-button secondary"
              variant="contained"
              color="primary"
              href={encodedImageSrc}
              download="encoded_image.png"
            >
              Download
            </Button>
          </div>
        )}
        {encodedImageSrc && (
          <Button className="clear-button primary" variant="contained" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
    </>
  );
}