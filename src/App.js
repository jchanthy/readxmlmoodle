import React from 'react';
import FileUploader from './FileUpload'; // Assuming you have the FileUploader component

const App = () => {
    const handleFileUpload = () => {};
    return (
        <div>
            <FileUploader onFileUpload={handleFileUpload} />
        </div>
    );
};

export default App;
