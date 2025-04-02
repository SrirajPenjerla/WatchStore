import { environment } from '../../environments/environment';

// This script can be run to add 30 products to the database
// You can run it using: ng run frontend:add-products

export const products = [
  {
    name: 'Submariner Date',
    brand: 'rolex',
    description: 'The reference among diving watches. Waterproof to a depth of 300 meters, the Oyster Perpetual Submariner Date features a unidirectional rotatable bezel with Cerachrom insert.',
    price: 10500,
    imageUrl: 'https://content.rolex.com/v7/dam/2023/upright-bba-with-shadow/m126711chnr-0002.png',
    category: 'automatic',
    stockQuantity: 5,
    isTrending: true
  },
  {
    name: 'Daytona',
    brand: 'rolex',
    description: 'The Cosmograph Daytona is the reference in terms of chronographs. A legend in the world of motor racing, it has been the official timepiece of the 24 Hours of Le Mans since 2001.',
    price: 13500,
    imageUrl: 'https://content.rolex.com/v7/dam/2023/upright-bba-with-shadow/m126500ln-0002.png',
    category: 'automatic',
    stockQuantity: 3,
    isTrending: true
  },
  {
    name: 'GMT-Master II',
    brand: 'rolex',
    description: 'The Cosmograph GMT-Master II, introduced in 2005, was the first watch to feature a Cerachrom bezel insert. It has become the reference among dual time zone watches.',
    price: 11500,
    imageUrl: 'https://content.rolex.com/v7/dam/2023/upright-bba-with-shadow/m126711chnr-0002.png',
    category: 'automatic',
    stockQuantity: 4,
    isTrending: false
  },
  {
    name: 'Datejust',
    brand: 'rolex',
    description: 'The Datejust is the reference among classic watches. Since 1945, it has been the first self-winding chronometer wristwatch to indicate the date in a window.',
    price: 8500,
    imageUrl: 'https://content.rolex.com/v7/dam/2023/upright-bba-with-shadow/m126711chnr-0002.png',
    category: 'automatic',
    stockQuantity: 7,
    isTrending: false
  },
  {
    name: 'Day-Date',
    brand: 'rolex',
    description: 'The Day-Date, introduced in 1956, was the first wristwatch to indicate the day of the week spelt out in full in a window on the dial, in addition to the date.',
    price: 12500,
    imageUrl: 'https://content.rolex.com/v7/dam/2023/upright-bba-with-shadow/m128238-0069.png',
    category: 'automatic',
    stockQuantity: 2,
    isTrending: false
  },
  {
    name: 'Speedmaster Moonwatch',
    brand: 'omega',
    description: 'The Speedmaster Moonwatch is the first watch worn on the Moon. It has been part of all six lunar missions, making it the most important timepiece ever made.',
    price: 6500,
    imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/3/1/31030425001001.png',
    category: 'manual',
    stockQuantity: 8,
    isTrending: true
  },
  {
    name: 'Seamaster Diver 300M',
    brand: 'omega',
    description: 'The Seamaster Diver 300M is water-resistant to a depth of 300 meters. It features a unidirectional rotating bezel with a diving scale and a helium escape valve.',
    price: 5500,
    imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/2/1/21030422001001.png',
    category: 'automatic',
    stockQuantity: 10,
    isTrending: true
  },
  {
    name: 'Constellation',
    brand: 'omega',
    description: 'The Constellation is one of Omega\'s most iconic collections. It features the distinctive star design on the caseback and the observatory medallion.',
    price: 4500,
    imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/1/3/13110412102001.png',
    category: 'automatic',
    stockQuantity: 6,
    isTrending: false
  },
  {
    name: 'De Ville',
    brand: 'omega',
    description: 'The De Ville collection represents Omega\'s classic elegance. It features clean lines and sophisticated designs, making it perfect for formal occasions.',
    price: 3500,
    imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/4/2/42413402001001.png',
    category: 'automatic',
    stockQuantity: 9,
    isTrending: false
  },
  {
    name: 'Aqua Terra',
    brand: 'omega',
    description: 'The Aqua Terra collection combines the elegance of a dress watch with the robustness of a sports watch. It is water-resistant to a depth of 150 meters.',
    price: 5000,
    imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/2/2/22010412103001.png',
    category: 'automatic',
    stockQuantity: 7,
    isTrending: true
  },
  {
    name: 'Carrera',
    brand: 'tag-heuer',
    description: 'The Carrera collection is inspired by the world of motor racing. It features chronographs with precise timing functions and a sporty design.',
    price: 3500,
    imageUrl: 'https://www.tagheuer.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-tagheuer-master/default/dw3c3c3c3c/images/large/CBN2A1F.FC6492.png',
    category: 'automatic',
    stockQuantity: 8,
    isTrending: false
  },
  {
    name: 'Monaco',
    brand: 'tag-heuer',
    description: 'The Monaco collection is famous for its square case and association with Steve McQueen. It features chronographs with a distinctive racing-inspired design.',
    price: 6000,
    imageUrl: 'https://www.tagheuer.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-tagheuer-master/default/dw3c3c3c3c/images/large/CBL2111.FC6456.png',
    category: 'automatic',
    stockQuantity: 4,
    isTrending: true
  },
  {
    name: 'Aquaracer',
    brand: 'tag-heuer',
    description: 'The Aquaracer collection is designed for water sports. It is water-resistant to a depth of 300 meters and features a unidirectional rotating bezel.',
    price: 2500,
    imageUrl: 'https://www.tagheuer.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-tagheuer-master/default/dw3c3c3c3c/images/large/WBD1312.BA0740.png',
    category: 'automatic',
    stockQuantity: 12,
    isTrending: false
  },
  {
    name: 'Formula 1',
    brand: 'tag-heuer',
    description: 'The Formula 1 collection is inspired by the world of Formula 1 racing. It features chronographs with a sporty design and precise timing functions.',
    price: 2000,
    imageUrl: 'https://www.tagheuer.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-tagheuer-master/default/dw3c3c3c3c/images/large/CAZ1010.FT8024.png',
    category: 'quartz',
    stockQuantity: 15,
    isTrending: false
  },
  {
    name: 'Link',
    brand: 'tag-heuer',
    description: 'The Link collection features a distinctive bracelet design with an S-shaped link. It combines elegance with sportiness, making it versatile for various occasions.',
    price: 3000,
    imageUrl: 'https://www.tagheuer.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-tagheuer-master/default/dw3c3c3c3c/images/large/CJF2112.BA0594.png',
    category: 'automatic',
    stockQuantity: 6,
    isTrending: false
  },
  {
    name: 'Presage',
    brand: 'seiko',
    description: 'The Presage collection combines Japanese aesthetics with Seiko\'s watchmaking expertise. It features elegant designs inspired by Japanese culture and craftsmanship.',
    price: 800,
    imageUrl: 'https://www.seikowatches.com/us-en/-/media/seiko/product-images/presage/srpb43j1/srpb43j1_1.png',
    category: 'automatic',
    stockQuantity: 20,
    isTrending: true
  },
  {
    name: 'Prospex',
    brand: 'seiko',
    description: 'The Prospex collection is designed for professional use in the sea, land, and air. It features robust construction and precise movements for demanding environments.',
    price: 1200,
    imageUrl: 'https://www.seikowatches.com/us-en/-/media/seiko/product-images/prospex/spb143j1/spb143j1_1.png',
    category: 'automatic',
    stockQuantity: 15,
    isTrending: false
  },
  {
    name: 'Astron',
    brand: 'seiko',
    description: 'The Astron collection features Seiko\'s GPS Solar technology. It automatically adjusts to the correct time anywhere in the world using GPS signals.',
    price: 2500,
    imageUrl: 'https://www.seikowatches.com/us-en/-/media/seiko/product-images/astron/ssh067j1/ssh067j1_1.png',
    category: 'quartz',
    stockQuantity: 5,
    isTrending: false
  },
  {
    name: 'Grand Seiko',
    brand: 'seiko',
    description: 'The Grand Seiko collection represents the pinnacle of Seiko\'s watchmaking expertise. It features exceptional precision, durability, and beauty.',
    price: 5000,
    imageUrl: 'https://www.grand-seiko.com/us-en/-/media/grandseiko/product-images/sbga211g/sbga211g_1.png',
    category: 'automatic',
    stockQuantity: 3,
    isTrending: true
  },
  {
    name: '5 Sports',
    brand: 'seiko',
    description: 'The 5 Sports collection offers reliable automatic watches at an affordable price. It features a wide range of styles for everyday wear.',
    price: 300,
    imageUrl: 'https://www.seikowatches.com/us-en/-/media/seiko/product-images/5sports/srpd63k1/srpd63k1_1.png',
    category: 'automatic',
    stockQuantity: 25,
    isTrending: false
  },
  {
    name: 'Pilot\'s Watch Classic',
    brand: 'iwc',
    description: 'The Pilot\'s Watch Classic collection is inspired by the historic observation watches used by pilots. It features a clean, legible design with a soft-iron inner case for magnetic protection.',
    price: 4500,
    imageUrl: 'https://www.iwc.com/content/dam/iwc/master/iwc/pilot/pilot-s-watch-classic/iw326801/pilot-s-watch-classic-iw326801.png',
    category: 'automatic',
    stockQuantity: 4,
    isTrending: false
  },
  {
    name: 'Portugieser Chronograph',
    brand: 'iwc',
    description: 'The Portugieser Chronograph collection combines classic elegance with precise timing functions. It features a clean, sophisticated design inspired by marine chronometers.',
    price: 7500,
    imageUrl: 'https://www.iwc.com/content/dam/iwc/master/iwc/portugieser/portugieser-chronograph/iw371605/portugieser-chronograph-iw371605.png',
    category: 'automatic',
    stockQuantity: 3,
    isTrending: true
  },
  {
    name: 'Portofino',
    brand: 'iwc',
    description: 'The Portofino collection represents understated elegance. It features clean lines and a sophisticated design, making it perfect for formal occasions.',
    price: 5500,
    imageUrl: 'https://www.iwc.com/content/dam/iwc/master/iwc/portofino/portofino-automatic/iw356517/portofino-automatic-iw356517.png',
    category: 'automatic',
    stockQuantity: 5,
    isTrending: false
  },
  {
    name: 'Big Pilot\'s Watch',
    brand: 'iwc',
    description: 'The Big Pilot\'s Watch collection is inspired by the historic observation watches used by pilots. It features a large case size and a distinctive design with a soft-iron inner case for magnetic protection.',
    price: 12000,
    imageUrl: 'https://www.iwc.com/content/dam/iwc/master/iwc/pilot/big-pilot-s-watch/iw501001/big-pilot-s-watch-iw501001.png',
    category: 'automatic',
    stockQuantity: 2,
    isTrending: false
  },
  {
    name: 'Da Vinci',
    brand: 'iwc',
    description: 'The Da Vinci collection combines technical innovation with elegant design. It features chronographs with a distinctive case shape and precise movements.',
    price: 8500,
    imageUrl: 'https://www.iwc.com/content/dam/iwc/master/iwc/da-vinci/da-vinci-chronograph/iw376401/da-vinci-chronograph-iw376401.png',
    category: 'automatic',
    stockQuantity: 3,
    isTrending: false
  },
  {
    name: 'El Primero Chronograph',
    brand: 'zenith',
    description: 'The El Primero Chronograph collection features Zenith\'s legendary high-frequency chronograph movement. It offers precise timing functions with a distinctive design.',
    price: 7500,
    imageUrl: 'https://www.zenith-watches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/0/3/03.2150.400/69_c500.png',
    category: 'automatic',
    stockQuantity: 4,
    isTrending: true
  },
  {
    name: 'Defy Classic',
    brand: 'zenith',
    description: 'The Defy Classic collection represents Zenith\'s modern approach to watchmaking. It features a distinctive case design with a precise automatic movement.',
    price: 6500,
    imageUrl: 'https://www.zenith-watches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/9/5/95.9000.670/78_c500.png',
    category: 'automatic',
    stockQuantity: 5,
    isTrending: false
  },
  {
    name: 'Pilot Type 20',
    brand: 'zenith',
    description: 'The Pilot Type 20 collection is inspired by the historic pilot watches used by aviators. It features a large case size and a distinctive design with excellent legibility.',
    price: 5500,
    imageUrl: 'https://www.zenith-watches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/1/1/11.1940.679/21_c500.png',
    category: 'automatic',
    stockQuantity: 3,
    isTrending: false
  },
  {
    name: 'Chronomaster Sport',
    brand: 'zenith',
    description: 'The Chronomaster Sport collection features Zenith\'s legendary El Primero movement. It offers precise timing functions with a sporty design inspired by racing.',
    price: 9500,
    imageUrl: 'https://www.zenith-watches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/0/3/03.3100.3600/69_c500.png',
    category: 'automatic',
    stockQuantity: 2,
    isTrending: true
  },
  {
    name: 'Academy Christophe Colomb',
    brand: 'zenith',
    description: 'The Academy Christophe Colomb collection represents Zenith\'s haute horlogerie expertise. It features complex movements with innovative mechanisms and a distinctive design.',
    price: 85000,
    imageUrl: 'https://www.zenith-watches.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/1/8/18.2210.8804/01_c500.png',
    category: 'manual',
    stockQuantity: 1,
    isTrending: false
  }
];

// The addProducts function is no longer needed as we're using fetch directly in the script 