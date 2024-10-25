
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

let userLanguages = {};
let userPhoneNumbers = {};
let userNames = {};
let userLocations = {};
let userRequests = {}; // Foydalanuvchilar arizalarini saqlash uchun obyekt

// Foydalanuvchiga til tanlash tugmasi
const languageKeyboard = {
    reply_markup: {
        keyboard: [[
            'O\'zbekcha',
            'Русский',
            'English',]
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};

// Bot start qilinishi bilan foydalanuvchiga til tanlash taklif qilinadi
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = 'Iltimos, tilni tanlang / Пожалуйста, выберите язык / Choose language:';
    bot.sendMessage(chatId, welcomeMessage, languageKeyboard);
});

// Foydalanuvchi til tanlaydi
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'O\'zbekcha') {
        userLanguages[chatId] = 'uz';
        sendMainMenu(chatId, 'uz');
    } else if (text === 'Русский') {
        userLanguages[chatId] = 'ru';
        sendMainMenu(chatId, 'ru');
    } else if (text === 'English') {
        userLanguages[chatId] = 'en';
        sendMainMenu(chatId, 'en');
    } else if (userLanguages[chatId]) {
        handleMainMenuSelection(text, chatId, userLanguages[chatId]);
    }
});

// Asosiy menyu yuborish
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

    bot.sendMessage(chatId, `${mainMenuText}\n`, mainMenuKeyboard);
}

