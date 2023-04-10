"use strict";
const core = require('@actions/core');
const queryString = require('query-string');
const repoName = core.getInput('repo-name');
const orgName = core.getInput('org-name');
const ghToken = core.getInput('org-admin-token');
console.log(`Creating repository ${repoName} in organization ${orgName}`);
(async function main() {
    try {
        const { request } = require("@octokit/request");
        const result = await request(`POST /orgs/${orgName}/repos`, {
            headers: {
                authorization: `token ${ghToken}`,
            },
            org: orgName,
            name: repoName,
            description: 'This is a demo repo created from an action repository',
            homepage: 'https://github.com',
            'private': true,
            has_issues: true,
            has_projects: true,
            has_wiki: true
        });
        console.log(`stringifyed result ${queryString.stringify(result)}`);
        console.log(`stringifyed result ${queryString.stringify(result.data)}`);
        core.setOutput("repo-fullname", result.data.full_name);
        core.setOutput("repo-url", result.data.html_url);
    }
    catch (e) {
        core.setFailed(e.message);
    }
    // You can use await inside this function block
})();
