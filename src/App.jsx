import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Utensils, Search, ShoppingBag, X, Plus, Minus, CheckCircle2, Sparkles, ChevronRight,
  RefreshCw, ChevronDown, ShieldCheck, Trash2, Bell, Receipt, Banknote, CreditCard, Send
} from 'lucide-react';

const translations = {
  am: {
    bistroTitle: "Վաղարշապատ",
    bistroSubtitle: "QR Մենյու և Պատվերներ",
    echmiadzin: "Էջմիածին",
    sacredCity: "• Սուրբ քաղաք • Ավանդական համեր",
    heroTitle: "Ավանդական հայկական խոհանոց",
    heroDesc: "Ընտրեք ուտեստներ, նշեք ցանկությունները և ձևակերպեք պատվերը անմիջապես սեղանին առանց մատուցողին սպասելու:",
    table: "Սեղան",
    searchPlaceholder: "Որոնել ուտեստներ...",
    callWaiter: "Կանչել մատուցողին",
    requestBill: "Խնդրել հաշիվը",
    hideStopList: "Թաքցնել ստոպ-լիստը",
    hiddenStopList: "Ստոպ-լիստը թաքցված է",
    nothingFound: "Ոչինչ չի գտնվել",
    resetFilters: "Մաքրել որոնումը",
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
    totalToPay: "Ընդամենը վճարման:",
    sendOrder: "Ձևակերպել պատվերը",
    confirmOrder: "Հաստատել պատվերը",
    orderConfirmed: "Շնորհակալություն: Պատվերն ընդունված է:",
    orderConfirmedSub: "Մատուցողը շուտով կմոտենա հաստատելու համար:",
    cash: "Կանխիկ",
    card: "Քարտով",
    billRequested: "Հաշիվը պահանջված է",
    waiterCalled: "Մատուցողը շուտով կմոտենա",
    guestName: "Անուն (կամընտիր):",
    guestPhone: "Հեռախոս (կամընտիր):",
    payOnReceipt: "Պատվերի ընդհանուր գումարը՝",
    backToMenu: "Վերադառնալ մենյու",
    loading: "Բեռնվում է մենյուն..."
  },
  ru: {
    bistroTitle: "Вагаршапат",
    bistroSubtitle: "QR Меню & Заказ к столику",
    echmiadzin: "Эчмиадзин",
    sacredCity: "• Священный город • Аутентичные вкусы",
    heroTitle: "Традиционная армянская кухня",
    heroDesc: "Выберите блюда, укажите пожелания и оформите заказ прямо к столику без ожидания официанта.",
    table: "Стол",
    searchPlaceholder: "Поиск блюд (кюфта, вино...)",
    callWaiter: "Позвать официанта",
    requestBill: "Попросить счет",
    hideStopList: "Скрыть стоп-лист",
    hiddenStopList: "Скрыт стоп-лист",
    nothingFound: "Ничего не найдено",
    resetFilters: "Сбросить поиск",
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
    totalToPay: "Итого к оплате:",
    sendOrder: "Оформить заказ",
    confirmOrder: "Подтвердить и заказать",
    orderConfirmed: "Спасибо! Ваш заказ передан на кухню",
    orderConfirmedSub: "Официант скоро подойдет к вашему столику для подтверждения.",
    cash: "Наличными",
    card: "Картой",
    billRequested: "Счет запрошен",
    waiterCalled: "Официант скоро подойдет",
    guestName: "Имя гостя (по желанию):",
    guestPhone: "Телефон (по желанию):",
    payOnReceipt: "Сумма заказа:",
    backToMenu: "Вернуться в меню",
    loading: "Загружаем меню..."
  },
  en: {
    bistroTitle: "Vagharshapat",
    bistroSubtitle: "QR Menu & Table Ordering",
    echmiadzin: "Echmiadzin",
    sacredCity: "• Sacred City • Authentic Tastes",
    heroTitle: "Traditional Armenian Cuisine",
    heroDesc: "Select dishes, add your preferences, and place your order directly to your table without waiting.",
    table: "Table",
    searchPlaceholder: "Search dishes...",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    hideStopList: "Hide Stop-List",
    hiddenStopList: "Stop-List Hidden",
    nothingFound: "Nothing found",
    resetFilters: "Reset Search",
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
    totalToPay: "Total to pay:",
    sendOrder: "Place Order",
    confirmOrder: "Confirm Order",
    orderConfirmed: "Thank you! Order sent to kitchen",
    orderConfirmedSub: "A waiter will approach your table shortly for confirmation.",
    cash: "Cash",
    card: "Card",
    billRequested: "Bill requested",
    waiterCalled: "Waiter is on the way",
    guestName: "Name (optional):",
    guestPhone: "Phone (optional):",
    payOnReceipt: "Order total:",
    backToMenu: "Back to Menu",
    loading: "Loading menu..."
  }
};

