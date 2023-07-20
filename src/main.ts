import * as core from '@actions/core'
import { Octokit } from 'octokit'



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
  try {

    
    const response = await octokit.rest.actions.createRepoVariable({
      name: varName,
      owner: owner,
      repo: repo,
      value: value
    })

  
   
    // Access the desired information from the response object
  
    core.info(`Status: ${response.status}`)
    core.info(`Response data: ${JSON.stringify(response.data)}`)

    core.setOutput('result', response.status)

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
