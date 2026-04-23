// ProductCard.jsx — ZABERG real card style
Object.assign(window, { ZProductCard });

function ZProductCard({ product, onAdd, onDetail }) {
  const [justAdded, setJustAdded] = React.useState(false);
  const [buyOpen, setBuyOpen] = React.useState(false);

  function handleAdd(e) {
    e.stopPropagation();
    if (!product.in_stock) return;
    setJustAdded(true); onAdd && onAdd(product);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div style={pcs.wrap} onClick={() => onDetail && onDetail(product)}>
      <article style={pcs.card}>
        {/* Image */}
        <div style={pcs.imgBox}>
          <div style={pcs.imgInner}>{product.icon}</div>
          <span style={pcs.tagCat}>{product.categoryLabel}</span>
          <span style={pcs.tagBrand}>{product.brand}</span>
        </div>
        {/* Body */}
        <div style={pcs.body}>
          <h3 style={pcs.name}>{product.name}</h3>
          <div style={pcs.chips}>
            {[product.screen, product.ram, product.storage].filter(Boolean).map(v => (
              <span key={v} style={pcs.chip}>{v}</span>
            ))}
          </div>
          <div style={pcs.priceRow}>
            <div>
              <div style={pcs.price}>{product.price.toLocaleString('ru-RU')} ₽</div>
              {product.oldPrice && <div style={pcs.oldPrice}>{product.oldPrice.toLocaleString('ru-RU')} ₽</div>}
            </div>
            <span style={pcs.avail}>{product.in_stock ? 'В наличии' : 'Нет в наличии'}</span>
          </div>
          <div style={pcs.actions} onClick={e=>e.stopPropagation()}>
            <button
              style={{...pcs.btnBuy, ...(!product.in_stock?pcs.btnDisabled:{})}}
              disabled={!product.in_stock}
              onClick={e=>{e.stopPropagation();setBuyOpen(true)}}
            >
              <ZapIcon/> Купить
            </button>
            <button
              style={{...pcs.btnCart, ...(justAdded?pcs.btnCartAdded:{})}}
              onClick={handleAdd}
            >
              {justAdded ? <CheckIcon/> : <CartIconSm/>}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

const ZapIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const CheckIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const CartIconSm = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;

const pcs = {
  wrap: { cursor:'pointer' },
  card: { background:'#fffdf9', border:'1px solid #e7ded1', borderRadius:6, overflow:'hidden', display:'flex', flexDirection:'column', transition:'transform 250ms', boxShadow:'0 1px 3px rgba(35,29,22,.08)' },
  imgBox: { position:'relative', aspectRatio:'1/1', background:'linear-gradient(145deg,#f1ece3,#f8f5f0)', display:'flex', alignItems:'center', justifyContent:'center' },
  imgInner: { fontSize:64 },
  tagCat: { position:'absolute', top:10, left:10, fontSize:10, textTransform:'uppercase', letterSpacing:'.1em', padding:'3px 8px', borderRadius:3, background:'rgba(255,255,255,.9)', color:'#5d5247', fontFamily:"'DM Sans',sans-serif" },
  tagBrand: { position:'absolute', top:10, right:10, fontSize:10, textTransform:'uppercase', letterSpacing:'.1em', padding:'3px 8px', borderRadius:3, border:'1px solid #d4c8b8', background:'rgba(255,255,255,.9)', color:'#6a5f52', fontFamily:"'DM Sans',sans-serif" },
  body: { padding:'14px 14px 14px', borderTop:'1px solid #e7ded1', display:'flex', flexDirection:'column', gap:8, flex:1 },
  name: { fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:'#1f1b16', lineHeight:1.3 },
  chips: { display:'flex', flexWrap:'wrap', gap:5 },
  chip: { fontSize:10, textTransform:'uppercase', letterSpacing:'.07em', padding:'3px 7px', borderRadius:3, background:'#f2ebe0', border:'1px solid #e1d5c3', color:'#6a5a46', fontFamily:"'DM Sans',sans-serif" },
  priceRow: { display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:8 },
  price: { fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600, color:'#1f1b16' },
  oldPrice: { fontSize:11, color:'#8d806f', textDecoration:'line-through', fontFamily:"'DM Sans',sans-serif" },
  avail: { fontSize:10, textTransform:'uppercase', letterSpacing:'.1em', color:'#736655', fontFamily:"'DM Sans',sans-serif", textAlign:'right' },
  actions: { display:'flex', gap:8, marginTop:4 },
  btnBuy: { flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, padding:'8px 14px', borderRadius:4, background:'#1f1b16', color:'#fffdf9', border:'none', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background 150ms' },
  btnDisabled: { background:'#d4c8b8', color:'#9e9080', cursor:'not-allowed' },
  btnCart: { display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'8px 12px', borderRadius:4, background:'transparent', color:'#5f5346', border:'1px solid #d4c8b8', cursor:'pointer', transition:'all 150ms' },
  btnCartAdded: { background:'#e9f1e1', border:'1px solid #bbd1a7', color:'#3f6b2f' },
};
