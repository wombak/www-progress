import React, { useMemo } from "react";
import styled from "styled-components";

import { Icon } from "../../../atoms";
import { colors } from "../../../theme";

import Base from "./Base";

const Wrap = styled(Base)`
  bottom: 0;
  right: 0;
  left: initial;
  top: initial;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 90vw;

  &::before {
    content: "";
    display: block;
    padding-bottom: calc(22%);
  }

  &:hover ${Inner} {
    transform: translateZ(300px);
  }
`;

const Inner = styled.div`
  display: inline-flex;
  flex-direction: column;
  transform: translateZ(100px);
  transition: transform 0.2s ease;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  &:not(:last-of-type) {
    margin-bottom: 18px;
  }
`;

const RowIcon = styled(Icon)`
  width: 28px;
  margin-right: 16px;
  color: ${colors.light};
  filter: drop-shadow(0 0 8px rgba(35, 35, 35, 0.2));
`;

const Value = styled.span`
  font-size: 26px;
  color: ${colors.dark};
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(35, 35, 35, 0.15);
`;

const MetaSquare = ({ commits = 0, stars = 0, watching = 0, ...props }) => {
  const data = useMemo(
    () => [
      {
        value: commits,
        icon: "commit"
      },
      {
        value: stars,
        icon: "star"
      },
      {
        value: watching,
        icon: "eye"
      }
    ],
    [commits, stars, watching]
  );

  return (
    <Wrap {...props}>
      <Inner>
        {data.map(({ value, icon }) => (
          <MetaRow key={icon}>
            <RowIcon name={icon} />
            <Value>{value}</Value>
          </MetaRow>
        ))}
      </Inner>
    </Wrap>
  );
};

export default MetaSquare;
