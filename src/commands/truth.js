/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const truth = [
		'When was the last time you lied?',
		'When was the last time you cried?',
		'What\'s your biggest fear?',
		'What\'s your biggest fantasy?',
		'Do you have any fetishes?',
		'What\'s something you\'re glad your mum doesn\'t know about you?',
		'Have you ever cheated on someone?',
		'What\'s the worst thing you\'ve ever done?',
		'What\'s a secret you\'ve never told anyone?',
		'Do you have a hidden talent?',
		'Who was your first celebrity crush?',
		'What are your thoughts on polyamory?',
		'What\'s the worst intimate experience you\'ve ever had?',
		'Have you ever cheated in an exam?',
		'What\'s the most drunk you\'ve ever been?',
		'Have you ever broken the law?',
		'What\'s the most embarrassing thing you\'ve ever done?',
		'What\'s your biggest insecurity?',
		'Have you ever stayed friends with someone because it benefitted you beyond just the friendship?',
		'What\'s the biggest mistake you\'ve ever made?',
		'What\'s the most disgusting thing you\'ve ever done?',
		'Who would you like to kiss in this room?',
		'What\'s the worst thing anyone\'s ever done to you?',
		'Have you ever had a run in with the law?',
		'What\'s your worst habit?',
		'What\'s the worst thing you\'ve ever said to anyone?',
		'Have you ever peed in the shower?',
		'What\'s the strangest dream you\'ve had?',
		'Have you ever been caught doing something you shouldn\'t have?',
		'What\'s the worst date you\'ve been on?',
		'What\'s your biggest regret?',
		'What\'s the biggest misconception about you?',
		'Have you ever said something you regret about someone in this room?',
		'What\'s one thing you wish people knew about you?',
		'Why did your last relationship break down?',
		'What\'s the most trouble you\'ve been in?',
		'What\'s the worst thing you\'ve ever lied about?',
		'What\'s the best piece of advice you\'ve ever been given?',
		'What\'s your guilty pleasure?',
		'What\'s one thing you only do when you\'re alone?',
		'If you had to get back with an ex, who would you choose?',
		'If you had to cut one friend out of your life, who would it be?',
		'Do you have a favourite friend?',
		'Who is your best friend?',
		'Which is your favourite food?',
		'What are your top three turn-ons?',
		'What is your deepest darkest fear?',
		'Who is your crush?',
		'What was the last thing you searched for on your phone?',
		'If you had to choose between going naked or having your thoughts appear in thought bubbles above your head for everyone to read, which would you choose?',
		'Have you ever walked in on your parents doing it?',
		'After you\'ve dropped a piece of food, what\'s the longest time you\'ve left it on the ground and then ate it?',
		'Have you ever tasted a booger?',
		'What\'s the first thing you would do if you woke up one day as the opposite sex?',
		'Have you ever peed in the pool?',
		'Have you ever farted in an elevator?',
		'Of the people in this room, who do you want to trade lives with?',
		'What are some things you think about when sitting on the toilet?',
		'Did you have an imaginary friend growing up?',
		'Do you cover your eyes during a scary part in a movie?',
		'Have you ever practiced kissing in a mirror?',
		'Did your parents ever give you the “birds and the bees” talk?',
		'What is your worst habit?',
		'Have you ever had a wardrobe malfunction?',
		'What is your biggest fear in a relationship?',
		'What was your funniest first date ever?',
		'What is your biggest turn off in a partner?',
		'What is your weirdest habit?',
		'How many kids would you like to have?',
		'What is the perfect first day?',
		'What is one embarrassing fact I should know about you?',
		'What was your childhood nickname?',
		'What is your favourite movie?',
		'Describe your worst date ever?',
		'If there was no such thing as money, what would you do with your life?',
		'What is your favourite food?',
		'What are your three favourite colours, and why?',
		'What is your dream job?',
		'If you were trapped on an island for 3 days, what would you take with you?',
		'Who is your favourite person and why?',
		'Do you prefer apple or android?',
		'How do you put your toilet paper on the roll?',
		'What is your best talent?',
		'Do you believe in love at first sight?',
		'Do you believe in love at all?',
		'What is your dream wedding?',
		'Would you ever consider being a nudist?',
		'How do you feel about end pieces of a loaf of bread?',
		'Can you touch your tongue to your nose?',
		'If you could take away one bad thing in the world, what would it be?',
		'What is the most exotic food that you have ever eaten?',
		'What country would like to live in if you had the chance?',
		'If you could change one thing on your body, what would it be?',
		'What do you daydream about the most?',
		'Describe the weirdest dream you\'ve ever had?',
		'Is the dress Black and Blue or Gold and White?',
		'How do you feel about social media?',
		'What is your favourite season of the year?',
		'Could you go a week without junk food?',
		'How was your first kiss?',
		'Describe your worst kiss ever?',
		'Do you like to exercise?',
		'Have you ever blacked out from drinking too much?',
		'Did you smoke or drink before college? Or did you start when you got here?',
		'What is the craziest thing that you have ever done while drunk?',
		'What is the funniest dream that you have ever had?',
		'Who is your best looking teacher that you have ever had?',
		'Have you ever cheated on any test?',
		'Who is your crush at school?',
		'Who is the most annoying person you know?',
		'Have you ever pulled a prank on your teacher?',
		'Have you ever lied to your parents about what you were doing after school?',
		'Have you ever blamed something that you have done on one of your siblings?',
		'What college do you plan on going to?',
		'Are you still a virgin?',
		'How many boyfriends (or girlfriends) have you had?',
		'Have you ever been kissed yet? If so, who was your best kiss?',
		'What is your biggest pet peeve?',
		'What is the best vacation you\'ve ever been on?',
		'Have you ever told one of your best friend\'s secrets, even if you said you wouldn\'t?',
		'Have you ever had a crush on someone that your best friend has dated?',
		'What is the most annoying thing that one of your siblings has done?',
		'Do you have a job? If so, what is your favourite thing about it?',
		'If you were a billionaire, what would you spend your time doing?',
		'What is the longest time you have ever been grounded?',
		'What is the longest time that you think you could go without your cell phone?',
		'What is the most expensive thing you own?',
		'If you had the choice to live on your own right now, would you do it?',
		'Can you see yourself being married to the creepiest kid a your school someday?',
		'Would you ever get on a dating website?',
		'Have you ever watched an adult film without your parents knowing?',
		'If you could own your own business one day, what would it be?',
		'What is your favourite kind of clothing?',
		'What celebrity are you obsessed with?',
		'What is the funniest youtube video you have ever seen?',
		'Who is the worst teacher you have ever had, why?',
		'What is your favourite sports team?',
		'How old were you when you had your first kiss?',
		'How long have you gone without showering?',
		'What color is your underwear?',
		'What is your special talent?',
		'What\'s your ex-girlfriend/boyfriend name?',
		'What is the most embarrassing moment of your life?',
		'What would you do with a million dollars if you ever won the lottery?',
		'If you could change one thing on your body, what would it be?',
		'What is the silliest thing you have an emotional attachment to?',
		'What was your childhood nickname?',
		'What is something you have stolen?',
		'Say 5 bad habits you have?',
		'Tell 5 secrets of yours?',
		'What is the most embarrassing thing your parents have caught you doing?',
		'Have you ever peed in the swimming pool?',
		'If you could marry one teacher in the school, who would you pick and why?',
		'Have you ever lied to your best friend?',
		'What he craziest thing that you have ever done without your parents knowing?',
		'What would you do if your parents left the house to you for a whole week?',
		'What is your favourite song that is out right now?',
		'Could you go two months without talking to your friends?',
	];
	const randomtruth = truth[Math.floor(Math.random() * truth.length)];
	if(!message.mentions.users.first()) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`Truth: ${randomtruth}`)
			.setColor('RANDOM')
			.setAuthor(message.author.username, message.author.avatarURL());
		message.channel.send(embed);
	}
	if(message.mentions.users.first()) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${message.mentions.users.first().username}, ${message.author.username} is asking you a Truth`)
			.setDescription(`Truth: ${randomtruth}`)
			.setColor('RANDOM')
			.setAuthor(message.author.username, message.author.avatarURL());
		message.channel.send(embed);
	}
};


module.exports.help = {
	aliases: [],
	name: 'truth',
	description: 'Some random Truths 😳',
	usage: config.prefix + 'truth',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};