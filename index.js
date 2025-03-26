


// // // // // const TelegramBot = require('node-telegram-bot-api');
// // // // // const translations = require('./It_cactus/translation.js');
// // // // // require('dotenv').config();

// // // // // const token = process.env.TELEGRAM_BOT_TOKEN;
// // // // // const bot = new TelegramBot(token, { polling: true });


// // // // // let userLanguages = {};
// // // // // let userPhoneNumbers = {};
// // // // // let userNames = {};
// // // // // let userRequests = {};
// // // // // let userServices = {};

// // // // // const languageKeyboard = {
// // // // //     reply_markup: {
// // // // //         keyboard: [['O\'zbekcha', 'Русский', 'English']],
// // // // //         resize_keyboard: true,
// // // // //         one_time_keyboard: false,
// // // // //     },
// // // // // };

// // // // // // Start command handler
// // // // // bot.onText(/\/start/, (msg) => {
// // // // //     const chatId = msg.chat.id;
// // // // //     bot.sendMessage(chatId, translations['uz'].startMessage, languageKeyboard);
// // // // // });

// // // // // // Main message handler
// // // // // bot.on('message', (msg) => {
// // // // //     const chatId = msg.chat.id;
// // // // //     const text = msg.text;

// // // // //     // Handle language selection
// // // // //     if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
// // // // //         const langMap = {
// // // // //             'O\'zbekcha': 'uz',
// // // // //             'Русский': 'ru',
// // // // //             'English': 'en'
// // // // //         };
// // // // //         userLanguages[chatId] = langMap[text];
// // // // //         sendMainMenu(chatId, userLanguages[chatId]);
// // // // //     }
// // // // //     else if (userPhoneNumbers[chatId] === true) {
// // // // //         handleUserPhoneInput(chatId, text, userLanguages[chatId]);
// // // // //     } 
// // // // //     else if (userNames[chatId] === true) {
// // // // //         handleUserNameInput(chatId, text, userLanguages[chatId]);
// // // // //     } 
// // // // //     else if (userServices[chatId] === true) {
// // // // //         handleServiceSelection(chatId, text, userLanguages[chatId]);
// // // // //     }
// // // // //     else if (userLanguages[chatId]) {
// // // // //         handleMainMenuSelection(text, chatId, userLanguages[chatId]);
// // // // //     }
// // // // // });

// // // // // // Main menu keyboard
// // // // // function sendMainMenu(chatId, language) {
// // // // //     const mainMenuKeyboard = {
// // // // //         reply_markup: {
// // // // //             keyboard: [
// // // // //                 [{ text: translations[language].submitRequest }],
// // // // //                 [
// // // // //                     { text: translations[language].myRequests },
// // // // //                     { text: translations[language].chooseLanguage }
// // // // //                 ],
// // // // //                 [
// // // // //                     { text: translations[language].contact },
// // // // //                     { text: translations[language].officeAddress }
// // // // //                 ]
// // // // //             ],
// // // // //             resize_keyboard: true,
// // // // //             one_time_keyboard: false,
// // // // //         },
// // // // //     };

// // // // //     const mainMenuText = `${translations[language].mainMenuText}\n${translations[language].mainMenuDescription}`;
// // // // //     bot.sendMessage(chatId, mainMenuText, mainMenuKeyboard);
// // // // // }

// // // // // // Menu actions handler
// // // // // const menuActions = {
// // // // //     'uz': {
// // // // //         [translations['uz'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'uz'),
// // // // //         [translations['uz'].myRequests]: (chatId) => sendUserRequests(chatId, 'uz'),
// // // // //         [translations['uz'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'uz'),
// // // // //         [translations['uz'].contact]: (chatId) => bot.sendMessage(chatId, translations['uz'].contactInfo),
// // // // //         [translations['uz'].officeAddress]: (chatId) => sendLocation(chatId, 'uz'),
// // // // //     },
// // // // //     'ru': {
// // // // //         [translations['ru'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'ru'),
// // // // //         [translations['ru'].myRequests]: (chatId) => sendUserRequests(chatId, 'ru'),
// // // // //         [translations['ru'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'ru'),
// // // // //         [translations['ru'].contact]: (chatId) => bot.sendMessage(chatId, translations['ru'].contactInfo),
// // // // //         [translations['ru'].officeAddress]: (chatId) => sendLocation(chatId, 'ru'),
// // // // //     },
// // // // //     'en': {
// // // // //         [translations['en'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'en'),
// // // // //         [translations['en'].myRequests]: (chatId) => sendUserRequests(chatId, 'en'),
// // // // //         [translations['en'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'en'),
// // // // //         [translations['en'].contact]: (chatId) => bot.sendMessage(chatId, translations['en'].contactInfo),
// // // // //         [translations['en'].officeAddress]: (chatId) => sendLocation(chatId, 'en'),
// // // // //     }
// // // // // };

// // // // // function handleMainMenuSelection(selection, chatId, language) {
// // // // //     const action = menuActions[language][selection];
// // // // //     if (action) {
// // // // //         action(chatId);
// // // // //     } else {
// // // // //         bot.sendMessage(chatId, translations[language].mainMenuText); // Agar tanlov topilmasa, asosiy menyuni ko'rsatamiz
// // // // //     }
// // // // // }

// // // // // // Phone number handler
// // // // // function handleUserPhoneInput(chatId, text, language) {
// // // // //     const phoneRegex = /^(?:\+998|998)?\d{9}$/;
// // // // //     if (phoneRegex.test(text)) {
// // // // //         userPhoneNumbers[chatId] = text;
// // // // //         bot.sendMessage(chatId, translations[language].nameRequest);
// // // // //         userNames[chatId] = true;
// // // // //     } else {
// // // // //         bot.sendMessage(chatId, translations[language].requestInstructions);
// // // // //     }
// // // // // }



// // // // // // Service selection handler
// // // // // function handleServiceSelection(chatId, text, language) {
// // // // //     if (translations[language].services.includes(text)) {
// // // // //         userServices[chatId] = text;
// // // // //         bot.sendMessage(chatId, translations[language].requestInstructions);
// // // // //         userPhoneNumbers[chatId] = true;
// // // // //     } else {
// // // // //         const serviceKeyboard = {
// // // // //             reply_markup: {
// // // // //                 keyboard: [translations[language].services],
// // // // //                 resize_keyboard: true,
// // // // //                 one_time_keyboard: true
// // // // //             }
// // // // //         };
// // // // //         bot.sendMessage(chatId, translations[language].chooseService, serviceKeyboard);
// // // // //     }
// // // // // }

// // // // // // Show user requests
// // // // // function sendUserRequests(chatId, language) {
// // // // //     const requests = userRequests[chatId];
// // // // //     if (!requests || requests.length === 0) {
// // // // //         bot.sendMessage(chatId, translations[language].noRequests);
// // // // //     } else {
// // // // //         let message = translations[language].myRequestsHeader + '\n\n';
// // // // //         requests.forEach((request) => {
// // // // //             message += `${translations[language].name}: ${request.name}\n`;
// // // // //             message += `${translations[language].phone}: ${request.phone}\n`;
// // // // //             message += `${translations[language].status}: ${request.status}\n\n`;
// // // // //         });
// // // // //         bot.sendMessage(chatId, message);
// // // // //     }
// // // // // }
// // // // // function handleUserNameInput(chatId, text, language) {
// // // // //     userNames[chatId] = text;

// // // // //     const locationKeyboard = {
// // // // //         reply_markup: {
// // // // //             keyboard: [[{
// // // // //                 text: translations[language].submitButton,
// // // // //                 request_location: true
// // // // //             }]],
// // // // //             resize_keyboard: true,
// // // // //             one_time_keyboard: true,
// // // // //         },
// // // // //     };

// // // // //     bot.sendMessage(chatId, translations[language].locationRequest, locationKeyboard);
// // // // // }

