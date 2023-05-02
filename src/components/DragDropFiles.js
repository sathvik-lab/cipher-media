import React, { useState, useRef } from 'react';
import './dropzone.css';

const DragDropFiles = () => {
    const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };

    const handleUpload = () => {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('Files', file);
        });
        console.log(formData.getAll());
        // fetch("link", {
        //   method: "POST",
        //   body: formData
        // });
    };

    if (files) {
        return (
            <div className="uploads">
                <ul>
                    {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ul>
                <div className="actions">
                    <button onClick={() => setFiles(null)}>Cancel</button>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                <h2>Drag and Drop Files to Upload</h2>
                <h2>Or</h2>
                <input
                    type="file"
                    multiple
                    onChange={(event) => setFiles(event.target.files)}
                    hidden
                    accept="image/png, image/jpeg"
                    ref={inputRef}
                />
                <button onClick={() => inputRef.current.click()}>Select Files</button>
            </div>
        </>
    );
};

export default DragDropFiles;
