#!/bin/bash

# Define the base directory
BASE_DIR="mombasa-tourist-app"

# Create directories
mkdir -p $BASE_DIR/{app/api/{destinations,admin},app/{admin,destinations,itinerary},components/{sections/{home,admin},common},prisma,public/images,styles,utils}

# Create files
touch $BASE_DIR/app/api/destinations/route.ts
touch $BASE_DIR/app/api/admin/route.ts
touch $BASE_DIR/app/admin/{page.tsx,destinations.tsx,users.tsx}
touch $BASE_DIR/app/destinations/page.tsx
touch $BASE_DIR/app/itinerary/page.tsx
touch $BASE_DIR/app/page.tsx
touch $BASE_DIR/components/sections/home/{HeroSection.tsx,FeaturedAttractions.tsx,CTASection.tsx}
touch $BASE_DIR/components/sections/admin/{DashboardHeader.tsx,Sidebar.tsx}
touch $BASE_DIR/components/common/{Navbar.tsx,Footer.tsx,SearchBar.tsx}
touch $BASE_DIR/prisma/schema.prisma
touch $BASE_DIR/public/images/{mombasa-hero.jpg,fort-jesus.jpg,diani-beach.jpg,haller-park.jpg}
touch $BASE_DIR/styles/globals.css
touch $BASE_DIR/utils/{db.ts,helpers.ts}
touch $BASE_DIR/.env
touch $BASE_DIR/next.config.js
touch $BASE_DIR/package.json
touch $BASE_DIR/tsconfig.json

# Success message
echo "Project structure for 'mombasa-tourist-app' has been generated successfully!"
