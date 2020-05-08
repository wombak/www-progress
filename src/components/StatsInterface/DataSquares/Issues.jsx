import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../../atoms";
import { colors } from "../../../theme";
import { urls } from "../../../utils";

import Base from "./Base";

const Wrap = styled(Base)`
  padding: 0;
  perspective: 90vw;
  z-index: 4;
`;

const Header = styled.header`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Title = styled.h4`
  font-weight: bold;
  font-size: 12px;
  color: ${colors.dark};
  padding: 12px 10px 0;
  margin-right: auto;
`;

const ViewAllLink = styled(motion.a)`
  display: block;
  padding: 12px 10px 10px;
  font-size: 10px;
  color: ${colors.dark};
  text-decoration: underline;
`;

const IssueRows = styled.div`
  width: 136%;
  transform: translateX(20px);
`;

const IssueRow = styled(motion.a).attrs(() => ({
  initial: { z: 5 },
  whileHover: { z: 60, scale: 1.15 },
  whileTap: { scale: 1.1 },
  transition: { type: "spring" }
}))`
  display: flex;
  align-items: center;
  background: ${colors.light};
  padding: 10px 5px 10px 10px;
  box-shadow: 0 2px 8px 0 rgba(11, 11, 11, 0.15);
  color: ${colors.dark};
  text-decoration: none;
  user-select: none;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const RowIcon = styled(Icon).attrs(({ isOpen }) => ({
  name: isOpen ? "issueOpened" : "issueClosed"
}))`
  width: 18px;
  color: ${({ isOpen }) => colors[isOpen ? "success" : "error"]};
  margin-right: 8px;
`;

const RowText = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const RowTitle = styled.strong`
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 12px;
  overflow: inherit;
  text-overflow: ellipsis;
`;

const RowSubtitle = styled.span`
  display: block;
  font-size: 9px;
  color: ${colors.dark};
  overflow: inherit;
  text-overflow: ellipsis;
`;

const now = new Date();

const IssuesSquare = ({ issues = [], ...props }) => (
  <Wrap {...props}>
    <Header>
      <Title>Recent issues</Title>
      <ViewAllLink
        href={urls.ISSUES}
        target="_blank"
        rel="noopener"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.025 }}
      >
        View all
      </ViewAllLink>
    </Header>

    <IssueRows>
      {issues.map((issue, index) => {
        const isOpen = issue.state === "open";

        const issueDate = new Date(issue.created_at);
        const secondsDifference = now.getTime() - issueDate.getTime();
        const daysDifference = Math.round(
          secondsDifference / (1000 * 3600 * 24)
        );

        const dayLabel = `day${daysDifference > 1 ? "s" : ""}`;

        return (
          <IssueRow
            key={index}
            href={issue.html_url}
            target="_blank"
            rel="noopener"
          >
            <RowIcon isOpen={isOpen}></RowIcon>
            <RowText>
              <RowTitle>{issue.title}</RowTitle>
              <RowSubtitle>
                #{issue.number} opened {daysDifference} {dayLabel} ago by{" "}
                {issue.user.login}
              </RowSubtitle>
            </RowText>
          </IssueRow>
        );
      })}
    </IssueRows>
  </Wrap>
);

export default IssuesSquare;
