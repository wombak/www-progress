import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import useDimensions from "react-use-dimensions";

import { Container } from "../../atoms";
import { AppContext } from "../../context";
import { colors } from "../../theme";

import ScrollIcon from "./ScrollIcon";
import { Title, Subtitle, CoolLabel } from "./text";

const IntroWrap = styled(Container)`
  height: 100vh;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Intro = () => {
  const { ui } = useContext(AppContext);
  const [ref, { height = 0 }] = useDimensions();
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [0, height * 0.5], [0, height * 0.2]);
  const opacity = useTransform(scrollY, [height * 0.15, height * 0.5], [1, 0]);

  const pointerEvents = useMemo(
    () => (scrollY.current <= height * 0.4 ? "initial" : "none"),
    [height, scrollY.current]
  );

  const onScrollIconClick = useCallback(
    () =>
      window.scroll({
        top: height,
        behavior: "smooth"
      }),
    [height]
  );

  const onCoolMouseEvent = useCallback(show => ui.setShowGifs(show), [
    ui.setShowGifs
  ]);

  return (
    <IntroWrap ref={ref} as={motion.div} style={{ opacity, pointerEvents }}>
      <Title>
        <strong>
          wombak<span style={{ color: colors.primary }}>.</span>xyz
        </strong>
        <br /> <span style={{ fontSize: 46 }}>Progress Tracker</span>
      </Title>

      <Subtitle>
        We're buidling something{" "}
        <CoolLabel
          onMouseOver={() => onCoolMouseEvent(true)}
          onMouseLeave={() => onCoolMouseEvent(false)}
        >
          cool
        </CoolLabel>{" "}
        and want you to come along for the ride!
      </Subtitle>

      <ScrollIcon onClick={onScrollIconClick} />
    </IntroWrap>
  );
};

export default Intro;
