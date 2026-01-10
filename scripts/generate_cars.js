
const fs = require('fs');
const path = require('path');

const rawData = `
Economy
Hyundai Accent — 2017 — 50
Hyundai Accent — 2018 — 60
Chevrolet Cruze — 2011 — 60
Kia Forte — 2020 — 80
Toyota Corolla (Hybrid) — 2024 — 85
Hyundai Elantra — 2024 — 85
Business
Kia K5 — 2023 — 120
Hyundai Sonata — 2023 — 130
BMW 5-Series F10 — 2013 — 140
Changan UNI-Z — 2025 — 140
Toyota Camry — 2024 — 170
Mercedes-Benz E-Class — 2018 — 200
Ford Mustang — 2019 — 220
BMW 428 Cabriolet — 2018 — 250
Chevrolet Camaro — 2021 — 250
Premium
Mercedes-Benz V-Class — 2019 — 220
BMW X5 — 2021 — 350
Range Rover — 2021 — 450
Land Rover Defender — 2021 — 450
Mercedes-Benz G-Class — 2020 — 1000
Range Rover — 2024 — 1500
Minivan
Kia Carnival — 2017 — 150
Hyundai H-1 — 2017 — 150
Hyundai H-1 — 2020 — 160
Mercedes-Benz V-Class — 2018 — 220
Crossover & SUV
Hyundai Santa Fe — 2014 — 90
Toyota Corolla Cross (Hybrid) — 2024 — 110
Lada Niva — 2025 — 110
Bestune T-77 — 2023 — 110
Changan CS55 Plus — 2023 — 130
Changan UNI-K — 2023 — 150
Toyota Land Cruiser Prado — 2018 — 150
Toyota Land Cruiser Prado — 2022 — 160
Jetour T-2 — 2025 — 240
BMW X5 — 2021 — 350
Range Rover — 2021 — 350
Toyota Land Cruiser — 2025 — 400
Land Rover Defender — 2021 — 450
Mercedes-Benz G-Class — 2020 — 1000
Range Rover — 2024 — 1500
Transport
Hyundai H-1 — 2016 — 150
Hyundai H-1 — 2021 — 160
Mercedes-Benz V-Class — 2019 — 220
Mercedes-Benz 0403 — 2013 — Quote
Mercedes-Benz Sprinter — 2022 — Quote
Neoplan — 2021 — Quote
Isuzu Novo — 2022 — Quote
Mercedes-Benz Travego — 2014 — Quote
Transfer
Hyundai Accent — 2017 — 50
Chevrolet Cruze — 2011 — 60
Hyundai Accent — 2018 — 60
Kia Forte — 2020 — 80
Toyota Corolla (Hybrid) — 2024 — 85
Hyundai Elantra — 2024 — 85
Toyota Corolla Cross (Hybrid) — 2024 — 110
Lada Niva — 2025 — 110
Hyundai Sonata — 2023 — 130
Changan CS55 Plus — 2023 — 130
Changan UNI-Z — 2025 — 140
BMW 5-Series F10 — 2013 — 140
Kia Carnival — 2017 — 150
Toyota Land Cruiser Prado — 2018 — 150
Toyota Land Cruiser Prado — 2022 — 160
Toyota Camry — 2024 — 170
Mercedes-Benz E-Class — 2018 — 200
Mercedes-Benz V-Class — 2019 — 220
Ford Mustang — 2019 — 220
BMW 428 Cabriolet — 2018 — 250
Chevrolet Camaro — 2021 — 250
Range Rover — 2021 — 450
Land Rover Defender — 2021 — 450
Mercedes-Benz G-Class — 2020 — 1000
Range Rover — 2024 — 1500
`;

