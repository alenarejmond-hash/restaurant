import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Utensils, Search, ShoppingBag, X, Plus, Minus, CheckCircle2, Sparkles, ChevronRight,
  RefreshCw, ChevronDown, ShieldCheck, Trash2, Bell, Receipt, Banknote, CreditCard, Send
} from 'lucide-react';

const translations = {
  am: {
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Մենյու և Պատվերներ",
    echmiadzin: "Երևան",
    sacredCity: "• Հայաստանի սիրտը • Հայկական ավանդույթների օջախ",
    heroTitle: "Ավանդական հայկական խոհանոց",
    heroDesc: "Ժամանակակից հայկական հյուրընկալության ձևաչափ. ընտրեք ուտեստները առանց շտապելու, իսկ մենք սիրով կհոգանք մանրամասների մասին:",
    table: "Սեղան",
    searchPlaceholder: "Որոնել ուտեստներ...",
    callWaiter: "Կանչել մատուցողին",
    requestBill: "Խնդրել հաշիվը",
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
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Меню & Заказ к столику",
    echmiadzin: "Ереван",
    sacredCity: "• Сердце Армении • Очаг армянских традиций",
    heroTitle: "Традиционная армянская кухня",
    heroDesc: "Современный формат армянского гостеприимства: выберите блюда без спешки, а мы с любовью позаботимся о деталях.",
    table: "Стол",
    searchPlaceholder: "Поиск блюд (кюфта, вино...)",
    callWaiter: "Позвать официанта",
    requestBill: "Попросить счет",
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
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Menu & Table Ordering",
    echmiadzin: "Yerevan",
    sacredCity: "• Heart of Armenia • Hearth of Traditions",
    heroTitle: "Traditional Armenian Cuisine",
    heroDesc: "Modern Armenian hospitality: choose your dishes without rushing, and we will lovingly take care of the details.",
    table: "Table",
    searchPlaceholder: "Search dishes...",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
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
  
  const [bumpCart, setBumpCart] = useState(false);

  const triggerHaptic = (type = 'light') => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      if (type === 'light') window.navigator.vibrate(40);
      if (type === 'medium') window.navigator.vibrate(80);
      if (type === 'heavy') window.navigator.vibrate([40, 40, 40]);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCallWaiter = async () => {
    triggerHaptic('medium');
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
    triggerHaptic('medium');
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

  useEffect(() => {
    const hasOpenModal = isCartOpen || isCheckoutModalOpen || showBillModal || showTablePicker || selectedDish || orderConfirmed;
    if (hasOpenModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'manipulation';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'manipulation';
    };
  }, [isCartOpen, isCheckoutModalOpen, showBillModal, showTablePicker, selectedDish, orderConfirmed]);

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
  }, [menuItems, searchQuery, lang]);

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
    triggerHaptic('medium');
    if (dish.available === false) { showToast(tLang.inStopList); return; }
    setCart(prev => {
      const current = prev[dish.id];
      const newQty = current ? current.quantity + 1 : 1;
      return { ...prev, [dish.id]: { ...dish, quantity: newQty, comment: customComment || (current ? current.comment : '') } };
    });
    showToast(`«${dish.name[lang] || dish.name.am}» ${tLang.addToCart}`);
  };

  const updateQuantity = (dishId, delta) => {
    triggerHaptic('light');
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

  const clearCart = () => {
    triggerHaptic('heavy');
    setCart({});
  };
  
  const cartList = useMemo(() => Object.values(cart), [cart]);
  const cartItemCount = useMemo(() => cartList.reduce((sum, i) => sum + i.quantity, 0), [cartList]);
  const cartSubtotal = useMemo(() => cartList.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartList]);

  useEffect(() => {
    if (cartItemCount > 0) {
      setBumpCart(true);
      const timer = setTimeout(() => setBumpCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (honeypotValue.trim().length > 0) return; 
    if (cartList.length === 0) return;

    triggerHaptic('heavy');
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

      const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
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
    <div className="min-h-screen bg-[#141311] text-stone-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-black pb-28">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { touch-action: manipulation !important; }
        .font-sans { font-family: 'Montserrat', sans-serif !important; }
        
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        @keyframes bounceScale { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
        @keyframes pulseCart { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        @keyframes skeletonShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes modalEnter { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-scale { animation: bounceScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        .animate-pulse-cart { animation: pulseCart 0.3s ease-in-out; }
        .animate-modal-enter { animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .skeleton-loader { position: relative; overflow: hidden; background-color: rgba(255, 255, 255, 0.05); }
        .skeleton-loader::after {
          content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, rgba(255,255,255, 0) 0, rgba(255,255,255, 0.05) 20%, rgba(255,255,255, 0.05) 60%, rgba(255,255,255, 0) 100%);
          animation: skeletonShimmer 1.5s infinite;
        }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        html, body { -webkit-text-size-adjust: 100%; overscroll-behavior-y: none; }
      `}} />

      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-[92vw] max-w-md bg-[#D4AF37] text-stone-950 px-4 py-2.5 rounded-xl sm:rounded-full font-bold shadow-xl shadow-[#D4AF37]/20 border border-[#E8C972] flex items-center justify-center gap-2 animate-fade-up text-[11px] sm:text-sm leading-tight text-center">
          <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#141311]/85 border-b border-white/5 shadow-md">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <h1 className="text-sm sm:text-lg font-black text-white flex items-center gap-1 leading-tight truncate">
                  <span className="truncate">{tLang.bistroTitle}</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-400 font-medium leading-tight mt-0.5 truncate">{tLang.bistroSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 sm:gap-1.5 shrink-0">
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shrink-0 shadow-inner">
              {['am', 'ru', 'en'].map(l => (
                <button
                  key={l} onClick={() => setLang(l)}
                  className={`text-[10px] sm:text-[11px] font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${lang === l ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-105' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTablePicker(true)}
              className="group flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-white/5 border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 text-[#D4AF37] transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#B5952F]"></span></span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-stone-300">{tLang.table}:</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#D4AF37]">#{tableNumber}</span>
              <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-[#D4AF37] transition-transform shrink-0" />
            </button>
          </div>

        </div>
      </header>

      {}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1A1816] via-[#24211D] to-[#1A1816] border border-white/5 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#D4AF37]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-[#D4AF37] mb-1.5 whitespace-nowrap overflow-hidden">
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">{tLang.echmiadzin}</span>
                <span className="truncate tracking-wide">{tLang.sacredCity}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white leading-tight tracking-tight">{tLang.heroTitle}</h2>
              <p className="text-[10px] sm:text-sm text-stone-400 mt-1 max-w-xl leading-relaxed">{tLang.heroDesc}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4">
          <button onClick={handleCallWaiter} className="group relative flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 rounded-2xl bg-gradient-to-br from-[#1A1816]/80 to-[#141311]/90 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/40 transition-all active:scale-[0.98] shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="relative z-10 p-1.5 sm:p-2 rounded-full bg-black/40 group-hover:bg-[#D4AF37]/10 transition-colors border border-white/5 shadow-inner">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors shrink-0" />
            </div>
            <span className="relative z-10 text-[11px] sm:text-xs font-bold text-stone-300 group-hover:text-white transition-colors truncate tracking-wide">{tLang.callWaiter}</span>
          </button>
          <button onClick={() => setShowBillModal(true)} className="group relative flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 rounded-2xl bg-gradient-to-br from-[#1A1816]/80 to-[#141311]/90 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/40 transition-all active:scale-[0.98] shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="relative z-10 p-1.5 sm:p-2 rounded-full bg-black/40 group-hover:bg-[#D4AF37]/10 transition-colors border border-white/5 shadow-inner">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors shrink-0" />
            </div>
            <span className="relative z-10 text-[11px] sm:text-xs font-bold text-stone-300 group-hover:text-white transition-colors truncate tracking-wide">{tLang.requestBill}</span>
          </button>
        </div>
      </div>

      {}
      <div className="sticky top-[60px] sm:top-[70px] z-30 backdrop-blur-xl bg-[#141311]/90 border-b border-white/5 py-2 mt-1 sm:mt-2">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-2 sm:space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text" placeholder={tLang.searchPlaceholder} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]/80 transition-all font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-0.5">
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
                    className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-stone-950 shadow-md ring-2 ring-[#E8C972] scale-105'
                        : 'bg-white/5 border border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[12px] sm:text-sm tracking-wide">{group.category[lang] || group.category.am}</span>
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
          <div className="space-y-6 sm:space-y-8">
            {[1, 2].map((groupKey) => (
              <div key={groupKey} className="pt-3 sm:pt-4 pb-2">
                <div className="h-6 sm:h-8 w-40 sm:w-48 rounded-lg mb-4 sm:mb-6 skeleton-loader"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {[1, 2, 3].map((itemKey) => (
                    <div key={itemKey} className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1A1816] border border-white/5 flex flex-col h-[280px] sm:h-[320px]">
                      <div className="w-full h-[160px] sm:h-[180px] skeleton-loader"></div>
                      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="h-4 sm:h-5 w-3/4 rounded mb-2 skeleton-loader"></div>
                          <div className="h-3 sm:h-4 w-full rounded mb-1 skeleton-loader"></div>
                          <div className="h-3 sm:h-4 w-2/3 rounded skeleton-loader"></div>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                          <div className="h-5 sm:h-6 w-16 rounded skeleton-loader"></div>
                          <div className="h-8 sm:h-9 w-20 rounded-xl skeleton-loader"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-[#1A1816] rounded-2xl sm:rounded-3xl border border-dashed border-white/10 p-6 sm:p-8 mt-4 sm:mt-6 shadow-inner">
            <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-stone-300 tracking-wide">{tLang.nothingFound}</h3>
            <button onClick={() => { setSearchQuery(''); }} className="mt-4 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-bold text-white rounded-xl transition-colors">
              {tLang.resetFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {groupedItems.map((group) => (
              <section key={group.id} id={group.id} data-category-section="true" className="scroll-mt-[130px] pt-3 sm:pt-4 pb-2 animate-fade-up">
                
                <h2 className="text-xl sm:text-3xl font-black text-stone-100 mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 px-1 overflow-hidden tracking-tight">
                  <span className="shrink-0">{group.category[lang] || group.category.am}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent mt-1 min-w-[20px]"></div>
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
                            ? 'bg-[#0A0908]/60 border border-white/5 opacity-70'
                            : 'bg-[#1A1816] border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/10'
                        }`}
                      >
                        <div onClick={() => setSelectedDish(dish)} className="relative aspect-video w-full overflow-hidden cursor-pointer bg-[#0A0908]">
                          <img src={dish.image} alt={dish.name[lang] || dish.name.am} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isUnavailable ? 'grayscale' : ''}`} loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/20 to-transparent opacity-90" />

                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center flex-wrap gap-1.5 pointer-events-none">
                            {dish.tags.map(tag => (
                              <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[#E8C972] text-[9px] sm:text-[10px] font-bold shadow-md uppercase tracking-wider">{tag}</span>
                            ))}
                            {isUnavailable && <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-rose-950/90 text-rose-300 border border-rose-500/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ml-auto">{tLang.inStopList}</span>}
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 onClick={() => setSelectedDish(dish)} className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1 tracking-wide">
                              {dish.name[lang] || dish.name.am}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-stone-400 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed font-medium">{dish.description[lang] || dish.description.am}</p>
                          </div>

                          <div className="mt-3 sm:mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div>
                              <div className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase tracking-wider">{tLang.cost}</div>
                              <div className="text-base sm:text-lg font-black text-[#D4AF37]">{dish.price.toLocaleString()} <span className="text-xs sm:text-sm font-bold">֏</span></div>
                            </div>

                            {isUnavailable ? (
                              <div className="text-[10px] sm:text-xs text-stone-500 italic px-2 py-1 bg-white/5 rounded-lg border border-white/10 font-medium">{tLang.inStopList}</div>
                            ) : inCartItem ? (
                              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 border border-[#D4AF37]/40 rounded-xl p-1 shadow-inner backdrop-blur-sm">
                                <button onClick={() => updateQuantity(dish.id, -1)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                                  {inCartItem.quantity === 1 ? <Trash2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-rose-400" /> : <Minus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
                                </button>
                                <span className="text-[11px] sm:text-xs font-bold px-1 min-w-[1.2rem] sm:min-w-[1.5rem] text-center text-[#E8C972]">{inCartItem.quantity}</span>
                                <button onClick={() => updateQuantity(dish.id, 1)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#D4AF37] hover:bg-[#E8C972] text-stone-950 flex items-center justify-center transition-all font-bold">
                                  <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => addToCart(dish)} className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] font-bold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all">
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
      {selectedDish && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5 bg-black/90 backdrop-blur-xl">
          <div className="bg-[#141311] border border-white/10 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl relative flex flex-col animate-modal-enter max-h-[90dvh]">
            
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/70 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="relative h-[250px] sm:h-[300px] w-full shrink-0 overflow-hidden bg-[#0A0908]">
              <img src={selectedDish.image} alt={selectedDish.name[lang] || selectedDish.name.am} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-[#141311]/20 to-transparent opacity-100 pointer-events-none" />
            </div>
            
            <div className="p-5 flex-1 flex flex-col overflow-y-auto no-scrollbar relative z-10 bg-[#141311]">
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-3">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider px-2 py-0.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
                    {selectedDish.category[lang] || selectedDish.category.am}
                  </span>
                  {selectedDish.tags.map(tag => (
                     <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-white/10 text-white border border-white/10 font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
                  {selectedDish.name[lang] || selectedDish.name.am}
                </h2>
                <p className="text-sm sm:text-base text-stone-400 mt-2 sm:mt-3 leading-relaxed font-medium">{selectedDish.description[lang] || selectedDish.description.am}</p>
                
                <div className="grid grid-cols-3 gap-2 mt-5 sm:mt-6 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5 text-center shadow-inner">
                  <div><div className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-bold tracking-wider">{tLang.prepTime}</div><div className="text-[11px] sm:text-xs font-bold text-stone-200 mt-1">{selectedDish.prepTime || '—'}</div></div>
                  <div className="border-x border-white/5"><div className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-bold tracking-wider">{tLang.portion}</div><div className="text-[11px] sm:text-xs font-bold text-stone-200 mt-1">{selectedDish.weight || '—'}</div></div>
                  <div><div className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-bold tracking-wider">{tLang.energy}</div><div className="text-[11px] sm:text-xs font-bold text-stone-200 mt-1">{selectedDish.calories || '—'}</div></div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/5 flex items-center justify-between shrink-0 pb-1">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] sm:text-xs text-stone-500 uppercase font-bold tracking-wider block">{tLang.cost}</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] truncate tracking-tight">{selectedDish.price.toLocaleString()} ֏</div>
                </div>
                {selectedDish.available ? (
                  <button onClick={() => { addToCart(selectedDish); setSelectedDish(null); }} className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E8C972] to-[#B5952F] text-stone-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.3)] active:scale-95 transition-all shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> <span className="whitespace-nowrap tracking-wide">{tLang.addToCart}</span>
                  </button>
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold text-rose-300 bg-rose-950/50 border border-rose-800/60 px-4 py-2 rounded-xl shrink-0 uppercase tracking-wider">{tLang.inStopList}</span>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="bg-[#1A1816] border border-white/10 max-w-sm w-full rounded-3xl p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20"><Receipt className="w-6 h-6" /></div>
            <h3 className="font-black text-lg text-white mb-5 tracking-wide">{tLang.requestBill} <span className="text-[#D4AF37] font-medium">({tLang.table} #{tableNumber})</span></h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleRequestBill('cash')} className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-[#D4AF37]/10 text-stone-300 hover:text-white border border-white/5 hover:border-[#D4AF37]/40 transition-all active:scale-95">
                <Banknote className="w-6 h-6 text-[#E8C972] group-hover:scale-110 transition-transform" /> <span className="text-[11px] font-bold tracking-wide">{tLang.cash}</span>
              </button>
              <button onClick={() => handleRequestBill('card')} className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-[#D4AF37]/10 text-stone-300 hover:text-white border border-white/5 hover:border-[#D4AF37]/40 transition-all active:scale-95">
                <CreditCard className="w-6 h-6 text-[#E8C972] group-hover:scale-110 transition-transform" /> <span className="text-[11px] font-bold tracking-wide">{tLang.card}</span>
              </button>
            </div>
            <button onClick={() => setShowBillModal(false)} className="mt-5 text-[11px] text-stone-500 hover:text-white p-2 font-bold uppercase tracking-wider transition-colors">Отмена</button>
          </div>
        </div>
      )}

      {}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-[12px] left-0 right-0 z-40 px-4 sm:px-8 pb-[env(safe-area-inset-bottom)] flex justify-center animate-fade-up pointer-events-none">
          <button onClick={() => setIsCartOpen(true)} className={`w-full max-w-md bg-[#1A1816]/60 backdrop-blur-xl border border-[#D4AF37]/30 text-white font-bold p-3.5 sm:p-4 rounded-[1.25rem] sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all pointer-events-auto ${bumpCart ? 'animate-pulse-cart scale-[1.02]' : 'hover:scale-[1.02] hover:bg-[#1A1816]/80 hover:border-[#D4AF37]/50 active:scale-[0.98]'}`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center font-black text-sm sm:text-base text-[#D4AF37] shadow-inner transition-transform ${bumpCart ? 'animate-bounce-scale' : ''}`}>
                {cartItemCount}
              </div>
              <div className="text-left">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-stone-400 mb-0.5">{tLang.table} #{tableNumber}</div>
                <div className="text-xs sm:text-sm font-black tracking-wide">{tLang.cartTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#D4AF37]">
              <span className="text-base sm:text-lg font-black tracking-tight">{cartSubtotal.toLocaleString()} ֏</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>
      )}

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-2xl mx-auto bg-[#141311] border-t border-[#D4AF37]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col rounded-t-[2rem] sm:rounded-t-[2.5rem] h-[92dvh] animate-slide-up">
            
            <button onClick={() => setIsCartOpen(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/20 transition-colors border border-white/10">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="w-full flex justify-center pt-3 pb-2 shrink-0 cursor-pointer" onClick={() => setIsCartOpen(false)}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
            </div>
            
            <div className="px-5 sm:px-6 pb-3 sm:pb-4 border-b border-white/5 flex items-center justify-between shrink-0 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-black text-white text-lg sm:text-xl tracking-wide">{tLang.cartTitle} <span className="text-[#D4AF37] text-sm sm:text-base font-bold">(#{tableNumber})</span></h3>
              </div>
              <button onClick={clearCart} className="text-[10px] sm:text-xs font-bold text-stone-400 hover:text-rose-400 flex items-center gap-1.5 bg-white/5 hover:bg-rose-950/30 px-3 py-2 rounded-xl transition-colors shrink-0 mr-10 sm:mr-12 border border-transparent hover:border-rose-900/50 uppercase tracking-wider">
                <Trash2 className="w-3.5 h-3.5" /> <span>{tLang.clear}</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                {cartList.map(item => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 items-center bg-[#1A1816] p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/5 shadow-inner">
                    <img src={item.image} alt={item.name[lang] || item.name.am} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shadow-md shrink-0" />
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="font-bold text-white text-[11px] sm:text-sm truncate sm:line-clamp-2 sm:whitespace-normal leading-tight mb-1 tracking-wide">{item.name[lang] || item.name.am}</h4>
                      <div className="text-[#D4AF37] font-black text-xs sm:text-sm tracking-tight">{(item.price * item.quantity).toLocaleString()} ֏</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0 pr-1">
                      <div className="flex items-center gap-1 sm:gap-3 bg-black/50 rounded-full px-1.5 sm:px-2 py-1 border border-white/10 shadow-inner">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 sm:p-2 text-stone-400 hover:text-white transition-colors"><Minus className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                        <span className="font-bold text-white text-[11px] sm:text-xs min-w-[1.5ch] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 sm:p-2 text-[#D4AF37] hover:text-[#E8C972] transition-colors"><Plus className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {dynamicUpsellItems.length > 0 && (
                <div className="mt-8 mb-6 pt-6 border-t border-white/5">
                  <h3 className="px-5 sm:px-6 text-xs sm:text-base font-black text-white mb-4 flex items-center gap-2 tracking-wide">
                    <div className="w-1 h-4 sm:w-1.5 sm:h-5 bg-[#D4AF37] rounded-full shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    <span className="leading-tight shrink-0">{tLang.recommendations}</span>
                  </h3>
                  <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-2 snap-x">
                    {dynamicUpsellItems.map(upItem => (
                      <div key={upItem.id} className="w-[100px] sm:w-[140px] snap-start bg-[#1A1816] border border-white/5 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 flex flex-col items-center text-center shadow-lg shrink-0">
                        <img src={upItem.image} alt={upItem.name[lang] || upItem.name.am} className="w-[80px] h-[80px] sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover mb-2.5 sm:mb-3 shadow-md shrink-0" />
                        <span className="text-[10px] sm:text-xs font-bold text-stone-200 mb-1.5 line-clamp-2 flex-1 leading-tight tracking-wide">{upItem.name[lang] || upItem.name.am}</span>
                        <span className="text-[#D4AF37] text-[11px] sm:text-sm font-black mb-2 tracking-tight">{upItem.price.toLocaleString()} ֏</span>
                        <button onClick={() => addToCart({...upItem, available: true, tags: []})} className="w-full bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-transparent py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1.5 active:scale-95">
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" /> <span className="uppercase tracking-wider">{tLang.addToCart}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] sm:pb-8 border-t border-white/5 bg-[#0A0908] shrink-0 rounded-t-3xl shadow-[0_-15px_30px_rgba(0,0,0,0.4)] relative z-20">
              <div className="flex justify-between items-end mb-4 sm:mb-5">
                <div className="flex flex-col"><span className="text-stone-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">{tLang.totalToPay}</span></div>
                <span className="text-xl sm:text-2xl font-black text-white shrink-0 ml-2 tracking-tight leading-none whitespace-nowrap">{cartSubtotal.toLocaleString()} <span className="text-[#D4AF37]">֏</span></span>
              </div>
              <button onClick={() => setIsCheckoutModalOpen(true)} className="w-full py-4 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E8C972] to-[#B5952F] text-stone-950 font-black text-sm sm:text-base shadow-[0_8px_25px_rgba(212,175,55,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] uppercase tracking-wider">
                {tLang.sendOrder} <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-up">
          <div className="bg-[#141311] border border-[#D4AF37]/30 max-w-md w-full rounded-3xl p-6 shadow-2xl relative">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 bg-white/5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            <h3 className="font-black text-xl text-white mb-5 flex items-center gap-2 tracking-wide"><Send className="w-5 h-5 text-[#D4AF37]" /> {tLang.confirmOrder}</h3>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <input type="text" value={honeypotValue} onChange={(e) => setHoneypotValue(e.target.value)} style={{ display: 'none' }} tabIndex={-1} />
              
              <div className="p-4 bg-[#1A1816] rounded-2xl border border-white/5 shadow-inner">
                <div className="text-[10px] sm:text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">{tLang.table}</div>
                <div className="text-lg sm:text-xl font-black text-[#D4AF37]">#{tableNumber}</div>
              </div>
              
              <div>
                <label className="text-[10px] sm:text-xs text-stone-400 block mb-1.5 font-bold uppercase tracking-wider pl-1">{tLang.guestName}</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#1A1816] border border-white/5 rounded-2xl px-4 py-3 sm:py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-medium placeholder-stone-600" 
                  placeholder="..."
                />
              </div>

              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex justify-between items-center mt-6">
                <span className="text-[#E8C972] text-xs sm:text-sm font-bold tracking-wide">{tLang.payOnReceipt}</span>
                <span className="text-lg sm:text-xl font-black text-[#D4AF37] tracking-tight">{cartSubtotal.toLocaleString()} ֏</span>
              </div>
              
              <button type="submit" disabled={isSubmittingOrder} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E8C972] to-[#B5952F] text-stone-950 font-black text-sm flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(212,175,55,0.2)] uppercase tracking-wider">
                {isSubmittingOrder ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />}
                <span>{tLang.confirmOrder}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      {orderConfirmed && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-up">
          <div className="bg-[#1A1816] border border-[#D4AF37]/30 max-w-sm w-full rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-[#D4AF37]" />
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(16,185,129,0.15)]"><CheckCircle2 className="w-10 h-10 stroke-[2]" /></div>
            <h3 className="text-2xl font-black text-white mt-2 leading-tight tracking-tight">{tLang.orderConfirmed}</h3>
            <p className="text-sm text-stone-400 mt-3 font-medium leading-relaxed">{tLang.orderConfirmedSub}</p>
            <button onClick={() => setOrderConfirmed(null)} className="mt-8 w-full py-3.5 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-wider">{tLang.backToMenu}</button>
          </div>
        </div>
      )}

      {}
      {showTablePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1A1816] border border-white/10 max-w-sm w-full rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-white text-lg tracking-wide">{tLang.table}</h3>
              <button onClick={() => setShowTablePicker(false)} className="text-stone-400 hover:text-white transition-colors p-1 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['1', '2', '3', '4', '5', '6', 'VIP 1', 'VIP 2'].map(tbl => (
                <button 
                  key={tbl} 
                  onClick={() => { setTableNumber(tbl); setShowTablePicker(false); localStorage.setItem('ech_table_no', tbl); }} 
                  className={`py-3 rounded-2xl text-[10px] sm:text-xs font-bold transition-all uppercase tracking-wider ${tableNumber === tbl ? 'bg-gradient-to-br from-[#D4AF37] to-[#967B27] text-stone-950 shadow-lg shadow-[#D4AF37]/30 ring-1 ring-[#E8C972]/50 scale-105' : 'bg-white/5 border border-white/5 text-stone-300 hover:bg-white/10 hover:border-white/10'}`}
                >
                  #{tbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}