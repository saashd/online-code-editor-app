import React, {useState, useEffect, useRef} from 'react';
import socketIOClient from 'socket.io-client';
import {codeBlocks} from "../data/data"
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
  padding: 0.5em;
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
  z-index: 1;
`
const CodeBlock = () => {
    // Getting the code block index from the URL parameters
    const {codeBlockIndex} = useParams();
    // State variables for the code, role of the user (mentor or not), and the correctness of the solution
    const [code, setCode] = useState(codeBlocks.at(codeBlockIndex).code);
    const [isMentor, setIsMentor] = useState(false);
    const [solutionIsCorrect, setSolutionIsCorrect] = useState(null);

    const socketRef = useRef();

    useEffect(() => {
        // Reference to the current socket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {codeBlockIndex},
        });
        socketRef.current.emit('join', codeBlockIndex);
        socketRef.current.on('role', role => {
            setIsMentor(role === 'mentor');
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
    }, []);

    /* Updates the state of the code and emits an event 'codeChange'
     with the new code to the connected socket.*/
    const handleChange = (code) => {
        setCode(code)
        socketRef.current.emit('codeChange', code)
    }

    /* Checks if the code is correct and updates the state of solutionIsCorrect.
     Also emits an event 'solutionStatusChange' with the value of whether the solution is correct or not to the connected socket.*/
    const handleSubmit = () => {
        const isCorrect = (code === codeBlocks.at(codeBlockIndex).solution);
        setSolutionIsCorrect(isCorrect);
        socketRef.current.emit('solutionStatusChange', isCorrect);
    }

    return (
        <Container>
            <h1>{codeBlocks.at(codeBlockIndex).title}</h1>
            <AceEditor
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
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
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

