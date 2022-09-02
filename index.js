const core = require('@actions/core');

const repoName = core.getInput('repo-name');
const orgName = core.getInput('org-name');
const ghToken = core.getInput('org-admin-token');

try {
    const octokit = new Octokit({
        auth: ghToken
    })

    var resp = await octokit.request('POST /orgs/'+orgName+'/repos', {
        org: orgName,
        name: repoName,
        description: 'This is a demo repo created from an action repository',
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true
    })

    core.setOutput("repo-fullname", resp.full_name);
    core.setOutput("repo-url", resp.url);

} catch (error) {
    core.setFailed(error.message);
  }