// // // // // // Location handler
// // // // // bot.on('location', (msg) => {
// // // // //     const chatId = msg.chat.id;
// // // // //     const location = msg.location;
// // // // //     const language = userLanguages[chatId] || 'uz';

// // // // //     if (location && userNames[chatId] && userPhoneNumbers[chatId]) {
// // // // //         const requestId = Date.now();
// // // // //         const userName = userNames[chatId];
// // // // //         const userPhone = userPhoneNumbers[chatId];
// // // // //         const userNick = msg.from.username ? `@${msg.from.username}` : 'Noma’lum';
// // // // //         const serviceType = userServices[chatId]; // Xizmat turini olamiz

// // // // //         userRequests[chatId] = userRequests[chatId] || [];
// // // // //         userRequests[chatId].push({
// // // // //             id: requestId,
// // // // //             service: serviceType, // Xizmat turini saqlaymiz
// // // // //             name: userName,
// // // // //             phone: userPhone,
// // // // //             location: { 
// // // // //                 latitude: location.latitude, 
// // // // //                 longitude: location.longitude 
// // // // //             },
// // // // //             status: 'Active'
// // // // //         });

// // // // //         const channelId = '@it_cactus_ariza';
// // // // //         const locationMessage = `${translations[language].newRequestReceived}\n🆔 ID: ${requestId}\n👤 ${userName}\n📞 ${userPhone}\n👤 Telegram: ${userNick}\n📍 [📍 Google Maps](https://www.google.com/maps?q=${location.latitude},${location.longitude})\n🔧 ${translations[language].serviceType}: ${serviceType}`; // Xizmat turini qo'shamiz
// // // // //         bot.sendLocation(channelId, location.latitude, location.longitude)
// // // // //             .then(() => bot.sendMessage(channelId, locationMessage, { parse_mode: 'Markdown' }));

// // // // //         const backKeyboard = {
// // // // //             reply_markup: {
// // // // //                 keyboard: [[translations[language].backToMenu]],
// // // // //                 resize_keyboard: true,
// // // // //                 one_time_keyboard: true,
// // // // //             },
// // // // //         };

// // // // //         bot.sendMessage(chatId, translations[language].requestSubmitted, backKeyboard);

// // // // //         delete userNames[chatId];
// // // // //         delete userPhoneNumbers[chatId];
// // // // //         delete userServices[chatId];
// // // // //     }
// // // // // });


// // // // // // Back to menu handler
// // // // // bot.onText(new RegExp(
// // // // //     `${translations['uz'].backToMenu}|` +
// // // // //     `${translations['ru'].backToMenu}|` +
// // // // //     `${translations['en'].backToMenu}`
// // // // // ), (msg) => {
// // // // //     const chatId = msg.chat.id;
// // // // //     sendMainMenu(chatId, userLanguages[chatId] || 'uz');
// // // // // });

// // // // // // Office location sender
// // // // // function sendLocation(chatId, language) {
// // // // //     const officeLocation = { latitude: 41.308007, longitude: 69.327626 };
// // // // //     bot.sendLocation(chatId, officeLocation.latitude, officeLocation.longitude);
// // // // //     bot.sendMessage(chatId, translations[language].address);
// // // // // }

// // // // // // Language selection
// // // // // function showLanguageKeyboard(chatId, language) {
// // // // //     bot.sendMessage(chatId, translations[language].startMessage, languageKeyboard);
// // // // // }

// // // // // // Submit request handler
// // // // // function handleSubmitRequest(chatId, language) {
// // // // //     const serviceKeyboard = {
// // // // //         reply_markup: {
// // // // //             keyboard: [translations[language].services],
// // // // //             resize_keyboard: true,
// // // // //             one_time_keyboard: true
// // // //         }
// // // // //     };
// // // // //     bot.sendMessage(chatId, translations[language].chooseService, serviceKeyboard);
// // // // //     userServices[chatId] = true;
// // // // // }

// // // // // console.log('Bot started...');


// // // // const TelegramBot = require('node-telegram-bot-api');
// // // // const translations = require('./It_cactus/translation.js');
// // // // require('dotenv').config();

// // // // const token = process.env.TELEGRAM_BOT_TOKEN;
// // // // const bot = new TelegramBot(token, { polling: true });

// // // // let userLanguages = {};
// // // // let userPhoneNumbers = {};
// // // // let userNames = {};
// // // // let userRequests = {};
// // // // let userServices = {};
// // // // let userExpectingLocation = {}; // Yangi qo'shilgan holat

// // // // const languageKeyboard = {
// // // //     reply_markup: {
// // // //         keyboard: [['O\'zbekcha', 'Русский', 'English']],
// // // //         resize_keyboard: true,
// // // //         one_time_keyboard: false,
// // // //     },
// // // // };

// // // // // Start command handler
// // // // bot.onText(/\/start/, (msg) => {
// // // //     const chatId = msg.chat.id;
// // // //     bot.sendMessage(chatId, translations['uz'].startMessage, languageKeyboard);
// // // // });

// // // // // Main message handler
// // // // bot.on('message', (msg) => {
// // // //     const chatId = msg.chat.id;
// // // //     const text = msg.text;
// // // //     const language = userLanguages[chatId] || 'uz';

// // // //     if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
// // // //         const langMap = {
// // // //             'O\'zbekcha': 'uz',
// // // //             'Русский': 'ru',
// // // //             'English': 'en'
// // // //         };
// // // //         userLanguages[chatId] = langMap[text];
// // // //         sendMainMenu(chatId, userLanguages[chatId]);
// // // //     }
// // // //     else if (userPhoneNumbers[chatId] === true) {
// // // //         handleUserPhoneInput(chatId, text, language);
// // // //     } 
// // // //     else if (userNames[chatId] === true) {
// // // //         handleUserNameInput(chatId, text, language);
// // // //     } 
// // // //     else if (userServices[chatId] === true) {
// // // //         handleServiceSelection(chatId, text, language);
// // // //     }
// // // //     else if (userExpectingLocation[chatId]) {
// // // //         bot.sendMessage(chatId, translations[language].sendLocationViaButton);
// // // //         const locationKeyboard = {
// // // //             reply_markup: {
// // // //                 keyboard: [[{
// // // //                     text: translations[language].submitButton,
// // // //                     request_location: true
// // // //                 }]],
// // // //                 resize_keyboard: true,
// // // //                 one_time_keyboard: true,
// // // //             },
// // // //         };
// // // //         bot.sendMessage(chatId, translations[language].locationRequest, locationKeyboard);
// // // //     }
// // // //     else if (userLanguages[chatId]) {
// // // //         handleMainMenuSelection(text, chatId, language);
// // // //     }
// // // // });

// // // // // Main menu keyboard
// // // // function sendMainMenu(chatId, language) {
// // // //     const mainMenuKeyboard = {
// // // //         reply_markup: {
// // // //             keyboard: [
// // // //                 [{ text: translations[language].submitRequest }],
// // // //                 [
// // // //                     { text: translations[language].myRequests },
// // // //                     { text: translations[language].chooseLanguage }
// // // //                 ],
// // // //                 [
// // // //                     { text: translations[language].contact },
// // // //                     { text: translations[language].officeAddress }
// // // //                 ]
// // // //             ],
// // // //             resize_keyboard: true,
// // // //             one_time_keyboard: false,
// // // //         },
// // // //     };

// // // //     const mainMenuText = `${translations[language].mainMenuText}\n${translations[language].mainMenuDescription}`;
// // // //     bot.sendMessage(chatId, mainMenuText, mainMenuKeyboard);
// // // // }