// Helper to get image path (simplified mapping)
function getImage(name) {
    const map = {
        'Kia Carnival': 'kia-carnival.jpg',
        'Hyundai H-1': 'hyundai-h-1.jpg',
        'Mercedes-Benz V-Class': 'mercedes-v-class.jpg',
        'Hyundai Santa Fe': 'hyundai-santa-fe.jpg',
        'Toyota Corolla Cross (Hybrid)': 'toyota-corolla-cross.jpg',
        'Toyota Corolla (Hybrid)': 'toyota-corolla-hybrid.jpg',
        'Lada Niva': 'lada-niva.jpg',
        'Changan CS55 Plus': 'changan-cs55plus.jpg', // adjusted name
        'Changan UNI-Z': 'changan-uni-z.jpg',
        'Toyota Land Cruiser Prado': 'toyota-land-cruiser-prado.jpg',
        'Jetour T-2': 'jetour-t-2.jpg',
        'Range Rover': 'range-rover.jpg',
        'BMW X5': 'bmw-x5.jpg',
        'Toyota Land Cruiser': 'toyota-land-cruiser.jpg',
        'Land Rover Defender': 'land-rover-defender.jpg',
        'Mercedes-Benz G-Class': 'mercedes-g-class.jpg',
        'Bestune T-77': 'bestune-t-77.jpg',
        'Changan UNI-K': 'changan-uni-k.jpg',
        'Hyundai Accent': 'hyundai-accent.jpg',
        'Chevrolet Cruze': 'chevrolet-cruze.jpg',
        'Kia Forte': 'kia-forte.jpg',
        'Hyundai Elantra': 'hyundai-elantra.jpg',
        'Hyundai Sonata': 'hyundai-sonata.jpg',
        'BMW 5-Series F10': 'bmw-5-series-f10.jpg',
        'Toyota Camry': 'toyota-camry.jpg',
        'Mercedes-Benz E-Class': 'mercedes-e-class.jpg',
        'Ford Mustang': 'ford-mustang.jpg',
        'BMW 428 Cabriolet': 'bmw-428-cabriolet.jpg',
        'Chevrolet Camaro': 'chevrolet-camaro.jpg',
        'Kia K5': 'kia-k-5.jpg',
        'Mercedes-Benz Sprinter': 'mercedes-sprinter.jpg',
        'Mercedes-Benz 0403': 'mercedes-benz-0403.jpg',
        'Neoplan': 'neoplan.jpg',
        'Isuzu Novo': 'isuzu-novo.jpg',
        'Mercedes-Benz Travego': 'mercedes-benz-travego.jpg',
    };
    const key = Object.keys(map).find(k => name.toLowerCase().includes(k.toLowerCase()));
    return key ? `/images/cars/${map[key]}` : '/images/cars/placeholder.jpg';
}

function parseData() {
    const lines = rawData.trim().split(/\r?\n/);
    let currentCategory = '';
    const cars = [];
    let idCounter = 1;

    for (const line of lines) {
        if (!line.includes('—')) {
            if (line.trim()) {
                currentCategory = line.trim().toLowerCase().replace(' & suv', '').replace('crossover', 'suv');
                if (currentCategory === 'minivan') currentCategory = 'minivan'; // keep as is
            }
            continue;
        }

        const parts = line.split('—').map(p => p.trim());
        const name = parts[0];
        const year = parseInt(parts[1]);
        const priceStr = parts[2];
        
        let dailyPrice = 0;
        if (priceStr.toLowerCase().includes('quote')) {
            dailyPrice = 0; // 0 means quote
        } else {
            dailyPrice = parseInt(priceStr.replace(/[^0-9]/g, ''));
        }

        const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${currentCategory}-${dailyPrice || 'quote'}-${year}`;

        const car = {
            id: `car-${String(idCounter++).padStart(3, '0')}`,
            slug: slug,
            name: name,
            brand: name.split(' ')[0],
            category: currentCategory,
            dailyPrice: dailyPrice,
            rating: 4.8, // Default
            seats: 5, // Simplified defaults
            luggage: 3,
            transmission: "automatic",
            fuelType: "petrol",
            year: year,
            engine: "2.0L",
            fuelEconomy: "8.0 L/100km",
            availability: "available",
            images: [getImage(name)],
            description: {
                az: `${name} (${year}) - Great choice for your trip.`,
                en: `${name} (${year}) - Great choice for your trip.`,
                ru: `${name} (${year}) - Great choice for your trip.`
            },
            highlights: [
                { az: "Comfort", en: "Comfort", ru: "Comfort" },
                { az: "Safety", en: "Safety", ru: "Safety" },
                { az: "Clean", en: "Clean", ru: "Clean" }
            ]
        };
        
        // Custom overrides based on type
        if (currentCategory === 'minivan' || currentCategory === 'transport') {
            car.seats = 7;
            car.luggage = 5;
        }
        if (name.includes('Sprinter') || name.includes('Bus') || name.includes('0403') || name.includes('Neoplan')) {
            car.seats = 18; // Bus guess
            car.transmission = "manual";
            car.fuelType = "diesel";
        }

        cars.push(car);
    }
    return cars;
}

const cars = parseData();

const outputPath = path.join(__dirname, '../src/data/cars.json');
fs.writeFileSync(outputPath, JSON.stringify(cars, null, 2), 'utf8');
console.log(`Successfully wrote ${cars.length} cars to ${outputPath}`);
