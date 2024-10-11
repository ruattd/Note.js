import {Command} from "commander"
import chalk from "chalk"
import figlet from "figlet"
import * as commands from "./commands.js"
import * as index from "../index.js"

export function main(pkg: any, instance: Command) {
    // initialize commander instance
    instance
        .name(chalk.cyan.bold("notejs"))
        .version(index.version)
        .usage(chalk.gray("[options]") + " command")
        .addHelpText("after", "\nGitHub repository: https://github.com/ruattd/Note.js\nMore information: https://notejs.nijika.in")

    // options
    instance
        .option("-c, --cli", "run as a CLI program with no keyboard interaction", false)
        .option("-i, --silent", "only necessary output", false)
        .option("-d, --dir, --directory", "specify work directory, default to current directory", ".")

    // default action
    instance.action(() => {
        if (instance.args.length > 0) {
            console.error(`error: unknown command '${instance.args[0]}'`);
            return
        }
        // print hello & help
        if (!instance.opts().silent) {
            console.log(`${index.description}\n\n${chalk.cyan(figlet.textSync("Note.js", { horizontalLayout: "full", font: "Pagga" }))}\n`);
            instance.outputHelp()
        }
    })

    // pre-action: information text
    instance.hook("preAction", (_, actionCommand) => {
        const opts = instance.opts()
        if (opts.silent) console.log(`NOTE-JS ${index.version.replaceAll(".", "_")} SILENT MODE`)
        else console.log(index.title + ((opts.cli)? " (CLI mode)" : "") + ((actionCommand.name() !== instance.name())? ` :: ${chalk.greenBright(actionCommand.name())}` : ""))
    })

    // command: help
    instance.command("help").alias("h")
        .description("display help for command, same as '--help'")
        .action(() => instance.outputHelp())

    // command: version
    instance.command("version")
        .description("output the version number, same as '--version'")
        .action(() => console.log(index.version))

    // command: build
    instance.command("build").alias("b")
        .description("build the website")
        .action(commands.build)

    // command: generate
    instance.command("generate").alias("g").alias("gen")
        .description("alias to 'build' for Hexo users")
        .action(args => {
            console.warn("This is NOT Hexo, please use 'build' instead")
            commands.build(args)
        })

    // command: clean
    instance.command("clean").alias("c")
        .description("delete temporary files & directories")
        .action(commands.clean)

    // command: server
    instance.command("server").alias("s").alias("srv")
        .description("start a debug server")
        .action(commands.server)

    // parse & execute
    instance.parse()
}
