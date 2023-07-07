import * as core from '@actions/core'
import {Octokit, App} from 'octokit'

async function run(): Promise<void> {
  try {

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

    const response = await octokit.request(
      `POST repos/${owner}/${repo}/actions/variables/${varName}`,
      {
        owner: owner,
        repo: repo,
        name: varName,
        value: value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    )

   
    // Access the desired information from the response object
    const {status, data} = response
    core.info(`Status: ${status}`)
    core.info(`Response data: ${JSON.stringify(data)}`)

    core.setOutput('result', status == 204)
    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