// // // // // Menu actions handler
// // // // const menuActions = {
// // // //     'uz': {
// // // //         [translations['uz'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'uz'),
// // // //         [translations['uz'].myRequests]: (chatId) => sendUserRequests(chatId, 'uz'),
// // // //         [translations['uz'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'uz'),
// // // //         [translations['uz'].contact]: (chatId) => bot.sendMessage(chatId, translations['uz'].contactInfo),
// // // //         [translations['uz'].officeAddress]: (chatId) => sendLocation(chatId, 'uz'),
// // // //     },
// // // //     'ru': {
// // // //         [translations['ru'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'ru'),
// // // //         [translations['ru'].myRequests]: (chatId) => sendUserRequests(chatId, 'ru'),
// // // //         [translations['ru'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'ru'),
// // // //         [translations['ru'].contact]: (chatId) => bot.sendMessage(chatId, translations['ru'].contactInfo),
// // // //         [translations['ru'].officeAddress]: (chatId) => sendLocation(chatId, 'ru'),
// // // //     },
// // // //     'en': {
// // // //         [translations['en'].submitRequest]: (chatId) => handleSubmitRequest(chatId, 'en'),
// // // //         [translations['en'].myRequests]: (chatId) => sendUserRequests(chatId, 'en'),
// // // //         [translations['en'].chooseLanguage]: (chatId) => showLanguageKeyboard(chatId, 'en'),
// // // //         [translations['en'].contact]: (chatId) => bot.sendMessage(chatId, translations['en'].contactInfo),
// // // //         [translations['en'].officeAddress]: (chatId) => sendLocation(chatId, 'en'),
// // // //     }
// // // // };

// // // // function handleMainMenuSelection(selection, chatId, language) {
// // // //     const action = menuActions[language][selection];
// // // //     if (action) {
// // // //         action(chatId);
// // // //     } else {
// // // //         bot.sendMessage(chatId, translations[language].useButtons);
// // // //     }
// // // // }

// // // // function handleUserPhoneInput(chatId, text, language) {
// // // //     const phoneRegex = /^(?:\+998|998)?\d{9}$/;
// // // //     if (phoneRegex.test(text)) {
// // // //         userPhoneNumbers[chatId] = text;
// // // //         bot.sendMessage(chatId, translations[language].nameRequest);
// // // //         userNames[chatId] = true;
// // // //     } else {
// // // //         bot.sendMessage(chatId, translations[language].requestInstructions);
// // // //     }
// // // // }

// // // // function handleServiceSelection(chatId, text, language) {
// // // //     if (translations[language].services.includes(text)) {
// // // //         userServices[chatId] = text;
// // // //         bot.sendMessage(chatId, translations[language].requestInstructions);
// // // //         userPhoneNumbers[chatId] = true;
// // // //     } else {
// // // //         bot.sendMessage(chatId, translations[language].invalidService);
// // // //         const serviceKeyboard = {
// // // //             reply_markup: {
// // // //                 keyboard: [translations[language].services],
// // // //                 resize_keyboard: true,
// // // //                 one_time_keyboard: true
// // // //             }
// // // //         };
// // // //         bot.sendMessage(chatId, translations[language].chooseService, serviceKeyboard);
// // // //     }
// // // // }

// // // // function sendUserRequests(chatId, language) {
// // // //     const requests = userRequests[chatId];
// // // //     if (!requests || requests.length === 0) {
// // // //         bot.sendMessage(chatId, translations[language].noRequests);
// // // //     } else {
// // // //         let message = translations[language].myRequestsHeader + '\n\n';
// // // //         requests.forEach((request) => {
// // // //             message += `${translations[language].name}: ${request.name}\n`;
// // // //             message += `${translations[language].phone}: ${request.phone}\n`;
// // // //             message += `${translations[language].status}: ${request.status}\n\n`;
// // // //         });
// // // //         bot.sendMessage(chatId, message);
// // // //     }
// // // // }

// // // // // function handleUserNameInput(chatId, text, language) {
// // // // //     userNames[chatId] = text;
// // // // //     userExpectingLocation[chatId] = true;

// // // // //     const locationKeyboard = {
// // // // //         reply_markup: {
// // // // //             keyboard: [[{
// // // // //                 text: translations[language].submitButton,
// // // // //                 request_location: true
// // // // //             }]],
// // // // //             resize_keyboard: true,
// // // // //             one_time_keyboard: true,
// // // // //         },
// // // // //     };

// // // // //     bot.sendMessage(chatId, translations[language].locationRequest, locationKeyboard);
// // // // // }
// // // // // handleUserNameInput funksiyasini yangilaymiz
// // // // function handleUserNameInput(chatId, text, language) {
// // // //     userNames[chatId] = text;
// // // //     userExpectingLocation[chatId] = true;

// // // //     const locationKeyboard = {
// // // //         reply_markup: {
// // // //             keyboard: [[{
// // // //                 text: translations[language].submitButton,
// // // //                 request_location: true
// // // //             }]],
// // // //             resize_keyboard: true,
// // // //             one_time_keyboard: true,
// // // //         },
// // // //     };

// // // //     // Joylashuv so'rovini faqat 1 marta jo'natamiz
// // // //     bot.sendMessage(chatId, translations[language].locationRequest, locationKeyboard)
// // // //         .then(() => {
// // // //             // 30 soniyadan keyin holatni tozalash
// // // //             setTimeout(() => {
// // // //                 if (userExpectingLocation[chatId]) {
// // // //                     delete userExpectingLocation[chatId];
// // // //                     bot.sendMessage(chatId, translations[language].requestTimeout, {
// // // //                         reply_markup: { remove_keyboard: true }
// // // //                     });
// // // //                 }
// // // //             }, 30000);
// // // //         });
// // // // }

// // // // bot.on('location', (msg) => {
// // // //     const chatId = msg.chat.id;
// // // //     const location = msg.location;
// // // //     const language = userLanguages[chatId] || 'uz';

// // // //     if (location && userNames[chatId] && userPhoneNumbers[chatId]) {
// // // //         const requestId = Date.now();
// // // //         const userName = userNames[chatId];
// // // //         const userPhone = userPhoneNumbers[chatId];
// // // //         const userNick = msg.from.username ? `@${msg.from.username}` : 'Noma’lum';
// // // //         const serviceType = userServices[chatId];

// // // //         userRequests[chatId] = userRequests[chatId] || [];
// // // //         userRequests[chatId].push({
// // // //             id: requestId,
// // // //             service: serviceType,
// // // //             name: userName,
// // // //             phone: userPhone,
// // // //             location: { 
// // // //                 latitude: location.latitude, 
// // // //                 longitude: location.longitude 
// // // //             },
// // // //             status: 'Active'
// // // //         });

// // // //         const channelId = '@it_cactus_ariza';
// // // //         const locationMessage = `${translations[language].newRequestReceived}\n🆔 ID: ${requestId}\n👤 ${userName}\n📞 ${userPhone}\n👤 Telegram: ${userNick}\n📍 [📍 Google Maps](https://www.google.com/maps?q=${location.latitude},${location.longitude})\n🔧 ${translations[language].serviceType}: ${serviceType}`;
// // // //         bot.sendLocation(channelId, location.latitude, location.longitude)
// // // //             .then(() => bot.sendMessage(channelId, locationMessage, { parse_mode: 'Markdown' }));

// // // //         const backKeyboard = {
// // // //             reply_markup: {
// // // //                 keyboard: [[translations[language].backToMenu]],
// // // //                 resize_keyboard: true,
// // // //                 one_time_keyboard: true,
// // // //             },
// // // //         };

// // // //         bot.sendMessage(chatId, translations[language].requestSubmitted, backKeyboard);

// // // //         delete userNames[chatId];
// // // //         delete userPhoneNumbers[chatId];
// // // //         delete userServices[chatId];
// // // //         delete userExpectingLocation[chatId];
// // // //     }
// // // // });

// // // // bot.onText(new RegExp(
// // // //     `${translations['uz'].backToMenu}|` +
// // // //     `${translations['ru'].backToMenu}|` +
// // // //     `${translations['en'].backToMenu}`
// // // // ), (msg) => {
// // // //     const chatId = msg.chat.id;
// // // //     sendMainMenu(chatId, userLanguages[chatId] || 'uz');
// // // // });

// // // // function sendLocation(chatId, language) {
// // // //     const officeLocation = { latitude: 41.308007, longitude: 69.327626 };
// // // //     bot.sendLocation(chatId, officeLocation.latitude, officeLocation.longitude);
// // // //     bot.sendMessage(chatId, translations[language].address);
// // // // }

