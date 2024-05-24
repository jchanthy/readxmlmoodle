import React, { useState } from 'react';
import { XMLParse} from 'fast-xml-parser';

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
            parseXml(xmlString);
        };
        reader.readAsText(file);
    };
    const parseXml = (xmlString) => {
        const parser = new XMLParser();
        const result = parser.parse(xmlString);

        // Extracting relevant data from parsed XML
        const extractedQuestions = result.quiz.question.map((q) => ({
            name: q.name?.text || '',
            questiontext: q.questiontext?.text || '',
            tags: q.tags?.tag || []
        }));

        setQuestions(extractedQuestions);
        onFileUpload(extractedQuestions);
    };
    return (
        <>

            <input
                type="file"
                accept="text/xml"
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
