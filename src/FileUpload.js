import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
    const [dragging, setDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (!file) return;
        if (file.type !== 'text/xml') {
            alert('Please upload an XML file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const xmlString = event.target.result;
            onFileUpload(xmlString);
        };
        reader.readAsText(file);

    };

    return (
        <>
        <div
            className={`file-uploader ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept=".xml"
                onChange={handleFileInput}
                style={{ display: 'block' }}
            />
            <label htmlFor="file-input">
                {dragging ? 'Drop the file here' : 'Drag and drop or click to upload XML file'}
            </label>
        </div>
            <div className={'result'}>

            </div>
        </>
    );
};

export default FileUploader;
