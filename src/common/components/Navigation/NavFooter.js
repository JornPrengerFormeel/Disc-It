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
    flex: 0 1 64px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;
    width: 100%;

    font-size: 16px;
    font-weight: 600;

    a {
        color: #1ed760;
        text-decoration: none;
        &:hover {
            color: #212121;
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
