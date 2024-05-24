import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import {LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";

const FileUploader = ({ onFileUpload }) => {
    const [dragging, setDragging] = useState(false);
    const [questions, setQuestions] = useState([]);

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

            tags: Array.isArray(q.tags?.tag) ? q.tags?.tag : []
        }));

        setQuestions(extractedQuestions);
        onFileUpload(extractedQuestions);
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
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input">
                    {dragging ? 'Drop the file here' : 'Drag and drop or click to upload XML file'}
                </label>
            </div>
            <div className="result">
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