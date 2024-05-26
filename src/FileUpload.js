import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import Stack from "@mui/material/Stack";
import {Fade} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";


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

    const [expanded, setExpanded] = useState(Array(questions.length).fill(false));

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded((prevExpanded) => {
            const newExpanded = [...prevExpanded];
            newExpanded.fill(false); // Reset all to false
            newExpanded[panel] = isExpanded; // Set clicked item to true
            return newExpanded;
        });
    };
    const handleDelete = () => {};
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
                    style={{display: 'none'}}
                    id="file-input"
                />
                <label htmlFor="file-input">
                    {dragging ? 'Drop the file here' : 'Drag and drop or click to upload XML file'}
                </label>
            </div>


            <div>
                {questions.map((question, index) => (
                <Accordion
                    key={index}
                    expanded={expanded[index]}
                    onChange={handleExpansion(index)}
                    slots={{transition: Fade}}
                    slotProps={{transition: {timeout: 400}}}
                    sx={{
                        '& .MuiAccordion-region': {height: expanded ? 'auto' : 0},
                        '& .MuiAccordionDetails-root': {display: expanded ? 'block' : 'none'},
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${1}-header`}
                    >
                        <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: question.questiontext }} />

                    </AccordionSummary>
                    <AccordionDetails>

                            <Typography>
                                <Stack direction="row" spacing={1}>
                                    {question.tags.map((tag, id) => (
                                        <Chip key={id} label={tag.text || tag} color="success" onDelete={handleDelete}/>
                                    ))}
                                </Stack>
                            </Typography>

                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    );
};

export default FileUploader;