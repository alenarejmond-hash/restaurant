import React, { useState, useEffect, useMemo } from 'react';
import {
  Utensils, Search, ShoppingBag, X, Plus, Minus, Clock,
  CheckCircle2, Code, Sparkles, ChevronRight,
  RefreshCw, ChevronDown, ShieldCheck, Trash2, Bell, Receipt, Banknote, CreditCard, Send
} from 'lucide-react';

// ============================================================================
// 1. TRANSLATIONS & MULTILINGUAL SETUP
// ============================================================================
const translations = {
  am: {
    bistroTitle: "Վաղարշապատ",
    bistroSubtitle: "QR Մենյու և Պատվերներ",
    echmiadzin: "Էջմիածին",
    sacredCity: "• Սուրբ քաղաք • Ավանդական համեր",
    heroTitle: "Ավանդական հայկական խոհանոց և գրիլ",
    heroDesc: "Ընտրեք ուտեստներ, նշեք ցանկությունները և ձևակերպեք պատվերը անմիջապես սեղանին առանց մատուցողին սպասելու:",
    table: "Սեղան",
    searchPlaceholder: "Որոնել ուտեստներ...",
    allCategories: "Բոլորը",
    callWaiter: "Կանչել մատուցողին",
    requestBill: "Խնդրել հաշիվը",
    hideStopList: "Թաքցնել ստոպ-լիստը",
    hiddenStopList: "Ստոպ-լիստը թաքցված է",
    nothingFound: "Ոչինչ չի գտնվել",
    resetFilters: "Մաքրել ֆիլտրերը",
    prepTime: "Պատրաստման ժամանակ",
    portion: "Չափաբաժին",
    energy: "Էներգիա",
    cost: "Արժեք",
    addToCart: "Ավելացնել",
    inStopList: "Ստոպ-լիստում է",
    cartTitle: "Զամբյուղ",
    cartEmpty: "Զամբյուղը դատարկ է",
    clear: "Մաքրել",
    recommendations: "Այս ուտեստի հետ հաճախ վերցնում են...",
    itemsInCart: "Ապրանքներ պատվերում:",
    serviceFee: "Սպասարկում (0%):",
    totalToPay: "Ընդամենը վճարման:",
    sendOrder: "Ձևակերպել պատվերը",
    confirmOrder: "Հաստատել պատվերը",
    orderConfirmed: "Պատվերն ընդունված է!",
    cash: "Կանխիկ",
    card: "Քարտով",
    billRequested: "Հաշիվը պահանջված է",
    waiterCalled: "Մատուցողը շուտով կմոտենա",
    guestName: "Անուն (կամընտիր):",
    guestPhone: "Հեռախոս (կամընտիր):",
    payOnReceipt: "Վճարում ստանալիս:",
    backToMenu: "Վերադառնալ մենյու"
  },
  ru: {
    bistroTitle: "Вагаршапат",
    bistroSubtitle: "QR Меню & Заказ к столику",
    echmiadzin: "Эчмиадзин",
    sacredCity: "• Священный город • Аутентичные вкусы",
    heroTitle: "Традиционная армянская кухня & гриль",
    heroDesc: "Выберите блюда, укажите пожелания и оформите заказ прямо к столику без ожидания официанта.",
    table: "Стол",
    searchPlaceholder: "Поиск блюд (кюфта, вино...)",
    allCategories: "Все",
    callWaiter: "Позвать официанта",
    requestBill: "Попросить счет",
    hideStopList: "Скрыть стоп-лист",
    hiddenStopList: "Скрыт стоп-лист",
    nothingFound: "Ничего не найдено",
    resetFilters: "Сбросить фильтры",
    prepTime: "Время готовки",
    portion: "Порция",
    energy: "Энергия",
    cost: "Стоимость",
    addToCart: "В заказ",
    inStopList: "В стоп-листе",
    cartTitle: "Корзина",
    cartEmpty: "Ваша корзина пуста",
    clear: "Очистить",
    recommendations: "С этим блюдом часто берут...",
    itemsInCart: "Позиций в заказе:",
    serviceFee: "Обслуживание (0%):",
    totalToPay: "Итого к оплате:",
    sendOrder: "Оформить заказ",
    confirmOrder: "Подтвердить и заказать",
    orderConfirmed: "Заказ передан на кухню!",
    cash: "Наличными",
    card: "Картой",
    billRequested: "Счет запрошен",
    waiterCalled: "Официант скоро подойдет",
    guestName: "Имя гостя (по желанию):",
    guestPhone: "Телефон (по желанию):",
    payOnReceipt: "К оплате при получении:",
    backToMenu: "Вернуться в меню"
  },
  en: {
    bistroTitle: "Vagharshapat",
    bistroSubtitle: "QR Menu & Table Ordering",
    echmiadzin: "Echmiadzin",
    sacredCity: "• Sacred City • Authentic Tastes",
    heroTitle: "Traditional Armenian Cuisine & Grill",
    heroDesc: "Select dishes, add your preferences, and place your order directly to your table without waiting.",
    table: "Table",
    searchPlaceholder: "Search dishes...",
    allCategories: "All",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    hideStopList: "Hide Stop-List",
    hiddenStopList: "Stop-List Hidden",
    nothingFound: "Nothing found",
    resetFilters: "Reset Filters",
    prepTime: "Prep Time",
    portion: "Portion",
    energy: "Calories",
    cost: "Price",
    addToCart: "Add",
    inStopList: "Sold Out",
    cartTitle: "Your Order",
    cartEmpty: "Cart is empty",
    clear: "Clear",
    recommendations: "Frequently bought with...",
    itemsInCart: "Items in order:",
    serviceFee: "Service (0%):",
    totalToPay: "Total to pay:",
    sendOrder: "Place Order",
    confirmOrder: "Confirm Order",
    orderConfirmed: "Order sent to kitchen!",
    cash: "Cash",
    card: "Card",
    billRequested: "Bill requested",
    waiterCalled: "Waiter is on the way",
    guestName: "Name (optional):",
    guestPhone: "Phone (optional):",
    payOnReceipt: "To pay on receipt:",
    backToMenu: "Back to Menu"
  }
};

