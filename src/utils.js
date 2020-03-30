const { GITHUB_OAUTH } = process.env;
const MILESTONE = 1;

const repoUrl = "https://github.com/wombak/www";

const urls = {
  REPO: repoUrl,
  ISSUES: `${repoUrl}/issues`,
  KANBAN: `${repoUrl}/projects/${MILESTONE}`,
  WOMBAK: "https://wombak.xyz"
};

const contactDetails = {
  address: "Calle Plateria, 29 2 \nMurcia 30001 \nSpain",
  email: "hello@wombak.xyz"
};

const GIF_COUNT = 160;

module.exports = {
  contactDetails,
  GIF_COUNT,
  GITHUB_OAUTH,
  MILESTONE,
  urls
};
