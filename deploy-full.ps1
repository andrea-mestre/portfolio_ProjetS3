# Script de déploiement complet vers le serveur
# Ce script build et déploie tout le projet

Write-Host "=== DÉPLOIEMENT COMPLET DU PORTFOLIO ===" -ForegroundColor Cyan

# 1. Build du projet
Write-Host "`n[1/3] Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors du build !" -ForegroundColor Red
    exit 1
}

# 2. Copie du dossier dist complet
Write-Host "`n[2/3] Copie du dossier dist vers le serveur..." -ForegroundColor Yellow
scp -P 22043 -r "dist" etudiant@185.157.244.202:/var/www/portfolio/

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de la copie !" -ForegroundColor Red
    exit 1
}

# 3. Redémarrage du service Node.js (optionnel)
Write-Host "`n[3/3] Redémarrage du service..." -ForegroundColor Yellow
ssh -p 22043 etudiant@185.157.244.202 "cd /var/www/portfolio && pm2 restart portfolio || node dist/server/entry.mjs &"

Write-Host "`n=== DÉPLOIEMENT TERMINÉ AVEC SUCCÈS ! ===" -ForegroundColor Green
Write-Host "URL: https://portfolio.andrea-mestre.eu/" -ForegroundColor Cyan