// ============================================================================
// 2. MULTILINGUAL MOCK DATA & UPSELLS
// ============================================================================
const MOCK_CATEGORIES = {
  hotDishes: { am: 'Տաք ուտեստներ', ru: 'Горячие блюда', en: 'Hot Dishes' },
  grill: { am: 'Խորոված', ru: 'Мангал & Гриль', en: 'Grill & BBQ' },
  snacks: { am: 'Նախուտեստներ', ru: 'Закуски', en: 'Appetizers' },
  desserts: { am: 'Աղանդեր', ru: 'Десерты', en: 'Desserts' },
  drinks: { am: 'Ըմպելիքներ', ru: 'Напитки', en: 'Drinks' },
};

const DEFAULT_MENU_ITEMS = [
  {
    id: 'ech-1',
    category: MOCK_CATEGORIES.hotDishes,
    name: { am: 'Էջմիածնի Քյուֆթա', ru: 'Эчмиадзинская Кюфта', en: 'Echmiadzin Kyufta' },
    description: {
      am: 'Ավանդական հորթի միս հարած կարագով և կոնյակի բույրով:',
      ru: 'Аутентичная отбивная телятина со взбитым сливочным маслом и коньячным ароматом.',
      en: 'Authentic beaten veal with whipped butter and a hint of cognac.'
    },
    price: 4800,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    available: true,
    tags: ['⭐ Top'],
    prepTime: '25-30 min', calories: '620 kcal', weight: '380 g'
  },
  {
    id: 'ech-2',
    category: MOCK_CATEGORIES.grill,
    name: { am: 'Խոզի մատերով խորոված', ru: 'Шашлык из Корейки (Хоровац)', en: 'Pork Chops BBQ' },
    description: {
      am: 'Մարինացված հայկական լեռնային խոտաբույսերով, մատուցվում է լավաշով:',
      ru: 'Маринованный в армянских горных травах шашлык на углях. Подается с тонким лавашом.',
      en: 'Charcoal grilled pork marinated in Armenian mountain herbs. Served with lavash.'
    },
    price: 5200,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    available: true,
    tags: ['⭐ Top'],
    prepTime: '30-35 min', calories: '780 kcal', weight: '400 g'
  },
  {
    id: 'ech-3',
    category: MOCK_CATEGORIES.snacks,
    name: { am: 'Թփով տոլմա', ru: 'Толма в виноградных листьях', en: 'Grape Leaf Tolma' },
    description: {
      am: 'Նուրբ տավարի միս բազիլիկով և բրնձով՝ խաղողի տերևներում:',
      ru: 'Нежный фарш из отборной говядины с базиликом и рисом в молодых виноградных листьях.',
      en: 'Tender beef mince with basil and rice wrapped in young grape leaves.'
    },
    price: 3600,
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    available: true,
    tags: [],
    prepTime: '15-20 min', calories: '450 kcal', weight: '300 g'
  },
  {
    id: 'ech-5',
    category: MOCK_CATEGORIES.grill,
    name: { am: 'Սևանի Իշխան', ru: 'Севанский Ишхан на углях', en: 'Sevan Ishkhan (Trout)' },
    description: {
      am: 'Ամբողջական իշխան թարխունով և կիտրոնով:',
      ru: 'Цельная форель с эстрагоном (тархуном) и лимонно-чесночным маслом на фруктовых углях.',
      en: 'Whole Sevan trout baked on fruit coals with tarragon and garlic-lemon butter.'
    },
    price: 6400,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    available: true,
    tags: ['⭐ Top'],
    prepTime: '30-40 min', calories: '490 kcal', weight: '350 g'
  },
  {
    id: 'ech-6',
    category: MOCK_CATEGORIES.snacks,
    name: { am: 'Պանրի տեսականի', ru: 'Сырное плато Лори и Мотал', en: 'Armenian Cheese Platter' },
    description: {
      am: 'Հնեցված այծի պանիր, էջմիածնի չանախ, ընկույզ և մեղր:',
      ru: 'Выдержанный козий сыр, эчмиадзинский чанах, травы, грецкий орех в меду.',
      en: 'Aged goat cheese, Echmiadzin chanakh, herbs, and walnuts in honey.'
    },
    price: 4500,
    image: 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80',
    available: false, // Stop-list
    tags: ['🌱 Vegan'],
    prepTime: '10 min', calories: '420 kcal', weight: '280 g'
  },
  {
    id: 'ech-7',
    category: MOCK_CATEGORIES.snacks,
    name: { am: 'Ավելուկով աղցան', ru: 'Салат с Авелуком', en: 'Aveluk Salad' },
    description: {
      am: 'Լեռնային չորացրած ավելուկ ընկույզով և նռան հատիկներով:',
      ru: 'Горный сушеный авелук, карамелизированный лук, грецкий орех и гранат.',
      en: 'Dried mountain aveluk (wild sorrel) with walnuts and pomegranate seeds.'
    },
    price: 2600,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    available: true,
    tags: ['🌱 Vegan'],
    prepTime: '15 min', calories: '280 kcal', weight: '250 g'
  }
];

