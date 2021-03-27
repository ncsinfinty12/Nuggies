/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const axios = require('axios');

module.exports.run = async (client, message, args, utils) => {
	const m = await message.channel.send('<a:loadingonline:787905402603438100> Trying to get a response from localhost lol');
	axios.post('http://127.0.0.1:5000/premium/pay/confirm', {
		'id': '5O190127TN364715T',
		'status': 'COMPLETED',
		'payer': {
			'name': {
				'given_name': 'John',
				'surname': 'Doe',
			},
			'email_address': 'customer@example.com',
			'payer_id': 'QYR5Z8XDVJNXQ',
		},
		'purchase_units': [
			{
				'reference_id': 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
				'shipping': {
					'address': {
						'address_line_1': '2211 N First Street',
						'address_line_2': 'Building 17',
						'admin_area_2': 'San Jose',
						'admin_area_1': 'CA',
						'postal_code': '95131',
						'country_code': 'US',
					},
				},
				'payments': {
					'captures': [
						{
							'id': '3C679366HH908993F',
							'status': 'COMPLETED',
							'amount': {
								'currency_code': 'USD',
								'value': '100.00',
							},
							'seller_protection': {
								'status': 'ELIGIBLE',
								'dispute_categories': [
									'ITEM_NOT_RECEIVED',
									'UNAUTHORIZED_TRANSACTION',
								],
							},
							'final_capture': true,
							'disbursement_mode': 'INSTANT',
							'seller_receivable_breakdown': {
								'gross_amount': {
									'currency_code': 'USD',
									'value': '100.00',
								},
								'paypal_fee': {
									'currency_code': 'USD',
									'value': '3.00',
								},
								'net_amount': {
									'currency_code': 'USD',
									'value': '97.00',
								},
							},
							'create_time': '2018-04-01T21:20:49Z',
							'update_time': '2018-04-01T21:20:49Z',
							'links': [
								{
									'href': 'https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F',
									'rel': 'self',
									'method': 'GET',
								},
								{
									'href': 'https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F/refund',
									'rel': 'refund',
									'method': 'POST',
								},
							],
						},
					],
				},
			},
		],
		'links': [
			{
				'href': 'https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T',
				'rel': 'self',
				'method': 'GET',
			},
		],
	})
		.then(function(response) {
			message.channel.send(JSON.stringify(response.data, null, 2));
			m.delete({ timeout: 5000 });
		})
		.catch(function(error) {
			console.log(error);
		});
};

module.exports.help = {
	aliases: [],
	name: 'a',
	description: 'its just gay man',
	usage: config.prefix + 'a',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'Onwer',
	disable: false,
	cooldown: 2000,

};