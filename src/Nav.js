import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

const Header = styled.div`
  margin: 0;
  color: white;
`;

const WebName = styled.div`
  margin: 0;
  font-size: large;
  text-align: center;
  height: 10vh;
  line-height: 4;
  padding-left: 15px;
`;

const Navigation = styled.div`
  border-bottom: 1px solid gray;
  box-shadow: 0px 12px 10px -15px #111;
`;

const Ul = styled.ul`
  justify-content: center;
  display: flex;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 20px;
  text-align: center;
  &:focus {
    outline: yellow solid 1px;
    box-shadow: 0px 0px 10px rgba(81, 203, 238, 1);
    border-radius: 3px;
    padding: 4px;
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  text-align: center;
`;

function Nav({ user, logout }) {
  return (
    <Header>
      <WebName>
        <HeaderLink to="/">HYUNIK log</HeaderLink>
      </WebName>
      <Navigation>
        <Ul>
          <StyledLink to="/">Home </StyledLink>
          <StyledLink to="/Write">작성하기 </StyledLink>
          {user ? (
            <>
              <StyledLink to="/Profile">마이페이지</StyledLink>
              <StyledLink onClick={logout}>로그아웃</StyledLink>
            </>
          ) : (
            <StyledLink to="/Login">로그인</StyledLink>
          )}
        </Ul>
      </Navigation>
    </Header>
  );
}

export default React.memo(Nav);