// // // // function showLanguageKeyboard(chatId, language) {
// // // //     bot.sendMessage(chatId, translations[language].startMessage, languageKeyboard);
// // // // }

// // // // function handleSubmitRequest(chatId, language) {
// // // //     const serviceKeyboard = {
// // // //         reply_markup: {
// // // //             keyboard: [translations[language].services],
// // // //             resize_keyboard: true,
// // // //             one_time_keyboard: true
// // // //         }
// // // //     };
// // // //     bot.sendMessage(chatId, translations[language].chooseService, serviceKeyboard);
// // // //     userServices[chatId] = true;
// // // // }

// // // // console.log('Bot started...');

// // // const TelegramBot = require('node-telegram-bot-api');
// // // const translations = require('./It_cactus/translation.js');
// // // require('dotenv').config();

// // // const token = process.env.TELEGRAM_BOT_TOKEN;
// // // const bot = new TelegramBot(token, { polling: true });

// // // // Foydalanuvchi holatlari
// // // const userStates = {
// // //     languages: {},
// // //     phoneNumbers: {},
// // //     names: {},
// // //     requests: {},
// // //     services: {},
// // //     expectingLocation: {}
// // // };

// // // // Tilni tanlash tugmalari
// // // const languageKeyboard = {
// // //     reply_markup: {
// // //         keyboard: [['O\'zbekcha', 'Русский', 'English']],
// // //         resize_keyboard: true,
// // //         one_time_keyboard: true,
// // //     },
// // // };

// // // // Botni ishga tushirish
// // // bot.onText(/\/start/, (msg) => {
// // //     const chatId = msg.chat.id;
// // //     bot.sendMessage(chatId, translations.uz.startMessage, languageKeyboard);
// // // });

// // // // Asosiy xabarlar handleri
// // // bot.on('message', async (msg) => {
// // //     const chatId = msg.chat.id;
// // //     const text = msg.text;
// // //     const language = userStates.languages[chatId] || 'uz';

// // //     try {
// // //         // Tilni tanlash
// // //         if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
// // //             handleLanguageSelection(chatId, text);
// // //         }
// // //         // Telefon raqam kiritish
// // //         else if (userStates.phoneNumbers[chatId]) {
// // //             handlePhoneNumber(chatId, text, language);
// // //         }
// // //         // Ism kiritish
// // //         else if (userStates.names[chatId]) {
// // //             handleNameInput(chatId, text, language);
// // //         }
// // //         // Xizmat turini tanlash
// // //         else if (userStates.services[chatId]) {
// // //             handleServiceSelection(chatId, text, language);
// // //         }
// // //         // Joylashuv kutish holati
// // //         else if (userStates.expectingLocation[chatId]) {
// // //             handleLocationExpectation(chatId, language);
// // //         }
// // //         // Asosiy menyu
// // //         else if (userStates.languages[chatId]) {
// // //             handleMainMenu(chatId, text, language);
// // //         }
// // //     } catch (error) {
// // //         console.error('Xatolik:', error);
// // //         bot.sendMessage(chatId, translations[language].errorMessage);
// // //     }
// // // });

// // // // Tilni tanlash funksiyasi
// // // function handleLanguageSelection(chatId, text) {
// // //     const langMap = { 
// // //         'O\'zbekcha': 'uz', 
// // //         'Русский': 'ru', 
// // //         'English': 'en' 
// // //     };
// // //     userStates.languages[chatId] = langMap[text];
// // //     sendMainMenu(chatId, langMap[text]);
// // // }

// // // // Asosiy menyuni jo'natish
// // // function sendMainMenu(chatId, language) {
// // //     const menu = translations[language];
// // //     const keyboard = [
// // //         [menu.submitRequest],
// // //         [menu.myRequests, menu.chooseLanguage],
// // //         [menu.contact, menu.officeAddress]
// // //     ];

// // //     bot.sendMessage(chatId, `${menu.mainMenuText}\n${menu.mainMenuDescription}`, {
// // //         reply_markup: {
// // //             keyboard: keyboard.map(row => row.map(text => ({ text }))),
// // //             resize_keyboard: true
// // //         }
// // //     });
// // // }

// // // // Telefon raqamni qabul qilish
// // // function handlePhoneNumber(chatId, text, language) {
// // //     const phoneRegex = /^\+998\d{9}$/;
// // //     if (phoneRegex.test(text)) {
// // //         userStates.phoneNumbers[chatId] = text;
// // //         bot.sendMessage(chatId, translations[language].nameRequest);
// // //         userStates.names[chatId] = true;
// // //     } else {
// // //         bot.sendMessage(chatId, translations[language].invalidPhone);
// // //     }
// // // }

// // // // Ismni qabul qilish
// // // function handleNameInput(chatId, text, language) {
// // //     userStates.names[chatId] = text;
// // //     userStates.expectingLocation[chatId] = true;

// // //     bot.sendMessage(chatId, translations[language].locationRequest, {
// // //         reply_markup: {
// // //             keyboard: [[{ 
// // //                 text: translations[language].submitButton, 
// // //                 request_location: true 
// // //             }]],
// // //             resize_keyboard: true,
// // //             one_time_keyboard: true
// // //         }
// // //     });

// // //     // 30 soniya ichida javob kelmasa holatni tozalash
// // //     setTimeout(() => {
// // //         if (userStates.expectingLocation[chatId]) {
// // //             delete userStates.expectingLocation[chatId];
// // //             bot.sendMessage(chatId, translations[language].requestTimeout);
// // //         }
// // //     }, 30000);
// // // }

// // // // Joylashuvni qabul qilish
// // // bot.on('location', (msg) => {
// // //     const chatId = msg.chat.id;
// // //     const language = userStates.languages[chatId] || 'uz';

// // //     if (userStates.expectingLocation[chatId]) {
// // //         const requestData = {
// // //             name: userStates.names[chatId],
// // //             phone: userStates.phoneNumbers[chatId],
// // //             service: userStates.services[chatId],
// // //             location: msg.location
// // //         };

// // //         saveRequest(chatId, requestData);
// // //         notifyChannel(chatId, requestData, language);
// // //         sendConfirmation(chatId, language);
// // //         resetUserStates(chatId);
// // //     }
// // // });

// // // // So'rovni saqlash
// // // function saveRequest(chatId, data) {
// // //     userStates.requests[chatId] = userStates.requests[chatId] || [];
// // //     userStates.requests[chatId].push({
// // //         id: Date.now(),
// // //         ...data,
// // //         status: 'Active'
// // //     });
// // // }

// // // // Kanallarga xabar yuborish
// // // function notifyChannel(chatId, data, language) {
// // //     const channelId = '@it_cactus_ariza';
// // //     const mapsLink = `https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`;
// // //     const message = `${translations[language].newRequestReceived}\n` +
// // //                    `🆔 ID: ${Date.now()}\n` +
// // //                    `👤 ${data.name}\n` +
// // //                    `📞 ${data.phone}\n` +
// // //                    `🔧 ${translations[language].serviceType}: ${data.service}\n` +
// // //                    `📍 [Google Maps](${mapsLink})`;

// // //     bot.sendLocation(channelId, data.location.latitude, data.location.longitude)
// // //         .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));
// // // }

// // // // Holatlarni tozalash
// // // function resetUserStates(chatId) {
// // //     Object.keys(userStates).forEach(state => {
// // //         delete userStates[state][chatId];
// // //     });
// // // }

// // // console.log('Bot muvaffaqiyatli ishga tushdi!');

// // const TelegramBot = require('node-telegram-bot-api');
// // const translations = require('./It_cactus/translation.js');
// // require('dotenv').config();

// // const token = process.env.TELEGRAM_BOT_TOKEN;
// // const bot = new TelegramBot(token, { polling: true });

// // // Foydalanuvchi holatlari
// // const userStates = {};

