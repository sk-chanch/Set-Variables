import * as core from '@actions/core'
import { Octokit } from '@octokit/core'



const token: string = core.getInput('auth')
const repo: string = core.getInput('repo')
const varName: string = core.getInput('name')
const value: string = core.getInput('value')
const owner: string = core.getInput('owner')

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: token
})


async function run(): Promise<void> {


  let response

  try {


    response = await octokit.request(
      "POST /repos/{owner}/{repo}/actions/variables",
      {
        name: varName,
        owner: owner,
        repo: repo,
        value: value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    )



    // Access the desired information from the response object

    core.info(`Status: ${response.status}`)
    core.info(`Response data: ${JSON.stringify(response.data)}`)

    core.setOutput('result', response.status)

  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
