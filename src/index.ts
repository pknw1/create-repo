const core = require('@actions/core');
const request = require("@octokit/request");
const repoName = core.getInput('repo-name');
const orgName = core.getInput('org-name');
const ghToken = core.getInput('org-admin-token');

const main = async () => 
{
  try {
      var result = await request("GET /orgs/{org}/repos", {
          headers: {
            authorization: `token ${ ghToken }`,
          },
          org: orgName,
          name: repoName,
          description: 'This is a demo repo created from an action repository',
          homepage: 'https://github.com',
          'private': true,
          has_issues: true,
          has_projects: true,
          has_wiki: true
      })

      core.setOutput("repo-fullname", result.full_name);
      core.setOutput("repo-url", result.url);

  } catch (e: any) {
      core.setFailed(e.message);
    }
}
