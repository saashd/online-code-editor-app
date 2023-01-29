import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {codeBlocks} from "../data/data"

const CodeBlock = () => {
    const {codeBlockIndex} = useParams();
    const [code, setCode] = useState(codeBlocks.at(codeBlockIndex).code);

    const handleChange = (e) => {
        setCode(e.target.value)

    }
    return (
        <div>
            <h1>{codeBlocks.at(codeBlockIndex).title}</h1>
            <textarea value={code} onChange={handleChange}/>
        </div>
    );
};
export default CodeBlock;