// // // Tilni tanlash tugmalari
// // const languageKeyboard = {
// //     reply_markup: {
// //         keyboard: [['O\'zbekcha', 'Русский', 'English']],
// //         resize_keyboard: true,
// //         one_time_keyboard: true
// //     }
// // };

// // // Start komandasi
// // bot.onText(/\/start/, (msg) => {
// //     const chatId = msg.chat.id;
// //     userStates[chatId] = {};
// //     bot.sendMessage(chatId, translations.uz.startMessage, languageKeyboard);
// // });

// // // Xabarlarni qayta ishlash
// // bot.on('message', async (msg) => {
// //     const chatId = msg.chat.id;
// //     const text = msg.text;
// //     const state = userStates[chatId] || {};
// //     const lang = state.language || 'uz';

// //     try {
// //         // Tilni tanlash
// //         if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
// //             handleLanguage(chatId, text);
// //         }
// //         // Telefon raqam kiritish
// //         else if (state.step === 'phone') {
// //             handlePhone(chatId, text, lang);
// //         }
// //         // Ism kiritish
// //         else if (state.step === 'name') {
// //             handleName(chatId, text, lang);
// //         }
// //         // Xizmat turini tanlash
// //         else if (state.step === 'service') {
// //             handleService(chatId, text, lang);
// //         }
// //         // Asosiy menyu
// //         else if (state.language) {
// //             handleMainMenu(chatId, text, lang);
// //         }
// //     } catch (error) {
// //         console.error(error);
// //         bot.sendMessage(chatId, translations[lang].errorMessage);
// //     }
// // });

// // // Tilni sozlash
// // function handleLanguage(chatId, text) {
// //     const langMap = { 
// //         'O\'zbekcha': 'uz', 
// //         'Русский': 'ru', 
// //         'English': 'en' 
// //     };
// //     userStates[chatId] = { 
// //         language: langMap[text],
// //         step: 'main_menu'
// //     };
// //     sendMainMenu(chatId, langMap[text]);
// // }

// // // Asosiy menyu
// // function sendMainMenu(chatId, lang) {
// //     const menu = translations[lang];
// //     const keyboard = [
// //         [menu.submitRequest],
// //         [menu.myRequests, menu.chooseLanguage],
// //         [menu.contact, menu.officeAddress]
// //     ];

// //     bot.sendMessage(chatId, `${menu.mainMenuText}\n${menu.mainMenuDescription}`, {
// //         reply_markup: {
// //             keyboard: keyboard.map(row => row.map(text => ({ text }))),
// //             resize_keyboard: true
// //         }
// //     });
// // }

// // // Telefon raqam
// // function handlePhone(chatId, text, lang) {
// //     if (/^\+998\d{9}$/.test(text)) {
// //         userStates[chatId].phone = text;
// //         userStates[chatId].step = 'name';
// //         bot.sendMessage(chatId, translations[lang].nameRequest);
// //     } else {
// //         bot.sendMessage(chatId, translations[lang].invalidPhone);
// //     }
// // }

// // // Ism
// // function handleName(chatId, text, lang) {
// //     userStates[chatId].name = text;
// //     userStates[chatId].step = 'location';
    
// //     bot.sendMessage(chatId, translations[lang].locationRequest, {
// //         reply_markup: {
// //             keyboard: [[{ 
// //                 text: translations[lang].submitButton, 
// //                 request_location: true 
// //             }]],
// //             resize_keyboard: true,
// //             one_time_keyboard: true
// //         }
// //     });

// //     // 30 soniyalik timeout
// //     setTimeout(() => {
// //         if (userStates[chatId]?.step === 'location') {
// //             delete userStates[chatId];
// //             bot.sendMessage(chatId, translations[lang].requestTimeout);
// //         }
// //     }, 30000);
// // }

// // // Xizmat turi
// // function handleService(chatId, text, lang) {
// //     if (translations[lang].services.includes(text)) {
// //         userStates[chatId].service = text;
// //         userStates[chatId].step = 'phone';
// //         bot.sendMessage(chatId, translations[lang].requestInstructions);
// //     } else {
// //         const keyboard = translations[lang].services.map(service => [{ text: service }]);
// //         bot.sendMessage(chatId, translations[lang].invalidService, {
// //             reply_markup: { keyboard }
// //         });
// //     }
// // }

// // // Joylashuv
// // bot.on('location', (msg) => {
// //     const chatId = msg.chat.id;
// //     const state = userStates[chatId];
// //     const lang = state?.language || 'uz';

// //     if (state?.step === 'location') {
// //         const request = {
// //             id: Date.now(),
// //             ...state,
// //             location: msg.location
// //         };

// //         // Kanallarga yuborish
// //         const channelId = '@it_cactus_ariza';
// //         const message = `${translations[lang].newRequestReceived}\n` +
// //                        `🆔 ID: ${request.id}\n` +
// //                        `👤 ${request.name}\n` +
// //                        `📞 ${request.phone}\n` +
// //                        `📍 [Google Maps](https://maps.google.com/?q=${request.location.latitude},${request.location.longitude})`;

// //         bot.sendLocation(channelId, request.location.latitude, request.location.longitude)
// //             .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));

// //         // Foydalanuvchiga tasdiqlash
// //         bot.sendMessage(chatId, translations[lang].requestSubmitted, {
// //             reply_markup: { 
// //                 keyboard: [[translations[lang].backToMenu]],
// //                 resize_keyboard: true
// //             }
// //         });

// //         delete userStates[chatId];
// //     }
// // });

// // // Asosiy menyu boshqaruvi
// // function handleMainMenu(chatId, text, lang) {
// //     const menu = translations[lang];
    
// //     switch(text) {
// //         case menu.submitRequest:
// //             handleServiceSelection(chatId, lang);
// //             break;
// //         case menu.myRequests:
// //             showUserRequests(chatId, lang);
// //             break;
// //         case menu.chooseLanguage:
// //             bot.sendMessage(chatId, menu.startMessage, languageKeyboard);
// //             break;
// //         case menu.contact:
// //             bot.sendMessage(chatId, menu.contactInfo);
// //             break;
// //         case menu.officeAddress:
// //             sendOfficeLocation(chatId, lang);
// //             break;
// //         default:
// //             bot.sendMessage(chatId, menu.useButtons);
// //     }
// // }

// // function handleServiceSelection(chatId, lang) {
// //     const keyboard = translations[lang].services.map(service => [{ text: service }]);
// //     userStates[chatId].step = 'service';
// //     bot.sendMessage(chatId, translations[lang].chooseService, {
// //         reply_markup: { keyboard }
// //     });
// // }

// // function sendOfficeLocation(chatId, lang) {
// //     const office = { latitude: 41.308007, longitude: 69.327626 };
// //     bot.sendLocation(chatId, office.latitude, office.longitude);
// //     bot.sendMessage(chatId, translations[lang].address);
// // }

// // console.log('Bot ishlayapti...');
// const TelegramBot = require('node-telegram-bot-api');
// const translations = require('./It_cactus/translation.js');
// require('dotenv').config();

// const token = process.env.TELEGRAM_BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// const userStates = {};

// // Tilni tanlash tugmalari
// const languageKeyboard = {
//     reply_markup: {
//         keyboard: [['O\'zbekcha', 'Русский', 'English']],
//         resize_keyboard: true,
//         one_time_keyboard: true
//     }
// };

// // Start komandasi
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     userStates[chatId] = {};
//     bot.sendMessage(chatId, translations.uz.startMessage, languageKeyboard);
// });

// // Xabarlarni qayta ishlash
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     const state = userStates[chatId] || {};
//     const lang = state.language || 'uz';

//     // Agar joylashuv yuborilgan bo'lsa, ushbu handlerdan chiqamiz
//     if (msg.location) return;

