# Projet : Site Ophélie Malorey — Photographe

## Description
Site vitrine one-page pour Ophélie Malorey, photographe basée à Toulouse.
Le design s'inspire directement de la maquette PDF fournie.

---

## Stack technique

- **HTML5** sémantique uniquement
- **CSS3** pur (pas de framework CSS, pas de Tailwind, pas de Bootstrap)
- **JavaScript** vanilla (pas de framework JS, pas de React, pas de jQuery)
- Aucun bundler, aucun outil de build — fichiers servis tels quels

---

## Structure des fichiers

```
/
├── index.html            # Page unique
├── css/
│   └── style.css         # Feuille de style principale
├── js/
│   └── main.js           # Scripts (animations, interactions)
├── assets/
│   ├── images/           # Photos et visuels du site
│   └── fonts/            # Polices personnalisées si nécessaire
├── CLAUDE.md             # Ce fichier (règles du projet)
└── Ophélie Malorey photographie (1).pdf  # Maquette de référence
```

---

## Sections du site (ordre de la maquette)

1. **Hero** — Nom, titre "PHOTOGRAPHE", sous-titre, photo d'accroche, bouton "COLLABORONS"
2. **Mon Travail** — Texte de présentation + image d'illustration
3. **Œuvres et Travaux** — Galeries photos par séance :
   - "Séance automnale" (Julien) — 3 photos + description
   - "En pleine campagne" (Julia) — 3 photos + description
   - "Matin Vintage" (Timéa) — 3 photos + description
4. **Contact / Disponibilité** — Message d'ouverture aux projets, email, téléphone, adresse, photo
5. **Témoignages** — 3 avis clients (Timéa, Julia, Julien) avec photos rondes

---

## Charte graphique (extraite de la maquette)

### Couleurs
- **Fond principal** : olive foncé / doré sombre (~`#6B6B20` ou similaire, à affiner depuis la maquette)
- **Texte principal** : noir `#000000` ou brun très foncé
- **Texte clair** : blanc cassé pour les zones sombres
- **Accents** : noir pour les encadrés et sections contrastées

### Typographie
- **Titres** : police serif élégante, espacement large (style éditorial), uppercase avec letter-spacing
- **Corps de texte** : police serif lisible, style italique pour les descriptions
- **Style général** : élégant, aéré, minimaliste, artistique

### Images
- Mélange de photos **noir & blanc** et **couleur**
- Photos encadrées avec bordures ou ombres subtiles selon la maquette
- Photos témoignages : rondes (border-radius: 50%)

---

## Règles de codage

### HTML
- Utiliser des balises sémantiques : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Chaque section a un `id` correspondant pour la navigation interne
- Les images ont toujours un attribut `alt` descriptif
- Langue du document : `fr`
- Encodage : UTF-8
- Viewport meta pour le responsive

### CSS
- Pas de CSS inline dans le HTML
- Utiliser des custom properties (variables CSS) pour les couleurs et les fonts
- Mobile-first : les media queries partent du mobile vers le desktop
- Nommage des classes en **kebab-case** (ex: `.hero-section`, `.gallery-grid`)
- Pas de `!important` sauf cas exceptionnel justifié
- Utiliser Flexbox et CSS Grid pour la mise en page
- Animations et transitions en CSS quand possible (pas de JS pour les animations simples)

### JavaScript
- Vanilla JS uniquement, pas de dépendances externes
- Mode strict (`'use strict';`)
- Utilisé uniquement pour : smooth scroll, animations au scroll (Intersection Observer), interactions UI
- Pas de manipulation DOM inutile — le HTML doit être complet sans JS
- Le site doit être **fonctionnel sans JavaScript** (progressive enhancement)

### Responsive
- Breakpoints :
  - Mobile : < 768px
  - Tablette : 768px — 1024px
  - Desktop : > 1024px
- Les images doivent être responsive (`max-width: 100%`)
- La navigation s'adapte (menu hamburger sur mobile si nécessaire)

### Performance
- Images optimisées (formats modernes si possible : WebP avec fallback)
- Lazy loading sur les images hors viewport (`loading="lazy"`)
- CSS et JS minifiés pour la production (mais on travaille sur les fichiers non minifiés)

### Accessibilité
- Contraste suffisant entre texte et fond
- Navigation au clavier possible
- Attributs ARIA si nécessaire
- Textes alternatifs sur toutes les images

---

## Workflow Agent Teams

Le développement est découpé en agents spécialisés travaillant en parallèle :

1. **Agent Structure** — HTML sémantique complet
2. **Agent Style** — CSS complet (layout, couleurs, typo, responsive)
3. **Agent Interactions** — JavaScript (scroll, animations, menu mobile)
4. **Agent Contenu** — Textes, images placeholder, SEO

Les agents sont coordonnés pour produire un résultat cohérent et intégré.

---

## Notes importantes

- Le site est en **français**
- Le nom officiel est "Ophélie Malorey" (pas "Océane" qui apparaît dans certains témoignages de la maquette — à clarifier avec la cliente)
- Les vraies photos seront ajoutées plus tard — utiliser des **placeholders** cohérents en attendant
- Le design doit rester **fidèle à la maquette** tout en étant proprement codé et responsive
