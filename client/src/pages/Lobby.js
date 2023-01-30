import React from 'react';
import {Link} from 'react-router-dom';
import {codeBlocks} from "../data/data"
import {Card, CardActionArea, CardContent, Divider, Typography} from "@mui/material";
import styled from "styled-components";
import CodeIcon from '@mui/icons-material/Code';

const CardsWrapper = styled.div`
  display: flex;
  padding: 10vh;
  
  

`
const CardComponent = styled(Card)`
  margin: 1em;
  font-size: 1.2em;
  font-weight: 350;


  &:hover {
    transform: scale(1.1);
  }
`

const Lobby = () => {
    return (
        <div>
            <h1>Choose code block</h1>
            <CardsWrapper>
                {codeBlocks.map(({title, description}, index) => (
                    <CardComponent sx={{backgroundColor: "#ffffff33", color: "white",  border: "0.01em solid"}}
                                   key={index} variant="outlined">
                        <CardActionArea component={Link} to={`/code-block/${index}`}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                     <CodeIcon style={{marginRight:"0.5em"}}/>{title}
                                    <Divider/>
                                </Typography>
                                <p> {description}</p>
                            </CardContent>
                        </CardActionArea>
                    </CardComponent>
                ))}
            </CardsWrapper>
        </div>
    );
}

export default Lobby;