//     try {
//         if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
//             handleLanguage(chatId, text);
//         } else if (state.step === 'phone') {
//             handlePhone(chatId, text, lang);
//         } else if (state.step === 'name') {
//             handleName(chatId, text, lang);
//         } else if (state.step === 'service') {
//             handleService(chatId, text, lang);
//         } else if (state.language) {
//             handleMainMenu(chatId, text, lang);
//         }
//     } catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, translations[lang].errorMessage);
//     }
// });

// // Joylashuvni qabul qilish
// // bot.on('location', (msg) => {
// //     const chatId = msg.chat.id;
// //     const state = userStates[chatId];
// //     const lang = state?.language || 'uz';
    
// //     if (state?.step === 'location') {
// //         const user = msg.from;
// //         const request = {
// //             id: Date.now(),
// //             name: state.name,
// //             phone: state.phone,
// //             service: state.service,
// //             location: msg.location,
// //             username: user.username ? `@${user.username}` : translations[lang].unknownUser
// //         };

// //         // Kanallarga xabar
// //         const channelId = '@it_cactus_ariza';
// //         const mapsLink = `https://maps.google.com/?q=${request.location.latitude},${request.location.longitude}`;
// //         const message = [
// //             `${translations[lang].newRequestReceived}`,
// //             `🆔 ID: ${request.id}`,
// //             `👤 ${translations[lang].name}: ${request.name}`,
// //             `📞 ${translations[lang].phone}: ${request.phone}`,
// //             `👤 Telegram: ${request.username}`,
// //             `📍 [Google Maps](${mapsLink})`,
// //             `🔧 ${translations[lang].serviceType}: ${request.service}`
// //         ].join('\n');

// //         bot.sendLocation(channelId, request.location.latitude, request.location.longitude)
// //             .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));

// //         // Foydalanuvchiga javob
// //         bot.sendMessage(chatId, translations[lang].requestSubmitted, {
// //             reply_markup: { 
// //                 keyboard: [[translations[lang].backToMenu]],
// //                 resize_keyboard: true
// //             }
// //         });

// //         // Holatlarni tozalash va menyuni qayta ko'rsatish
// //         delete userStates[chatId];
// //         sendMainMenu(chatId, lang);
// //     } else {
// //         // Noto'g'ri vaqtda joylashuv yuborilgan
// //         bot.sendMessage(chatId, translations[lang].useButtons);
// //     }
// // });

// bot.on('location', (msg) => {
//     const chatId = msg.chat.id;
//     const state = userStates[chatId];
//     const lang = state?.language || 'uz';
    
//     if (state?.step === 'location') {
//         const user = msg.from;
//         const request = {
//             id: Date.now(),
//             name: state.name,
//             phone: state.phone,
//             service: state.service,
//             location: msg.location,
//             username: user.username ? `@${user.username}` : translations[lang].unknownUser
//         };

//         // Kanallarga xabar
//         const channelId = '@it_cactus_ariza';
//         const mapsLink = `https://maps.google.com/?q=${request.location.latitude},${request.location.longitude}`;
//         const message = [
//             `${translations[lang].newRequestReceived}`,
//             `🆔 ID: ${request.id}`,
//             `👤 ${translations[lang].name}: ${request.name}`,
//             `📞 ${translations[lang].phone}: ${request.phone}`,
//             `👤 Telegram: ${request.username}`,
//             `📍 [Google Maps](${mapsLink})`,
//             `🔧 ${translations[lang].serviceType}: ${request.service}`
//         ].join('\n');

//         bot.sendLocation(channelId, request.location.latitude, request.location.longitude)
//             .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));

//         // Foydalanuvchiga javob
//         bot.sendMessage(chatId, translations[lang].requestSubmitted, {
//             reply_markup: { 
//                 keyboard: [[translations[lang].backToMenu]],
//                 resize_keyboard: true
//             }
//         });

//         // Faqat holatlarni tozalash
//         delete userStates[chatId];
//     } else {
//         bot.sendMessage(chatId, translations[lang].useButtons);
//     }
// });

// // Tilni sozlash
// function handleLanguage(chatId, text) {
//     const langMap = { 
//         'O\'zbekcha': 'uz', 
//         'Русский': 'ru', 
//         'English': 'en' 
//     };
//     userStates[chatId] = { 
//         language: langMap[text],
//         step: 'main_menu'
//     };
//     sendMainMenu(chatId, langMap[text]);
// }

// // Asosiy menyu
// function sendMainMenu(chatId, lang) {
//     const menu = translations[lang];
//     const keyboard = [
//         [menu.submitRequest],
//         [menu.myRequests, menu.chooseLanguage],
//         [menu.contact, menu.officeAddress]
//     ];

//     bot.sendMessage(chatId, `${menu.mainMenuText}\n${menu.mainMenuDescription}`, {
//         reply_markup: {
//             keyboard: keyboard.map(row => row.map(text => ({ text }))),
//             resize_keyboard: true
//         }
//     });
// }

// // Telefon raqamni qabul qilish
// function handlePhone(chatId, text, lang) {
//     if (/^(\+998|998)\d{9}$/.test(text)) {
//         userStates[chatId].phone = text.replace(/^998/, '+998');
//         userStates[chatId].step = 'name';
//         bot.sendMessage(chatId, translations[lang].nameRequest);
//     } else {
//         bot.sendMessage(chatId, translations[lang].invalidPhone);
//     }
// }

// // Ismni qabul qilish
// function handleName(chatId, text, lang) {
//     userStates[chatId].name = text;
//     userStates[chatId].step = 'location';
    
//     bot.sendMessage(chatId, translations[lang].locationRequest, {
//         reply_markup: {
//             keyboard: [[{ 
//                 text: translations[lang].submitButton, 
//                 request_location: true 
//             }]],
//             resize_keyboard: true,
//             one_time_keyboard: true
//         }
//     });

//     // 30 soniyalik timeout
//     setTimeout(() => {
//         if (userStates[chatId]?.step === 'location') {
//             delete userStates[chatId];
//             bot.sendMessage(chatId, translations[lang].requestTimeout);
//         }
//     }, 30000);
// }

// // Xizmat turini tanlash
// function handleService(chatId, text, lang) {
//     if (translations[lang].services.includes(text)) {
//         userStates[chatId].service = text;
//         userStates[chatId].step = 'phone';
//         bot.sendMessage(chatId, translations[lang].requestInstructions);
//     } else {
//         const keyboard = translations[lang].services.map(service => [{ text: service }]);
//         bot.sendMessage(chatId, translations[lang].invalidService, {
//             reply_markup: { keyboard ,
//             resize_keyboard: true,
//             one_time_keyboard: true}
//         });
//     }
// }

// // Asosiy menyu boshqaruvi
// function handleMainMenu(chatId, text, lang) {
//     const menu = translations[lang];
    
//     switch(text) {
//         case menu.submitRequest:
//             handleServiceSelection(chatId, lang);
//             break;
//         case menu.myRequests:
//             showUserRequests(chatId, lang);
//             break;
//         case menu.chooseLanguage:
//             bot.sendMessage(chatId, menu.startMessage, languageKeyboard);
//             break;
//         case menu.contact:
//             bot.sendMessage(chatId, menu.contactInfo);
//             break;
//         case menu.officeAddress:
//             sendOfficeLocation(chatId, lang);
//             break;
//         default:
//             bot.sendMessage(chatId, menu.useButtons);
//     }
// }

// function handleServiceSelection(chatId, lang) {
//     userStates[chatId].step = 'service';
//     const keyboard = translations[lang].services.map(service => [{ text: service }]);
    
//     bot.sendMessage(chatId, translations[lang].chooseService, {
//         reply_markup: { 
//             keyboard,
//             resize_keyboard: true,
//             one_time_keyboard: true
//         }
//     });
// }

// function sendOfficeLocation(chatId, lang) {
//     const office = { latitude: 41.308007, longitude: 69.327626 };
//     bot.sendLocation(chatId, office.latitude, office.longitude);
//     bot.sendMessage(chatId, translations[lang].address);
// }

// console.log('Bot muvaffaqiyatli ishga tushdi!');

