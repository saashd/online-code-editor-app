import React, {useState, useEffect, useRef} from 'react';
import socketIOClient from 'socket.io-client';
import {useParams} from "react-router-dom";
import AceEditor from "react-ace";
// Import a Mode (language)
import "ace-builds/src-noconflict/mode-java";
// Import a Theme (okadia, github, xcode etc)
import 'ace-builds/src-noconflict/theme-twilight';
import "ace-builds/src-noconflict/ext-language_tools";
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import smileIcon from "../data/smile-icon.png"
import {Typography} from "@mui/material";
import axios from "axios";

const SOCKET_SERVER_URL = "http://localhost:4000";


const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Button = styled.button`
  font-size: 1.2em;
  background-color: transparent;
  cursor: pointer;
  color: rgb(224, 224, 224);
  border: 0.01em solid rgb(158, 158, 158);
  border-radius: 6px;
  padding: 0.5em 1em 0.5em 0.5em;
  margin-top: 1em;
  display: flex;
  flex-flow: row nowrap;
  -webkit-box-pack: end;
  justify-content: flex-end;

  &:hover {
    background-color: rgba(66, 66, 66, 0.5);
    color: rgb(224, 224, 224);
    border: 0.01em solid rgb(158, 158, 158);
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 45%;
  justify-content: flex-end;
  align-items: flex-end;
`
const Smiley = styled.div`
  position: absolute;
  top: 33vh;
  z-index: 5;
`

const CodeContainer = styled.div`
  display: flex
`
const CodeBlock = () => {
    // Getting the code block index from the URL parameters
    const {codeBlockIndex} = useParams();
    // State variables for the code, role of the user (mentor or not), and the correctness of the solution
    const [codeBlocks, setCodeBlocks] = useState([]);
    const [currCodeBlock, setCurrCodeBlock] = useState([]);
    const [code, setCode] = useState(null);
    const [solution, setSolution] = useState(null);
    const [isMentor, setIsMentor] = useState(false);
    const [solutionIsCorrect, setSolutionIsCorrect] = useState(null);

    const socketRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:4000/api")
            setCodeBlocks(res.data.codeBlocks)
            setCurrCodeBlock(res.data.codeBlocks.at(codeBlockIndex))
            setCode(res.data.codeBlocks.at(codeBlockIndex).code)
        }
        fetchData().catch((error) => {
            console.log(error)
        })
        // Reference to the current socket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {codeBlockIndex},
        });
        socketRef.current.emit('join', codeBlockIndex);
        socketRef.current.on('role', data => {
            setIsMentor(data.role === 'mentor');
            setSolution(data.solution)
        });
        socketRef.current.on('updateCode', newCode => {
            setCode(newCode);
        });
        socketRef.current.on('updateSolutionStatus', status => {
            setSolutionIsCorrect(status);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [codeBlockIndex]);

    /* Updates the state of the code and emits an event 'codeChange'
     with the new code to the connected socket.*/
    const handleChange = (code) => {
        setCode(code)
        socketRef.current.emit('codeChange', code)
    }

    /* Checks if the code is correct and updates the state of solutionIsCorrect.
     Also emits an event 'solutionStatusChange' with the value of whether the solution is correct or not to the connected socket.*/
    const handleSubmit = () => {
        socketRef.current.emit('checkSolution', code);
    }

    return (
        <Container>
            <h1>{currCodeBlock.title}</h1>
            <Typography variant="h5">{currCodeBlock.description}</Typography>
            <CodeContainer>
                <div>
                    <h1>Task</h1>
                    <AceEditor
                        style={{fontFamily: "monospace !important", fontSize: "16px !important"}}
                        width='40vw'
                        height='50vh'
                        readOnly={isMentor}
                        mode="javascript"
                        theme="twilight"
                        onChange={handleChange}
                        fontSize={18}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={code}
                        setOptions={{
                            useWorker: false,
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}/>
                </div>
                {
                    isMentor &&
                    <div>
                        <h1>Solution</h1>
                        <AceEditor
                            width='40vw'
                            height='50vh'
                            readOnly={true}
                            mode="javascript"
                            theme="twilight"
                            onChange={handleChange}
                            fontSize={18}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={solution}
                            setOptions={{
                                useWorker: false,
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>
                    </div>
                }
            </CodeContainer>
            {
                !isMentor && <ButtonWrapper>
                    <Button onClick={handleSubmit}>
                        <CheckIcon style={{paddingRight: "10px"}}/>Submit</Button>
                </ButtonWrapper>
            }
            {solutionIsCorrect &&
                <Smiley>
                    <img width={"200px"} src={smileIcon} alt={"smiley"}/>
                </Smiley>}

        </Container>
    );
};
export default CodeBlock;

