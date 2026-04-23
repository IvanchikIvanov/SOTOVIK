// Header.jsx — ZABERG real structure
Object.assign(window, { ZHeader });

function ZHeader({ cartCount = 0, onCartClick, onNav, currentPage }) {
  const topLinks = ['Каталог','Контакты','Доставка','Кредит','Гарантия'];
  return (
    <header style={hs.root}>
      <div style={hs.inner}>
        {/* Logo area */}
        <div style={hs.logoWrap} onClick={() => onNav('home')}>
          <div style={hs.logoText}>ZABERG</div>
        </div>
        {/* Top nav */}
        <nav style={hs.nav}>
          {topLinks.map(l => (
            <span key={l} style={{...hs.navItem, ...(currentPage===l?hs.navActive:{})}}
              onClick={() => onNav('catalog')}>{l}</span>
          ))}
        </nav>
        {/* Right */}
        <div style={hs.right}>
          <a href="tel:+79991234567" style={hs.phone}>+7 (999) 123-45-67</a>
          <div style={{...hs.cartBtn, position:'relative'}} onClick={onCartClick}>
            <CartIcon size={18}/>
            {cartCount > 0 && <span style={hs.cartBadge}>{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

function CartIcon({ size=18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

const hs = {
  root: { position:'sticky', top:0, zIndex:50, height:80, background:'rgba(255,253,249,0.96)', borderBottom:'1px solid #ddd3c4', backdropFilter:'blur(8px)', display:'flex', alignItems:'center' },
  inner: { maxWidth:1400, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', gap:32, width:'100%' },
  logoWrap: { cursor:'pointer', flexShrink:0 },
  logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:'#1f1b16', letterSpacing:'.04em' },
  nav: { display:'flex', gap:6, flex:1 },
  navItem: { fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.13em', padding:'5px 10px', borderRadius:4, color:'#7f7363', cursor:'pointer', transition:'color 150ms', fontFamily:"'DM Sans',sans-serif" },
  navActive: { color:'#1f1b16' },
  right: { display:'flex', alignItems:'center', gap:20, flexShrink:0 },
  phone: { fontSize:14, fontWeight:500, color:'#7f7363', textDecoration:'none', fontFamily:"'DM Sans',sans-serif" },
  cartBtn: { color:'#7f7363', cursor:'pointer', display:'flex', alignItems:'center' },
  cartBadge: { position:'absolute', top:-4, right:-6, minWidth:14, height:14, padding:'0 3px', display:'inline-flex', alignItems:'center', justifyContent:'center', borderRadius:9999, background:'#1f1b16', color:'#fff', fontSize:9, fontWeight:600 },
};
