# Breakdown VFX : utiliser l'app sans Claude

Ce dossier est l'application complète. Elle fonctionne dans le navigateur du téléphone, s'installe comme une vraie app et marche sans réseau sur le plateau.

## 1. Mettre l'app en ligne (une seule fois)

Il faut une adresse en https pour que l'appareil photo, l'installation et le mode hors ligne fonctionnent. Choisis l'une de ces options gratuites.

**Netlify (le plus rapide)**
1. Va sur app.netlify.com/drop.
2. Glisse le dossier dézippé sur la page.
3. Crée un compte gratuit si on te le demande, pour que le site reste en ligne.
4. Tu obtiens une adresse en https. Note-la.

**GitHub Pages**
1. Crée un dépôt GitHub et envoie-y tous les fichiers du dossier.
2. Dans Settings > Pages, choisis la branche principale et enregistre.
3. L'adresse est du type https://ton-pseudo.github.io/nom-du-depot/

**Cloudflare Pages**
1. Crée un projet Pages avec l'option « Direct Upload ».
2. Envoie le dossier. Tu obtiens une adresse en https.

## 2. Installer sur le téléphone

- **iPhone (Safari)** : ouvre l'adresse, touche le bouton Partager, puis « Sur l'écran d'accueil ».
- **Android (Chrome)** : ouvre l'adresse, ouvre le menu, puis « Installer l'application » ou « Ajouter à l'écran d'accueil ».

Ouvre l'app une première fois avec du réseau. Elle télécharge alors les polices et le module PDF, puis fonctionne entièrement hors ligne.

## 3. Tes données

- Tout est enregistré sur l'appareil, dans le navigateur. Rien n'est envoyé sur un serveur et rien n'est synchronisé entre téléphones.
- Ne vide pas les données du site dans les réglages du navigateur.
- Fais une sauvegarde complète (Exporter > Sauvegarde JSON) en fin de journée de tournage. Pour passer d'un téléphone à l'autre, importe ce fichier sur le second.
- L'export PDF et CSV enregistre un fichier sur le téléphone (dossier Téléchargements ou app Fichiers).

## 4. Mettre l'app à jour

Remplace les fichiers sur ton hébergement, puis change le numéro de version en haut de `sw.js` (par exemple breakdown-vfx-v2). L'app se met à jour à la prochaine ouverture avec du réseau.

## 5. Tester sur ordinateur

Dans le dossier, lance `python3 -m http.server 8000`, puis ouvre http://localhost:8000 dans Chrome. L'appareil photo n'existe pas sur ordinateur, mais l'import d'images fonctionne.

## Contenu du dossier

- index.html : l'application
- manifest.webmanifest : nom et icônes pour l'installation
- sw.js : mode hors ligne
- icon-*.png : icônes
