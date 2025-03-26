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
            status: 'Yangi' // Ariza holati
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
        let message = translations[lang].myRequestsHeader + '\n\n';
        requests.forEach((request) => {
            message += `${translations[lang].name}: ${request.name}\n`;
            message += `${translations[lang].phone}: ${request.phone}\n`;
            message += `${translations[lang].status}: ${request.status}\n\n`;
        });
        bot.sendMessage(chatId, message);
    }
}

console.log('Bot muvaffaqiyatli ishga tushdi!');