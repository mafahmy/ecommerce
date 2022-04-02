import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const Container = styled.div`
  display: flex;
  background-color: #203040;
  color: #9ebad2;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  //margin-top: 10px;
`;

const Title = styled.h3`
  margin: 20px 0px;
`;
const List = styled.ul`
  margin: 0;
  margin-top: 10px;
  padding: 0;
  list-style: none;
`;
const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const Wrapper = styled.div `
margin-left: 150px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 0px 0px;
  padding: 10px;
`;
const SocialContainer = styled.div`
  display: flex;
  padding: 20px;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Store</Logo>
        <Desc>
          Lorem ipsum dolor sit amet. Et dolorem esse et dignissimos Quis sit
          reiciendis odio ut commodi unde et illum libero vel debitis voluptatib
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405E">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Register</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Wrapper>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon color="white" />
          2324 Villager ave., Apt#12, NC 27834
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon color="white" />
          +2 345 3456
        </ContactItem>
        <ContactItem>
          <EmailIcon color="white" /> mageeeer@gmail.com
        </ContactItem>
        </Wrapper>
      </Right>
    </Container>
  );
};

export default Footer;
