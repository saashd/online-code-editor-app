import React from 'react';
import {Link} from 'react-router-dom';
import {codeBlocks} from "../data/data"


const Lobby = () => {
    return (
        <div>
            <h1>Choose code block</h1>
            <ul>
                {codeBlocks.map(({title, code}, index) => (
                    <li key={index}>
                        <Link to={`/code-block/${index}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lobby;