// const TelegramBot = require('node-telegram-bot-api');
// const translations = require('./It_cactus/translation.js');
// require('dotenv').config();

// const token = process.env.TELEGRAM_BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// const userStates = {};

// // Tilni tanlash tugmalari
// const languageKeyboard = {
//     reply_markup: {
//         keyboard: [['O\'zbekcha', 'Русский', 'English']],
//         resize_keyboard: true,
//         one_time_keyboard: true
//     }
// };

// // Start komandasi
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     userStates[chatId] = {};
//     bot.sendMessage(chatId, translations.uz.startMessage, languageKeyboard);
// });

// // Xabarlarni qayta ishlash
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     const state = userStates[chatId] || {};
//     const lang = state.language || 'uz';

//     // Agar joylashuv yuborilgan bo'lsa, ushbu handlerdan chiqamiz
//     if (msg.location) return;

//     try {
//         if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
//             handleLanguage(chatId, text);
//         } else if (state.step === 'phone') {
//             handlePhone(chatId, text, lang);
//         } else if (state.step === 'name') {
//             handleName(chatId, text, lang);
//         } else if (state.step === 'service') {
//             handleService(chatId, text, lang);
//         } else if (state.language) {
//             handleMainMenu(chatId, text, lang);
//         }
//     } catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, translations[lang].errorMessage);
//     }
// });

// // Joylashuvni qabul qilish
// // Joylashuvni qabul qilish
// bot.on('location', (msg) => {
//     const chatId = msg.chat.id;
//     const state = userStates[chatId];
//     const lang = state?.language || 'uz';
    
//     if (state?.step === 'location') {
//         const user = msg.from;
//         const request = {
//             id: Date.now(),
//             name: state.name,
//             phone: state.phone,
//             service: state.service,
//             location: msg.location,
//             username: user.username ? `@${user.username}` : translations[lang].unknownUser
//         };

//         // Kanallarga xabar
//         const channelId = '@it_cactus_ariza';
//         const mapsLink = `https://maps.google.com/?q=${request.location.latitude},${request.location.longitude}`;
//         const message = [
//             `${translations[lang].newRequestReceived}`,
//             `🆔 ID: ${request.id}`,
//             `👤 ${translations[lang].name}: ${request.name}`,
//             `📞 ${translations[lang].phone}: ${request.phone}`,
//             `👤 Telegram: ${request.username}`,
//             `📍 [Google Maps](${mapsLink})`,
//             `🔧 ${translations[lang].serviceType}: ${request.service}`
//         ].join('\n');

//         bot.sendLocation(channelId, request.location.latitude, request.location.longitude)
//             .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));

//         // Foydalanuvchiga javob
//         bot.sendMessage(chatId, translations[lang].requestSubmitted, {
//             reply_markup: { 
//                 keyboard: [[translations[lang].backToMenu]],
//                 resize_keyboard: true
//             }
//         });

//         // Holatlarni tozalash va menyuni qayta ko'rsatish
//         userStates[chatId] = { language: state.language, step: 'main_menu' }; // Faqat tilni saqlab qolamiz
//         sendMainMenu(chatId, lang); // Asosiy menyuni qayta ko'rsatish
//     } else {
//         // Noto'g'ri vaqtda joylashuv yuborilgan
//         bot.sendMessage(chatId, translations[lang].useButtons);
//     }
// });

// // Tilni sozlash
// function handleLanguage(chatId, text) {
//     const langMap = { 
//         'O\'zbekcha': 'uz', 
//         'Русский': 'ru', 
//         'English': 'en' 
//     };
//     userStates[chatId] = { 
//         language: langMap[text],
//         step: 'main_menu'
//     };
//     sendMainMenu(chatId, langMap[text]);
// }

// // Asosiy menyu
// function sendMainMenu(chatId, lang) {
//     const menu = translations[lang];
//     const keyboard = [
//         [menu.submitRequest],
//         [menu.myRequests, menu.chooseLanguage],
//         [menu.contact, menu.officeAddress]
//     ];

//     bot.sendMessage(chatId, `${menu.mainMenuText}\n${menu.mainMenuDescription}`, {
//         reply_markup: {
//             keyboard: keyboard.map(row => row.map(text => ({ text }))),
//             resize_keyboard: true
//         }
//     });
// }

// // Telefon raqamni qabul qilish
// function handlePhone(chatId, text, lang) {
//     if (/^(\+998|998)\d{9}$/.test(text)) {
//         userStates[chatId].phone = text.replace(/^998/, '+998');
//         userStates[chatId].step = 'name';
//         bot.sendMessage(chatId, translations[lang].nameRequest);
//     } else {
//         bot.sendMessage(chatId, translations[lang].invalidPhone);
//     }
// }

// // Ismni qabul qilish
// function handleName(chatId, text, lang) {
//     userStates[chatId].name = text;
//     userStates[chatId].step = 'location';
    
//     bot.sendMessage(chatId, translations[lang].locationRequest, {
//         reply_markup: {
//             keyboard: [[{ 
//                 text: translations[lang].submitButton, 
//                 request_location: true 
//             }]],
//             resize_keyboard: true,
//             one_time_keyboard: true
//         }
//     });

//     // 30 soniyalik timeout
//     setTimeout(() => {
//         if (userStates[chatId]?.step === 'location') {
//             delete userStates[chatId];
//             bot.sendMessage(chatId, translations[lang].requestTimeout);
//         }
//     }, 30000);
// }

// function sendUserRequests(chatId, language) {
//         const requests = userRequests[chatId];
//         if (!requests || requests.length === 0) {
//             bot.sendMessage(chatId, translations[language].noRequests);
//         } else {
//             let message = translations[language].myRequestsHeader + '\n\n';
//             requests.forEach((request) => {
//                 message += `${translations[language].name}: ${request.name}\n`;
//                 message += `${translations[language].phone}: ${request.phone}\n`;
//                 message += `${translations[language].status}: ${request.status}\n\n`;
//             });
//             bot.sendMessage(chatId, message);
//         }
//     }

// // Xizmat turini tanlash
// function handleService(chatId, text, lang) {
//     if (translations[lang].services.includes(text)) {
//         userStates[chatId].service = text;
//         userStates[chatId].step = 'phone';
//         bot.sendMessage(chatId, translations[lang].requestInstructions);
//     } else {
//         const keyboard = translations[lang].services.map(service => [{ text: service }]);
//         bot.sendMessage(chatId, translations[lang].invalidService, {
//             reply_markup: { 
//                 keyboard,
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         });
//     }
// }

// // Asosiy menyu boshqaruvi
// // Asosiy menyu boshqaruvi
// function handleMainMenu(chatId, text, lang) {
//     const menu = translations[lang];
    
//     switch(text) {
//         case menu.submitRequest:
//             handleServiceSelection(chatId, lang);
//             break;
//         case menu.myRequests:
//             showUserRequests(chatId, lang);
//             break;
//         case menu.chooseLanguage:
//             bot.sendMessage(chatId, menu.startMessage, languageKeyboard);
//             break;
//         case menu.contact:
//             bot.sendMessage(chatId, menu.contactInfo);
//             break;
//         case menu.officeAddress:
//             sendOfficeLocation(chatId, lang);
//             break;
//         case menu.backToMenu:
//             sendMainMenu(chatId, lang); // Asosiy menyuni qayta ko'rsatish
//             break;
//         default:
//             bot.sendMessage(chatId, menu.useButtons);
//     }
// }

// function handleServiceSelection(chatId, lang) {
//     userStates[chatId].step = 'service';
//     const keyboard = translations[lang].services.map(service => [{ text: service }]);
    
//     bot.sendMessage(chatId, translations[lang].chooseService, {
//         reply_markup: { 
//             keyboard,
//             resize_keyboard: true,
//             one_time_keyboard: true
//         }
//     });
// }

// function sendOfficeLocation(chatId, lang) {
//     const office = { latitude: 41.308007, longitude: 69.327626 };
//     bot.sendLocation(chatId, office.latitude, office.longitude);
//     bot.sendMessage(chatId, translations[lang].address);
// }

