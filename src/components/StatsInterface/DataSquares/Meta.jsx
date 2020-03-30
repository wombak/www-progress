import React from "react";
import styled from "styled-components";
import { GitCommit } from "@styled-icons/octicons/GitCommit";
import { Star } from "@styled-icons/octicons/Star";
import { Eye } from "@styled-icons/octicons/Eye";

import { colors } from "../../../theme";

import Base from "./Base";

const Wrap = styled(Base)`
  bottom: 0;
  right: 0;
  left: initial;
  top: initial;
  z-index: 0;
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

const Icon = styled.svg`
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

const MetaSquare = ({ commits = 0, stars = 0, watching = 0, ...props }) => (
  <Wrap {...props}>
    <Inner>
      <MetaRow>
        <Icon as={GitCommit} />
        <Value>{commits}</Value>
      </MetaRow>
      <MetaRow>
        <Icon as={Star} />
        <Value>{stars}</Value>
      </MetaRow>
      <MetaRow>
        <Icon as={Eye} />
        <Value>{watching}</Value>
      </MetaRow>
    </Inner>
  </Wrap>
);

export default MetaSquare;
