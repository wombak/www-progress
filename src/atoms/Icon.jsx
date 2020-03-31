import React from "react";
import styled from "styled-components";

import { Browser } from "@styled-icons/octicons/Browser";
import { Eye } from "@styled-icons/octicons/Eye";
import { GitCommit } from "@styled-icons/octicons/GitCommit";
import { IssueClosed } from "@styled-icons/octicons/IssueClosed";
import { IssueOpened } from "@styled-icons/octicons/IssueOpened";
import { Mouse } from "@styled-icons/material/Mouse";
import { MarkGithub } from "@styled-icons/octicons/MarkGithub";
import { Project } from "@styled-icons/octicons/Project";
import { Spinner3 } from "@styled-icons/evil/Spinner3";
import { Star } from "@styled-icons/octicons/Star";

const icons = {
  browser: Browser,
  eye: Eye,
  commit: GitCommit,
  githubLogo: MarkGithub,
  issueClosed: IssueClosed,
  issueOpened: IssueOpened,
  mouse: Mouse,
  project: Project,
  spinner: Spinner3,
  star: Star
};

const Svg = styled.svg``;

const Icon = ({ name, ...props }) => {
  const icon = icons[name];

  if (icon) {
    return <Svg {...props} as={icon}></Svg>;
  }

  return null;
};

export default Icon;
