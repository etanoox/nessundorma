export type Lang = 'it' | 'en';
type Ingredient = [string, string];
type Drink = { name: string; it: string; en: string };
const d = (name: string, it: string, en: string): Drink => ({ name, it, en });

// Ricette trascritte da Lista Cocktail.xlsx. I refusi ortografici sono normalizzati.
// «Monin» nel Mai Tai resta come nella fonte: prodotto/gusto da confermare con Mario.
export const cocktails = [
  { it: 'Tumbler basso', en: 'Lowball', items: [
    d('Negroni', 'Carpano, Campari Bitter, Gin Butterfly', 'Carpano, Campari Bitter, Butterfly gin'),
    d('Negroni Superior', 'Carpano Gran Riserva, Blood Bitter, Gin Bulldog', 'Carpano Gran Riserva, Blood Bitter, Bulldog gin'),
    d('Americano', 'Carpano, Campari Bitter, soda', 'Carpano, Campari Bitter, soda water'),
    d('Negroni Sbagliato', 'Carpano, Campari Bitter, prosecco', 'Carpano, Campari Bitter, prosecco'),
    d('Negrosky', 'Carpano, Campari Bitter, vodka', 'Carpano, Campari Bitter, vodka'),
    d('Boulevardier', 'Carpano, Campari Bitter, rye whiskey', 'Carpano, Campari Bitter, rye whiskey'),
    d('Godfather', 'Scotch whisky, Disaronno', 'Scotch whisky, Disaronno'),
    d('Mai Tai', 'Lime, orzata, Monin, rum chiaro, rum scuro', 'Lime, orgeat, Monin, light rum, dark rum'),
    d('Milano–Torino', 'Carpano, Campari Bitter', 'Carpano, Campari Bitter'),
    d('Old Fashioned', 'Zucchero, Angostura, bourbon whiskey, soda', 'Sugar, Angostura, bourbon whiskey, soda water'),
    d('Rusty Nail', 'Scotch whisky, Drambuie', 'Scotch whisky, Drambuie'),
    d('Disaronno Sour', 'Limone, zucchero, Disaronno', 'Lemon, sugar, Disaronno'),
    d('Black Russian', 'Kahlúa, vodka', 'Kahlúa, vodka'),
  ]},
  { it: 'Coppa', en: 'Coupe', items: [
    d('Cardinale', 'Gin Tanqueray, Campari Bitter, dry vermouth', 'Tanqueray gin, Campari Bitter, dry vermouth'),
    d('Cosmopolitan', 'Lime, Cointreau, vodka, mirtillo', 'Lime, Cointreau, vodka, blueberry'),
    d('Daiquiri', 'Lime, zucchero, rum bianco', 'Lime, sugar, white rum'),
    d('Manhattan', 'Angostura, Carpano, rye whiskey', 'Angostura, Carpano, rye whiskey'),
    d('Margarita', 'Lime, Cointreau, tequila', 'Lime, Cointreau, tequila'),
    d('Cocktail Martini', 'Dry vermouth, Gin Bombay', 'Dry vermouth, Bombay gin'),
    d('Vodka Martini', 'Dry vermouth, vodka', 'Dry vermouth, vodka'),
    d('Rob Roy', 'Scotch whisky, Carpano, Angostura', 'Scotch whisky, Carpano, Angostura'),
    d('White Lady', 'Gin Bombay, Cointreau, limone', 'Bombay gin, Cointreau, lemon'),
  ]},
  { it: 'Tumbler alto', en: 'Highball', items: [
    d('Bloody Mary', 'Limone, Tabasco, salsa Worcestershire, sale, pepe, succo di pomodoro, vodka', 'Lemon, Tabasco, Worcestershire sauce, salt, pepper, tomato juice, vodka'),
    d('Caipirinha', 'Lime, zucchero, cachaça', 'Lime, sugar, cachaça'),
    d('Caipiroska', 'Lime, zucchero, vodka', 'Lime, sugar, vodka'),
    d('Caipiroska Fragola', 'Lime, zucchero, vodka, sciroppo di fragola', 'Lime, sugar, vodka, strawberry syrup'),
    d('Caipirissima', 'Lime, zucchero, rum bianco', 'Lime, sugar, white rum'),
    d('Caipirilla', 'Lime, zucchero, tequila', 'Lime, sugar, tequila'),
    d('Cuba Libre', 'Rum, Coca-Cola, lime', 'Rum, Coca-Cola, lime'),
    d('Gin Fizz', 'Limone, zucchero, gin, soda', 'Lemon, sugar, gin, soda water'),
    d('Long Island', 'Limone, zucchero, triple sec, gin, rum, vodka, Coca-Cola', 'Lemon, sugar, triple sec, gin, rum, vodka, Coca-Cola'),
    d('Lynchburg Lemonade', 'Limone, zucchero, Jack Daniel’s whiskey, lemon soda', 'Lemon, sugar, Jack Daniel’s whiskey, lemon soda'),
    d('Mojito', 'Limone, zucchero, menta, rum, soda', 'Lemon, sugar, mint, rum, soda water'),
    d('Mojito Ananas', 'Limone, zucchero, menta, ananas, rum, soda', 'Lemon, sugar, mint, pineapple, rum, soda water'),
    d('Mojito Maracuja', 'Limone, zucchero, menta, sciroppo di maracuja, rum, soda', 'Lemon, sugar, mint, passion fruit syrup, rum, soda water'),
    d('Piña Colada', 'Succo di ananas, crema di cocco, rum', 'Pineapple juice, coconut cream, rum'),
    d('Sex on the Beach', 'Vodka, Peachtree, succo di arancia, sciroppo di fragola', 'Vodka, Peachtree, orange juice, strawberry syrup'),
  ]},
  { it: 'Mug', en: 'Mug', items: [
    d('Dark ’n’ Stormy', 'Lime, ginger beer, rum scuro', 'Lime, ginger beer, dark rum'),
    d('Moscow Mule', 'Lime, ginger beer, vodka', 'Lime, ginger beer, vodka'),
    d('London Mule', 'Lime, ginger beer, Gin Tanqueray', 'Lime, ginger beer, Tanqueray gin'),
    d('Averna Mule', 'Limone, ginger beer, Amaro Averna', 'Lemon, ginger beer, Amaro Averna'),
  ]},
  { it: 'Calice', en: 'Wine glass', items: [
    d('Hugo Spritz', 'Prosecco, soda, St-Germain', 'Prosecco, soda water, St-Germain'),
    d('Aperol Spritz', 'Prosecco, soda, Aperol', 'Prosecco, soda water, Aperol'),
  ]},
  { it: 'Flûte', en: 'Flute', items: [
    d('Mimosa', 'Prosecco, succo di arancia', 'Prosecco, orange juice'),
  ]},
];

