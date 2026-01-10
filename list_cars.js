const fs = require('fs');
const cars = JSON.parse(fs.readFileSync('d:\\Rent66.az\\src\\data\\cars.json', 'utf8'));

const carsByCategory = {};

cars.forEach(car => {
  if (!carsByCategory[car.category]) {
    carsByCategory[car.category] = [];
  }
  // Use a unique key to dedup if needed, or just list all
  // The user asked "how much cars", so probably wants total count including identical models if they exist as separate entries (e.g. different price points)
  // But usually "list of cars" implies distinct models. The JSON had same slugs with different prices?
  // Let's list distinct names per category but also count total entries just in case.
  // Actually, looking at the previous view_file, some cars had same name but different id (e.g. "Mercedes-Benz V-Class" appeared twice).
  // I will list the unique names and the count of available options.
  carsByCategory[car.category].push(`${car.brand} ${car.name}`);
});

let output = 'Cars by Category:\n';
for (const [category, carList] of Object.entries(carsByCategory)) {
  const uniqueCars = [...new Set(carList)];
  output += `\n### Category: ${category.toUpperCase()} (${carList.length} total, ${uniqueCars.length} models)\n`;
  uniqueCars.forEach(car => output += `- ${car}\n`);
}

fs.writeFileSync('d:\\Rent66.az\\car_list.txt', output);
