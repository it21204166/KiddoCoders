import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from "./SidebarData";
import SubMenu from "./SubMenu";
import {IconContext} from "react-icons/lib";
import { PiUserCircleFill } from "react-icons/pi";
import { FiArrowUpCircle } from "react-icons/fi";

const Nav = styled.div`
    background:#1eb2a6;
    height:80px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 1rem;
`;

const NavIcon = styled(Link)`
    font-size:20px;
    height:87px;
    display:flex;
    justify-content:right;
    align-items:center;
    margin-right: 1rem;
`;

const SidebarNav = styled.nav`
    margin-top: 8px;
    margin-left:2px;
    background: #0E635D;
    width: 200px;
    height:100vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    position:fixed;
    top:0;
    left: ${({sidebar}) => (sidebar? "0": "-100%")};
    transition: 350ms;
    z-index:10;
`;

const SidebarWrap=styled.div`
    width:100%;
`;

const UserProfileIcon = styled(PiUserCircleFill)`
    font-size: 40px;
    color: white;
    margin-right: 0rem;
`;

const ScrollToTopIcon = styled(FiArrowUpCircle)`
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 30px;
    background: rgba(30, 178, 166, 0.8);
    cursor: pointer;
    border-radius: 20px;
    &:hover{
        background: #0B524C;
        
        cursor:pointer;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showSidebar = () => setSidebar(!sidebar);
    
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <h1 style={{ textAlign: "center", color: "white" }}>
                        {'<KIDDO/CODERS>'}
                    </h1>
                    <NavIcon to="#">
                        <UserProfileIcon />
                    </NavIcon>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item,index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
                {scroll && <ScrollToTopIcon onClick={scrollToTop} />}
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
