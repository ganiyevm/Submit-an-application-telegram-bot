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

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = 'Iltimos, tilni tanlang / Пожалуйста, выберите язык / Choose language:';
    bot.sendMessage(chatId, welcomeMessage, languageKeyboard);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Foydalanuvchi til tanlasa
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
                [{ text: language === 'uz' ? 'Ariza qoldirish' : language === 'ru' ? 'Оставить заявку' : 'Submit a request' }],
                [{ text: language === 'uz' ? 'Arizalarim' : language === 'ru' ? 'Мои заявки' : 'My requests' },
                 { text: language === 'uz' ? 'Tilni tanlash' : language === 'ru' ? 'Выбор языка' : 'Choose language' }],
                [{ text: language === 'uz' ? 'Biz bilan bog\'lanish' : language === 'ru' ? 'Связаться с нами' : 'Contact us' },
                 { text: language === 'uz' ? 'Bizning manzil' : language === 'ru' ? 'Наш адрес' : 'Our address' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    };

    const mainMenuText = language === 'uz' ? 'Asosiy menyu:' :
                          language === 'ru' ? 'Главное меню:' :
                          'Main menu:';

    const description = language === 'uz' ?
        'Ushbu bot sizga kameralarni o\'rnatish uchun ariza qoldirishda yordam beradi.' :
        language === 'ru' ?
        'Этот бот поможет вам оставить заявку на установку камер.' :
        'This bot will assist you in submitting a request for camera installation.';

    bot.sendMessage(chatId, `${mainMenuText}\n${description}`, mainMenuKeyboard);
}

function handleMainMenuSelection(selection, chatId, language) {
    const responses = {
        'uz': {
            request: 'Ariza qoldirish',
            myRequests: 'Arizalarim',
            chooseLanguage: 'Tilni tanlash',
            contact: 'Biz bilan bog\'lanish',
            address: 'Bizning manzil'
        },
        'ru': {
            request: 'Оставить заявку',
            myRequests: 'Мои заявки',
            chooseLanguage: 'Выбор языка',
            contact: 'Связаться с нами',
            address: 'Наш адрес'
        },
        'en': {
            request: 'Submit a request',
            myRequests: 'My requests',
            chooseLanguage: 'Choose language',
            contact: 'Contact us',
            address: 'Our address'
        }
    };

    const lang = responses[language];

    if (selection === lang.request) {
        bot.sendMessage(chatId, getRequestInstructions(language));
    } else if (selection === lang.myRequests) {
        sendUserRequests(chatId, language);
    } else if (selection === lang.chooseLanguage) {
        bot.sendMessage(chatId, 'Iltimos, qulay tilni tanlang:', languageKeyboard);
    } else if (selection === lang.contact) {
        bot.sendMessage(chatId, getContactInfo(language));
    } else if (selection === lang.address) {
        sendLocation(chatId);
    }
}

function getRequestInstructions(language) {
    const instructions = {
        'uz': 'Iltimos, telefon raqamingizni kiriting (masalan, +998XXXXXXXX, 998XXXXXXXXX,XXXXXXXXX): ',
        'ru': 'Пожалуйста, введите ваш номер телефона (например, +998XXXXXXXXX,+998XXXXXXXXX,XXXXXXXXX): ',
        'en': 'Please enter your phone number (e.g., +998XXXXXXXXX,+998XXXXXXXXX,XXXXXXXXX): '
    };
    return instructions[language];
}

function getContactInfo(language) {
    return language === 'uz' ? 
        `📞 Bizning telefon raqamimiz: +998997290030\nBizning telegram: @it_kaktus` :
        language === 'ru' ? 
        `📞 Наш номер телефона: +998997290030\nНаш Telegram: @it_kaktus` :
        `📞 Our phone number: +998997290030\nOur Telegram: @it_kaktus`;
}

function sendLocation(chatId) {
    const officeLocation = { latitude: 41.37149, longitude: 69.31241 };
    bot.sendLocation(chatId, officeLocation.latitude, officeLocation.longitude);
    const addressMessage = '📍 Yunusobod 19-44-47'; // Address text for all languages
    bot.sendMessage(chatId, addressMessage);
}

// Telefon raqamini olish
function handleUserPhoneInput(chatId, text) {
    const phoneRegex = /^(?:\+998\d{9}|998\d{9}|\d{9})$/gm;
    if (phoneRegex.test(text)) {
        userPhoneNumbers[chatId] = text;
        bot.sendMessage(chatId, getNameRequest(userLanguages[chatId]));
    } else {
        bot.sendMessage(chatId, getRequestInstructions(userLanguages[chatId]));
    }
}

function getNameRequest(language) {
    const requests = {
        'uz': 'Iltimos, ismingizni kiriting: ',
        'ru': 'Пожалуйста, введите ваше имя: ',
        'en': 'Please enter your name: '
    };
    return requests[language];
}

function handleUserNameInput(chatId, text) {
    userNames[chatId] = text;
    const requestLocationMessage = getLocationRequest(userLanguages[chatId]);
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
    bot.sendMessage(chatId, requestLocationMessage, locationKeyboard);
}

function getLocationRequest(language) {
    const requests = {
        'uz': 'Iltimos, manzilingizni yuboring:',
        'ru': 'Пожалуйста, отправьте ваше местоположение:',
        'en': 'Please send your location:'
    };
    return requests[language];
}

// Manzilni qabul qilish
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
    
    return language === 'uz' ?
        `Yangi ariza qabul qilindi:\nID: ${requestId}\nIsm: ${user}\nTelefon raqami: ${phone}\nManzil: ${location.latitude}, ${location.longitude}` :
        language === 'ru' ?
        `Новая заявка принята:\nID: ${requestId}\nИмя: ${user}\nНомер телефона: ${phone}\nАдрес: ${location.latitude}, ${location.longitude}` :
        `New request received:\nID: ${requestId}\nName: ${user}\nPhone number: ${phone}\nAddress: ${location.latitude}, ${location.longitude}`;
}
