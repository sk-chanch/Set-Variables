import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'



// shows how the runner will run a javascript action with env / stdout protocol
test('test action', () => {
  process.env['INPUT_MILLISECONDS'] = '500'

  

})
