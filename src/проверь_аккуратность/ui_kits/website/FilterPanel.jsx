// FilterPanel.jsx — ZABERG horizontal filter bar
Object.assign(window, { ZFilterPanel });

function ZFilterPanel({ onFilterChange }) {
  const [ram, setRam] = React.useState([]);
  const [storage, setStorage] = React.useState([]);
  const [nfc, setNfc] = React.useState('all');
  const [avail, setAvail] = React.useState([]);
  const [priceMin, setPriceMin] = React.useState(5000);
  const [priceMax, setPriceMax] = React.useState(250000);

  function toggle(arr, setArr, val) {
    setArr(arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val]);
  }

  return (
    <section style={fps.shell}>
      <div style={fps.topRow}>
        <h2 style={fps.heading}>Фильтры</h2>
        <button style={fps.resetBtn} onClick={()=>{setRam([]);setStorage([]);setNfc('all');setAvail([]);setPriceMin(5000);setPriceMax(250000)}}>Сбросить</button>
      </div>
      <div style={fps.grid}>
        <FGroup title="RAM" values={['4 GB','6 GB','8 GB','12 GB','16 GB']} selected={ram} onToggle={v=>toggle(ram,setRam,v)}/>
        <FGroup title="Память" values={['64 GB','128 GB','256 GB','512 GB','1 TB']} selected={storage} onToggle={v=>toggle(storage,setStorage,v)}/>
        <div>
          <p style={fps.groupTitle}>NFC</p>
          {[['all','Все'],['yes','С NFC'],['no','Без NFC']].map(([id,label])=>(
            <label key={id} style={fps.radioRow}>
              <input type="radio" name="nfc" checked={nfc===id} onChange={()=>setNfc(id)} style={{accentColor:'#8b6a47'}}/>
              <span style={fps.checkLabel}>{label}</span>
            </label>
          ))}
        </div>
        <FGroup title="Наличие" values={['В наличии','Под заказ','Нет в наличии']} selected={avail} onToggle={v=>toggle(avail,setAvail,v)}/>
        <div>
          <p style={fps.groupTitle}>Цена</p>
          <div style={{display:'flex',gap:8,marginBottom:6}}>
            <input style={fps.priceInput} type="number" value={priceMin} onChange={e=>setPriceMin(+e.target.value)}/>
            <input style={fps.priceInput} type="number" value={priceMax} onChange={e=>setPriceMax(+e.target.value)}/>
          </div>
          <input type="range" min={5000} max={250000} value={priceMin} onChange={e=>setPriceMin(+e.target.value)} style={{width:'100%',accentColor:'#8b6a47',marginBottom:4}}/>
          <input type="range" min={5000} max={250000} value={priceMax} onChange={e=>setPriceMax(+e.target.value)} style={{width:'100%',accentColor:'#8b6a47'}}/>
          <div style={{fontSize:11,color:'#7a6d5c',marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>
            {priceMin.toLocaleString('ru-RU')} ₽ — {priceMax.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </section>
  );
}

function FGroup({ title, values, selected, onToggle }) {
  return (
    <div>
      <p style={fps.groupTitle}>{title}</p>
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
        {values.map(v => (
          <label key={v} style={fps.checkRow}>
            <input type="checkbox" checked={selected.includes(v)} onChange={()=>onToggle(v)} style={{accentColor:'#8b6a47',width:13,height:13}}/>
            <span style={fps.checkLabel}>{v}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const fps = {
  shell: { background:'#fffdf9', border:'1px solid #e3d8c9', borderRadius:6, padding:'16px 20px', marginBottom:20 },
  topRow: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 },
  heading: { fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:500, color:'#1f1b16' },
  resetBtn: { fontSize:12, padding:'6px 14px', borderRadius:4, border:'1px solid #d4c8b8', background:'transparent', color:'#5f5346', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'12px 20px' },
  groupTitle: { fontSize:11, textTransform:'uppercase', letterSpacing:'.12em', color:'#786b5a', marginBottom:6, fontFamily:"'DM Sans',sans-serif" },
  checkRow: { display:'flex', alignItems:'center', gap:7, cursor:'pointer' },
  radioRow: { display:'flex', alignItems:'center', gap:7, cursor:'pointer', marginBottom:5 },
  checkLabel: { fontSize:12, color:'#41382d', fontFamily:"'DM Sans',sans-serif" },
  priceInput: { background:'#f6f2eb', border:'1px solid #d9cdbb', borderRadius:4, padding:'6px 8px', fontSize:12, color:'#1f1b16', width:'100%', outline:'none', fontFamily:"'DM Sans',sans-serif" },
};
