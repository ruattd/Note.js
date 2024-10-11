#!/usr/bin/env node

import {main} from "./notejs/main.js"
import {createRequire} from "module"
import {Command} from "commander"
import chalk from "chalk"

const pkg = createRequire(import.meta.url)("../package.json")
const instance = new Command()

// properties
export const name = pkg.name as string
export const version = pkg.version as string
export const description = pkg.description as string
export const title = `${chalk.cyan.bold("Note.js")} ${version}`

// start main function
main(pkg, instance)