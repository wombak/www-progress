import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useSpring, useTransform } from "framer-motion";
import useDimensions from "react-use-dimensions";

import { colors } from "../theme";

const labelColor = "#161303";

const innerVariants = {
  hover: {
    scale: 1.25
  },
  click: {
    scale: 1.2
  }
};

const contentsVariants = {
  default: {
    z: 3
  },
  hover: {
    z: 20
  },
  click: {
    z: 10
  }
};

const ButtonWrap = styled(motion.button)`
  display: block;
  border: 0;
  padding: 32px;
  background: transparent;
  outline: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
  appearance: none;
  text-decoration: none;
  backface-visibility: hidden;
`;

const ButtonInner = styled(motion.div)`
  padding: 15px 20px;
  background: ${colors.primary};
  box-shadow: 0 2px 8px 0 rgba(47, 47, 47, 0.8),
    0 0 10px 0 rgba(245, 224, 91, 0.3);
  perspective: 320px;
  transform-style: preserve-3d;
`;

const ButtonContents = styled(motion.span)`
  pointer-events: none;
  display: flex;
  align-items: center;
  backface-visibility: hidden;
`;

const IconWrap = styled.span`
  display: block;
  width: 20px;
  margin-right: 14px;
  color: ${labelColor};
  filter: drop-shadow(0 0 8px rgba(57, 50, 9, 0.35));
`;

const Label = styled.span`
  display: block;
  font-weight: bold;
  font-size: 16px;
  color: ${labelColor};
  text-align: center;
  text-shadow: 0 0 8px rgba(57, 50, 9, 0.35);

  &::selection {
    color: ${colors.light};
    background: ${colors.dark};
  }
`;

const springOptions = {
  damping: 12,
  stiffness: 140,
  mass: 1
};

const Button = ({ children, Icon, ...props }) => {
  const [buttonRef, { width, height, x, y }] = useDimensions();
  const cursorX = useSpring(0, springOptions);
  const cursorY = useSpring(0, springOptions);
  const [isHovering, setIsHovering] = useState(false);

  const buttonRotateX = useTransform(
    cursorY,
    [0, height],
    [isHovering ? -12 : 0, 12]
  );
  const buttonRotateY = useTransform(
    cursorX,
    [0, width],
    [isHovering ? 16 : 0, -16]
  );

  return (
    <ButtonWrap
      ref={buttonRef}
      initial="default"
      whileHover="hover"
      whileTap="click"
      onMouseMove={e => {
        cursorX.set(e.clientX - x);
        cursorY.set(e.clientY - y);
      }}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        cursorX.set(0);
        cursorY.set(0);
      }}
      {...props}
    >
      <ButtonInner
        variants={innerVariants}
        style={{
          rotateX: buttonRotateX,
          rotateY: buttonRotateY
        }}
      >
        <ButtonContents variants={contentsVariants}>
          {Icon && (
            <IconWrap>
              <Icon />
            </IconWrap>
          )}
          <Label>{children}</Label>
        </ButtonContents>
      </ButtonInner>
    </ButtonWrap>
  );
};

export default Button;
