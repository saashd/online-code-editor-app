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
  padding: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 0.5em;
  ${mobile({
    padding: "0px", flexDirection: "column", overflow: "scroll",
    flexWrap: "wrap", alignItems: "center"
  })}
`
const CardComponent = styled(Card)`
  flex: 1;
  min-width: 25vw;
  max-width: 25vw;
  height: 30vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 1em;
  font-size: 1.1rem;
  font-weight: 350;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  transform: translateY(0px);

  ${mobile({
    minWidth: "50vw",
    maxWidth: "50vw"
  })}
  &:hover {
    transform: scale(1.1);
    background-color: #f3a712;
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
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api`)
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
                {codeBlocks.map((block) => (
                    <Link key={block._id} to={`/code-block/${block._id}`} state={block}
                          style={{textDecoration: "none"}}>
                        <CardComponent
                            sx={{transition: "transform .6s, background-color .6s ease",overflow: "auto", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff"}}
                            variant="outlined">

                            <CardContent>
                                <TypographyComponent variant="h5" component="div">
                                    {block.title}
                                    <CodeIcon style={{
                                        color: "#149952",
                                        marginLeft: '0.5em',
                                        fontSize: '2rem',
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