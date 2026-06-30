const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const siteData = {
  brand: {
    name: 'QUANG FASHION',
    tagline: { vi: 'Nghệ Thuật Của Sự Sang Trọng', en: 'The Art of Luxury' },
    founded: '2010',
    email: 'hello@quangfashion.vn',
    phone: '+84 28 3823 9999',
    address: { vi: '37B Nguyễn Thái Học, Nha Trang, Khánh Hòa', en: '37B Nguyen Thai Hoc, Nha Trang, Khanh Hoa' },
  },
  collections: [
    {
      id: 'noir-eternel',
      name: 'Noir Éternel',
      season: 'SS 2025',
      desc: { vi: 'Vẻ đẹp vĩnh cửu trong sắc đen huyền bí', en: 'Eternal beauty in mysterious black' },
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85',
      pieces: 24,
    },
    {
      id: 'lumiere-doree',
      name: 'Lumière Dorée',
      season: 'FW 2025',
      desc: { vi: 'Ánh vàng của buổi bình minh xa xỉ', en: 'The golden light of a luxurious dawn' },
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85',
      pieces: 18,
    },
    {
      id: 'velours-nuit',
      name: 'Velours de Nuit',
      season: 'SS 2025',
      desc: { vi: 'Nhung đêm — sự mềm mại của quyền lực', en: 'Night velvet — the softness of power' },
      image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=85',
      pieces: 20,
    },
    {
      id: 'jade-imperiale',
      name: 'Jade Impériale',
      season: 'FW 2024',
      desc: { vi: 'Di sản phương Đông trong ngôn ngữ haute couture', en: 'Eastern heritage in the language of haute couture' },
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85',
      pieces: 16,
    },
    {
      id: 'blanc-poetique',
      name: 'Blanc Poétique',
      season: 'SS 2024',
      desc: { vi: 'Bài thơ trắng — thuần khiết và mạnh mẽ', en: 'White poetry — pure and powerful' },
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85',
      pieces: 22,
    },
    {
      id: 'crimson-heritage',
      name: 'Crimson Heritage',
      season: 'FW 2024',
      desc: { vi: 'Đỏ son — màu của di sản và niềm kiêu hãnh', en: 'Crimson — the color of heritage and pride' },
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85',
      pieces: 19,
    },
  ],
  lookbook: [
    { id: 1, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90', caption: { vi: 'Thu Đông 2025 — Tầm Nhìn Mới', en: 'Fall Winter 2025 — A New Vision' } },
    { id: 2, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90', caption: { vi: 'Đường Phố Sài Gòn', en: 'Streets of Saigon' } },
    { id: 3, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=90', caption: { vi: 'Ánh Sáng Vàng', en: 'Golden Light' } },
    { id: 4, image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=1200&q=90', caption: { vi: 'Sức Mạnh Nữ Tính', en: 'Feminine Power' } },
    { id: 5, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=90', caption: { vi: 'Nghệ Thuật Đương Đại', en: 'Contemporary Art' } },
    { id: 6, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90', caption: { vi: 'Cuộc Sống Xa Hoa', en: 'Luxurious Life' } },
    { id: 7, image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=1200&q=90', caption: { vi: 'Đêm Sài Gòn', en: 'Saigon Night' } },
    { id: 8, image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=90', caption: { vi: 'Thời Trang Là Nghệ Thuật', en: 'Fashion Is Art' } },
  ],
};

app.get('/', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('index', { ...siteData, lang, page: 'home' });
});

app.get('/collections', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('collections', { ...siteData, lang, page: 'collections' });
});

app.get('/collections/:id', (req, res) => {
  const lang = req.query.lang || 'vi';
  const collection = siteData.collections.find(c => c.id === req.params.id);
  if (!collection) return res.redirect('/collections');
  res.render('collection-detail', { ...siteData, lang, page: 'collections', collection });
});

app.get('/lookbook', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('lookbook', { ...siteData, lang, page: 'lookbook' });
});

app.get('/about', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('about', { ...siteData, lang, page: 'about' });
});

app.get('/contact', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('contact', { ...siteData, lang, page: 'contact', success: false });
});

app.post('/contact', (req, res) => {
  const lang = req.query.lang || 'vi';
  res.render('contact', { ...siteData, lang, page: 'contact', success: true });
});

app.listen(PORT, () => {
  console.log(`QUANG FASHION server running on http://localhost:${PORT}`);
});
