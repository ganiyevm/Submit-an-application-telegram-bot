const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

let userLanguages = {};
let userPhoneNumbers = {};
let userNames = {};
let userRequests = {};

const languageKeyboard = {
    reply_markup: {
        keyboard: [['O\'zbekcha', 'Русский', 'English']],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};

const translations = {
    'uz': {
        startMessage: 'Iltimos, tilni tanlang:',
        mainMenuText: 'Asosiy menyu:',
        mainMenuDescription: 'Ushbu bot sizga kameralarni o\'rnatish uchun ariza qoldirishda yordam beradi.',
        requestInstructions: 'Iltimos, telefon raqamingizni kiriting (masalan, +998XXXXXXXX):',
        nameRequest: 'Iltimos, ismingizni kiriting:',
        contactInfo: '📞 Bizning telefon raqamimiz: +998997290030\nBizning telegram: @it_kaktus',
        address: '📍 Yunusobod 19-44-47',
        submitRequest: 'Ariza qoldirish',
        myRequests: 'Arizalarim',
        chooseLanguage: 'Tilni tanlash',
        contact: 'Biz bilan bog\'lanish',
        officeAddress: 'Bizning manzil',
    },
    'ru': {
        startMessage: 'Пожалуйста, выберите язык:',
        mainMenuText: 'Главное меню:',
        mainMenuDescription: 'Этот бот поможет вам оставить заявку на установку камер.',
        requestInstructions: 'Пожалуйста, введите ваш номер телефона (например, +998XXXXXXXX):',
        nameRequest: 'Пожалуйста, введите ваше имя:',
        contactInfo: '📞 Наш номер телефона: +998997290030\nНаш Telegram: @it_kaktus',
        address: '📍 Юнусабад 19-44-47',
        submitRequest: 'Оставить заявку',
        myRequests: 'Мои заявки',
        chooseLanguage: 'Выбор языка',
        contact: 'Связаться с нами',
        officeAddress: 'Наш адрес',
    },
    'en': {
        startMessage: 'Please choose a language:',
        mainMenuText: 'Main menu:',
        mainMenuDescription: 'This bot will assist you in submitting a request for camera installation.',
        requestInstructions: 'Please enter your phone number (e.g., +998XXXXXXXX):',
        nameRequest: 'Please enter your name:',
        contactInfo: '📞 Our phone number: +998997290030\nOur Telegram: @it_kaktus',
        address: '📍 Yunusobod 19-44-47',
        submitRequest: 'Submit a request',
        myRequests: 'My requests',
        chooseLanguage: 'Choose language',
        contact: 'Contact us',
        officeAddress: 'Our address',
    }
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, translations['uz'].startMessage, languageKeyboard); // Default language
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'O\'zbekcha' || text === 'Русский' || text === 'English') {
        userLanguages[chatId] = text === 'O\'zbekcha' ? 'uz' :
                                text === 'Русский' ? 'ru' : 'en';
        sendMainMenu(chatId, userLanguages[chatId]);
    } else if (userLanguages[chatId]) {
        handleMainMenuSelection(text, chatId, userLanguages[chatId]);
    } else if (userPhoneNumbers[chatId]) {
        handleUserPhoneInput(chatId, text);
    } else if (userNames[chatId]) {
        handleUserNameInput(chatId, text);
    }
});

