# Script de déploiement des fichiers publics vers le serveur
# Ce script copie les images, icons et SVG vers le serveur de production

Write-Host "Déploiement des fichiers publics..." -ForegroundColor Cyan

# Build du projet d'abord
Write-Host "Build du projet..." -ForegroundColor Yellow
npm run build

# Copie des icons
Write-Host "Copie des icons..." -ForegroundColor Yellow
scp -P 22043 -r "dist/client/icons" etudiant@185.157.244.202:/var/www/portfolio/

# Copie des SVG
Write-Host "Copie des SVG..." -ForegroundColor Yellow
scp -P 22043 -r "dist/client/svg" etudiant@185.157.244.202:/var/www/portfolio/

# Copie des images
Write-Host "Copie des images..." -ForegroundColor Yellow
scp -P 22043 -r "dist/client/images" etudiant@185.157.244.202:/var/www/portfolio/

# Copie des fichiers SVG à la racine
Write-Host "Copie des fichiers SVG racine..." -ForegroundColor Yellow
scp -P 22043 "dist/client/*.svg" etudiant@185.157.244.202:/var/www/portfolio/

Write-Host "Déploiement terminé !" -ForegroundColor Green
