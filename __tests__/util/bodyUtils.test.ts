import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import { BodyUtils } from '../../src/util/bodyUtils'
import { getToken } from '../helpers/token'

const octokit = github.getOctokit(getToken())
const bodyUtils = new BodyUtils(octokit)

describe('pr-update/bodyUtils', () => {
  beforeAll(async () => {
    process.env['GITHUB_REPOSITORY'] = 'sushie1984/pr-update'
  })

  it ('returns body containing title and link', async () => {
    const body = await bodyUtils.withLinks('test/staging', 'test/main')
    const expectedBody = '\n\r- [Test/staging add feature]' +
      `(${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/4)`
    expect(body).toBe(expectedBody)
  })

  describe('with explict body parameter', () => {
    it ('returns body with appended title and link', async () => {
      const bodyHeader = 'Test staging to main\r\n'
      const body = await bodyUtils.withLinks('test/staging', 'test/main' , bodyHeader)
      const expectedBody = `${bodyHeader}` +
        `\n\r- [Test/staging add feature](${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/4)`
      expect(body).toBe(expectedBody)
    })
  })
})
