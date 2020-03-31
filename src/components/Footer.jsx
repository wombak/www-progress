import React, { useEffect } from "react";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";
import { motion, useTransform, useViewportScroll } from "framer-motion";

import { WombakLogo } from "../atoms";
import { contactDetails } from "../utils";
import { colors } from "../theme";

const FooterWrap = styled.footer`
  background: ${colors.primary};
  margin-top: 100px;
  padding: 0 20px;
  position: relative;
`;

const FooterLogo = styled(WombakLogo).attrs(() => ({ background: "primary" }))`
  display: block;
  width: 450px;
  max-width: 80%;
  margin: 0 auto 110px;
  z-index: 1;
  position: relative;
  pointer-events: none;
`;

const FooterText = styled(motion.div)`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const ContactDetails = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmailLink = styled(motion.a).attrs(({ children }) => ({
  href: `mailto:${children}`
}))`
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
  color: ${colors.dark};
  margin-bottom: 24px;
`;

const Address = styled.p`
  font-size: 10px;
  line-height: 1.5;
  color: ${colors.dark};
  white-space: pre-wrap;
`;

const Copyright = styled.p`
  color: ${colors.dark};
  margin-top: 60px;
  text-align: center;
  font-size: 10px;
`;

const Footer = () => {
  const [bodyRef, { height: bodyHeight = 0 }] = useDimensions();
  const [footerRef, { height: footerHeight = 0 }] = useDimensions();
  const [textRef, { height: textHeight = 0 }] = useDimensions();
  const { scrollY } = useViewportScroll();
  const windowHeight = window.innerHeight;

  const anchorPoint = footerHeight > windowHeight ? footerHeight : windowHeight;

  const opacity = useTransform(
    scrollY,
    [bodyHeight - anchorPoint * 1.5, bodyHeight - anchorPoint],
    [0, 1]
  );

  const textStyles = {
    visibility:
      scrollY.get() <= bodyHeight - anchorPoint * 1.5 ? "hidden" : "visible",
    opacity
  };

  useEffect(() => {
    bodyRef(document.body);
  });

  return (
    <FooterWrap ref={footerRef} style={{ paddingBottom: textHeight }}>
      <FooterLogo />

      <FooterText ref={textRef} style={textStyles}>
        <ContactDetails>
          <EmailLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring" }}
          >
            {contactDetails.email}
          </EmailLink>
          <Address>{contactDetails.address}</Address>
        </ContactDetails>

        <Copyright>Copyright © 2020 Wombak</Copyright>
      </FooterText>
    </FooterWrap>
  );
};

export default Footer;