const DEFAULT_MENU_ITEMS = [
  {
    id: 'ech-1',
    category: { am: 'Տաք ուտեստներ', ru: 'Горячие блюда', en: 'Hot Dishes' },
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
    prepTime: '25-30 мин', calories: '620 ккал', weight: '380 г'
  }
];

const GAS_URL = 'https://script.google.com/macros/s/AKfycbz9XPBPRsA0X_G_HvcLqhRS-O7Kf629DHua0zwRh1Vflyz89fnIcgkI4C7hpCvCBQnM0Q/exec';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtxWJ3HBCWPwD6YdWaGKEbHuXHKwnXbIX6GiZ7qRu_RYBhaRNNibbJuyLIRfilIfvF0CMZXB5jghnW/pub?output=csv';

const formatImageUrl = (url) => {
  if (!url) return '';
  const str = String(url).trim();
  const driveMatch = str.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return str;
};

function parseCSV(str) {
  const arr = [];
  let quote = false;
  let row = 0, col = 0;
  for (let c = 0; c < str.length; c++) {
    let cc = str[c], nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || '';
    if (cc === '"' && quote && nc === '"') { arr[row][col] += cc; ++c; continue; }
    if (cc === '"') { quote = !quote; continue; }
    if (cc === ',' && !quote) { ++col; continue; }
    if (cc === '\r' && nc === '\n' && !quote) { ++row; col = 0; ++c; continue; }
    if (cc === '\n' && !quote) { ++row; col = 0; continue; }
    if (cc === '\r' && !quote) { ++row; col = 0; continue; }
    arr[row][col] += cc;
  }
  return arr;
}

