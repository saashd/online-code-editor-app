import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardContent, Divider, Typography} from "@mui/material";
import styled, {css} from "styled-components";
import CodeIcon from '@mui/icons-material/Code';
import axios from "axios";

const mobile = (props) => {
    return css`
      @media only screen and (max-width: 500px) {
        ${props}
      }
    `;
};

const CardsWrapper = styled.div`
  padding: 10vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #1b1f23;
  color: #fff;
  border-radius: 0.5em;
  ${mobile({
    padding: "0px", flexDirection: "column", overflow: "scroll",
    flexWrap: "wrap",alignItems: "center"
  })}




`
const CardComponent = styled(Card)`
  flex: 1;
  min-width: 15vw;
  max-width: 15vw;
  height: 35vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 1em;
  font-size: 1.2em;
  font-weight: 350;

  ${mobile({
    minWidth: "50vw",
    maxWidth: "50vw"
  })}
  &:hover {
    transform: scale(1.1);
  }
`
const TypographyComponent = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: #fff;
`

const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:4000/api")
            setCodeBlocks(res.data.codeBlocks)
        }
        fetchData().catch((error) => {
            console.log(error)
        })

    }, []);
    return (
        <div>
            <h1>Choose code block</h1>
            <CardsWrapper>
                {codeBlocks.map((block, index) => (
                    <Link key={index} to={`/code-block/${index}`} state={block}
                          style={{textDecoration: "none"}}>
                        <CardComponent
                            sx={{overflow: "auto", backgroundColor: "#282828", color: "#fff", border: "0.01em solid"}}
                            variant="outlined">

                            <CardContent>
                                <TypographyComponent variant="h5" component="div">
                                    {block.title}
                                    <CodeIcon style={{
                                        color: "#149952",
                                        marginLeft: '0.5em',
                                        fontSize: '1.5em',
                                    }}/>

                                </TypographyComponent>
                                <Divider sx={{backgroundColor: "white"}}/>
                                <p> {block.description}</p>
                            </CardContent>

                        </CardComponent></Link>
                ))}
            </CardsWrapper>
        </div>
    );
}

export default Lobby;