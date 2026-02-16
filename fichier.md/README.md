# Site Portfolio — Ophélie Malorey Photographe

Site vitrine one-page élégant pour Ophélie Malorey, photographe basée à Toulouse.

---

## 🚀 Lancement du site

### Option 1 : Ouverture directe (simple)
Double-cliquez sur le fichier `index.html` — il s'ouvrira directement dans votre navigateur.

### Option 2 : Serveur local (recommandé pour un rendu optimal)

**Avec Python :**
```bash
cd "Site Ophelie"
python -m http.server 8080
```
Puis ouvrez : http://localhost:8080

**Avec Node.js (npx) :**
```bash
npx http-server -p 8080
```

**Avec l'extension VSCode "Live Server" :**
Clic droit sur `index.html` → "Open with Live Server"

---

## 📁 Structure du projet

```
Site Ophelie/
├── index.html              # Page HTML unique
├── css/
│   └── style.css          # Feuille de style complète (~32 Ko)
├── js/
│   └── main.js            # JavaScript des interactions (~20 Ko)
├── assets/
│   └── images/            # Dossier pour vos vraies photos
├── Photos site/           # Photos fournies par Ophélie
├── CLAUDE.md              # Règles de développement
├── README.md              # Ce fichier
└── Ophélie Malorey photographie (1).pdf  # Maquette de référence
```

---

## ✨ Fonctionnalités implémentées

### Design
- ✅ Palette olive/doré/noir/crème fidèle à la maquette
- ✅ Typographie élégante (Playfair Display + Cormorant Garamond)
- ✅ Texture grain subtile en overlay
- ✅ Cadres artistiques dorés autour des images
- ✅ Lettrine sur le paragraphe "Mon travail"
- ✅ Guillemets français stylisés dans les témoignages
- ✅ Scrollbar personnalisée

### Sections
1. **Hero** — Nom, titre, tagline, bouton CTA
2. **Mon travail** — Présentation + image
3. **Œuvres et travaux** — 3 séances photo (Automnale, Campagne, Vintage) avec grilles 3×3
4. **CTA** — Appel aux projets
5. **Contact** — Email, téléphone, adresse
6. **Témoignages** — 3 avis clients
7. **Footer** — Réseaux sociaux, copyright

### Interactions JavaScript
- ✅ Navigation smooth scroll avec offset navbar
- ✅ Menu hamburger responsive
- ✅ Navbar qui change au scroll (transparence + hide/show intelligent)
- ✅ Animations reveal au scroll (Intersection Observer + stagger effect)
- ✅ Lightbox photos avec navigation prev/next et clavier
- ✅ Parallaxe subtil sur l'image hero
- ✅ Animation typing sur "PHOTOGRAPHE"
- ✅ Bouton back-to-top
- ✅ Fade-in des images lazy-loaded

### Responsive
- ✅ Mobile-first : 4 breakpoints (mobile, tablette, desktop, large desktop)
- ✅ Menu hamburger sur mobile
- ✅ Grilles adaptatives (3 colonnes → 2 → 1)
- ✅ Images 100% responsive

### Performance & Accessibilité
- ✅ Lazy loading sur les images
- ✅ Respect de `prefers-reduced-motion`
- ✅ Navigation au clavier
- ✅ Attributs ARIA complets
- ✅ SEO optimisé (meta tags, Open Graph, JSON-LD)
- ✅ Styles print

---

## 🎨 Remplacer les images placeholder

Les images utilisent actuellement des placeholders de https://placehold.co/. Pour utiliser vos vraies photos :

1. Placez vos images dans le dossier `assets/images/`
2. Ouvrez `index.html`
3. Cherchez les balises `<img src="https://placehold.co/...">` et remplacez les URLs par vos chemins, par exemple :
   ```html
   <img src="assets/images/hero.jpg" alt="Photo de présentation">
   ```

### Images à prévoir :

**Hero :**
- 1 image portrait/paysage d'accroche (recommandé : 800×1000px)

**Mon travail :**
- 1 image d'illustration (600×800px)

**Séances (3 séances × 3 photos) :**
- **Séance automnale** : 3 photos avec Julien (600×400px chacune)
- **En pleine campagne** : 3 photos avec Julia (600×400px chacune)
- **Matin Vintage** : 3 photos avec Timéa (600×400px chacune)

**Contact :**
- 1 photo portrait d'Ophélie (400×600px)

**Témoignages :**
- 3 photos rondes des clients (Timéa, Julia, Julien) — 200×200px minimum

**Image vedette "Œuvres" :**
- 1 grande photo mise en avant (800×500px)

---

## 🔧 Personnalisation

### Modifier les couleurs
Ouvrez `css/style.css`, ligne 14-24, et ajustez les variables CSS :
```css
:root {
    --color-olive:        #5C5A1E;
    --color-gold:         #C4A962;
    /* etc. */
}
```

### Modifier les textes
Tous les textes sont directement dans `index.html`. Cherchez les balises correspondantes :
- `<h1>`, `<h2>` pour les titres
- `<p>` pour les paragraphes
- `class="section-travail-description"` pour le texte "Mon travail"
- etc.

### Ajouter des photos de séances
Dans la section `#oeuvres` du HTML, dupliquez une `<div class="session">` complète et adaptez :
- Le titre de la séance
- La description
- Les 3 images
- L'attribut `data-lightbox="nom-seance"` pour grouper les photos

---

## 📱 Réseaux sociaux

Les liens des réseaux sociaux sont dans le footer (ligne ~460 du HTML). Remplacez les `#` par vos vrais liens :
```html
<a href="https://instagram.com/opheliemalorey" target="_blank" aria-label="Instagram">...</a>
```

---

## 📧 Contact

**Email :** O.LILIMALOREY@GMAIL.COM
**Téléphone :** 06.72.07.76.98
**Localisation :** Toulouse, Lot, et accessible en train

---

## 🎯 Optimisations pour la mise en production

Avant de mettre le site en ligne :

1. **Optimiser les images** : compresser avec TinyPNG ou Squoosh (format WebP recommandé)
2. **Minifier CSS et JS** : utiliser un outil comme [CSS Minifier](https://cssminifier.com/) et [JS Minifier](https://javascript-minifier.com/)
3. **Ajouter un vrai favicon** : générer sur [Favicon.io](https://favicon.io/)
4. **Configurer un nom de domaine** : par exemple `opheliemalorey.fr`
5. **Hébergement** : Netlify, Vercel, ou GitHub Pages (gratuits et performants pour des sites statiques)

### Déploiement rapide sur Netlify (gratuit)
1. Créer un compte sur [Netlify](https://netlify.com)
2. Glisser-déposer le dossier `Site Ophelie` complet
3. Le site est en ligne en 30 secondes avec une URL HTTPS

---

## 📝 Crédits

- **Design original** : Ophélie Malorey
- **Développement** : Site créé avec HTML5/CSS3/JavaScript vanilla
- **Fonts** : Google Fonts (Playfair Display, Cormorant Garamond)
- **Stack** : Aucune dépendance, aucun framework — code 100% natif

---

## 🆘 Support

Si vous avez des questions ou besoin de modifications, consultez le fichier `CLAUDE.md` qui documente toutes les règles de développement du projet.

---

**Made with ❤️ for Ophélie Malorey**
