#!/bin/bash

echo "=== Testing Papers Navigation Feature ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Papers page files
echo "1. Checking Papers page files..."
if [ -f "apps/web/app/[locale]/papers/page.tsx" ]; then
    echo -e "${GREEN}✓${NC} Papers page component exists"
else
    echo -e "${RED}✗${NC} Papers page component missing"
fi

if [ -f "apps/web/app/[locale]/papers/metadata.ts" ]; then
    echo -e "${GREEN}✓${NC} Papers metadata exists"
else
    echo -e "${RED}✗${NC} Papers metadata missing"
fi

echo ""
echo "2. Checking navigation integration..."

# Check navigation component
if grep -q "papers.*href.*\/papers" apps/web/components/navigation.tsx; then
    echo -e "${GREEN}✓${NC} Papers link in navigation dropdown"
else
    echo -e "${RED}✗${NC} Papers link missing from navigation"
fi

# Check footer component
if grep -q "papers" apps/web/components/footer.tsx; then
    echo -e "${GREEN}✓${NC} Papers link in footer"
else
    echo -e "${RED}✗${NC} Papers link missing from footer"
fi

echo ""
echo "3. Checking translations..."

# Check key locales
locales=("en" "zh-TW" "ja" "ko" "fr" "id")
for locale in "${locales[@]}"; do
    if grep -q '"papers"' "apps/web/messages/${locale}.json"; then
        echo -e "${GREEN}✓${NC} ${locale}.json has Papers translation"
    else
        echo -e "${RED}✗${NC} ${locale}.json missing Papers translation"
    fi
done

echo ""
echo "4. Checking PDF placeholder files..."

# Check PDF directory
if [ -d "public/papers" ]; then
    echo -e "${GREEN}✓${NC} PDF directory exists"
    pdf_count=$(ls -1 public/papers/*.pdf 2>/dev/null | wc -l)
    echo "  Found ${pdf_count} PDF files"
else
    echo -e "${RED}✗${NC} PDF directory missing"
fi

echo ""
echo "5. Building the application..."

# Run build
npm run build 2>&1 | grep -E "(error|Error|ERROR|fail|Failed|FAILED)" && echo -e "${RED}✗${NC} Build has errors" || echo -e "${GREEN}✓${NC} Build successful"

echo ""
echo "=== Test Complete ==="