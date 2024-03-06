import React,{useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const SideBarLink = styled(Link)`
    display:flex;
    color: #e1e9fc;
    justify-content:space-between;
    align-items: ceter;
    padding: 15px;
    list-style: none;
    height: 15px;
    text-decoration: none;
    font-size: 15px;

    &:hover{
        background: #252831;
        border-left: 4px solid white;
        cursor: pointer;   
    }
`;

const SidebarLabel = styled.span`
    margin-left:16px;
`;

const DropdownLink = styled(Link)`
    background: #094F4A ;
    height:40px;
    padding-left:3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 15px;

    &:hover{
        background: #041F1D;
        border-left: 4px solid grey;
        cursor:pointer;        
    }
`;

const SubMenu = ({ item }) => {

    const[subnav, setSubnav] = useState(false);
    const showSubnav  = () => setSubnav(!subnav);

    return(
        <>
            <SideBarLink to={item.path} onClick={item.subNav && showSubnav} >
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>      
                <div>
                {item.subNav && subnav 
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
                </div>          
            </SideBarLink>
            {subnav && item.subNav.map((item, index) => {
                    return(
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })} 
        </>
    );
};

export default SubMenu;