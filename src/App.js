import React, { useState } from 'react';
import FileUploader from './FileUpload';

const App = () => {
    const handleFileUpload = () => {
    };

    return (
        <>
            <FileUploader onFileUpload={handleFileUpload} />
        </>
    );
};

export default App;