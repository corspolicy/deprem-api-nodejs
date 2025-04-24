const HyperExpress = require('hyper-express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = new HyperExpress.Server()
const url = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp'
// cachele aq
let cache = {
  data: null,
  timestamp: 0,
  duration: 60 * 1000
}

async function getEarthquakes() {
  const now = Date.now()
  if (cache.data && (now - cache.timestamp < cache.duration)) {
    console.log('cacheden aldım veriyi') 
    return cache.data
  }

  console.log('veri kazınıyo') 
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)
  const rawText = $('pre').text()
  const lines = rawText.split('\n').map(line => line.trim()).filter(line => line)
  const earthquakeLines = lines.slice(6)

  const parsed = earthquakeLines.map(line => {
    return {
      tarih: line.slice(0, 10).trim(),
      saat: line.slice(11, 19).trim(),
      enlem: line.slice(21, 29).trim(),
      boylam: line.slice(30, 38).trim(),
      derinlik_km: line.slice(39, 45).trim(),
      buyukluk: line.slice(64, 68).trim(),
      konum: line.slice(70).trim()
    }
  })

  cache.data = parsed
  cache.timestamp = now
  return parsed
}

// tüğm depremler
app.get('/api/tum', async (req, res) => {
  try {
    const data = await getEarthquakes() 
    res.setHeader('Content-Type', 'application/json; charset=utf-8') 
    res.json(data) 
  } catch {
    res.status(500).json({ hata: 'veriyi alamadım bi sıkıntı oldu' }) 
  }
})

// son deprem
app.get('/api/son', async (req, res) => {
  try {
    const data = await getEarthquakes() 
    res.setHeader('Content-Type', 'application/json; charset=utf-8') 
    res.json(data[0]) 
  } catch {
    res.status(500).json({ hata: 'en son depremi çekemedim' }) 
  }
})

// arz talep meselesi aşko
app.get('/api/son/:adet', async (req, res) => {
  try {
    const adet = parseInt(req.path_parameters.adet) 
    if (isNaN(adet)) return res.status(400).json({ hata: 'sayı girmedin ki aw' }) 
    const data = await getEarthquakes() 
    res.setHeader('Content-Type', 'application/json; charset=utf-8') 
    res.json(data.slice(0, adet)) 
  } catch {
    res.status(500).json({ hata: 'deprem listesini alamadım' }) 
  }
})

// cache
app.get('/api/durum', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8') 
  res.json({
    mesaj: 'sunucu çalışıyo', 
    cache_var_mi: cache.data !== null, 
    son_guncelleme: cache.timestamp ? new Date(cache.timestamp).toLocaleString('tr-TR') : 'yok daha', 
    veri_adedi: cache.data ? cache.data.length : 0, 
    cache_kalan_sure_sn: cache.data ? Math.max(0, Math.floor((cache.duration - (Date.now() - cache.timestamp)) / 1000)) : 'yok' 
  })
})