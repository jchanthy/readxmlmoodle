import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
    const [questions, setQuestions] = useState([]) ;
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
                {questions.map((question, index) => (
                    <div key={index}>
                        <h3>{question.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: question.questiontext }} />
                        <ul>
                            {question.tags.map((tag, id) => (
                                <li key={id}>{tag.text || tag}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FileUploader;
