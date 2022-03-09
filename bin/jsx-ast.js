#!/usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const path = require('path')
const parse = require(path.resolve(__dirname, '../index'))
const fs = require('fs')

yargs(hideBin(process.argv))
  .command(
    'parse <path>',
    'Parse a jsx file into an AST.',
    (yargs) => {
      return yargs
        .positional('path', {
          alias: 'p',
          describe: 'The path to the file to be parsed.',
          type: 'string',
        })
        .option('output-path', {
          alias: 'o',
          describe: 'The path to save the ast as a file.',
          type: 'string',
        })
        .option('typescript', {
          alias: 't',
          describe: 'Use the typescript babel plugin.',
          type: 'boolean',
        })
    },
    ({ path, typescript, outputPath }) => {
      const ast = parse(path, { typescript })
      const json = JSON.stringify(ast, null, 2)
      if (outputPath) {
        fs.writeFileSync(outputPath, json)
      } else {
        console.log(json)
      }
    }
  )
  .help().argv