function sendMainMenu(chatId, language) {
    const mainMenuKeyboard = {
        reply_markup: {
            keyboard: [
                [{ text: translations[language].submitRequest }],
                [{ text: translations[language].myRequests },
                 { text: translations[language].chooseLanguage }],
                [{ text: translations[language].contact },
                 { text: translations[language].officeAddress }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    };

    const mainMenuText = `${translations[language].mainMenuText}\n${translations[language].mainMenuDescription}`;
    bot.sendMessage(chatId, mainMenuText, mainMenuKeyboard);
}

const menuActions = {
    'uz': {
        [translations['uz'].submitRequest]: (chatId) => bot.sendMessage(chatId, translations['uz'].requestInstructions),
        [translations['uz'].myRequests]: (chatId) => sendUserRequests(chatId, 'uz'),
        [translations['uz'].chooseLanguage]: (chatId) => bot.sendMessage(chatId, translations['uz'].chooseLanguage, languageKeyboard),
        [translations['uz'].contact]: (chatId) => bot.sendMessage(chatId, translations['uz'].contactInfo),
        [translations['uz'].officeAddress]: (chatId) => sendLocation(chatId),
    },
    'ru': {
        [translations['ru'].submitRequest]: (chatId) => bot.sendMessage(chatId, translations['ru'].requestInstructions),
        [translations['ru'].myRequests]: (chatId) => sendUserRequests(chatId, 'ru'),
        [translations['ru'].chooseLanguage]: (chatId) => bot.sendMessage(chatId, translations['ru'].chooseLanguage, languageKeyboard),
        [translations['ru'].contact]: (chatId) => bot.sendMessage(chatId, translations['ru'].contactInfo),
        [translations['ru'].officeAddress]: (chatId) => sendLocation(chatId),
    },
    'en': {
        [translations['en'].submitRequest]: (chatId) => bot.sendMessage(chatId, translations['en'].requestInstructions),
        [translations['en'].myRequests]: (chatId) => sendUserRequests(chatId, 'en'),
        [translations['en'].chooseLanguage]: (chatId) => bot.sendMessage(chatId, translations['en'].chooseLanguage, languageKeyboard),
        [translations['en'].contact]: (chatId) => bot.sendMessage(chatId, translations['en'].contactInfo),
        [translations['en'].officeAddress]: (chatId) => sendLocation(chatId),
    }
};

function handleMainMenuSelection(selection, chatId, language) {
    const action = menuActions[language][selection];
    if (action) {
        action(chatId);
    }
}

function handleUserPhoneInput(chatId, text) {
    const phoneRegex = /^(?:\+998\d{9}|998\d{9}|\d{9})$/gm;
    if (phoneRegex.test(text)) {
        userPhoneNumbers[chatId] = text;
        bot.sendMessage(chatId, translations[userLanguages[chatId]].nameRequest);
    } else {
        bot.sendMessage(chatId, translations[userLanguages[chatId]].requestInstructions);
    }
}

function handleUserNameInput(chatId, text) {
    userNames[chatId] = text;
    const locationKeyboard = {
        reply_markup: {
            keyboard: [[{
                text: 'Yuborish',
                request_location: true
            }], [{
                text: 'Menyuga qaytish'
            }]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };
    bot.sendMessage(chatId, translations[userLanguages[chatId]].locationRequest, locationKeyboard);
}

function sendLocation(chatId) {
    const officeLocation = { latitude: 41.37149, longitude: 69.31241 };
    bot.sendLocation(chatId, officeLocation.latitude, officeLocation.longitude);
    bot.sendMessage(chatId, translations[userLanguages[chatId]].address);
}

bot.on('location', (msg) => {
    const chatId = msg.chat.id;
    const location = msg.location;

    if (location) {
        const requestId = Date.now();
        userRequests[chatId] = userRequests[chatId] || [];
        userRequests[chatId].push({
            id: requestId,
            name: userNames[chatId],
            phone: userPhoneNumbers[chatId],
            location: { latitude: location.latitude, longitude: location.longitude },
            status: 'Active'
        });

        const channelId = '@arizaberishboti';
        const locationMessage = getLocationMessage(userLanguages[chatId], requestId, chatId);
        bot.sendLocation(channelId, location.latitude, location.longitude).then(() => {
            bot.sendMessage(channelId, locationMessage);
        });

        bot.sendMessage(chatId, 'Ma\'lumotlaringiz qabul qilindi.');
        sendMainMenu(chatId, userLanguages[chatId]);
    }
});

function getLocationMessage(language, requestId, chatId) {
    const user = userNames[chatId];
    const phone = userPhoneNumbers[chatId];
    const location = userRequests[chatId].find(req => req.id === requestId).location;

    return `${translations[language].newRequestReceived}\nID: ${requestId}\nIsm: ${user}\nTelefon raqami: ${phone}\nManzil: ${location.latitude}, ${location.longitude}`;
}
