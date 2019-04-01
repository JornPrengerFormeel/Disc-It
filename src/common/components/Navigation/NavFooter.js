import React from 'react';
import styled from 'styled-components';

const NavFooter = props => (
    <NavFooterDiv>
        <a href="https://icons8.com">Photo by icons8</a>
        <a href="/discover">Discover</a>
        <a href="https://github.com/JornPrengerFormeel/Disc-It">Contribute</a>
    </NavFooterDiv>
);

const NavFooterDiv = styled.div`
    flex: 0 1 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 .1rem;
    width: 100%;

    background-color: #212121;

    font-size: 14px;
    font-weight: 600;

    a {
        color: #717171;
        text-decoration: none;
        &:hover {
            color: #868686;
        }
    }

    >* {
        margin: 0 4px;
        padding: 0 8px;
    }

    @media (max-width: 768px) {
        justify-content: space-evenly;
     }
`;

export default NavFooter;
