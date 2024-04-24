import React, { useState } from 'react';
import FileUploader from './FileUpload';

const App = () => {
    const [uploadedData, setUploadedData] = useState([]);

    const handleFileUpload = (data) => {
        setUploadedData(data);
    };

    return (
        <>
            <FileUploader onFileUpload={handleFileUpload} />
            <div>
                {uploadedData.map((item, index) => (
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: item.questiontext }} />
                        <div>{item.tag}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;