const UPSELL_ITEMS = [
  {
    id: 'up-1',
    name: { am: 'Թարմ Լավաշ', ru: 'Свежий Лаваш 🫓', en: 'Fresh Lavash' },
    price: 300,
    image: 'https://images.unsplash.com/photo-1577048981588-080b0d125bea?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up-2',
    name: { am: 'Տղեմալի Սոուս', ru: 'Соус Ткемали 🌶️', en: 'Tkemali Sauce' },
    price: 800,
    image: 'https://images.unsplash.com/photo-1590483863484-90aebaf5eefb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up-3',
    name: { am: 'Սուրճ ավազի վրա', ru: 'Кофе на песке ☕', en: 'Armenian Coffee' },
    price: 1100,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'up-4',
    name: { am: 'Տնական Գաթա', ru: 'Домашняя Гата 🍰', en: 'Homemade Gata' },
    price: 1500,
    image: 'https://images.unsplash.com/photo-1621236378699-8597faa6a71e?auto=format&fit=crop&w=300&q=80'
  }
];

// ============================================================================
// 3. MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [lang, setLang] = useState('ru'); // Default to RU for presentation based on prompt
  const tLang = translations[lang];

  // Menu data states
  const [menuItems] = useState(DEFAULT_MENU_ITEMS);
  const [activeCategoryEn, setActiveCategoryEn] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideStopList, setHideStopList] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Table logic (Dine-in Only)
  const [tableNumber, setTableNumber] = useState('1');
  const [showTablePicker, setShowTablePicker] = useState(false);

  // Cart states
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [honeypotValue, setHoneypotValue] = useState('');

  // Service Modals
  const [showBillModal, setShowBillModal] = useState(false);
  
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCallWaiter = () => {
    // Имитация отправки вебхука в Telegram
    const telegramMessage = `🔔 Столик №${tableNumber} просит подойти официанта`;
    console.log("🚀 [ТЕЛЕГРАМ] ->", telegramMessage);
    showToast(tLang.waiterCalled);
  };

  const handleRequestBillClick = () => {
    setShowBillModal(true);
  };

  const handleRequestBill = (method) => {
    // Имитация отправки вебхука в Telegram
    const paymentType = method === 'cash' ? 'Наличные' : 'Карта';
    const telegramMessage = `💳 Столик №${tableNumber} просит счет (Оплата: ${paymentType})`;
    console.log("🚀 [ТЕЛЕГРАМ] ->", telegramMessage);
    showToast(`${tLang.billRequested} (${method === 'cash' ? tLang.cash : tLang.card})`);
    setShowBillModal(false);
  };

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTable = urlParams.get('table');
      if (urlTable && urlTable.trim().length > 0) {
        setTableNumber(urlTable.trim());
      } else {
        const saved = localStorage.getItem('ech_table_no');
        if (saved) setTableNumber(saved);
        else setTableNumber('1'); // Default to table 1 if nothing is set
      }
    } catch (e) {
      console.warn('URL parsing fallback:', e);
    }
  }, []);

  const handleUpdateTable = (newTable) => {
    const sanitized = String(newTable).trim() || '1';
    setTableNumber(sanitized);
    localStorage.setItem('ech_table_no', sanitized);
    showToast(`${tLang.table} #${sanitized}`);
    
    // Update URL
    try {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('table', sanitized);
      window.history.replaceState({}, '', newUrl.toString());
    } catch (e) {}
    
    setShowTablePicker(false);
  };

  const categories = useMemo(() => {
    const list = [];
    menuItems.forEach(item => {
      if (!list.some(c => c.en === item.category.en)) {
        list.push(item.category);
      }
    });
    return list;
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (hideStopList && !item.available) return false;
      if (activeCategoryEn !== 'All' && item.category.en !== activeCategoryEn) return false;

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchAm = item.name.am.toLowerCase().includes(q);
        const matchRu = item.name.ru.toLowerCase().includes(q);
        const matchEn = item.name.en.toLowerCase().includes(q);
        return matchAm || matchRu || matchEn;
      }
      return true;
    });
  }, [menuItems, activeCategoryEn, searchQuery, hideStopList]);

  const addToCart = (dish, customComment = '') => {
    if (dish.available === false) { // Explicit false check, upsells don't have available initially
      showToast(tLang.inStopList);
      return;
    }
    setCart(prev => {
      const current = prev[dish.id];
      const newQty = current ? current.quantity + 1 : 1;
      return {
        ...prev,
        [dish.id]: {
          ...dish,
          quantity: newQty,
          comment: customComment || (current ? current.comment : '')
        }
      };
    });
    showToast(`«${dish.name[lang]}» ${tLang.addToCart}`);
  };

  const updateQuantity = (dishId, delta) => {
    setCart(prev => {
      const current = prev[dishId];
      if (!current) return prev;
      const nextQty = current.quantity + delta;
      if (nextQty <= 0) {
        const updated = { ...prev };
        delete updated[dishId];
        return updated;
      }
      return { ...prev, [dishId]: { ...current, quantity: nextQty } };
    });
  };

  const removeFromCart = (dishId) => {
    setCart(prev => {
      const updated = { ...prev };
      delete updated[dishId];
      return updated;
    });
  };

  const clearCart = () => setCart({});
  
  const cartList = useMemo(() => Object.values(cart), [cart]);
  const cartItemCount = useMemo(() => cartList.reduce((sum, i) => sum + i.quantity, 0), [cartList]);
  const cartSubtotal = useMemo(() => cartList.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartList]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (honeypotValue.trim().length > 0) return; // Anti-spam
    if (cartList.length === 0) return;

    setIsSubmittingOrder(true);
    try {
      await new Promise(res => setTimeout(res, 1200));
      const newOrderId = `ECH-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderConfirmed({
        id: newOrderId,
        table: tableNumber,
        total: cartSubtotal
      });
      setCart({});
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F13] text-gray-100 font-sans antialiased selection:bg-amber-500 selection:text-black pb-28">
      
      {/* CSS For Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-amber-500 text-zinc-950 px-5 py-2.5 rounded-full font-bold shadow-xl shadow-amber-500/20 border border-amber-300 flex items-center gap-2 animate-fade-up text-sm whitespace-nowrap">
          <Sparkles className="w-4 h-4 text-zinc-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0F0F13]/80 border-b border-white/5 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-300/40">
              <Utensils className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  {tLang.bistroTitle} <span className="text-amber-400 font-serif italic">Bistro</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {tLang.echmiadzin}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">{tLang.bistroSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              {['am', 'ru', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                    lang === l ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Table Indicator Pill */}
            <button
              onClick={() => setShowTablePicker(true)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-amber-500/30 hover:border-amber-400/80 text-amber-400 transition-all hover:scale-105 active:scale-95 shadow-inner"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold text-zinc-300">{tLang.table}:</span>
              <span className="text-xs font-bold text-amber-400">#{tableNumber}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-2">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800/80 to-zinc-900 border border-white/5 p-5 shadow-2xl backdrop-blur-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
                <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">{tLang.echmiadzin}</span>
                <span>{tLang.sacredCity}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {tLang.heroTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                {tLang.heroDesc}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHideStopList(!hideStopList)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  hideStopList
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{hideStopList ? tLang.hiddenStopList : tLang.hideStopList}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Buttons (Always Visible for Dine-in) */}
      <div className="max-w-5xl mx-auto px-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCallWaiter}
            className="group flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all shadow-lg active:scale-95"
          >
            <Bell className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-200">{tLang.callWaiter}</span>
          </button>
          <button
            onClick={handleRequestBillClick}
            className="group flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all shadow-lg active:scale-95"
          >
            <Receipt className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-200">{tLang.requestBill}</span>
          </button>
        </div>
      </div>

      {/* Sticky Categories & Search */}
      <div className="sticky top-[61px] z-30 backdrop-blur-xl bg-[#0F0F13]/90 border-b border-white/5 py-2.5 mt-4">
        <div className="max-w-5xl mx-auto px-4 space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder={tLang.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-9 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
            <button
              onClick={() => setActiveCategoryEn('All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                activeCategoryEn === 'All'
                  ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-300'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{tLang.allCategories}</span>
            </button>

            {categories.map((cat) => {
              const isSelected = activeCategoryEn === cat.en;
              return (
                <button
                  key={cat.en}
                  onClick={() => setActiveCategoryEn(cat.en)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-300'
                      : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{cat[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Menu Grid */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10 p-8">
            <Utensils className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-300">{tLang.nothingFound}</h3>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategoryEn('All'); setHideStopList(false); }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded-xl transition-colors"
            >
              {tLang.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((dish, index) => {
              const inCartItem = cart[dish.id];
              const isUnavailable = !dish.available;
              const delay = index * 0.05;

              return (
                <div
                  key={dish.id}
                  style={{ animationDelay: `${delay}s` }}
                  className={`animate-fade-up group relative rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                    isUnavailable
                      ? 'bg-zinc-950/40 border border-white/5 opacity-70'
                      : 'bg-white/5 border border-white/5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1'
                  }`}
                >
                  {/* Dish Image */}
                  <div
                    onClick={() => setSelectedDish(dish)}
                    className="relative aspect-video w-full overflow-hidden cursor-pointer bg-zinc-950"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name[lang]}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isUnavailable ? 'grayscale' : ''}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-transparent opacity-90" />

                    {/* Tags Top Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center flex-wrap gap-1.5 pointer-events-none">
                      {dish.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold shadow-md">
                          {tag}
                        </span>
                      ))}
                      {isUnavailable && (
                        <span className="px-2 py-1 rounded-lg bg-rose-900/90 text-rose-200 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider ml-auto">
                          {tLang.inStopList}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {dish.prepTime}
                      </span>
                      {dish.weight && <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/5">{dish.weight}</span>}
                    </div>
                  </div>

                  {/* Info Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1">
                        {dish.category[lang]}
                      </p>
                      <h3
                        onClick={() => setSelectedDish(dish)}
                        className="text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {dish.name[lang]}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {dish.description[lang]}
                      </p>
                    </div>

                    {/* Cart Controls */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{tLang.cost}</div>
                        <div className="text-lg font-black text-amber-400">
                          {dish.price.toLocaleString()} <span className="text-sm font-semibold">֏</span>
                        </div>
                      </div>

                      {isUnavailable ? (
                        <div className="text-xs text-zinc-500 italic px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                          {tLang.inStopList}
                        </div>
                      ) : inCartItem ? (
                        <div className="flex items-center gap-2 bg-black/40 border border-amber-500/40 rounded-xl p-1 shadow-inner backdrop-blur-sm">
                          <button
                            onClick={() => updateQuantity(dish.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                          >
                            {inCartItem.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3.5 h-3.5" />}
                          </button>
                          <span className="text-xs font-bold px-1 min-w-[1.5rem] text-center text-amber-300">{inCartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(dish.id, 1)}
                            className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center transition-all font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(dish)}
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{tLang.addToCart}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Dish Details Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-sm border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-video w-full">
              <img src={selectedDish.image} alt={selectedDish.name[lang]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <p className="text-xs font-bold text-amber-400 uppercase mb-1">{selectedDish.category[lang]}</p>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                {selectedDish.name[lang]}
                {selectedDish.tags.map(tag => (
                   <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-white border border-white/10">{tag}</span>
                ))}
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{selectedDish.description[lang]}</p>

              <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-black/40 rounded-2xl border border-white/5 text-center">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">{tLang.prepTime}</div>
                  <div className="text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.prepTime}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">{tLang.portion}</div>
                  <div className="text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.weight || '—'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">{tLang.energy}</div>
                  <div className="text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.calories || '—'}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <span className="text-xs text-zinc-500 uppercase">{tLang.cost}</span>
                  <div className="text-xl font-black text-amber-400">{selectedDish.price.toLocaleString()} ֏</div>
                </div>
                {selectedDish.available ? (
                  <button
                    onClick={() => { addToCart(selectedDish); setSelectedDish(null); }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{tLang.addToCart}</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-800/60 px-3 py-1.5 rounded-lg">
                    {tLang.inStopList}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bill Request Modal */}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-sm w-full rounded-3xl p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-4">{tLang.requestBill} ({tLang.table} #{tableNumber})</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleRequestBill('cash')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400 transition-all"
              >
                <Banknote className="w-6 h-6 text-emerald-400" />
                <span className="text-xs font-bold">{tLang.cash}</span>
              </button>
              <button
                onClick={() => handleRequestBill('card')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400 transition-all"
              >
                <CreditCard className="w-6 h-6 text-sky-400" />
                <span className="text-xs font-bold">{tLang.card}</span>
              </button>
            </div>
            <button onClick={() => setShowBillModal(false)} className="mt-5 text-xs text-zinc-500 hover:text-white p-2 font-medium">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* STICKY CART (Bottom Fixed Panel) */}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center animate-fade-up pointer-events-none">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full max-w-md bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold p-4 rounded-3xl shadow-[0_8px_30px_rgb(245,158,11,0.25)] flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center font-black text-base shadow-inner">
                {cartItemCount}
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider font-extrabold text-zinc-900/80">
                  {tLang.table} #{tableNumber}
                </div>
                <div className="text-sm font-bold">{tLang.cartTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight">
                {cartSubtotal.toLocaleString()} ֏
              </span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* CART DRAWER (Bottom Sheet Modal) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Bottom Sheet Box */}
          <div className="relative w-full max-w-2xl mx-auto bg-zinc-900 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col rounded-t-[2.5rem] max-h-[85vh] animate-slide-up">
            
            {/* Drawer Handle */}
            <div className="w-full flex justify-center pt-3 pb-2 shrink-0 cursor-pointer" onClick={() => setIsCartOpen(false)}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 pb-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-white text-xl">
                  {tLang.cartTitle} (#{tableNumber})
                </h3>
              </div>
              <button onClick={clearCart} className="text-xs font-bold text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" /> <span>{tLang.clear}</span>
              </button>
            </div>

            {/* Scrollable Order List & Upsell Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {cartList.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 flex flex-col items-center">
                  <ShoppingBag className="w-12 h-12 mb-3 opacity-40" />
                  <p className="text-sm font-medium">{tLang.cartEmpty}</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartList.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-3xl border border-white/5">
                      <img src={item.image} alt={item.name[lang] || item.name.am} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-white text-sm line-clamp-2 leading-tight mb-1">
                          {item.name[lang] || item.name.am}
                        </h4>
                        <div className="text-amber-400 font-extrabold text-sm">
                          {(item.price * item.quantity).toLocaleString()} ֏
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1 border border-white/5">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-zinc-400 hover:text-white transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-white min-w-[1ch] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-amber-400 hover:text-amber-300 transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-zinc-500 hover:text-rose-400 flex items-center gap-1 uppercase px-2 py-1 transition-colors">
                          <Trash2 className="w-3 h-3" /> Убрать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* UPSELL / CROSS-SELL BLOCK */}
              {cartList.length > 0 && (
                <div className="mt-2 mb-6">
                  <h3 className="px-6 text-base font-extrabold text-white mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    {tLang.recommendations}
                  </h3>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2 snap-x">
                    {UPSELL_ITEMS.map(upItem => (
                      <div key={upItem.id} className="min-w-[140px] snap-start bg-white/5 border border-white/10 rounded-3xl p-3 flex flex-col items-center text-center backdrop-blur-md">
                        <img src={upItem.image} alt={upItem.name[lang]} className="w-24 h-24 rounded-2xl object-cover mb-3 shadow-md" />
                        <span className="text-xs font-bold text-white mb-1 line-clamp-2 flex-1">{upItem.name[lang]}</span>
                        <span className="text-amber-400 text-sm font-extrabold mb-3">{upItem.price.toLocaleString()} ֏</span>
                        <button
                          onClick={() => addToCart({...upItem, available: true, category: {am:'',ru:'',en:''}, tags:[], description:{am:'',ru:'',en:''}})}
                          className="w-full bg-white/10 hover:bg-amber-500 hover:text-black py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> <span>{tLang.addToCart}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cartList.length > 0 && (
              <div className="px-6 py-5 border-t border-white/5 bg-zinc-950 shrink-0 rounded-t-3xl pb-safe">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{tLang.totalToPay}</span>
                    <span className="text-zinc-500 text-[10px] mt-0.5">{tLang.itemsInCart} {cartItemCount}</span>
                  </div>
                  <span className="text-3xl font-black text-white">
                    {cartSubtotal.toLocaleString()} <span className="text-amber-500 font-bold">֏</span>
                  </span>
                </div>
                
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-base shadow-[0_8px_20px_rgb(245,158,11,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                   {tLang.sendOrder} <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Final Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-md w-full rounded-3xl p-6 shadow-2xl relative">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-xl text-white mb-5 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" /> {tLang.confirmOrder}
            </h3>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <input type="text" value={honeypotValue} onChange={(e) => setHoneypotValue(e.target.value)} style={{ display: 'none' }} tabIndex={-1} />

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                 <div className="text-xs text-zinc-400 uppercase font-medium">{tLang.table}</div>
                 <div className="text-lg font-black text-amber-400">#{tableNumber}</div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1.5 font-medium">{tLang.guestName}</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors" />
              </div>
              
              <div>
                <label className="text-xs text-zinc-300 block mb-1.5 font-medium">{tLang.guestPhone}</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors" />
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex justify-between items-center mt-6">
                <span className="text-zinc-300 text-sm font-medium">{tLang.payOnReceipt}</span>
                <span className="text-lg font-black text-amber-400">{cartSubtotal.toLocaleString()} ֏</span>
              </div>

              <button
                type="submit" disabled={isSubmittingOrder}
                className="w-full py-4 rounded-2xl bg-amber-400 text-zinc-950 font-extrabold text-sm flex items-center justify-center gap-2 mt-4 hover:bg-amber-300 transition-colors"
              >
                {isSubmittingOrder ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                <span>{tLang.confirmOrder}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-amber-500/40 max-w-sm w-full rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mt-2">{tLang.orderConfirmed}</h3>
            <div className="mt-5 p-4 bg-black/40 rounded-2xl border border-white/10 text-sm text-left">
               <div className="flex justify-between text-zinc-400 mb-2">
                 <span>ID:</span><span className="font-bold text-white">{orderConfirmed.id}</span>
               </div>
               <div className="flex justify-between text-zinc-400">
                 <span>Итого:</span><span className="font-bold text-amber-400">{orderConfirmed.total.toLocaleString()} ֏</span>
               </div>
            </div>
            <button onClick={() => setOrderConfirmed(null)} className="mt-6 w-full py-3.5 bg-amber-400 text-zinc-950 font-bold text-sm rounded-xl hover:bg-amber-300 transition-colors">
              {tLang.backToMenu}
            </button>
          </div>
        </div>
      )}

      {/* Table Picker */}
      {showTablePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 max-w-sm w-full rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-white text-lg">{tLang.table}</h3>
              <button onClick={() => setShowTablePicker(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['1', '2', '3', '4', '5', '6', 'VIP 1', 'VIP 2'].map(tbl => (
                <button
                  key={tbl} onClick={() => handleUpdateTable(tbl)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all ${tableNumber === tbl ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                >#{tbl}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}