// Asosiy menyu tanlovlarini boshqarish
function handleMainMenuSelection(selection, chatId, language) {
    if (selection === (language === 'uz' ? 'Ariza qoldirish' : language === 'ru' ? 'Оставить заявку' : 'Submit a request')) {
        const requestInstructions = language === 'uz' ? 
            'Ariza qoldirish uchun telefon raqamingizni kiriting: ' :
            language === 'ru' ? 
            'Пожалуйста, введите ваш номер телефона для подачи заявки: ' :
            'Please enter your phone number to submit a request: ';

        const contactKeyboard = {
            reply_markup: {
                keyboard: [
                    [{
                        text: language === 'uz' ? 'Kontakt yuborish' : language === 'ru' ? 'Отправить контакт' : 'Send contact',
                        request_contact: true // Kontaktni so'raydi
                    }],
                    [{ text: language === 'uz' ? 'Menyuga qaytish' : language === 'ru' ? 'Вернуться в меню' : 'Return to menu' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            },
        };

        bot.sendMessage(chatId, requestInstructions, contactKeyboard);
    } else if (selection === (language === 'uz' ? 'Arizalarim' : language === 'ru' ? 'Мои заявки' : 'My requests')) {
        const userRequestList = userRequests[chatId] || [];
        let responseMessage;
    
        if (userRequestList.length === 0) {
            responseMessage = language === 'uz' ? 'Sizda hech qanday ariza yo\'q.' :
                             language === 'ru' ? 'У вас нет заявок.' :
                             'You have no requests.';
        } else {
            responseMessage = language === 'uz' ? 'Sizning arizalaringiz:' :
                              language === 'ru' ? 'Ваши заявки:' :
                              'Your requests:';
            
            userRequestList.forEach(request => {
                const requestStatus = request.status; // Ariza holatini oling
                const requestMessage = language === 'uz' ?
                    `\nID: ${request.id}, Ism: ${request.name}, Telefon: ${request.phone}, Holat: ${requestStatus}` :
                    language === 'ru' ?
                    `\nID: ${request.id}, Имя: ${request.name}, Телефон: ${request.phone}, Статус: ${requestStatus}` :
                    `\nID: ${request.id}, Name: ${request.name}, Phone: ${request.phone}, Status: ${requestStatus}`;
                
                responseMessage += requestMessage; // Foydalanuvchi uchun xabarni qo'shing
            });
        }
    
        bot.sendMessage(chatId, responseMessage);
    
    } else if (selection === (language === 'uz' ? 'Tilni tanlash' : language === 'ru' ? 'Выбор языка' : 'Choose language')) {
        bot.sendMessage(chatId, 'Iltimos, qulay tilni tanlang:', languageKeyboard);
    } else if (selection === (language === 'uz' ? 'Biz bilan bog\'lanish' : language === 'ru' ? 'Связаться с нами' : 'Contact us')) {
        const contactInfo = language === 'uz' ? 
            `📞 Bizning telefon raqamimiz: +998997290030\nBizning telegram: @it_kaktus` :
            language === 'ru' ? 
            `📞 Наш номер телефона: +998997290030\nНаш Telegram: @it_kaktus` :
            `📞 Our phone number: +998997290030\nOur Telegram: @it_kaktus`;

        bot.sendMessage(chatId, contactInfo);
    } else if (selection === (language === 'uz' ? 'Bizning manzil' : language === 'ru' ? 'Наш адрес' : 'Our address')) {
        const officeLocation = { latitude: 41.37149, longitude: 69.31241 };
        bot.sendLocation(chatId, officeLocation.latitude, officeLocation.longitude);
        const addressMessage = language === 'uz' ? '📍 Yunusobod 19-44-47' :
                               language === 'ru' ? '📍 Юнусабад 19-44-47' :
                               '📍 Yunusabad 19-44-47';

        bot.sendMessage(chatId, addressMessage);
    } else if (selection === (language === 'uz' ? 'Menyuga qaytish' : language === 'ru' ? 'Вернуться в меню' : 'Return to menu')) {
        sendMainMenu(chatId, language); // Menyuga qaytish
    }
}

// Kontaktni qabul qilish
bot.on('contact', (msg) => {
    const chatId = msg.chat.id;
    const contact = msg.contact;

    if (contact) {
        userPhoneNumbers[chatId] = contact.phone_number;
        userNames[chatId] = msg.from.first_name || "No Name"; // Foydalanuvchining ismini olish

        // Manzil so'rash
        const requestLocationMessage = userLanguages[chatId] === 'uz' ?
            'Iltimos, manzilingizni yuboring:' :
            userLanguages[chatId] === 'ru' ?
            'Пожалуйста, отправьте ваше местоположение:' :
            'Please send your location:';

        const locationKeyboard = {
            reply_markup: {
                keyboard: [
                    [{
                        text: userLanguages[chatId] === 'uz' ? 'Yuborish' :
                              userLanguages[chatId] === 'ru' ? 'Отправить' :
                              'Send',
                        request_location: true // Manzilni so'raydi
                    }],
                    [{
                        text: userLanguages[chatId] === 'uz' ? 'Menyuga qaytish' :
                              userLanguages[chatId] === 'ru' ? 'Вернуться в меню' :
                              'Return to menu'
                    }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        };

        bot.sendMessage(chatId, requestLocationMessage, locationKeyboard);
    }
});

// Manzilni qabul qilish
bot.on('location', (msg) => {
    const chatId = msg.chat.id;
    const location = msg.location;

    if (location) {
        const channelId = '@mashinabozoruzzzz'; // Sizning kanal ID'ingizni kiriting

        // Yangi ariza ID'si
        const requestId = Date.now();
        userRequests[chatId] = userRequests[chatId] || [];
        userRequests[chatId].push({
            id: requestId,
            name: userNames[chatId],
            phone: userPhoneNumbers[chatId],
            location: { latitude: location.latitude, longitude: location.longitude },
            status: 'Active' // Yangi holat
        });

        // Kanalga foydalanuvchi ismi, telefon raqami va manzilini yuborish
        const locationMessage = userLanguages[chatId] === 'uz' ?
            `Yangi ariza qabul qilindi:\nID: ${requestId}\nIsm: ${userNames[chatId]}\nTelefon raqami: ${userPhoneNumbers[chatId]}\nManzil: ${location.latitude}, ${location.longitude}` :
            userLanguages[chatId] === 'ru' ?
            `Новая заявка принята:\nID: ${requestId}\nИмя: ${userNames[chatId]}\nНомер телефона: ${userPhoneNumbers[chatId]}\nАдрес: ${location.latitude}, ${location.longitude}` :
            `New request received:\nID: ${requestId}\nName: ${userNames[chatId]}\nPhone number: ${userPhoneNumbers[chatId]}\nAddress: ${location.latitude}, ${location.longitude}`;

        bot.sendLocation(channelId, location.latitude, location.longitude).then(() => {
            bot.sendMessage(channelId, locationMessage);
        });

        bot.sendMessage(chatId, 'Ma\'lumotlaringiz qabul qilindi.');
        sendMainMenu(chatId, userLanguages[chatId]);
    }
});
