import React, { useState } from 'react';
// import xml2js from 'xml2js';
import FileUploader from './FileUpload'; // Assuming you have the FileUploader component

const QuestionDisplay = () => {
    const [questions, setQuestions] = useState([]);
    //
    const handleFileUpload = (xmlString) => {
        // const parser = new xml2js.Parser({ explicitArray: false });
        // parser.parseString(xmlString, (err, result) => {
        //     if (err) {
        //         console.error('Error parsing XML:', err);
        //         return;
        //     }
        //     const extractedQuestions = extractQuestions(result);
        //     setQuestions(extractedQuestions);
        // }
        // );
        console.log('hell');
    };
    //
    // const extractQuestions = (xmlData) => {
    //     const questionsArray = xmlData.questions.question; // Assuming 'questions' is the root element
    //     return questionsArray.map((question) => ({
    //         name: question.name,
    //         tag: question.tag
    //     }));
    // };

    return (
        <div>
            <FileUploader onFileUpload={handleFileUpload} />
            <h2>Questions:</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <div>Question Name: {question?.name}</div>
                        <div>Tag Name: {question?.tag}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionDisplay;