// console.log('Bot muvaffaqiyatli ishga tushdi!');
const TelegramBot = require('node-telegram-bot-api');
const translations = require('./It_cactus/translation.js');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const userStates = {}; // Foydalanuvchi holatlari
const userRequests = {}; // Foydalanuvchilarning arizalari

// Tilni tanlash tugmalari
const languageKeyboard = {
    reply_markup: {
        keyboard: [['O\'zbekcha', 'Русский', 'English']],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

// Start komandasi
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    userStates[chatId] = {};
    bot.sendMessage(chatId, translations.uz.startMessage, languageKeyboard);
});

// Xabarlarni qayta ishlash
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates[chatId] || {};
    const lang = state.language || 'uz';

    // Agar joylashuv yuborilgan bo'lsa, ushbu handlerdan chiqamiz
    if (msg.location) return;

    try {
        if (['O\'zbekcha', 'Русский', 'English'].includes(text)) {
            handleLanguage(chatId, text);
        } else if (state.step === 'phone') {
            handlePhone(chatId, text, lang);
        } else if (state.step === 'name') {
            handleName(chatId, text, lang);
        } else if (state.step === 'service') {
            handleService(chatId, text, lang);
        } else if (state.language) {
            handleMainMenu(chatId, text, lang);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, translations[lang].errorMessage);
    }
});

// Joylashuvni qabul qilish
bot.on('location', (msg) => {
    const chatId = msg.chat.id;
    const state = userStates[chatId];
    const lang = state?.language || 'uz';
    
    if (state?.step === 'location') {
        const user = msg.from;
        const request = {
            id: Date.now(),
            name: state.name,
            phone: state.phone,
            service: state.service,
            location: msg.location,
            username: user.username ? `@${user.username}` : translations[lang].unknownUser,
            status: lang === 'uz' ? 'Yangi' : 'Новый' // Ariza holati
        };

        // Ariza qo'shish
        if (!userRequests[chatId]) {
            userRequests[chatId] = [];
        }
        userRequests[chatId].push(request);

        // Kanallarga xabar
        const channelId = '@it_cactus_ariza';
        const mapsLink = `https://maps.google.com/?q=${request.location.latitude},${request.location.longitude}`;
        const message = [
            `${translations[lang].newRequestReceived}`,
            `🆔 ID: ${request.id}`,
            `👤 ${translations[lang].name}: ${request.name}`,
            `📞 ${translations[lang].phone}: ${request.phone}`,
            `👤 Telegram: ${request.username}`,
            `📍 [Google Maps](${mapsLink})`,
            `🔧 ${translations[lang].serviceType}: ${request.service}`
        ].join('\n');

        bot.sendLocation(channelId, request.location.latitude, request.location.longitude)
            .then(() => bot.sendMessage(channelId, message, { parse_mode: 'Markdown' }));

        // Foydalanuvchiga javob
        bot.sendMessage(chatId, translations[lang].requestSubmitted, {
            reply_markup: { 
                keyboard: [[translations[lang].backToMenu]],
                resize_keyboard: true
            }
        });

        // Holatlarni tozalash va menyuni qayta ko'rsatish
        userStates[chatId] = { language: state.language, step: 'main_menu' }; // Faqat tilni saqlab qolamiz
        sendMainMenu(chatId, lang); // Asosiy menyuni qayta ko'rsatish
    } else {
        // Noto'g'ri vaqtda joylashuv yuborilgan
        bot.sendMessage(chatId, translations[lang].useButtons);
    }
});

// Tilni sozlash
function handleLanguage(chatId, text) {
    const langMap = { 
        'O\'zbekcha': 'uz', 
        'Русский': 'ru', 
        'English': 'en' 
    };
    userStates[chatId] = { 
        language: langMap[text],
        step: 'main_menu'
    };
    sendMainMenu(chatId, langMap[text]);
}

// Asosiy menyu
function sendMainMenu(chatId, lang) {
    const menu = translations[lang];
    const keyboard = [
        [menu.submitRequest],
        [menu.myRequests, menu.chooseLanguage],
        [menu.contact, menu.officeAddress]
    ];

    bot.sendMessage(chatId, `${menu.mainMenuText}\n${menu.mainMenuDescription}`, {
        reply_markup: {
            keyboard: keyboard.map(row => row.map(text => ({ text }))),
            resize_keyboard: true
        }
    });
}

// Telefon raqamni qabul qilish
function handlePhone(chatId, text, lang) {
    if (/^(\+998|998)\d{9}$/.test(text)) {
        userStates[chatId].phone = text.replace(/^998/, '+998');
        userStates[chatId].step = 'name';
        bot.sendMessage(chatId, translations[lang].nameRequest);
    } else {
        bot.sendMessage(chatId, translations[lang].invalidPhone);
    }
}

// Ismni qabul qilish
function handleName(chatId, text, lang) {
    userStates[chatId].name = text;
    userStates[chatId].step = 'location';
    
    bot.sendMessage(chatId, translations[lang].locationRequest, {
        reply_markup: {
            keyboard: [[{ 
                text: translations[lang].submitButton, 
                request_location: true 
            }]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });

    // 30 soniyalik timeout
    setTimeout(() => {
        if (userStates[chatId]?.step === 'location') {
            delete userStates[chatId];
            bot.sendMessage(chatId, translations[lang].requestTimeout);
        }
    }, 30000);
}

// Xizmat turini tanlash
function handleService(chatId, text, lang) {
    if (translations[lang].services.includes(text)) {
        userStates[chatId].service = text;
        userStates[chatId].step = 'phone';
        bot.sendMessage(chatId, translations[lang].requestInstructions);
    } else {
        const keyboard = translations[lang].services.map(service => [{ text: service }]);
        bot.sendMessage(chatId, translations[lang].invalidService, {
            reply_markup: { 
                keyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }
}

// Asosiy menyu boshqaruvi
function handleMainMenu(chatId, text, lang) {
    const menu = translations[lang];
    
    switch(text) {
        case menu.submitRequest:
            handleServiceSelection(chatId, lang);
            break;
        case menu.myRequests:
            sendUserRequests(chatId, lang); // Ariza ko'rsatish
            break;
        case menu.chooseLanguage:
            bot.sendMessage(chatId, menu.startMessage, languageKeyboard);
            break;
        case menu.contact:
            bot.sendMessage(chatId, menu.contactInfo);
            break;
        case menu.officeAddress:
            sendOfficeLocation(chatId, lang);
            break;
        case menu.backToMenu:
            sendMainMenu(chatId, lang); // Asosiy menyuni qayta ko'rsatish
            break;
        default:
            bot.sendMessage(chatId, menu.useButtons);
    }
}

// Xizmat turini tanlash
function handleServiceSelection(chatId, lang) {
    userStates[chatId].step = 'service';
    const keyboard = translations[lang].services.map(service => [{ text: service }]);
    
    bot.sendMessage(chatId, translations[lang].chooseService, {
        reply_markup: { 
            keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
}

// Ofis manzilini yuborish
function sendOfficeLocation(chatId, lang) {
    const office = { latitude: 41.308007, longitude: 69.327626 };
    bot.sendLocation(chatId, office.latitude, office.longitude);
    bot.sendMessage(chatId, translations[lang].address);
}

// Foydalanuvchining arizalarini ko'rsatish
function sendUserRequests(chatId, lang) {
    const requests = userRequests[chatId];
    if (!requests || requests.length === 0) {
        bot.sendMessage(chatId, translations[lang].noRequests);
    } else {
        let message = translations[lang].myRequests + '\n\n';
        requests.forEach((request) => {
            message += `${translations[lang].name}: ${request.name}\n`;
            message += `${translations[lang].phone}: ${request.phone}\n`;
            message += `${translations[lang].status}: ${request.status}\n\n`;
        });
        bot.sendMessage(chatId, message);
    }
}

console.log('Bot muvaffaqiyatli ishga tushdi!');