# Script de déploiement COMPLET du site Astro avec Node.js
Write-Host "=== DÉPLOIEMENT COMPLET ASTRO + NODE.JS ===" -ForegroundColor Cyan

# 1. Build en local
Write-Host "`n[1/5] Build du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors du build!" -ForegroundColor Red
    exit 1
}

# 2. Copie du dossier dist complet
Write-Host "`n[2/5] Copie du dossier dist..." -ForegroundColor Yellow
scp -P 22043 -r "dist" etudiant@185.157.244.202:/var/www/portfolio/

# 3. Copie du package.json
Write-Host "`n[3/5] Copie du package.json..." -ForegroundColor Yellow
scp -P 22043 "package.json" etudiant@185.157.244.202:/var/www/portfolio/

# 4. Installation des dépendances et redémarrage sur le serveur
Write-Host "`n[4/5] Installation des dépendances sur le serveur..." -ForegroundColor Yellow
ssh -p 22043 etudiant@185.157.244.202 "cd /var/www/portfolio && npm install --production && pm2 stop portfolio-andrea 2>/dev/null; pm2 start dist/server/entry.mjs --name portfolio-andrea && pm2 save"

# 5. Vérification
Write-Host "`n[5/5] Vérification du déploiement..." -ForegroundColor Yellow
ssh -p 22043 etudiant@185.157.244.202 "pm2 list"

Write-Host "`n=== DÉPLOIEMENT TERMINÉ ===" -ForegroundColor Green
Write-Host "Votre site devrait être accessible sur https://portfolio.andrea-mestre.eu/" -ForegroundColor Cyan
Write-Host "`nSi les images ne s'affichent toujours pas:" -ForegroundColor Yellow
Write-Host "1. Vérifiez que pm2 sert bien l'application" -ForegroundColor White
Write-Host "2. Vérifiez la configuration nginx/apache pour le reverse proxy" -ForegroundColor White
