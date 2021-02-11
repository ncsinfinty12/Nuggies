/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const dare = [
		'Show the most embarrassing photo on your phone',
		'Show the last five people you texted and what the messages said',
		'Let the rest of the group DM someone from your Instagram account',
		'Eat a raw piece of garlic',
		'Do 100 squats',
		'Show us your screen time report',
		'Keep three ice cubes in your mouth until they melt',
		'Say something dirty to the person on your left',
		'Give a foot massage to the person on your right',
		'Put 10 different available liquids into a cup and drink it',
		'Yell out the first word that comes to your mind',
		'Give a lap dance to someone of your choice',
		'Remove four items of clothing',
		'Like the first 15 posts on your Facebook newsfeed',
		'Eat a spoonful of mustard',
		'Keep your eyes closed until it\'s your go again',
		'Seductively eat a banana',
		'Empty out your wallet/purse and show everyone what\'s inside',
		'Pretend to be the person to your right for 10 minutes',
		'Eat a snack without using your hands',
		'Say two honest things about everyone else in the group',
		'Try and make the group laugh as quickly as possible',
		'Try to put your whole fist in your mouth',
		'Tell everyone an embarrassing story about yourself',
		'Try to lick your elbow',
		'Post the oldest selfie on your phone on Instagram Stories',
		'Tell the saddest story you know',
		'Howl like a wolf for two minutes',
		'Dance without music for two minutes',
		'Pole dance with an imaginary pole',
		'Let someone else tickle you and try not to laugh',
		'Put as many snacks into your mouth at once as you can',
		'Scroll through your phone book until someone says stop. You either have to call or delete that person',
		'Down your drink (responsibly)',
		'Try and make yourself cry in front of the group',
		'Tell the group two truths and a lie, and they have to guess which one the lie is',
		'Show off your secret talent',
		'Reply to the first five Instagram Stories on your timeline',
		'Share the first celebrity on your timeline\'s Instagram to your Story',
		'Put on as many layers as possible in 60 seconds',
		'Fill your mouth with drink and gargle your answer to the next Truth',
		'Smile as widely as you can and hold it for two minutes',
		'Tell me about your first kiss.',
		'Do an impression of your favorite celebrity',
		'Close your eyes and send a blind text to a random person',
		'Go grab a broom and do your best tango',
		'Give a 3 minute stand-up comedy routine',
		'Break dance',
		'Make up a story about the item to your right',
		'Sing the alphabet without moving your mouth',
		'Do your best president impression',
		'Yell out the first word that comes to your mind right now',
		'Call the pizza place and order 300 sardine pizzas',
		'Pound on your chest and act like a gorilla for the next minute',
		'Sing everything you say for the next 10 minutes',
		'Give a foot massage',
		'Say the alphabet backwards in 15 seconds',
		'Go to the neighbour\'s house and ask for a banana',
		'Go up to someone random and ask for a hug',
		'Set your cell phone language to Chinese for the next 10 minutes',
		'Act like your favourite Disney character for the rest of the game',
		'Sing \'Twinkle Twinkle, Little Star\' while beat boxing',
		'Give a concert with your air guitar',
		'Make a poem using the words orange and moose',
		'Unbuckle your own belt using your elbows',
		'Brush someone else\'s teeth',
		'Belly dance to a country song',
		'Make up a country song of the top of your head',
		'Get on all fours and act like a dog until your next turn',
		'Make up a short rap about another player',
		'Act like Romeo from \'Romeo and Juliet\' (pick who you want to be Juliet)',
		'Do an impression of someone until another player can guess who you are',
		'Say \'ya heard meh\' after everything you say for the next 5 minutes',
		'Act like you do not understand your own language until your next turn (come up with your own language)',
		'Use the letters of the name of another player to describe them',
		'Only use sign language for the next round',
		'Do pushups until it\'s your turn again',
		'Wear a finger moustache for the next 5 minutes',
		'Only use your elbows and knees to go make a sandwich',
		'Write a Facebook (or other social media) post only using your toes',
		'Take a selfie with the toilet and post it online',
		'Paint your toenails only using your teeth',
		'Brush your spouse\'s teeth',
		'Prank call someone you know.',
		'Ask the neighbors to borrow a cup of sugar.',
		'Post a YouTube video of you singing a currently popular song.',
		'Go outside and shout at the top of your lungs,"I am [your name]! Hear me roar!"',
		'Moonwalk while a friend takes a video.',
		'Paint each toenail and fingernail a different color and keep the polish on for a week.',
		'In your next class, raise your hand each time the teacher asks a question and give the answer (if you can!!)',
		'Do the silliest dance that you can think of',
		'Call someone random, and talk freaky to them',
		'Email one of your professors and tell them you love them',
		'Lick the wall',
		'Exchange shirts with the person next to you',
		'Try licking your elbow.',
		'Give a flying kiss to a girl',
		'Crack an egg on your head.',
		'Call your parents and tell them you\'re dropping out',
		'Record yourself doing the silliest dance you can do, and post it to Facebook',
		'Ask your crush out on a date',
		'Put the socks of the person to your right in your mouth',
		'Take a selfie with your finger up your nose and post it to all your social media',
		'Lick a car tire.',
	];
	const randomtruth = dare[Math.floor(Math.random() * dare.length)];
	if(!message.mentions.users.first()) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`Truth: ${randomtruth}`)
			.setColor('RANDOM')
			.setAuthor(message.author.username, message.author.avatarURL());
		message.channel.send(embed);
	}
	if(message.mentions.users.first()) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${message.mentions.users.first().username}, ${message.author.username} is asking you a Dare`)
			.setDescription(`Truth: ${randomtruth}`)
			.setColor('RANDOM')
			.setAuthor(message.author.username, message.author.avatarURL());
		message.channel.send(embed);
	}
};


module.exports.help = {
	aliases: [],
	name: 'dare',
	description: 'Some random Dares 😳',
	usage: config.prefix + 'dare',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Fun',
	disable: false,
	cooldown: 1000,

};