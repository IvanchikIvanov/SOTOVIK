// Sidebar.jsx — ZABERG left sidebar with category nav
Object.assign(window, { ZSidebar });

const CATS = [
  { id:'smartphones', label:'Смартфоны', brands:['Apple','Samsung','Xiaomi','Honor','Google','Realme'] },
  { id:'tablets', label:'Планшеты', brands:['Apple','Samsung','Lenovo'] },
  { id:'computers', label:'Компьютеры', brands:['Apple','ASUS','Lenovo','HP'] },
  { id:'watches', label:'Умные часы', brands:['Apple','Samsung','Xiaomi'] },
  { id:'audio', label:'Наушники', brands:['Apple','Sony','Dyson','Samsung'] },
  { id:'gaming', label:'Игровые приставки', brands:['Sony','Microsoft'] },
  { id:'home', label:'Техника для дома', brands:['Dyson','Samsung','Xiaomi'] },
  { id:'accessories', label:'Аксессуары', brands:['Apple','Samsung','Xiaomi'] },
];

const catIcons = {
  smartphones: '📱', tablets: '📟', computers: '💻', watches: '⌚',
  audio: '🎧', gaming: '🎮', home: '🏠', accessories: '🔌',
};

function ZSidebar({ collapsed, onToggle, activeCategory, activeBrand, onNav }) {
  const [expanded, setExpanded] = React.useState(['smartphones']);

  function toggleExpand(id) {
    setExpanded(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  }

  return (
    <>
      <aside style={{
        ...ss.aside,
        width: collapsed ? 0 : 256,
        borderRight: collapsed ? 'none' : '1px solid #ddd3c4',
        overflow: 'hidden',
      }}>
        <div style={{width:256, opacity: collapsed ? 0 : 1, transition:'opacity 400ms', pointerEvents: collapsed ? 'none' : 'auto'}}>
          <div style={ss.inner}>
            <h2 style={ss.heading}>Каталог</h2>
            <nav style={{display:'flex',flexDirection:'column',gap:2}}>
              {CATS.map(cat => {
                const isActive = activeCategory === cat.id;
                const isExpanded = expanded.includes(cat.id);
                return (
                  <div key={cat.id}>
                    <div style={{position:'relative'}}>
                      <div
                        style={{...ss.catItem, ...(isActive && !activeBrand ? ss.catItemActive : {})}}
                        onClick={() => onNav('catalog', cat.id)}
                      >
                        <span style={{fontSize:15}}>{catIcons[cat.id]}</span>
                        <span style={{fontSize:14}}>{cat.label}</span>
                      </div>
                      <button
                        style={{...ss.chevronBtn, ...(isExpanded?{transform:'rotate(180deg)'}:{})}}
                        onClick={e=>{e.stopPropagation();toggleExpand(cat.id)}}
                      >▾</button>
                    </div>
                    {isExpanded && cat.brands.length > 0 && (
                      <div style={ss.brandList}>
                        {cat.brands.map(b => {
                          const bActive = isActive && activeBrand === b;
                          return (
                            <div key={b} style={{...ss.brandItem, ...(bActive?ss.brandItemActive:{})}}
                              onClick={() => onNav('catalog', cat.id, b)}>
                              {b}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Toggle tab */}
      <button
        style={{...ss.toggleTab, left: collapsed ? 0 : 256}}
        onClick={onToggle}
        title={collapsed ? 'Развернуть' : 'Свернуть'}
      >{collapsed ? '›' : '‹'}</button>
    </>
  );
}

const ss = {
  aside: { position:'fixed', top:80, left:0, height:'calc(100vh - 80px)', zIndex:40, background:'#fffdf9', transition:'width 400ms cubic-bezier(0.22,1,0.36,1),border 400ms' },
  inner: { padding:'16px 8px', width:256 },
  heading: { fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:'#1f1b16', padding:'0 8px', marginBottom:12 },
  catItem: { display:'flex', alignItems:'center', gap:10, padding:'9px 12px', paddingRight:36, borderRadius:4, fontSize:14, color:'#6f6354', cursor:'pointer', transition:'all 150ms', fontFamily:"'DM Sans',sans-serif" },
  catItemActive: { background:'#f1ebe2', color:'#1f1b16', borderLeft:'2px solid #8b6a47', paddingLeft:10 },
  chevronBtn: { position:'absolute', right:6, top:'50%', transform:'translateY(-50%)', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4, background:'transparent', border:'none', color:'#6f6354', cursor:'pointer', fontSize:14, transition:'transform 300ms', lineHeight:1 },
  brandList: { marginLeft:36, paddingLeft:8, borderLeft:'1px solid #ddcfbd', display:'flex', flexDirection:'column', gap:2, marginTop:2, marginBottom:6 },
  brandItem: { fontSize:11, textTransform:'uppercase', letterSpacing:'.09em', padding:'4px 8px', borderRadius:3, color:'#7b6f5f', cursor:'pointer', transition:'all 120ms', fontFamily:"'DM Sans',sans-serif" },
  brandItemActive: { background:'#ece0c6', color:'#3f351f' },
  toggleTab: { position:'fixed', top:152, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', height:56, width:24, borderRadius:'0 6px 6px 0', border:'1px solid #d9cdbb', borderLeft:'none', background:'#f2eadf', color:'#5f5346', cursor:'pointer', fontSize:16, transition:'left 400ms cubic-bezier(0.22,1,0.36,1)', boxShadow:'2px 2px 8px rgba(60,40,15,.1)' },
};