export default function App() {
  const [lang, setLang] = useState('am'); 
  const tLang = translations[lang];

  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideStopList, setHideStopList] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const [tableNumber, setTableNumber] = useState('1');
  const [showTablePicker, setShowTablePicker] = useState(false);

  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  
  const [guestName, setGuestName] = useState('');
  const [honeypotValue, setHoneypotValue] = useState('');

  const [showBillModal, setShowBillModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCallWaiter = async () => {
    showToast(tLang.waiterCalled);
    try {
      await fetch(GAS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify({ type: 'waiter', table: tableNumber }) 
      });
    } catch (e) { console.error('Webhook error:', e); }
  };

  const handleRequestBill = async (method) => {
    showToast(`${tLang.billRequested} (${method === 'cash' ? tLang.cash : tLang.card})`);
    setShowBillModal(false);
    try {
      await fetch(GAS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify({ type: 'bill', table: tableNumber, method: method }) 
      });
    } catch (e) { console.error('Webhook error:', e); }
  };

  useEffect(() => {
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      document.head.appendChild(metaViewport);
    }
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    const preventGesture = (e) => e.preventDefault();
    const preventPinchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTable = urlParams.get('table');
      if (urlTable && urlTable.trim().length > 0) {
        setTableNumber(urlTable.trim());
      } else {
        const saved = localStorage.getItem('ech_table_no');
        if (saved) setTableNumber(saved);
        else setTableNumber('1');
      }
    } catch (e) { console.warn('URL parsing fallback:', e); }

    const fetchMenuData = async () => {
      try {
        const res = await fetch(CSV_URL);
        const text = await res.text();
        const parsed = parseCSV(text);
        
        if (parsed.length > 1) {
          const headers = parsed[0].map(h => h ? h.trim().toLowerCase() : '');
          const getIdx = (name) => headers.findIndex(h => h === name.toLowerCase());
          
          const clean = (val) => {
            if (!val) return '';
            const str = String(val).trim();
            if (str.includes('#VALUE!') || str.includes('#N/A') || str.includes('#REF!') || str.includes('#ERROR!')) return '';
            return str;
          };
          
          const fetchedItems = [];
          for (let i = 1; i < parsed.length; i++) {
            const row = parsed[i];
            if (!row) continue; 
            
            const nameAm = clean(row[getIdx('название_am')]);
            const nameRu = clean(row[getIdx('название_ru')]);
            const nameEn = clean(row[getIdx('название_en')]);
            
            if (!nameAm && !nameRu && !nameEn) continue; 
            
            const catAm = clean(row[getIdx('категория_am')]) || 'Այլ';
            const catRu = clean(row[getIdx('категория_ru')]) || 'Разное';
            const catEn = clean(row[getIdx('категория_en')]) || 'Other';
            
            const availableStr = clean(row[getIdx('наличие')]) || 'TRUE';
            const isAvailable = availableStr.toUpperCase() !== 'FALSE' && availableStr.toUpperCase() !== 'ЛОЖЬ';
            
            const tagsStr = clean(row[getIdx('теги')]) || '';
            const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t);
            
            fetchedItems.push({
              id: clean(row[getIdx('id')]) || `item-${i}`,
              category: { am: catAm, ru: catRu, en: catEn },
              name: { am: nameAm, ru: nameRu, en: nameEn },
              description: { am: clean(row[getIdx('описание_am')]), ru: clean(row[getIdx('описание_ru')]), en: clean(row[getIdx('описание_en')]) },
              price: parseInt(clean(row[getIdx('цена')]).replace(/\D/g, '')) || 0,
              image: formatImageUrl(clean(row[getIdx('фото_url')])),
              available: isAvailable,
              tags: tags,
              prepTime: clean(row[getIdx('время_готовки')]),
              calories: clean(row[getIdx('калории')]),
              weight: clean(row[getIdx('порция')])
            });
          }
          setMenuItems(fetchedItems.length > 0 ? fetchedItems : DEFAULT_MENU_ITEMS);
        }
      } catch (e) {
        console.error('Failed to fetch menu:', e);
        setMenuItems(DEFAULT_MENU_ITEMS); 
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMenuData();

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('touchmove', preventPinchZoom);
    };
  }, []);

  const groupedItems = useMemo(() => {
    let items = menuItems;
    
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => {
        return (item.name.am || '').toLowerCase().includes(q) ||
               (item.name.ru || '').toLowerCase().includes(q) ||
               (item.name.en || '').toLowerCase().includes(q);
      });
    }
    if (hideStopList) items = items.filter(i => i.available);

    const groups = {};
    items.forEach(item => {
      const catId = 'cat-' + (item.category.en || 'other').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!groups[catId]) {
        groups[catId] = { id: catId, category: item.category, items: [] };
      }
      groups[catId].items.push(item);
    });

    const getSortWeight = (catEn) => {
      const str = (catEn || '').toLowerCase();
      if (str.includes('appetizer') || str.includes('snack') || str.includes('starter') || str.includes('закуски')) return 1; 
      if (str.includes('hot') || str.includes('горячие')) return 2; 
      if (str.includes('grill') || str.includes('bbq') || str.includes('khorovats') || str.includes('мангал')) return 3; 
      if (str.includes('bread') || str.includes('bakery') || str.includes('lavash') || str.includes('выпечка')) return 4; 
      if (str.includes('dessert') || str.includes('sweet') || str.includes('десерты')) return 5; 
      if (str.includes('drink') || str.includes('beverage') || str.includes('wine') || str.includes('напитки')) return 6; 
      return 99; 
    };

    return Object.values(groups).sort((a, b) => {
      const weightA = getSortWeight(a.category.en);
      const weightB = getSortWeight(b.category.en);
      if (weightA !== weightB) return weightA - weightB;
      return (a.category[lang] || '').localeCompare(b.category[lang] || '');
    });
  }, [menuItems, searchQuery, hideStopList, lang]);

  useEffect(() => {
    if (groupedItems.length > 0 && !activeCategoryId && !searchQuery) {
      setActiveCategoryId(groupedItems[0].id);
    }

    const handleScroll = () => {
      if (isManualScroll.current) return; 
      
      const sections = document.querySelectorAll('[data-category-section]');
      let currentId = null;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 140) {
          currentId = section.getAttribute('id');
        }
      });

      if (currentId && currentId !== activeCategoryId) {
        setActiveCategoryId(currentId);
        const tab = document.getElementById(`tab-${currentId}`);
        if (tab) {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategoryId, groupedItems, searchQuery]);

  const scrollToCategory = (catId) => {
    setActiveCategoryId(catId);
    isManualScroll.current = true;
    
    const tab = document.getElementById(`tab-${catId}`);
    if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    const section = document.getElementById(catId);
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  const dynamicUpsellItems = useMemo(() => {
    const cheapItems = menuItems.filter(item => item.available && item.price <= 2000 && item.price > 0);
    return cheapItems.length > 0 ? cheapItems.slice(0, 6) : [];
  }, [menuItems]);

  const addToCart = (dish, customComment = '') => {
    if (dish.available === false) { showToast(tLang.inStopList); return; }
    setCart(prev => {
      const current = prev[dish.id];
      const newQty = current ? current.quantity + 1 : 1;
      return { ...prev, [dish.id]: { ...dish, quantity: newQty, comment: customComment || (current ? current.comment : '') } };
    });
    showToast(`«${dish.name[lang] || dish.name.am}» ${tLang.addToCart}`);
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
    if (honeypotValue.trim().length > 0) return; 
    if (cartList.length === 0) return;

    setIsSubmittingOrder(true);
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({
          type: 'order',
          table: tableNumber,
          guestName: guestName, 
          items: cartList.map(item => ({
            name: { AM: item.name.am, RU: item.name.ru, EN: item.name.en },
            quantity: item.quantity,
            price: item.price
          })),
          total: cartSubtotal
        })
      });

      const newOrderId = `ECH-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderConfirmed({ id: newOrderId, table: tableNumber, total: cartSubtotal });
      setCart({});
      setGuestName('');
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
    } catch (e) {
      console.error("Order submit error:", e);
      showToast("Ошибка связи с сервером");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F13] text-gray-100 font-sans antialiased selection:bg-amber-500 selection:text-black pb-24">
      
      <style dangerouslySetInnerHTML={{__html: `
        * { touch-action: manipulation !important; }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        html, body { -webkit-text-size-adjust: 100%; overscroll-behavior-y: none; }
      `}} />

      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-[92vw] max-w-md bg-amber-500 text-zinc-950 px-4 py-2.5 rounded-xl sm:rounded-full font-bold shadow-xl shadow-amber-500/20 border border-amber-300 flex items-center justify-center gap-2 animate-fade-up text-[11px] sm:text-sm leading-tight text-center">
          <Sparkles className="w-4 h-4 text-zinc-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0F0F13]/90 border-b border-white/5 shadow-md">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-300/40 shrink-0">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <h1 className="text-sm sm:text-lg font-bold tracking-tight text-white flex items-center gap-1 leading-tight truncate">
                  <span className="truncate">{tLang.bistroTitle}</span> <span className="text-amber-400 font-serif italic shrink-0">Bistro</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-tight mt-0.5 truncate">{tLang.bistroSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 sm:gap-1.5 shrink-0">
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 shrink-0">
              {['am', 'ru', 'en'].map(l => (
                <button
                  key={l} onClick={() => setLang(l)}
                  className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-1 rounded transition-colors ${lang === l ? 'bg-amber-400 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTablePicker(true)}
              className="group flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-white/5 border border-amber-500/30 hover:border-amber-400/80 text-amber-400 transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span></span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-300">{tLang.table}:</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-amber-400">#{tableNumber}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform shrink-0" />
            </button>
          </div>

        </div>
      </header>

      {}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800/80 to-zinc-900 border border-white/5 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-amber-400 mb-1.5 whitespace-nowrap overflow-hidden">
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 shrink-0">{tLang.echmiadzin}</span>
                <span className="truncate">{tLang.sacredCity}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">{tLang.heroTitle}</h2>
              <p className="text-[10px] sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">{tLang.heroDesc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setHideStopList(!hideStopList)}
                className={`text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${hideStopList ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{hideStopList ? tLang.hiddenStopList : tLang.hideStopList}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3">
          <button onClick={handleCallWaiter} className="group flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all shadow-lg active:scale-95">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:animate-bounce shrink-0" />
            <span className="text-[10px] sm:text-sm font-semibold text-zinc-200 truncate">{tLang.callWaiter}</span>
          </button>
          <button onClick={() => setShowBillModal(true)} className="group flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all shadow-lg active:scale-95">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-[10px] sm:text-sm font-semibold text-zinc-200 truncate">{tLang.requestBill}</span>
          </button>
        </div>
      </div>

      {}
      <div className="sticky top-[60px] sm:top-[70px] z-30 backdrop-blur-xl bg-[#0F0F13]/95 border-b border-white/5 py-2 mt-1 sm:mt-2">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-2 sm:space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text" placeholder={tLang.searchPlaceholder} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {!searchQuery && (
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-1 sm:px-2 -mx-1 sm:-mx-2">
              {groupedItems.map((group) => {
                const isSelected = activeCategoryId === group.id;
                return (
                  <button
                    key={group.id}
                    id={`tab-${group.id}`}
                    onClick={() => scrollToCategory(group.id)}
                    className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-300 scale-105'
                        : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{group.category[lang] || group.category.am}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 mt-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
            <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 animate-spin mb-4" />
            <p className="text-xs sm:text-sm text-zinc-400 font-medium animate-pulse">{tLang.loading}</p>
          </div>
        ) : groupedItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white/5 rounded-2xl sm:rounded-3xl border border-dashed border-white/10 p-6 sm:p-8 mt-4 sm:mt-6">
            <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-300">{tLang.nothingFound}</h3>
            <button onClick={() => { setSearchQuery(''); setHideStopList(false); }} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-bold text-white rounded-xl transition-colors">
              {tLang.resetFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {groupedItems.map((group) => (
              <section key={group.id} id={group.id} data-category-section="true" className="scroll-mt-[130px] pt-3 sm:pt-4 pb-2 animate-fade-up">
                
                <h2 className="text-xl sm:text-3xl font-black text-zinc-200 mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 tracking-tight px-1 overflow-hidden">
                  <span className="shrink-0">{group.category[lang] || group.category.am}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent mt-1 min-w-[20px]"></div>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {group.items.map((dish) => {
                    const inCartItem = cart[dish.id];
                    const isUnavailable = !dish.available;

                    return (
                      <div
                        key={dish.id}
                        className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                          isUnavailable
                            ? 'bg-zinc-950/40 border border-white/5 opacity-70'
                            : 'bg-white/5 border border-white/5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10'
                        }`}
                      >
                        <div onClick={() => setSelectedDish(dish)} className="relative aspect-video w-full overflow-hidden cursor-pointer bg-zinc-950">
                          <img src={dish.image} alt={dish.name[lang] || dish.name.am} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isUnavailable ? 'grayscale' : ''}`} loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-transparent opacity-90" />

                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center flex-wrap gap-1.5 pointer-events-none">
                            {dish.tags.map(tag => (
                              <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] sm:text-[10px] font-bold shadow-md">{tag}</span>
                            ))}
                            {isUnavailable && <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-rose-900/90 text-rose-200 border border-rose-500/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ml-auto">{tLang.inStopList}</span>}
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 onClick={() => setSelectedDish(dish)} className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1">
                              {dish.name[lang] || dish.name.am}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">{dish.description[lang] || dish.description.am}</p>
                          </div>

                          <div className="mt-3 sm:mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div>
                              <div className="text-[9px] sm:text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{tLang.cost}</div>
                              <div className="text-base sm:text-lg font-black text-amber-400">{dish.price.toLocaleString()} <span className="text-xs sm:text-sm font-semibold">֏</span></div>
                            </div>

                            {isUnavailable ? (
                              <div className="text-[10px] sm:text-xs text-zinc-500 italic px-2 py-1 bg-white/5 rounded-lg border border-white/10">{tLang.inStopList}</div>
                            ) : inCartItem ? (
                              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 border border-amber-500/40 rounded-xl p-1 shadow-inner backdrop-blur-sm">
                                <button onClick={() => updateQuantity(dish.id, -1)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                                  {inCartItem.quantity === 1 ? <Trash2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-rose-400" /> : <Minus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
                                </button>
                                <span className="text-[11px] sm:text-xs font-bold px-1 min-w-[1.2rem] sm:min-w-[1.5rem] text-center text-amber-300">{inCartItem.quantity}</span>
                                <button onClick={() => updateQuantity(dish.id, 1)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center transition-all font-bold">
                                  <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => addToCart(dish)} className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-white font-bold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all">
                                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" /> <span>{tLang.addToCart}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {}
      <footer className="max-w-5xl mx-auto px-4 mt-6 sm:mt-8 mb-6 text-center">
        <a href="https://appseapro.com" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] sm:text-[10px] text-zinc-600 hover:text-amber-500/80 transition-colors duration-300 pb-2">
          Digital Creator & Developer by Elena Sotnikova
        </a>
      </footer>

      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-lg w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedDish(null)} className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-sm border border-white/10">
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="relative aspect-video w-full">
              <img src={selectedDish.image} alt={selectedDish.name[lang] || selectedDish.name.am} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>
            <div className="p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase mb-1">{selectedDish.category[lang] || selectedDish.category.am}</p>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                  {selectedDish.name[lang] || selectedDish.name.am}
                  {selectedDish.tags.map(tag => (
                     <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] bg-white/10 text-white border border-white/10">{tag}</span>
                  ))}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">{selectedDish.description[lang] || selectedDish.description.am}</p>
                
                <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 sm:p-3 bg-black/40 rounded-xl sm:rounded-2xl border border-white/5 text-center">
                  <div><div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">{tLang.prepTime}</div><div className="text-[10px] sm:text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.prepTime || '—'}</div></div>
                  <div><div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">{tLang.portion}</div><div className="text-[10px] sm:text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.weight || '—'}</div></div>
                  <div><div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">{tLang.energy}</div><div className="text-[10px] sm:text-xs font-bold text-zinc-200 mt-0.5">{selectedDish.calories || '—'}</div></div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex items-center justify-between pt-3 sm:pt-4 border-t border-white/5 shrink-0">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] sm:text-xs text-zinc-500 uppercase block">{tLang.cost}</span>
                  <div className="text-lg sm:text-xl font-black text-amber-400 truncate">{selectedDish.price.toLocaleString()} ֏</div>
                </div>
                {selectedDish.available ? (
                  <button onClick={() => { addToCart(selectedDish); setSelectedDish(null); }} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-[11px] sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span className="whitespace-nowrap">{tLang.addToCart}</span>
                  </button>
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-800/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shrink-0">{tLang.inStopList}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-sm w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3"><Receipt className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <h3 className="font-bold text-base sm:text-lg text-white mb-4">{tLang.requestBill} ({tLang.table} #{tableNumber})</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button onClick={() => handleRequestBill('cash')} className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400 transition-all">
                <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" /> <span className="text-[10px] sm:text-xs font-bold">{tLang.cash}</span>
              </button>
              <button onClick={() => handleRequestBill('card')} className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400 transition-all">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" /> <span className="text-[10px] sm:text-xs font-bold">{tLang.card}</span>
              </button>
            </div>
            <button onClick={() => setShowBillModal(false)} className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-zinc-500 hover:text-white p-2 font-medium">Отмена</button>
          </div>
        </div>
      )}

      {}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 px-3 sm:px-4 flex justify-center animate-fade-up pointer-events-none">
          <button onClick={() => setIsCartOpen(true)} className="w-full max-w-md bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(245,158,11,0.25)] flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all pointer-events-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-black/10 flex items-center justify-center font-black text-sm sm:text-base shadow-inner">{cartItemCount}</div>
              <div className="text-left">
                <div className="text-[9px] sm:text-xs uppercase tracking-wider font-extrabold text-zinc-900/80">{tLang.table} #{tableNumber}</div>
                <div className="text-xs sm:text-sm font-bold">{tLang.cartTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2"><span className="text-base sm:text-lg font-black tracking-tight">{cartSubtotal.toLocaleString()} ֏</span><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></div>
          </button>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-2xl mx-auto bg-zinc-900 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col rounded-t-[2rem] sm:rounded-t-[2.5rem] max-h-[90vh] sm:max-h-[85vh] animate-slide-up">
            
            <div className="w-full flex justify-center pt-2 sm:pt-3 pb-1.5 sm:pb-2 shrink-0 cursor-pointer" onClick={() => setIsCartOpen(false)}>
              <div className="w-10 sm:w-12 h-1 sm:h-1.5 bg-white/20 rounded-full"></div>
            </div>
            
            <div className="px-3 sm:px-6 pb-2 sm:pb-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-extrabold text-white text-base sm:text-xl">{tLang.cartTitle} (#{tableNumber})</h3>
              </div>
              <button onClick={clearCart} className="text-[10px] sm:text-xs font-bold text-zinc-400 hover:text-rose-400 flex items-center gap-1 sm:gap-1.5 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors shrink-0">
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span>{tLang.clear}</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-4">
                {cartList.map(item => (
                  <div key={item.id} className="flex gap-2.5 sm:gap-4 items-center bg-white/5 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/5">
                    <img src={item.image} alt={item.name[lang] || item.name.am} className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shadow-md shrink-0" />
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="font-bold text-white text-[11px] sm:text-sm truncate sm:line-clamp-2 sm:whitespace-normal leading-tight mb-0.5 sm:mb-1">{item.name[lang] || item.name.am}</h4>
                      <div className="text-amber-400 font-extrabold text-[11px] sm:text-sm">{(item.price * item.quantity).toLocaleString()} ֏</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 sm:gap-3 bg-black/40 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 border border-white/5">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 sm:p-2 text-zinc-400 hover:text-white transition-colors"><Minus className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                        <span className="font-bold text-white text-[10px] sm:text-xs min-w-[1ch] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 sm:p-2 text-amber-400 hover:text-amber-300 transition-colors"><Plus className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {dynamicUpsellItems.length > 0 && (
                <div className="mt-1 sm:mt-2 mb-3 sm:mb-6">
                  <h3 className="px-3 sm:px-6 text-xs sm:text-base font-extrabold text-white mb-2.5 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1 h-4 sm:w-1.5 sm:h-6 bg-amber-500 rounded-full shrink-0" />
                    <span className="leading-tight">{tLang.recommendations}</span>
                  </h3>
                  <div className="flex gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar px-3 sm:px-6 pb-2 snap-x">
                    {dynamicUpsellItems.map(upItem => (
                      <div key={upItem.id} className="min-w-[100px] sm:min-w-[140px] snap-start bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col items-center text-center backdrop-blur-md shrink-0">
                        <img src={upItem.image} alt={upItem.name[lang] || upItem.name.am} className="w-14 h-14 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover mb-2 sm:mb-3 shadow-md shrink-0" />
                        <span className="text-[9px] sm:text-xs font-bold text-white mb-1 line-clamp-2 flex-1 leading-tight">{upItem.name[lang] || upItem.name.am}</span>
                        <span className="text-amber-400 text-[10px] sm:text-sm font-extrabold mb-1.5 sm:mb-3">{upItem.price.toLocaleString()} ֏</span>
                        <button onClick={() => addToCart({...upItem, available: true, tags: []})} className="w-full bg-white/10 hover:bg-amber-500 hover:text-black py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1 sm:gap-1.5">
                          <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> <span>{tLang.addToCart}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-3 sm:px-6 py-3 sm:py-5 border-t border-white/5 bg-zinc-950 shrink-0 rounded-t-2xl sm:rounded-t-3xl pb-3 sm:pb-5">
              <div className="flex justify-between items-center mb-2.5 sm:mb-5">
                <div className="flex flex-col"><span className="text-zinc-400 text-[9px] sm:text-xs font-medium uppercase tracking-wider">{tLang.totalToPay}</span></div>
                <span className="text-lg sm:text-3xl font-black text-white shrink-0 ml-2">{cartSubtotal.toLocaleString()} <span className="text-amber-500 font-bold">֏</span></span>
              </div>
              <button onClick={() => setIsCheckoutModalOpen(true)} className="w-full py-2.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs sm:text-base shadow-[0_8px_20px_rgb(245,158,11,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02]">
                {tLang.sendOrder} <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-white/10 max-w-md w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-4 sm:top-5 right-4 sm:right-5 text-zinc-400 hover:text-white"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <h3 className="font-extrabold text-lg sm:text-xl text-white mb-4 sm:mb-5 flex items-center gap-2"><Send className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> {tLang.confirmOrder}</h3>
            <form onSubmit={handleCheckoutSubmit} className="space-y-3 sm:space-y-4">
              <input type="text" value={honeypotValue} onChange={(e) => setHoneypotValue(e.target.value)} style={{ display: 'none' }} tabIndex={-1} />
              <div className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10"><div className="text-[10px] sm:text-xs text-zinc-400 uppercase font-medium">{tLang.table}</div><div className="text-base sm:text-lg font-black text-amber-400">#{tableNumber}</div></div>
              
              <div>
                <label className="text-[10px] sm:text-xs text-zinc-300 block mb-1 sm:mb-1.5 font-medium">{tLang.guestName}</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors" 
                />
              </div>

              <div className="p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl sm:rounded-2xl flex justify-between items-center mt-4 sm:mt-6"><span className="text-zinc-300 text-xs sm:text-sm font-medium">{tLang.payOnReceipt}</span><span className="text-base sm:text-lg font-black text-amber-400">{cartSubtotal.toLocaleString()} ֏</span></div>
              <button type="submit" disabled={isSubmittingOrder} className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-amber-400 text-zinc-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 mt-3 sm:mt-4 hover:bg-amber-300 transition-colors">{isSubmittingOrder ? <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}<span>{tLang.confirmOrder}</span></button>
            </form>
          </div>
        </div>
      )}

      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-up">
          <div className="bg-zinc-900 border border-amber-500/40 max-w-sm w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-emerald-500/20"><CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" /></div>
            <h3 className="text-lg sm:text-2xl font-black text-white mt-1 sm:mt-2 leading-tight">{tLang.orderConfirmed}</h3>
            <p className="text-[11px] sm:text-sm text-zinc-400 mt-2 sm:mt-3">{tLang.orderConfirmedSub}</p>
            <button onClick={() => setOrderConfirmed(null)} className="mt-5 sm:mt-6 w-full py-3 sm:py-3.5 bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-amber-300 transition-colors">{tLang.backToMenu}</button>
          </div>
        </div>
      )}

      {showTablePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 max-w-sm w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-5"><h3 className="font-extrabold text-white text-base sm:text-lg">{tLang.table}</h3><button onClick={() => setShowTablePicker(false)} className="text-zinc-400 hover:text-white transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button></div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {['1', '2', '3', '4', '5', '6', 'VIP 1', 'VIP 2'].map(tbl => (
                <button key={tbl} onClick={() => { setTableNumber(tbl); setShowTablePicker(false); localStorage.setItem('ech_table_no', tbl); }} className={`py-2 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold transition-all ${tableNumber === tbl ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}>#{tbl}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}