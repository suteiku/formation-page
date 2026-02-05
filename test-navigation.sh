#!/bin/bash

# Script de test de navigation
# Vérifie que toutes les pages du design system sont accessibles

echo "🧪 Test de navigation FormationPage Design System"
echo "=================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL de base
BASE_URL="http://localhost:3000"

# Fonction pour tester une page
test_page() {
    local path=$1
    local name=$2
    
    echo -n "Testing $name ($path)... "
    
    # Utiliser curl pour vérifier si la page répond
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path")
    
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL (Status: $status_code)${NC}"
        return 1
    fi
}

echo "📋 Test des pages principales..."
echo ""

# Compteurs
total=0
passed=0
failed=0

# Test de toutes les pages
pages=(
    "/|Homepage"
    "/showcase|Showcase"
    "/dashboard-example|Dashboard Example"
    "/sales-example|Sales Example"
    "/student-example|Student Example"
    "/settings-example|Settings Example"
)

for page in "${pages[@]}"; do
    IFS='|' read -r path name <<< "$page"
    total=$((total + 1))
    
    if test_page "$path" "$name"; then
        passed=$((passed + 1))
    else
        failed=$((failed + 1))
    fi
done

echo ""
echo "=================================================="
echo "📊 Résultats:"
echo "   Total: $total pages"
echo -e "   ${GREEN}Passed: $passed${NC}"
echo -e "   ${RED}Failed: $failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les tests sont passés !${NC}"
    exit 0
else
    echo -e "${RED}❌ Certains tests ont échoué.${NC}"
    echo -e "${YELLOW}💡 Vérifiez que le serveur de dev tourne (pnpm dev)${NC}"
    exit 1
fi
