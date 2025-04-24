# Deprem API

Bu Deprem API'si, Türkiye'deki son ve geçmiş deprem bilgilerini sunar. Veriler, **KOERI (Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü)** tarafından sağlanır ve hızlı, güvenilir erişim için önbellekleme (cache) sistemi kullanır.

### Özellikler

* Son deprem verilerini alma
* Belirli sayıda son depremi listeleme
* JSON formatında veri çıktısı

### Kullanım

#### API Uç Noktaları (Endpoints)

1.  **`GET /api/tum`**
    * Tüm depremleri listeler.
    * Örnek İstek: `/api/tum`

2.  **`GET /api/son`**
    * En son gerçekleşen depremi getirir.
    * Örnek İstek: `/api/son`

3.  **`GET /api/son/:adet`**
    * Belirtilen sayıda son depremi listeler.
    * Örnek İstek: `/api/son/5` (Son 5 depremi getirir.)

#### API Yanıt Formatı

API, aşağıdaki JSON formatında bir yanıt döndürür:

```json
{
  "tarih": "2025.04.24",
  "saat": "02:39:03",
  "enlem": "40.8578",
  "boylam": "28.3930",
  "derinlik_km": "10",
  "buyukluk": "4.3",
  "konum": "MARMARA DENIZI - Tekirdağ"
}

```

### Yanıt Açıklamaları

- **tarih**: Depremin tarihi (YYYY.MM.DD formatında).
- **saat**: Depremin saati (HH:MM:SS formatında).
- **enlem**: Depremin enlem koordinatı.
- **boylam**: Depremin boylam koordinatı.
- **derinlik_km**: Depremin derinliği (km cinsinden).
- **buyukluk**: Depremin büyüklüğü (Richer ölçeği).
- **konum**: Depremin konumu veya açıklaması.

### Kurulum

Projeyi yerel bilgisayarınızda çalıştırabilmek için aşağıdaki adımları takip edebilirsiniz:

1. **Projeyi İndirin**  
   Projeyi GitHub'dan indirip, yerel bilgisayarınıza aktarın:
   ```bash
   git clone https://github.com/corspolicy/deprem-api-nodejs.git
   ```
2. **Bağımlılıkları Yükleyin**  
Proje bağımlılıklarını yüklemek için aşağıdaki komutu kullanın:
  ```bash
   npm install
   ```

3. **Sunucuyu Başlatın**  
Sunucuyu başlatmak için şu komutu çalıştırabilirsiniz:
  ```bash
   npm start
   ```
   
### Yasal Bilgiler

- **Ticari Amaçla Kullanılmamalıdır**: Bu API yalnızca eğitim ve araştırma amaçları için kullanılabilir. Ticari amaçlarla kullanım için izin alınmalıdır.
- **Veri Kaynağı**: API'de kullanılan veriler **KOERI (Boğaziçi Üniversitesi)** tarafından sağlanmaktadır.

### Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, aşağıdaki adımları takip edebilirsiniz:

1. Bu repository'yi **fork**'layın.
2. Yeni bir branch oluşturun.
3. Değişikliklerinizi yapın ve commit'leyin.
4. **Pull request** gönderin.

### API Performansı ve Önbellekleme

Bu API, yüksek erişilebilirlik ve hızlı yanıt süreleri için bir önbellekleme (cache) sistemi kullanmaktadır. Olası yoğun trafik durumlarında, veriler önceden cache'lenmiş olup, kullanıcılara hızlı bir şekilde sunulur. Bu sayede, API'ye yapılan istekler hızla yanıtlanır.

### Proje Hakkında

**Deprem API**, Türkiye'deki son ve geçmiş depremler hakkında bilgi sağlamak için tasarlanmış bir API'dir. Veriler, **KOERI (Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü)** tarafından sağlanmakta olup, son depremlerle ilgili detaylı bilgilere kolayca erişilebilir. Bu proje eğitimsel ve araştırma amaçlı kullanıma yöneliktir ve ticari amaçlarla kullanılmamalıdır.
