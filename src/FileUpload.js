import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
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

            <input
                type="file"
                accept=".xml"
                onChange={handleFileInput}
                style={{ display: 'block' }}
            />

            <div className={'result'}>

            </div>
        </>
    );
};

export default FileUploader;
