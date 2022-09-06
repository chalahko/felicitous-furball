const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')
const { Calculator } = require('./classes/calculator.js')
const chalk = require('chalk')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// Dynamically load all commands
client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

client.calculator = new Calculator()


// Initialize saved values
try {
	const pattern = JSON.parse(fs.readFileSync('./pattern.json'))
	client.calculator.updatePattern(pattern)
}
catch (e) {
	console.error(chalk.red('FILE READ ERROR'), 'Unable to read pattern.json file!')
}

try {
	const popularity = JSON.parse(fs.readFileSync('./popularity.json'))
	client.calculator.updatePopularity(popularity)
}
catch (e) {
	console.error(chalk.red('FILE READ ERROR'), 'Unable to read popularity.json file!')
}

try {
	const daySequences = JSON.parse(fs.readFileSync('./day-sequences.json'))
	client.calculator.setDaySequences(daySequences)
}
catch (e) {
	console.error(chalk.red('FILE READ ERROR'), 'Unable to read day-sequences.json file!')

	console.log(chalk.greenBright('Generating new one now.'))
	client.calculator.calculateSequences()
}


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	client.commands.set(command.data.name, command)
}

// Dynamically load all modal handlers
client.modals = new Collection()
const modalsPath = path.join(__dirname, 'modals')
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'))

for (const file of modalFiles) {
	const filePath = path.join(modalsPath, file)
	const modal = require(filePath)
	client.modals.set(modal.customId, modal)
}

// Dynamically load all event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token)