export const food: { it: string; en: string; items: Ingredient[] }[] = [
  { it: 'Salumi', en: 'Cured meats', items: [
    ['Salame piccante','Spicy salami'], ['Pancetta','Pancetta'], ['Coppa','Coppa'],
    ['Prosciutto cotto','Cooked ham'], ['Prosciutto crudo','Cured ham'], ['Porchetta','Porchetta'],
    ['Speck','Speck'], ['Mortadella','Mortadella'], ['Paesanella','Paesanella'],
  ]},
  { it: 'Formaggi', en: 'Cheeses', items: [
    ['Mozzarella','Mozzarella'], ['Provola','Provola'], ['Emmental','Emmental'], ['Grana','Grana'],
    ['Auricchio dolce','Mild Auricchio'], ['Auricchio piccante','Sharp Auricchio'],
    ['Piacentino','Piacentino'], ['Sottiletta','Cheese slice'], ['Feta','Feta'],
  ]},
  { it: 'Condimenti', en: 'Toppings', items: [
    ['Rucola','Rocket'], ['Pomodori','Tomatoes'], ['Pomodori secchi','Sun-dried tomatoes'],
    ['Olive bianche','Green olives'], ['Olive nere','Black olives'], ['Avocado a fette','Sliced avocado'],
    ['Mousse di avocado','Avocado mousse'], ['Hummus','Hummus'], ['Paté di olive bianche','Green olive pâté'],
    ['Paté di olive nere','Black olive pâté'], ['Paté di olive taggiasche','Taggiasca olive pâté'],
    ['Funghi sott’olio conditi','Seasoned mushrooms in oil'], ['Carciofi','Artichokes'], ['Capperi','Capers'],
  ]},
  { it: 'Salse e spezie', en: 'Sauces & spices', items: [
    ['Tabasco','Tabasco'], ['Ketchup','Ketchup'], ['Maionese','Mayonnaise'], ['Senape','Mustard'],
    ['Salsa di soia','Soy sauce'], ['Peperoncino','Chilli'], ['Salsa curry','Curry sauce'],
    ['Aglio in polvere','Garlic powder'], ['Salsa Worcestershire','Worcestershire sauce'], ['Pepe','Pepper'],
  ]},
];
