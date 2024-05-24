import React from 'react';
import FileUploader from './FileUpload';
import LandingPage from "./LandingPage"; // Assuming you have the FileUploader component

const App = () => {
    const handleFileUpload = () => {};
    return (
        <div>
            <LandingPage />
            <FileUploader onFileUpload={handleFileUpload} />
        </div>
    );
};

export default App;
