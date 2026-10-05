// Centralized product catalog generated strictly from the client document: public/product and breed details.docx
// Contains all 89 unique numbered entries from 1 to 89.

export interface ProductSubType {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  itemNumber: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  details: string[];
  subTypes?: ProductSubType[];
  specifications?: Record<string, string>;
  breedInformation?: Record<string, string>;
  image: string;
  price: number | null;
  priceDisplay: string;
  unit?: string;
  available: boolean;
  featured?: boolean;
  isPopular?: boolean;
  dataReviewRequired?: string;
  tags: string[];
}

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "itemNumber": 1,
    "name": "Broiler Chicks",
    "slug": "broiler-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "They grow very quickly and usually reach market weight in about 5–7 weeks.",
    "description": "They grow very quickly and usually reach market weight in about 5–7 weeks. They need clean water, nutritious feed, proper temperature, and good ventilation. Good hygiene and vaccination help prevent diseases and reduce mortality. Proper management can help broiler chicks grow healthy and produce good-quality meat.",
    "details": [
      "They grow very quickly and usually reach market weight in about 5–7 weeks.",
      "They need clean water, nutritious feed, proper temperature, and good ventilation.",
      "Good hygiene and vaccination help prevent diseases and reduce mortality.",
      "Proper management can help broiler chicks grow healthy and produce good-quality meat."
    ],
    "specifications": {
      "Growth Period": "They grow very quickly and usually reach market weight in about 5–7 weeks."
    },
    "image": "/assets/products/chicks/broiler-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Chicks & Young Birds",
      "Broiler",
      "Chicks"
    ]
  },
  {
    "id": 2,
    "itemNumber": 2,
    "name": "Broiler Hens Sale for Meat Purpose",
    "slug": "broiler-hens-sale-for-meat-purpose",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Broiler hens can be sold to local chicken shops, meat markets, hotels, and restaurants for cutting purposes.",
    "description": "Broiler hens can be sold to local chicken shops, meat markets, hotels, and restaurants for cutting purposes. Farmers can contact nearby poultry traders or meat retailers when the birds reach suitable market weight. Selling directly to local buyers may help farmers get better prices by reducing middlemen. Check the daily local chicken price before deciding when and where to sell. Proper weighing, healthy birds, and timely marketing can help farmers improve their returns.",
    "details": [
      "Broiler hens can be sold to local chicken shops, meat markets, hotels, and restaurants for cutting purposes.",
      "Farmers can contact nearby poultry traders or meat retailers when the birds reach suitable market weight.",
      "Selling directly to local buyers may help farmers get better prices by reducing middlemen.",
      "Check the daily local chicken price before deciding when and where to sell.",
      "Proper weighing, healthy birds, and timely marketing can help farmers improve their returns."
    ],
    "image": "/assets/products/chicks/broiler-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Broiler",
      "Hens",
      "Sale",
      "for",
      "Meat",
      "Purpose"
    ]
  },
  {
    "id": 3,
    "itemNumber": 3,
    "name": "Pure Aseel Chicks – Meat Purpose",
    "slug": "pure-aseel-chicks---meat-purpose",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Pure Aseel chicks are a strong and hardy choice for meat production.",
    "description": "Pure Aseel chicks are a strong and hardy choice for meat production. They develop a powerful body structure and good muscle formation. Their active nature and natural hardiness make them suitable for backyard and farm rearing. Pure Aseel meat is valued for its traditional taste and firm texture. A good choice for farmers looking for quality, traditional Aseel birds for meat purpose.",
    "details": [
      "Pure Aseel chicks are a strong and hardy choice for meat production.",
      "They develop a powerful body structure and good muscle formation.",
      "Their active nature and natural hardiness make them suitable for backyard and farm rearing.",
      "Pure Aseel meat is valued for its traditional taste and firm texture.",
      "A good choice for farmers looking for quality, traditional Aseel birds for meat purpose."
    ],
    "image": "/assets/products/chicks/asil-pure-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Chicks & Young Birds",
      "Pure",
      "Aseel",
      "Chicks",
      "Meat",
      "Purpose"
    ]
  },
  {
    "id": 4,
    "itemNumber": 4,
    "name": "Cross Aseel Chicks – Meat Purpose",
    "slug": "cross-aseel-chicks---meat-purpose",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Aseel Cross chicks are a crossbreed developed from the native Aseel chicken and improved poultry breeds.",
    "description": "Aseel Cross chicks are a crossbreed developed from the native Aseel chicken and improved poultry breeds. They are known for good body strength, active growth, and better adaptability to local conditions. These chicks are suitable for meat production and can also be raised under backyard or semi-intensive systems. They generally have good feed-conversion ability and strong survival characteristics when properly managed. Aseel Cross chicks are a good option for farmers looking for hardy birds with good market value.",
    "details": [
      "Aseel Cross chicks are a crossbreed developed from the native Aseel chicken and improved poultry breeds.",
      "They are known for good body strength, active growth, and better adaptability to local conditions.",
      "These chicks are suitable for meat production and can also be raised under backyard or semi-intensive systems.",
      "They generally have good feed-conversion ability and strong survival characteristics when properly managed.",
      "Aseel Cross chicks are a good option for farmers looking for hardy birds with good market value."
    ],
    "image": "/assets/products/chicks/asil-pure-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Cross",
      "Aseel",
      "Chicks",
      "Meat",
      "Purpose"
    ]
  },
  {
    "id": 5,
    "itemNumber": 5,
    "name": "Sonali Chicks",
    "slug": "sonali-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "For Sonali chickens raised for meat, the growth period is generally longer than commercial broilers:",
    "description": "For Sonali chickens raised for meat, the growth period is generally longer than commercial broilers:",
    "details": [
      "For Sonali chickens raised for meat, the growth period is generally longer than commercial broilers:"
    ],
    "subTypes": [
      {
        "title": "0",
        "description": "4 weeks: Chicks need warmth, starter feed, clean water, and careful disease prevention."
      },
      {
        "title": "5",
        "description": "8 weeks: They grow steadily and develop more body weight; good–quality feed is important."
      },
      {
        "title": "9",
        "description": "12 weeks: Birds become more suitable for meat sale, depending on the target market and weight."
      },
      {
        "title": "12",
        "description": "16 weeks: Many farmers may sell at this stage for a more mature bird and stronger meat flavour."
      },
      {
        "title": "Overall: A typical meat",
        "description": "growing period is about 10–16 weeks, but the ideal selling age depends on local demand, feed cost, and desired body weight."
      }
    ],
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Sonali",
      "Chicks"
    ]
  },
  {
    "id": 6,
    "itemNumber": 6,
    "name": "Peruvadai Chicks",
    "slug": "peruvadai-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Peruvadai chicks are a strong and hardy local chicken breed.",
    "description": "Peruvadai chicks are a strong and hardy local chicken breed. They are suitable for backyard and free-range farming. These birds grow well in local weather conditions and are easy to maintain. Peruvadai chickens can be raised for both meat and egg production. With proper feed and care, they can provide good returns for farmers. Peruvadai chicks generally take around 4–6 months (120–180 days) to reach a good adult size, depending on feed, care, and the purpose of rearing. Good-quality feed and proper management can improve growth.",
    "details": [
      "Peruvadai chicks are a strong and hardy local chicken breed.",
      "They are suitable for backyard and free-range farming.",
      "These birds grow well in local weather conditions and are easy to maintain.",
      "Peruvadai chickens can be raised for both meat and egg production.",
      "With proper feed and care, they can provide good returns for farmers.",
      "Peruvadai chicks generally take around 4–6 months (120–180 days) to reach a good adult size, depending on feed, care, and the purpose of rearing.",
      "Good-quality feed and proper management can improve growth."
    ],
    "subTypes": [
      {
        "title": "For meat: usually around 12",
        "description": "16 weeks"
      },
      {
        "title": "For full growth: around 5",
        "description": "6 months"
      }
    ],
    "specifications": {
      "Growth Period": "Peruvadai chicks generally take around 4–6 months (120–180 days) to reach a good adult size, depending on feed, care, and the purpose of rearing."
    },
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Chicks & Young Birds",
      "Peruvadai",
      "Chicks"
    ]
  },
  {
    "id": 7,
    "itemNumber": 7,
    "name": "Pure Desi Chicks",
    "slug": "pure-desi-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Pure Desi chicks grow slowly compared to commercial broiler chicks.",
    "description": "Pure Desi chicks grow slowly compared to commercial broiler chicks. In the first month, they need good feed, clean water, and proper care.",
    "details": [
      "Pure Desi chicks grow slowly compared to commercial broiler chicks.",
      "In the first month, they need good feed, clean water, and proper care."
    ],
    "subTypes": [
      {
        "title": "By 2",
        "description": "3 months, the chicks become active and develop a stronger body."
      },
      {
        "title": "At around 4",
        "description": "5 months, they reach a good size for meat purposes."
      },
      {
        "title": "Full growth usually takes around 5",
        "description": "6 months, depending on feed, breed, and care."
      }
    ],
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Pure",
      "Desi",
      "Chicks"
    ]
  },
  {
    "id": 8,
    "itemNumber": 8,
    "name": "Kaveri Chicks",
    "slug": "kaveri-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Kaveri chicks are a hardy improved chicken variety suitable for backyard and small-scale farming.",
    "description": "Kaveri chicks are a hardy improved chicken variety suitable for backyard and small-scale farming. They grow faster than many traditional Desi chickens and can adapt well to local conditions. They are mainly raised for meat and egg production. With good feed and care, they can reach a good market size in about 12–16 weeks for meat purposes. Kaveri birds are a good choice for farmers looking for easy-to-maintain birds with both meat and egg value.",
    "details": [
      "Kaveri chicks are a hardy improved chicken variety suitable for backyard and small-scale farming.",
      "They grow faster than many traditional Desi chickens and can adapt well to local conditions.",
      "They are mainly raised for meat and egg production.",
      "With good feed and care, they can reach a good market size in about 12–16 weeks for meat purposes.",
      "Kaveri birds are a good choice for farmers looking for easy-to-maintain birds with both meat and egg value."
    ],
    "specifications": {
      "Growth Period": "With good feed and care, they can reach a good market size in about 12–16 weeks for meat purposes."
    },
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Kaveri",
      "Chicks"
    ]
  },
  {
    "id": 9,
    "itemNumber": 9,
    "name": "Aseel Fighter Chicks",
    "slug": "aseel-fighter-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Aseel chicks are a traditional Indian chicken breed known for their strong body and active nature.",
    "description": "Aseel chicks are a traditional Indian chicken breed known for their strong body and active nature. They grow slowly compared with commercial broiler chickens and need good feed and care. For full body development, Aseel birds generally take around 6–8 months, depending on breed and management. They are mainly valued for their traditional breed characteristics, strong build, and good meat quality.",
    "details": [
      "Aseel chicks are a traditional Indian chicken breed known for their strong body and active nature.",
      "They grow slowly compared with commercial broiler chickens and need good feed and care.",
      "For full body development, Aseel birds generally take around 6–8 months, depending on breed and management.",
      "They are mainly valued for their traditional breed characteristics, strong build, and good meat quality."
    ],
    "subTypes": [
      {
        "title": "At around 3",
        "description": "4 months, they develop a stronger body and noticeable feathers."
      }
    ],
    "image": "/assets/products/chicks/asil-pure-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Chicks & Young Birds",
      "Aseel",
      "Fighter",
      "Chicks"
    ]
  },
  {
    "id": 10,
    "itemNumber": 10,
    "name": "Aseel Fighter Breed – Parent Birds",
    "slug": "aseel-fighter-breed---parent-birds",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Aseel parent birds are traditional Indian chickens known for their strong body, sturdy legs, and active nature.",
    "description": "Aseel parent birds are traditional Indian chickens known for their strong body, sturdy legs, and active nature. Healthy male and female birds are selected as parent stock to produce good-quality Aseel chicks. Parent birds need a balanced diet, clean water, proper housing, and regular care for good breeding performance. Aseel birds grow more slowly than broilers, and full body development generally takes several months. Good-quality parent stock can produce strong and healthy Aseel chicks when breeding and management are done properly.",
    "details": [
      "Aseel parent birds are traditional Indian chickens known for their strong body, sturdy legs, and active nature.",
      "Healthy male and female birds are selected as parent stock to produce good-quality Aseel chicks.",
      "Parent birds need a balanced diet, clean water, proper housing, and regular care for good breeding performance.",
      "Aseel birds grow more slowly than broilers, and full body development generally takes several months.",
      "Good-quality parent stock can produce strong and healthy Aseel chicks when breeding and management are done properly."
    ],
    "image": "/assets/products/chicks/broiler-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Aseel",
      "Fighter",
      "Breed",
      "Parent",
      "Birds"
    ]
  },
  {
    "id": 11,
    "itemNumber": 11,
    "name": "Vanaraja Multi-Color Chicks",
    "slug": "vanaraja-multi-color-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Vanaraja chicks are improved backyard poultry birds with attractive multi-colour feathers.",
    "description": "Vanaraja chicks are improved backyard poultry birds with attractive multi-colour feathers. They are suitable for both meat and egg production. They grow well under backyard, free-range, and semi-intensive farming systems. With proper feed and care, they can reach a good meat size in around 12–16 weeks. Vanaraja birds are popular with farmers because they are hardy, easy to manage, and suitable for rural conditions.",
    "details": [
      "Vanaraja chicks are improved backyard poultry birds with attractive multi-colour feathers.",
      "They are suitable for both meat and egg production.",
      "They grow well under backyard, free-range, and semi-intensive farming systems.",
      "With proper feed and care, they can reach a good meat size in around 12–16 weeks.",
      "Vanaraja birds are popular with farmers because they are hardy, easy to manage, and suitable for rural conditions."
    ],
    "specifications": {
      "Growth Period": "With proper feed and care, they can reach a good meat size in around 12–16 weeks."
    },
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Vanaraja",
      "Multi",
      "Color",
      "Chicks"
    ]
  },
  {
    "id": 12,
    "itemNumber": 12,
    "name": "Vanaraja Single Color Chicks",
    "slug": "vanaraja-single-color-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Vanaraja chicks are improved backyard poultry birds known for their good growth and hardiness.",
    "description": "Vanaraja chicks are improved backyard poultry birds known for their good growth and hardiness. Single-color Vanaraja chicks are suitable for both meat and egg production. They can be raised in backyard, free-range, or semi-intensive farming systems. With good feed and proper care, they generally reach a good size for meat in about 12–16 weeks. They are a good choice for farmers looking for easy-to-maintain birds with good growth and market value.",
    "details": [
      "Vanaraja chicks are improved backyard poultry birds known for their good growth and hardiness.",
      "Single-color Vanaraja chicks are suitable for both meat and egg production.",
      "They can be raised in backyard, free-range, or semi-intensive farming systems.",
      "With good feed and proper care, they generally reach a good size for meat in about 12–16 weeks.",
      "They are a good choice for farmers looking for easy-to-maintain birds with good growth and market value."
    ],
    "specifications": {
      "Growth Period": "With good feed and proper care, they generally reach a good size for meat in about 12–16 weeks."
    },
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Vanaraja",
      "Single",
      "Color",
      "Chicks"
    ]
  },
  {
    "id": 13,
    "itemNumber": 13,
    "name": "Giriraja Multi-Color Chicks",
    "slug": "giriraja-multi-color-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Giriraja is a dual-purpose chicken developed for good egg production and meat growth.",
    "description": "Giriraja is a dual-purpose chicken developed for good egg production and meat growth. The birds have attractive multi-coloured feathers, making them popular for backyard and farm rearing. They are known for good body weight and steady growth when given proper feed. Giriraja hens can produce a good number of eggs, making them useful for farmers who want both eggs and meat. The breed is suitable for free-range farming, where birds can forage naturally while receiving supplementary feed.",
    "details": [
      "Giriraja is a dual-purpose chicken developed for good egg production and meat growth.",
      "The birds have attractive multi-coloured feathers, making them popular for backyard and farm rearing.",
      "They are known for good body weight and steady growth when given proper feed.",
      "Giriraja hens can produce a good number of eggs, making them useful for farmers who want both eggs and meat.",
      "The breed is suitable for free-range farming, where birds can forage naturally while receiving supplementary feed."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Giriraja",
      "Multi",
      "Color",
      "Chicks"
    ]
  },
  {
    "id": 14,
    "itemNumber": 14,
    "name": "Guinea Fowl Chicks",
    "slug": "guinea-fowl-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Guinea fowl chicks are hardy birds that are well suited to free-range and backyard farming.",
    "description": "Guinea fowl chicks are hardy birds that are well suited to free-range and backyard farming. They are excellent foragers and can find insects, seeds, and other natural food while roaming outdoors. Guinea fowl are especially useful for insect control around farms and gardens. Their meat is valued for its lean, firm texture and distinct taste, giving farmers a different market option. Guinea fowl also produce small, hard-shelled eggs and can be a good choice for farmers looking for a low-input poultry bird.",
    "details": [
      "Guinea fowl chicks are hardy birds that are well suited to free-range and backyard farming.",
      "They are excellent foragers and can find insects, seeds, and other natural food while roaming outdoors.",
      "Guinea fowl are especially useful for insect control around farms and gardens.",
      "Their meat is valued for its lean, firm texture and distinct taste, giving farmers a different market option.",
      "Guinea fowl also produce small, hard-shelled eggs and can be a good choice for farmers looking for a low-input poultry bird."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Guinea",
      "Fowl",
      "Chicks"
    ]
  },
  {
    "id": 15,
    "itemNumber": 15,
    "name": "Brown Layer Chicks",
    "slug": "brown-layer-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Brown layer chicks are mainly raised for high egg production, not for meat.",
    "description": "Brown layer chicks are mainly raised for high egg production, not for meat. They usually start laying eggs at around 18–20 weeks of age when properly managed. Good commercial brown layers can produce around 280–330 brown eggs per year, depending on the strain and management. They need a balanced layer feed with enough calcium to support strong shells and consistent egg production. They are a suitable choice for farmers who want regular egg income over a long laying period.",
    "details": [
      "Brown layer chicks are mainly raised for high egg production, not for meat.",
      "They usually start laying eggs at around 18–20 weeks of age when properly managed.",
      "Good commercial brown layers can produce around 280–330 brown eggs per year, depending on the strain and management.",
      "They need a balanced layer feed with enough calcium to support strong shells and consistent egg production.",
      "They are a suitable choice for farmers who want regular egg income over a long laying period."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Brown",
      "Layer",
      "Chicks"
    ]
  },
  {
    "id": 16,
    "itemNumber": 16,
    "name": "White Layer Chicks",
    "slug": "white-layer-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "White layer chicks are bred mainly for commercial egg production and efficient feed use.",
    "description": "White layer chicks are bred mainly for commercial egg production and efficient feed use. They generally start laying at around 18–20 weeks of age with proper management. Good white-egg strains can produce around 300+ eggs per year, depending on the strain and farm conditions. They are known for good egg production with relatively low feed consumption, making feed efficiency an important advantage. White layers are suitable for farmers who want to focus on large-scale, consistent egg production.",
    "details": [
      "White layer chicks are bred mainly for commercial egg production and efficient feed use.",
      "They generally start laying at around 18–20 weeks of age with proper management.",
      "Good white-egg strains can produce around 300+ eggs per year, depending on the strain and farm conditions.",
      "They are known for good egg production with relatively low feed consumption, making feed efficiency an important advantage.",
      "White layers are suitable for farmers who want to focus on large-scale, consistent egg production."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "White",
      "Layer",
      "Chicks"
    ]
  },
  {
    "id": 17,
    "itemNumber": 17,
    "name": "Quail Chicks",
    "slug": "quail-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Quail chicks grow very quickly and need much less space than chickens, making them suitable for small farms.",
    "description": "Quail chicks grow very quickly and need much less space than chickens, making them suitable for small farms. They can be raised mainly for meat and egg production, with both products having a ready market in many areas. Quails can start laying eggs at around 6–8 weeks of age, allowing farmers to begin egg production quickly. They reach a suitable meat size in about 5–7 weeks with proper feed and management. Quail farming requires less feed, less space, and a shorter growing period, making it suitable for small-scale poultry businesses.",
    "details": [
      "Quail chicks grow very quickly and need much less space than chickens, making them suitable for small farms.",
      "They can be raised mainly for meat and egg production, with both products having a ready market in many areas.",
      "Quails can start laying eggs at around 6–8 weeks of age, allowing farmers to begin egg production quickly.",
      "They reach a suitable meat size in about 5–7 weeks with proper feed and management.",
      "Quail farming requires less feed, less space, and a shorter growing period, making it suitable for small-scale poultry businesses."
    ],
    "specifications": {
      "Growth Period": "They reach a suitable meat size in about 5–7 weeks with proper feed and management."
    },
    "image": "/assets/products/birds/quail-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Quail",
      "Chicks"
    ]
  },
  {
    "id": 18,
    "itemNumber": 18,
    "name": "Quail Live Birds",
    "slug": "quail-live-birds",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Quails are fast-growing birds and are mainly raised for meat production.",
    "description": "Quails are fast-growing birds and are mainly raised for meat production. They can reach marketable meat size in about 5–7 weeks with proper feeding and care. Quail meat is tender, lean, and rich in protein, making it popular with many customers. They require less space and feed compared with larger poultry birds, making them suitable for small farms. Farmers can raise multiple batches in a year, allowing regular production and sales of live birds for meat.",
    "details": [
      "Quails are fast-growing birds and are mainly raised for meat production.",
      "They can reach marketable meat size in about 5–7 weeks with proper feeding and care.",
      "Quail meat is tender, lean, and rich in protein, making it popular with many customers.",
      "They require less space and feed compared with larger poultry birds, making them suitable for small farms.",
      "Farmers can raise multiple batches in a year, allowing regular production and sales of live birds for meat."
    ],
    "specifications": {
      "Growth Period": "They can reach marketable meat size in about 5–7 weeks with proper feeding and care."
    },
    "image": "/assets/products/birds/quail-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Quail",
      "Live",
      "Birds"
    ]
  },
  {
    "id": 19,
    "itemNumber": 19,
    "name": "Brown Layer Male Chicks",
    "slug": "brown-layer-male-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Brown layer male chicks are not suitable for commercial egg production because they are male birds.",
    "description": "Brown layer male chicks are not suitable for commercial egg production because they are male birds. They can be raised mainly for meat purposes, especially in small farms and backyard systems. With proper brooding, feed, and care, they develop a good body size and strong frame. Farmers can sell them as live birds or for meat, depending on local market demand. They are a useful option for farmers looking to utilize male layer chicks instead of discarding them.",
    "details": [
      "Brown layer male chicks are not suitable for commercial egg production because they are male birds.",
      "They can be raised mainly for meat purposes, especially in small farms and backyard systems.",
      "With proper brooding, feed, and care, they develop a good body size and strong frame.",
      "Farmers can sell them as live birds or for meat, depending on local market demand.",
      "They are a useful option for farmers looking to utilize male layer chicks instead of discarding them."
    ],
    "image": "/assets/products/chicks/broiler-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Brown",
      "Layer",
      "Male",
      "Chicks"
    ]
  },
  {
    "id": 20,
    "itemNumber": 20,
    "name": "White Layer Male Chicks",
    "slug": "white-layer-male-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "White layer male chicks are mainly suitable for meat purposes, as male birds do not produce eggs.",
    "description": "White layer male chicks are mainly suitable for meat purposes, as male birds do not produce eggs. They are generally lighter and slower-growing than broiler chicks, so they are better suited to specific local meat markets. With proper feed and care, they can be raised for live-bird or meat sales. Their white feathers and active nature make them easy to identify and manage on the farm. They can be a practical option for farmers who want to raise male chicks for meat instead of wasting them.",
    "details": [
      "White layer male chicks are mainly suitable for meat purposes, as male birds do not produce eggs.",
      "They are generally lighter and slower-growing than broiler chicks, so they are better suited to specific local meat markets.",
      "With proper feed and care, they can be raised for live-bird or meat sales.",
      "Their white feathers and active nature make them easy to identify and manage on the farm.",
      "They can be a practical option for farmers who want to raise male chicks for meat instead of wasting them."
    ],
    "image": "/assets/products/chicks/broiler-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "White",
      "Layer",
      "Male",
      "Chicks"
    ]
  },
  {
    "id": 21,
    "itemNumber": 21,
    "name": "Turkey Chicks",
    "slug": "turkey-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Turkey chicks are mainly raised for meat production and can grow to a much larger size than chickens.",
    "description": "Turkey chicks are mainly raised for meat production and can grow to a much larger size than chickens. They need more space and feed than regular poultry, especially as they grow. With proper feeding and care, turkeys develop a large body and good meat yield, making them suitable for meat farming. Turkey meat is high in protein and relatively lean, giving farmers a specialized meat market. Turkeys are suitable for open-range and semi-intensive farming, provided they have clean housing, good ventilation, and protection from extreme weather.",
    "details": [
      "Turkey chicks are mainly raised for meat production and can grow to a much larger size than chickens.",
      "They need more space and feed than regular poultry, especially as they grow.",
      "With proper feeding and care, turkeys develop a large body and good meat yield, making them suitable for meat farming.",
      "Turkey meat is high in protein and relatively lean, giving farmers a specialized meat market.",
      "Turkeys are suitable for open-range and semi-intensive farming, provided they have clean housing, good ventilation, and protection from extreme weather."
    ],
    "image": "/assets/products/birds/quail-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Chicks & Young Birds",
      "Turkey",
      "Chicks"
    ]
  },
  {
    "id": 22,
    "itemNumber": 22,
    "name": "Turkey Live Birds – Meat Purpose",
    "slug": "turkey-live-birds---meat-purpose",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Live turkeys are mainly raised for meat, as they produce a large amount of meat compared with chickens.",
    "description": "Live turkeys are mainly raised for meat, as they produce a large amount of meat compared with chickens. They have a large body size and good meat yield, making them suitable for commercial and small-scale meat farming. Depending on the breed, males can grow much larger than females and may take several months to reach market size. Turkey meat is high in protein and has good demand in hotels, restaurants, and specialty meat markets. Farmers can sell mature turkeys as live birds directly to meat buyers, traders, or local markets.",
    "details": [
      "Live turkeys are mainly raised for meat, as they produce a large amount of meat compared with chickens.",
      "They have a large body size and good meat yield, making them suitable for commercial and small-scale meat farming.",
      "Depending on the breed, males can grow much larger than females and may take several months to reach market size.",
      "Turkey meat is high in protein and has good demand in hotels, restaurants, and specialty meat markets.",
      "Farmers can sell mature turkeys as live birds directly to meat buyers, traders, or local markets."
    ],
    "specifications": {
      "Growth Period": "Depending on the breed, males can grow much larger than females and may take several months to reach market size."
    },
    "image": "/assets/products/birds/quail-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Turkey",
      "Live",
      "Birds",
      "Meat",
      "Purpose"
    ]
  },
  {
    "id": 23,
    "itemNumber": 23,
    "name": "Aseel 1-Month-Old Birds",
    "slug": "aseel-1-month-old-birds",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "One-month-old Aseel birds are strong and active young birds with good potential for further growth.",
    "description": "One-month-old Aseel birds are strong and active young birds with good potential for further growth. At this age, they need high-quality chick/grower feed, clean water, and proper shelter. They can be raised in backyard or semi-free-range systems with enough space to move around. Aseel birds grow more slowly than broilers, so farmers should allow several months for proper body development. Healthy one-month-old birds are a good stage for farmers who want to raise Aseel birds for future breeding or meat purposes.",
    "details": [
      "One-month-old Aseel birds are strong and active young birds with good potential for further growth.",
      "At this age, they need high-quality chick/grower feed, clean water, and proper shelter.",
      "They can be raised in backyard or semi-free-range systems with enough space to move around.",
      "Aseel birds grow more slowly than broilers, so farmers should allow several months for proper body development.",
      "Healthy one-month-old birds are a good stage for farmers who want to raise Aseel birds for future breeding or meat purposes."
    ],
    "image": "/assets/products/chicks/asil-pure-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Aseel",
      "Month",
      "Old",
      "Birds"
    ]
  },
  {
    "id": 24,
    "itemNumber": 24,
    "name": "Desi 1-Month-Old Birds",
    "slug": "desi-1-month-old-birds",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "One-month-old Desi birds are active young birds that are suitable for backyard and free-range farming.",
    "description": "One-month-old Desi birds are active young birds that are suitable for backyard and free-range farming. They are generally hardy and well adapted to local weather conditions. At this age, provide good-quality grower feed, clean water, and a safe place to sleep. They can be gradually introduced to open/free-range areas while protecting them from predators. Desi birds grow slowly and usually need 4–6 months or more to reach a good size for meat, depending on the breed and feeding.",
    "details": [
      "One-month-old Desi birds are active young birds that are suitable for backyard and free-range farming.",
      "They are generally hardy and well adapted to local weather conditions.",
      "At this age, provide good-quality grower feed, clean water, and a safe place to sleep.",
      "They can be gradually introduced to open/free-range areas while protecting them from predators.",
      "Desi birds grow slowly and usually need 4–6 months or more to reach a good size for meat, depending on the breed and feeding."
    ],
    "specifications": {
      "Growth Period": "Desi birds grow slowly and usually need 4–6 months or more to reach a good size for meat, depending on the breed and feeding."
    },
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Desi",
      "Month",
      "Old",
      "Birds"
    ]
  },
  {
    "id": 25,
    "itemNumber": 25,
    "name": "Sonali 1-Month-Old Birds",
    "slug": "sonali-1-month-old-birds",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "One-month-old Sonali birds are active young birds with good potential for meat and egg production.",
    "description": "One-month-old Sonali birds are active young birds with good potential for meat and egg production. They are suitable for backyard, free-range, and small-scale poultry farming. At this age, give them good-quality grower feed, clean water, and proper shelter for healthy development. Sonali birds generally have good adaptability and attractive appearance, making them popular in local markets. With proper care and feeding, they continue to develop a good body size and can later be kept for meat or breeding purposes.",
    "details": [
      "One-month-old Sonali birds are active young birds with good potential for meat and egg production.",
      "They are suitable for backyard, free-range, and small-scale poultry farming.",
      "At this age, give them good-quality grower feed, clean water, and proper shelter for healthy development.",
      "Sonali birds generally have good adaptability and attractive appearance, making them popular in local markets.",
      "With proper care and feeding, they continue to develop a good body size and can later be kept for meat or breeding purposes."
    ],
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Sonali",
      "Month",
      "Old",
      "Birds"
    ]
  },
  {
    "id": 26,
    "itemNumber": 26,
    "name": "Aseel Fighter – 1-Month-Old Birds",
    "slug": "aseel-fighter---1-month-old-birds",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "One-month-old Aseel birds are strong and active young birds with good potential for future growth.",
    "description": "One-month-old Aseel birds are strong and active young birds with good potential for future growth. They have a strong body structure and sturdy legs, which are typical characteristics of the Aseel breed. At this age, they need protein-rich grower feed, clean water, and a clean, dry shelter. They can be raised in a backyard or free-range system with enough space for movement. Aseel birds grow slowly, so proper feeding and care are important for good body development as they mature.",
    "details": [
      "One-month-old Aseel birds are strong and active young birds with good potential for future growth.",
      "They have a strong body structure and sturdy legs, which are typical characteristics of the Aseel breed.",
      "At this age, they need protein-rich grower feed, clean water, and a clean, dry shelter.",
      "They can be raised in a backyard or free-range system with enough space for movement.",
      "Aseel birds grow slowly, so proper feeding and care are important for good body development as they mature."
    ],
    "image": "/assets/products/chicks/asil-pure-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Aseel",
      "Fighter",
      "Month",
      "Old",
      "Birds"
    ]
  },
  {
    "id": 27,
    "itemNumber": 27,
    "name": "Indian Runner Duckling Chicks",
    "slug": "indian-runner-duckling-chicks",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "Indian Runner ducklings are active, upright-running ducks mainly valued for egg production.",
    "description": "Indian Runner ducklings are active, upright-running ducks mainly valued for egg production. They are known for good egg-laying ability and can be a suitable choice for farmers focusing on duck eggs. They are excellent foragers and can find insects, small organisms, and greens when given access to suitable outdoor areas. Ducklings need starter feed, clean drinking water, warmth, and a dry shelter during the early weeks. Indian Runner ducks are suitable for backyard and small-scale farming, especially where there is a market for duck eggs.",
    "details": [
      "Indian Runner ducklings are active, upright-running ducks mainly valued for egg production.",
      "They are known for good egg-laying ability and can be a suitable choice for farmers focusing on duck eggs.",
      "They are excellent foragers and can find insects, small organisms, and greens when given access to suitable outdoor areas.",
      "Ducklings need starter feed, clean drinking water, warmth, and a dry shelter during the early weeks.",
      "Indian Runner ducks are suitable for backyard and small-scale farming, especially where there is a market for duck eggs."
    ],
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Ducks & Waterfowl",
      "Indian",
      "Runner",
      "Duckling",
      "Chicks"
    ]
  },
  {
    "id": 28,
    "itemNumber": 28,
    "name": "Indian Runner Live Birds – Meat & Egg Purpose",
    "slug": "indian-runner-live-birds---meat-egg-purpose",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "Indian Runner ducks are mainly known for egg production, but they can also be raised for meat purposes.",
    "description": "Indian Runner ducks are mainly known for egg production, but they can also be raised for meat purposes. Their active nature and strong body make them suitable for backyard and free-range farming. They are good foragers and can supplement their feed with greens, insects, and natural food when allowed to range. Farmers can sell live birds for breeding, egg production, or meat, depending on market demand. With proper feed and care, Indian Runner ducks can provide both egg income and additional value from meat birds.",
    "details": [
      "Indian Runner ducks are mainly known for egg production, but they can also be raised for meat purposes.",
      "Their active nature and strong body make them suitable for backyard and free-range farming.",
      "They are good foragers and can supplement their feed with greens, insects, and natural food when allowed to range.",
      "Farmers can sell live birds for breeding, egg production, or meat, depending on market demand.",
      "With proper feed and care, Indian Runner ducks can provide both egg income and additional value from meat birds."
    ],
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Ducks & Waterfowl",
      "Indian",
      "Runner",
      "Live",
      "Birds",
      "Meat",
      "Egg",
      "Purpose"
    ]
  },
  {
    "id": 29,
    "itemNumber": 29,
    "name": "Khaki Campbell Duckling Chicks",
    "slug": "khaki-campbell-duckling-chicks",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "Khaki Campbell ducklings are one of the most popular duck breeds for high egg production.",
    "description": "Khaki Campbell ducklings are one of the most popular duck breeds for high egg production. They are active foragers and can do well in backyard, free-range, and semi-intensive farming systems. Ducklings need good-quality starter feed, clean water, warmth, and a dry, well-ventilated shelter during the early stage. Khaki Campbell is mainly an egg-purpose breed, while surplus males can also be raised and sold for meat.",
    "details": [
      "Khaki Campbell ducklings are one of the most popular duck breeds for high egg production.",
      "They are active foragers and can do well in backyard, free-range, and semi-intensive farming systems.",
      "Ducklings need good-quality starter feed, clean water, warmth, and a dry, well-ventilated shelter during the early stage.",
      "Khaki Campbell is mainly an egg-purpose breed, while surplus males can also be raised and sold for meat."
    ],
    "subTypes": [
      {
        "title": "Healthy ducks can produce around 250",
        "description": "300 eggs per year under good management."
      }
    ],
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Ducks & Waterfowl",
      "Khaki",
      "Campbell",
      "Duckling",
      "Chicks"
    ]
  },
  {
    "id": 30,
    "itemNumber": 30,
    "name": "Khaki Campbell Live Birds",
    "slug": "khaki-campbell-live-birds",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "Khaki Campbell ducks are mainly kept for high egg production and are one of the popular egg-purpose duck breeds.",
    "description": "Khaki Campbell ducks are mainly kept for high egg production and are one of the popular egg-purpose duck breeds. Under good management, a healthy female can produce around 250–300 eggs per year. They are active foragers and can be raised in backyard, free-range, or semi-intensive systems. They need balanced feed, clean drinking water, and a dry shelter for healthy growth and good egg production. Farmers can sell live Khaki Campbell ducks for breeding, egg production, or meat, while males and surplus birds can be used for meat.",
    "details": [
      "Khaki Campbell ducks are mainly kept for high egg production and are one of the popular egg-purpose duck breeds.",
      "Under good management, a healthy female can produce around 250–300 eggs per year.",
      "They are active foragers and can be raised in backyard, free-range, or semi-intensive systems.",
      "They need balanced feed, clean drinking water, and a dry shelter for healthy growth and good egg production.",
      "Farmers can sell live Khaki Campbell ducks for breeding, egg production, or meat, while males and surplus birds can be used for meat."
    ],
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Ducks & Waterfowl",
      "Khaki",
      "Campbell",
      "Live",
      "Birds"
    ]
  },
  {
    "id": 31,
    "itemNumber": 31,
    "name": "White Pekin Duckling Chicks",
    "slug": "white-pekin-duckling-chicks",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "White Pekin ducklings are mainly raised for meat production because they grow quickly and develop a good body size.",
    "description": "White Pekin ducklings are mainly raised for meat production because they grow quickly and develop a good body size. They have white feathers, yellow skin, and a broad body, which gives them an attractive market appearance. With proper feed and management, they can reach a good meat size in about 7–9 weeks. They are active, adaptable birds and can be raised in backyard, semi-intensive, or commercial systems. White Pekin ducks are a good choice for farmers looking for fast-growing meat birds with good market demand.",
    "details": [
      "White Pekin ducklings are mainly raised for meat production because they grow quickly and develop a good body size.",
      "They have white feathers, yellow skin, and a broad body, which gives them an attractive market appearance.",
      "With proper feed and management, they can reach a good meat size in about 7–9 weeks.",
      "They are active, adaptable birds and can be raised in backyard, semi-intensive, or commercial systems.",
      "White Pekin ducks are a good choice for farmers looking for fast-growing meat birds with good market demand."
    ],
    "specifications": {
      "Growth Period": "With proper feed and management, they can reach a good meat size in about 7–9 weeks."
    },
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Ducks & Waterfowl",
      "White",
      "Pekin",
      "Duckling",
      "Chicks"
    ]
  },
  {
    "id": 32,
    "itemNumber": 32,
    "name": "White Pekin Live Birds – Meat Purpose",
    "slug": "white-pekin-live-birds---meat-purpose",
    "category": "Ducks & Waterfowl",
    "categorySlug": "ducks-waterfowl",
    "shortDescription": "White Pekin ducks are excellent meat birds, known for fast growth and good body weight.",
    "description": "White Pekin ducks are excellent meat birds, known for fast growth and good body weight. They develop a broad body and good breast meat, giving farmers a good meat yield. They can reach a suitable market size in around 7–9 weeks with proper feeding and care. Pekin duck meat is tender and flavorful, making it suitable for restaurants and local meat markets. Farmers can sell live Pekin ducks directly to meat buyers, traders, restaurants, and local markets.",
    "details": [
      "White Pekin ducks are excellent meat birds, known for fast growth and good body weight.",
      "They develop a broad body and good breast meat, giving farmers a good meat yield.",
      "They can reach a suitable market size in around 7–9 weeks with proper feeding and care.",
      "Pekin duck meat is tender and flavorful, making it suitable for restaurants and local meat markets.",
      "Farmers can sell live Pekin ducks directly to meat buyers, traders, restaurants, and local markets."
    ],
    "specifications": {
      "Growth Period": "They can reach a suitable market size in around 7–9 weeks with proper feeding and care."
    },
    "image": "/assets/products/birds/duck-birds.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Ducks & Waterfowl",
      "White",
      "Pekin",
      "Live",
      "Birds",
      "Meat",
      "Purpose"
    ]
  },
  {
    "id": 33,
    "itemNumber": 33,
    "name": "BV300 White Layer Birds",
    "slug": "bv300-white-layer-birds",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "BV300 is a commercial white-egg layer strain developed for high and consistent egg production.",
    "description": "BV300 is a commercial white-egg layer strain developed for high and consistent egg production. The hens are known for excellent feed efficiency, helping farmers produce more eggs with efficient feed use. Under good commercial management, BV300 hens can produce around 300+ eggs per laying cycle. They are mainly suitable for commercial egg farming, rather than meat production. With proper layer feed, lighting, clean water, and good farm management, BV300 can provide steady egg production and regular income for layer farmers.",
    "details": [
      "BV300 is a commercial white-egg layer strain developed for high and consistent egg production.",
      "The hens are known for excellent feed efficiency, helping farmers produce more eggs with efficient feed use.",
      "Under good commercial management, BV300 hens can produce around 300+ eggs per laying cycle.",
      "They are mainly suitable for commercial egg farming, rather than meat production.",
      "With proper layer feed, lighting, clean water, and good farm management, BV300 can provide steady egg production and regular income for layer farmers."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Live Birds",
      "BV300",
      "White",
      "Layer",
      "Birds"
    ]
  },
  {
    "id": 34,
    "itemNumber": 34,
    "name": "Brown Layer Birds",
    "slug": "brown-layer-birds",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Brown layer birds are commercial egg-laying birds mainly kept for brown egg production.",
    "description": "Brown layer birds are commercial egg-laying birds mainly kept for brown egg production. They generally start laying at around 18–20 weeks of age with proper management. Good commercial strains can produce around 280–330 eggs per year, depending on the strain and farm conditions. They need a balanced layer feed with adequate calcium for strong eggshells and consistent production. Brown layers are suitable for farmers looking for regular egg production and steady income from commercial egg farming.",
    "details": [
      "Brown layer birds are commercial egg-laying birds mainly kept for brown egg production.",
      "They generally start laying at around 18–20 weeks of age with proper management.",
      "Good commercial strains can produce around 280–330 eggs per year, depending on the strain and farm conditions.",
      "They need a balanced layer feed with adequate calcium for strong eggshells and consistent production.",
      "Brown layers are suitable for farmers looking for regular egg production and steady income from commercial egg farming."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Brown",
      "Layer",
      "Birds"
    ]
  },
  {
    "id": 35,
    "itemNumber": 35,
    "name": "Sasso Breed Chicks",
    "slug": "sasso-breed-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "Sasso chicks are hardy, colourful birds mainly raised for meat production.",
    "description": "Sasso chicks are hardy, colourful birds mainly raised for meat production. They are known for good growth, strong body structure, and good-quality meat. Sasso birds can perform well in free-range, backyard, and semi-intensive farming systems. They are suitable for farmers who want a slower-growing, natural-style meat bird rather than a fast commercial broiler. With proper feed and management, Sasso birds can provide good meat yield and good market value.",
    "details": [
      "Sasso chicks are hardy, colourful birds mainly raised for meat production.",
      "They are known for good growth, strong body structure, and good-quality meat.",
      "Sasso birds can perform well in free-range, backyard, and semi-intensive farming systems.",
      "They are suitable for farmers who want a slower-growing, natural-style meat bird rather than a fast commercial broiler.",
      "With proper feed and management, Sasso birds can provide good meat yield and good market value."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "Sasso",
      "Breed",
      "Chicks"
    ]
  },
  {
    "id": 36,
    "itemNumber": 36,
    "name": "FFG Chicks",
    "slug": "ffg-chicks",
    "category": "Chicks & Young Birds",
    "categorySlug": "chicks-young-birds",
    "shortDescription": "FFG chicks are suitable for farmers looking for birds with good growth and strong body development.",
    "description": "FFG chicks are suitable for farmers looking for birds with good growth and strong body development. They can be raised mainly for meat production, depending on the type of FFG bird available. They are suitable for backyard and semi-intensive farming systems with proper care. Good-quality feed, clean water, and proper housing help them achieve better growth and body weight. FFG birds can be sold as live birds for meat purposes, depending on local market demand.",
    "details": [
      "FFG chicks are suitable for farmers looking for birds with good growth and strong body development.",
      "They can be raised mainly for meat production, depending on the type of FFG bird available.",
      "They are suitable for backyard and semi-intensive farming systems with proper care.",
      "Good-quality feed, clean water, and proper housing help them achieve better growth and body weight.",
      "FFG birds can be sold as live birds for meat purposes, depending on local market demand."
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Chicks & Young Birds",
      "FFG",
      "Chicks"
    ]
  },
  {
    "id": 37,
    "itemNumber": 37,
    "name": "Poultry Chick Drinkers",
    "slug": "poultry-chick-drinkers",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Chick drinkers provide clean and fresh drinking water for young poultry birds.",
    "description": "Chick drinkers provide clean and fresh drinking water for young poultry birds. They help chicks get easy access to water without spilling or wasting too much water. Good drinkers help keep the brooder area clean and dry, reducing the risk of infections. Drinkers should be washed and refilled regularly to maintain good hygiene. Choose the drinker size according to the age and number of chicks to ensure all birds can drink comfortably.",
    "details": [
      "Chick drinkers provide clean and fresh drinking water for young poultry birds.",
      "They help chicks get easy access to water without spilling or wasting too much water.",
      "Good drinkers help keep the brooder area clean and dry, reducing the risk of infections.",
      "Drinkers should be washed and refilled regularly to maintain good hygiene.",
      "Choose the drinker size according to the age and number of chicks to ensure all birds can drink comfortably."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Chick",
      "Drinkers"
    ]
  },
  {
    "id": 38,
    "itemNumber": 38,
    "name": "Poultry Chick Feeders",
    "slug": "poultry-chick-feeders",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Chick feeders help provide feed to young poultry birds in a clean and easy way.",
    "description": "Chick feeders help provide feed to young poultry birds in a clean and easy way. They reduce feed wastage and help keep the feed fresh and free from dirt. Proper feeders allow chicks to eat comfortably without crowding or fighting for feed. Feeders should be cleaned regularly to prevent mould, contamination, and disease. Choose the right feeder size based on the age and number of chicks for better feeding and growth.",
    "details": [
      "Chick feeders help provide feed to young poultry birds in a clean and easy way.",
      "They reduce feed wastage and help keep the feed fresh and free from dirt.",
      "Proper feeders allow chicks to eat comfortably without crowding or fighting for feed.",
      "Feeders should be cleaned regularly to prevent mould, contamination, and disease.",
      "Choose the right feeder size based on the age and number of chicks for better feeding and growth."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Chick",
      "Feeders"
    ]
  },
  {
    "id": 39,
    "itemNumber": 39,
    "name": "Poultry Jumbo Drinkers",
    "slug": "poultry-jumbo-drinkers",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Jumbo drinkers are designed to provide a larger supply of clean drinking water for growing and adult poultry birds.",
    "description": "Jumbo drinkers are designed to provide a larger supply of clean drinking water for growing and adult poultry birds. They are suitable for chicken, broiler, layer, and other poultry farms. Their larger capacity means less frequent refilling, saving time and effort for farmers. They help provide birds with easy and continuous access to drinking water throughout the day. Regular cleaning and fresh water are important to maintain good bird health and farm hygiene.",
    "details": [
      "Jumbo drinkers are designed to provide a larger supply of clean drinking water for growing and adult poultry birds.",
      "They are suitable for chicken, broiler, layer, and other poultry farms.",
      "Their larger capacity means less frequent refilling, saving time and effort for farmers.",
      "They help provide birds with easy and continuous access to drinking water throughout the day.",
      "Regular cleaning and fresh water are important to maintain good bird health and farm hygiene."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Jumbo",
      "Drinkers"
    ]
  },
  {
    "id": 40,
    "itemNumber": 40,
    "name": "Poultry Jumbo Feeder",
    "slug": "poultry-jumbo-feeder",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Jumbo feeders are designed to hold a larger quantity of feed for growing and adult poultry birds.",
    "description": "Jumbo feeders are designed to hold a larger quantity of feed for growing and adult poultry birds. They are suitable for broilers, layers, country chickens, and other poultry birds. The larger capacity means less frequent refilling, saving time and labour for farmers. A good jumbo feeder helps reduce feed wastage and spillage during feeding. Regular cleaning keeps the feeder hygienic and safe, helping birds get clean, fresh feed.",
    "details": [
      "Jumbo feeders are designed to hold a larger quantity of feed for growing and adult poultry birds.",
      "They are suitable for broilers, layers, country chickens, and other poultry birds.",
      "The larger capacity means less frequent refilling, saving time and labour for farmers.",
      "A good jumbo feeder helps reduce feed wastage and spillage during feeding.",
      "Regular cleaning keeps the feeder hygienic and safe, helping birds get clean, fresh feed."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Jumbo",
      "Feeder"
    ]
  },
  {
    "id": 41,
    "itemNumber": 41,
    "name": "Poultry Jumbo Manual Drinkers",
    "slug": "poultry-jumbo-manual-drinkers",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Jumbo manual drinkers provide a large supply of drinking water for poultry birds.",
    "description": "Jumbo manual drinkers provide a large supply of drinking water for poultry birds. They are suitable for broilers, layers, Desi chickens, ducks, and other farm birds. The larger water capacity reduces the need for frequent refilling, saving farmers time and effort. They are simple to use, easy to clean, and do not require electricity. Regular cleaning and fresh water help maintain good bird health and farm hygiene.",
    "details": [
      "Jumbo manual drinkers provide a large supply of drinking water for poultry birds.",
      "They are suitable for broilers, layers, Desi chickens, ducks, and other farm birds.",
      "The larger water capacity reduces the need for frequent refilling, saving farmers time and effort.",
      "They are simple to use, easy to clean, and do not require electricity.",
      "Regular cleaning and fresh water help maintain good bird health and farm hygiene."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Jumbo",
      "Manual",
      "Drinkers"
    ]
  },
  {
    "id": 42,
    "itemNumber": 42,
    "name": "Poultry Bell Drinkers",
    "slug": "poultry-bell-drinkers",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry bell drinkers provide a continuous supply of clean drinking water for chickens and other poultry birds.",
    "description": "Poultry bell drinkers provide a continuous supply of clean drinking water for chickens and other poultry birds. They are suitable for broilers, layers, Desi chickens, and growing birds. The bell-shaped design allows multiple birds to drink comfortably at the same time. They help reduce water spillage and wet litter when properly adjusted and maintained. Bell drinkers are easy to install, refill, and clean, making them a practical choice for poultry farms.",
    "details": [
      "Poultry bell drinkers provide a continuous supply of clean drinking water for chickens and other poultry birds.",
      "They are suitable for broilers, layers, Desi chickens, and growing birds.",
      "The bell-shaped design allows multiple birds to drink comfortably at the same time.",
      "They help reduce water spillage and wet litter when properly adjusted and maintained.",
      "Bell drinkers are easy to install, refill, and clean, making them a practical choice for poultry farms."
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Bell",
      "Drinkers"
    ]
  },
  {
    "id": 43,
    "itemNumber": 43,
    "name": "Poultry Chick Paper Boxes",
    "slug": "poultry-chick-paper-boxes",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry chick paper boxes are specially designed for the safe transportation of day-old chicks.",
    "description": "Poultry chick paper boxes are specially designed for the safe transportation of day-old chicks. They provide proper ventilation to help chicks stay comfortable during transport. The boxes are lightweight and easy to carry, handle, and dispose of after use. They help protect chicks from injury, overcrowding, and outside exposure during short-distance transportation. Using clean, strong, and properly sized boxes helps ensure safe delivery of healthy chicks to farmers.",
    "details": [
      "Poultry chick paper boxes are specially designed for the safe transportation of day-old chicks.",
      "They provide proper ventilation to help chicks stay comfortable during transport.",
      "The boxes are lightweight and easy to carry, handle, and dispose of after use.",
      "They help protect chicks from injury, overcrowding, and outside exposure during short-distance transportation.",
      "Using clean, strong, and properly sized boxes helps ensure safe delivery of healthy chicks to farmers."
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Chick",
      "Paper",
      "Boxes"
    ]
  },
  {
    "id": 44,
    "itemNumber": 44,
    "name": "Poultry Plastic Chick Boxes",
    "slug": "poultry-plastic-chick-boxes",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Plastic Chick Boxes",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Safe Chick Transport",
        "description": "Designed to carry chicks safely during transport and delivery."
      },
      {
        "title": "Strong &amp; Durable",
        "description": "Made from sturdy plastic for repeated use."
      },
      {
        "title": "Good Ventilation",
        "description": "Ventilation holes help maintain fresh air inside the box."
      },
      {
        "title": "Easy to Clean",
        "description": "Plastic surface is easy to wash and disinfect between batches."
      },
      {
        "title": "Reusable &amp; Practical",
        "description": "Suitable for hatcheries, poultry farms, and chick suppliers."
      }
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Plastic",
      "Chick",
      "Boxes"
    ]
  },
  {
    "id": 45,
    "itemNumber": 45,
    "name": "Poultry Shed Paradas",
    "slug": "poultry-shed-paradas",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Shed Paradas",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Good Airflow",
        "description": "Helps provide proper ventilation inside the poultry shed."
      },
      {
        "title": "Weather Protection",
        "description": "Helps protect birds from sunlight, rain, and strong winds."
      },
      {
        "title": "Easy to Install",
        "description": "Simple design that can be fitted around poultry sheds."
      },
      {
        "title": "Suitable for All Birds",
        "description": "Useful for broilers, layers, Desi chickens, ducks, and other poultry."
      },
      {
        "title": "Better Shed Management",
        "description": "Helps maintain a more comfortable and protected environment for healthy bird growth."
      }
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Shed",
      "Paradas"
    ]
  },
  {
    "id": 46,
    "itemNumber": 46,
    "name": "Poultry Shed Mesh",
    "slug": "poultry-shed-mesh",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Shed Mesh",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Strong Protection",
        "description": "Helps protect poultry from predators and unwanted animals."
      },
      {
        "title": "Good Ventilation",
        "description": "Allows fresh air and natural airflow through the shed."
      },
      {
        "title": "Sun &amp; Wind Control",
        "description": "Helps reduce direct sunlight and strong wind exposure when used as a side covering."
      },
      {
        "title": "Suitable for Different Poultry",
        "description": "Useful for broilers, layers, Desi chickens, ducks, and chicks."
      },
      {
        "title": "Durable &amp; Easy to Maintain",
        "description": "Suitable for long–term poultry shed use with easy cleaning and maintenance."
      }
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Shed",
      "Mesh"
    ]
  },
  {
    "id": 47,
    "itemNumber": 47,
    "name": "Incubator Egg Trays",
    "slug": "incubator-egg-trays",
    "category": "Hatchery & Incubation",
    "categorySlug": "hatchery-incubation",
    "shortDescription": "Incubator Egg Trays",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Safe Egg Holding",
        "description": "Keeps hatching eggs securely in the correct position inside the incubator."
      },
      {
        "title": "Proper Airflow",
        "description": "Tray design allows air to circulate around the eggs for uniform incubation."
      },
      {
        "title": "Easy Egg Turning",
        "description": "Helps maintain proper egg positioning during the incubation period."
      },
      {
        "title": "Strong &amp; Reusable",
        "description": "Durable trays can be cleaned, disinfected, and reused for multiple batches."
      },
      {
        "title": "Suitable for Different Eggs",
        "description": "Available in different sizes and capacities for chicken, duck, quail, and other poultry eggs."
      }
    ],
    "image": "/assets/products/incubators/incubator.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatchery & Incubation",
      "Incubator",
      "Egg",
      "Trays"
    ]
  },
  {
    "id": 48,
    "itemNumber": 48,
    "name": "Hatchery Chick Trays",
    "slug": "hatchery-chick-trays",
    "category": "Hatchery & Incubation",
    "categorySlug": "hatchery-incubation",
    "shortDescription": "Hatchery Chick Trays",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Safe Chick Handling",
        "description": "Provides a secure place to hold newly hatched chicks after hatching."
      },
      {
        "title": "Easy to Carry",
        "description": "Lightweight design makes moving chicks around the hatchery convenient."
      },
      {
        "title": "Good Ventilation",
        "description": "Open design allows fresh air to reach the chicks."
      },
      {
        "title": "Easy to Clean",
        "description": "Can be washed and disinfected after each hatchery batch."
      },
      {
        "title": "Strong &amp; Reusable",
        "description": "Durable trays are suitable for regular hatchery and chick–supply operations."
      }
    ],
    "image": "/assets/products/incubators/incubator.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatchery & Incubation",
      "Hatchery",
      "Chick",
      "Trays"
    ]
  },
  {
    "id": 49,
    "itemNumber": 49,
    "name": "Hatchery Equipment",
    "slug": "hatchery-equipment",
    "category": "Hatchery & Incubation",
    "categorySlug": "hatchery-incubation",
    "shortDescription": "Hatchery Equipment",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Complete Hatchery Setup",
        "description": "Includes essential equipment for egg incubation and chick hatching."
      },
      {
        "title": "Better Hatching Management",
        "description": "Helps maintain proper temperature, humidity, and ventilation."
      },
      {
        "title": "Safe Egg Handling",
        "description": "Equipment such as egg trays and setters helps keep eggs properly arranged."
      },
      {
        "title": "Easy Chick Handling",
        "description": "Hatchery trays and related equipment make it easier to collect and move newly hatched chicks."
      },
      {
        "title": "Suitable for Different Poultry",
        "description": "Useful for chicken, duck, quail, turkey, and other poultry hatcheries."
      }
    ],
    "image": "/assets/products/incubators/incubator.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Hatchery & Incubation",
      "Hatchery",
      "Equipment"
    ]
  },
  {
    "id": 50,
    "itemNumber": 50,
    "name": "Poultry Bird Transport Boxes",
    "slug": "poultry-bird-transport-boxes",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Bird Transport Boxes",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Safe Bird Transport",
        "description": "Designed to carry live birds safely from farms to markets or buyers."
      },
      {
        "title": "Good Ventilation",
        "description": "Ventilation openings provide fresh air during transportation."
      },
      {
        "title": "Strong &amp; Durable",
        "description": "Made to handle regular farm and market use."
      },
      {
        "title": "Easy Handling",
        "description": "Lightweight design makes loading, unloading, and carrying easier."
      },
      {
        "title": "Reusable &amp; Easy to Clean",
        "description": "Can be washed and disinfected for repeated use."
      }
    ],
    "image": "/assets/products/chicks/layer-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Bird",
      "Transport",
      "Boxes"
    ]
  },
  {
    "id": 51,
    "itemNumber": 51,
    "name": "Poultry Debeaker Machine",
    "slug": "poultry-debeaker-machine",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Debeaker Machine",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Beak Trimming",
        "description": "Designed for controlled beak trimming in poultry birds."
      },
      {
        "title": "Suitable for Layers",
        "description": "Commonly used in layer farming to help reduce harmful pecking and feed wastage."
      },
      {
        "title": "Quick Operation",
        "description": "Helps process birds efficiently in larger poultry farms."
      },
      {
        "title": "Uniform Trimming",
        "description": "Helps maintain more consistent trimming when properly operated."
      },
      {
        "title": "Easy Farm Use",
        "description": "Suitable for hatcheries and poultry farms with proper training and bird handling."
      }
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Debeaker",
      "Machine"
    ]
  },
  {
    "id": 52,
    "itemNumber": 52,
    "name": "Poultry Vaccination Guns",
    "slug": "poultry-vaccination-guns",
    "category": "Poultry Equipment",
    "categorySlug": "poultry-equipment",
    "shortDescription": "Poultry Vaccination Guns",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Fast Vaccination",
        "description": "Helps vaccinate a large number of poultry birds efficiently."
      },
      {
        "title": "Accurate Dosing",
        "description": "Designed to deliver a consistent vaccine dose when properly calibrated."
      },
      {
        "title": "Saves Time &amp; Labour",
        "description": "Useful for commercial poultry farms with many birds."
      },
      {
        "title": "Easy Handling",
        "description": "Ergonomic design helps make vaccination work more convenient."
      },
      {
        "title": "Suitable for Poultry Farms",
        "description": "Useful for broilers, layers, breeders, and other poultry birds with proper vaccination procedures."
      }
    ],
    "image": "/assets/products/equipment/drinker.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Equipment",
      "Poultry",
      "Vaccination",
      "Guns"
    ]
  },
  {
    "id": 53,
    "itemNumber": 53,
    "name": "Poultry Medicines",
    "slug": "poultry-medicines",
    "category": "Medicines & Vaccines",
    "categorySlug": "medicines-vaccines",
    "shortDescription": "Poultry medicines are used to treat diseases, infections, parasites, and health problems in poultry birds.",
    "description": "Poultry medicines are used to treat diseases, infections, parasites, and health problems in poultry birds.",
    "details": [
      "Poultry medicines are used to treat diseases, infections, parasites, and health problems in poultry birds."
    ],
    "subTypes": [
      {
        "title": "Antibiotics",
        "description": "for certain bacterial infections."
      },
      {
        "title": "Anticoccidials",
        "description": "for controlling coccidiosis."
      },
      {
        "title": "Deworming medicines",
        "description": "for internal worm infections."
      },
      {
        "title": "Vitamin supplements",
        "description": "to correct vitamin deficiencies and support growth."
      },
      {
        "title": "Mineral supplements",
        "description": "for bone strength, eggshell quality, and development."
      },
      {
        "title": "Electrolytes",
        "description": "for dehydration and heat/transport stress."
      },
      {
        "title": "Liver",
        "description": "support medicines – to support liver function during illness or stress."
      },
      {
        "title": "Digestive/gut medicines",
        "description": "to help with digestive problems and poor feed utilization."
      },
      {
        "title": "Respiratory medicines",
        "description": "used for certain respiratory infections under veterinary guidance."
      },
      {
        "title": "Anti",
        "description": "inflammatory/supportive medicines – used to reduce inflammation or support recovery when appropriate."
      }
    ],
    "image": "/assets/products/medicines/vaccines.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Medicines & Vaccines",
      "Poultry",
      "Medicines"
    ]
  },
  {
    "id": 54,
    "itemNumber": 54,
    "name": "Poultry Vaccines",
    "slug": "poultry-vaccines",
    "category": "Medicines & Vaccines",
    "categorySlug": "medicines-vaccines",
    "shortDescription": "Poultry vaccines help protect chickens from common infectious diseases and improve flock immunity.",
    "description": "Poultry vaccines help protect chickens from common infectious diseases and improve flock immunity. Infectious Bursal Disease (IBD/Gumboro) vaccine – protects against infectious bursal disease.",
    "details": [
      "Poultry vaccines help protect chickens from common infectious diseases and improve flock immunity.",
      "Infectious Bursal Disease (IBD/Gumboro) vaccine – protects against infectious bursal disease."
    ],
    "subTypes": [
      {
        "title": "Newcastle Disease (ND) vaccine",
        "description": "helps protect against Newcastle disease."
      },
      {
        "title": "Marek’s Disease vaccine",
        "description": "helps prevent Marek’s disease."
      },
      {
        "title": "Infectious Bronchitis (IB) vaccine",
        "description": "helps protect against infectious bronchitis."
      },
      {
        "title": "Fowl Pox vaccine",
        "description": "helps prevent fowl pox."
      },
      {
        "title": "Infectious Coryza vaccine",
        "description": "used in some flocks where the disease is a concern."
      },
      {
        "title": "Avian Influenza vaccines",
        "description": "used only where permitted and according to applicable veterinary and government requirements."
      }
    ],
    "image": "/assets/products/medicines/vaccines.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Medicines & Vaccines",
      "Poultry",
      "Vaccines"
    ]
  },
  {
    "id": 55,
    "itemNumber": 55,
    "name": "Poultry Cages – Small Units",
    "slug": "poultry-cages---small-units",
    "category": "Poultry Cages",
    "categorySlug": "poultry-cages",
    "shortDescription": "Small poultry cages are compact housing systems designed for keeping a small number of chickens, especially layers and backyard/commercial poultry units.",
    "description": "Small poultry cages are compact housing systems designed for keeping a small number of chickens, especially layers and backyard/commercial poultry units. Suitable for small poultry farms and limited spaces. Available in single, double, or multi-bird compartments. Usually made from galvanized steel wire for durability. Can include feeders, drinkers, egg-collection areas, and manure trays. Help maintain cleaner housing and easier bird management. Suitable for layers, growers, and small-scale poultry operations, depending on cage design.",
    "details": [
      "Small poultry cages are compact housing systems designed for keeping a small number of chickens, especially layers and backyard/commercial poultry units.",
      "Suitable for small poultry farms and limited spaces.",
      "Available in single, double, or multi-bird compartments.",
      "Usually made from galvanized steel wire for durability.",
      "Can include feeders, drinkers, egg-collection areas, and manure trays.",
      "Help maintain cleaner housing and easier bird management.",
      "Suitable for layers, growers, and small-scale poultry operations, depending on cage design."
    ],
    "image": "/assets/products/equipment/cages.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Cages",
      "Poultry",
      "Cages",
      "Small",
      "Units"
    ]
  },
  {
    "id": 56,
    "itemNumber": 56,
    "name": "Poultry Cages – Big Size Units",
    "slug": "poultry-cages---big-size-units",
    "category": "Poultry Cages",
    "categorySlug": "poultry-cages",
    "shortDescription": "Large poultry cages are designed for commercial poultry farms that house a larger number of birds.",
    "description": "Large poultry cages are designed for commercial poultry farms that house a larger number of birds. Suitable for large-scale layer and poultry farming. Available in multi-tier and multi-bird cage systems. Generally made from strong galvanized steel wire for long-term use. Can be fitted with automatic or manual feeding and drinking systems. Designed for efficient egg collection, manure management, and bird handling. Help farmers save floor space and manage large flocks efficiently.",
    "details": [
      "Large poultry cages are designed for commercial poultry farms that house a larger number of birds.",
      "Suitable for large-scale layer and poultry farming.",
      "Available in multi-tier and multi-bird cage systems.",
      "Generally made from strong galvanized steel wire for long-term use.",
      "Can be fitted with automatic or manual feeding and drinking systems.",
      "Designed for efficient egg collection, manure management, and bird handling.",
      "Help farmers save floor space and manage large flocks efficiently."
    ],
    "image": "/assets/products/equipment/cages.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Cages",
      "Poultry",
      "Cages",
      "Big",
      "Size",
      "Units"
    ]
  },
  {
    "id": 57,
    "itemNumber": 57,
    "name": "Mini Egg Incubators",
    "slug": "mini-egg-incubators",
    "category": "Hatchery & Incubation",
    "categorySlug": "hatchery-incubation",
    "shortDescription": "Mini egg incubators are small-capacity machines used to hatch poultry eggs in small quantities.",
    "description": "Mini egg incubators are small-capacity machines used to hatch poultry eggs in small quantities. Suitable for small farms, backyard poultry, and beginners. Available in different capacities, commonly for a few to several dozen eggs. Provide controlled temperature and humidity for incubation. Many models have automatic egg-turning systems. Compact design makes them easy to operate and maintain. Suitable for hatching chicken, duck, quail, and other compatible poultry eggs, depending on the model.",
    "details": [
      "Mini egg incubators are small-capacity machines used to hatch poultry eggs in small quantities.",
      "Suitable for small farms, backyard poultry, and beginners.",
      "Available in different capacities, commonly for a few to several dozen eggs.",
      "Provide controlled temperature and humidity for incubation.",
      "Many models have automatic egg-turning systems.",
      "Compact design makes them easy to operate and maintain.",
      "Suitable for hatching chicken, duck, quail, and other compatible poultry eggs, depending on the model."
    ],
    "image": "/assets/products/incubators/incubator.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Hatchery & Incubation",
      "Mini",
      "Egg",
      "Incubators"
    ]
  },
  {
    "id": 58,
    "itemNumber": 58,
    "name": "Big Size Egg Incubators",
    "slug": "big-size-egg-incubators",
    "category": "Hatchery & Incubation",
    "categorySlug": "hatchery-incubation",
    "shortDescription": "High-capacity incubators designed for commercial poultry farms and hatcheries.",
    "description": "High-capacity incubators designed for commercial poultry farms and hatcheries. Suitable for large-scale egg incubation and chick production. Provide controlled temperature and humidity for proper egg development. Equipped with automatic egg-turning systems in many models. Designed with proper ventilation and air circulation. Help achieve uniform and efficient hatching. Available in different capacities according to farm and hatchery requirements.",
    "details": [
      "High-capacity incubators designed for commercial poultry farms and hatcheries.",
      "Suitable for large-scale egg incubation and chick production.",
      "Provide controlled temperature and humidity for proper egg development.",
      "Equipped with automatic egg-turning systems in many models.",
      "Designed with proper ventilation and air circulation.",
      "Help achieve uniform and efficient hatching.",
      "Available in different capacities according to farm and hatchery requirements."
    ],
    "image": "/assets/products/incubators/incubator.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatchery & Incubation",
      "Big",
      "Size",
      "Egg",
      "Incubators"
    ]
  },
  {
    "id": 59,
    "itemNumber": 59,
    "name": "Broiler Breed Hatching Eggs",
    "slug": "broiler-breed-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy, well-managed breeder birds.",
    "description": "Selected from healthy, well-managed breeder birds. Proper egg size, shape, shell quality, and cleanliness are important for good hatchability. Eggs should be properly stored and transported before incubation. Suitable for producing healthy, fast-growing broiler chicks for meat production.",
    "details": [
      "Selected from healthy, well-managed breeder birds.",
      "Proper egg size, shape, shell quality, and cleanliness are important for good hatchability.",
      "Eggs should be properly stored and transported before incubation.",
      "Suitable for producing healthy, fast-growing broiler chicks for meat production."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 65",
        "description": "70 grams, depending on breeder age and strain."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 80–90% hatchability under proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Hatching Eggs",
      "Broiler",
      "Breed",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 60,
    "itemNumber": 60,
    "name": "Aseel Breed Hatching Eggs",
    "slug": "aseel-breed-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy Aseel breeder birds with good fertility.",
    "description": "Selected from healthy Aseel breeder birds with good fertility. Eggs should have a clean, strong shell and normal shape. Proper storage, handling, temperature, and humidity are important for good hatchability. Suitable for producing Aseel chicks for breeding and backyard/native poultry farming.",
    "details": [
      "Selected from healthy Aseel breeder birds with good fertility.",
      "Eggs should have a clean, strong shell and normal shape.",
      "Proper storage, handling, temperature, and humidity are important for good hatchability.",
      "Suitable for producing Aseel chicks for breeding and backyard/native poultry farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 40",
        "description": "50 grams, depending on the Aseel strain and breeder age."
      },
      {
        "title": "Hatching percentage: Around 70",
        "description": "85% can be achieved from good–quality fertile eggs with proper storage and incubation management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Aseel",
      "Breed",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 61,
    "itemNumber": 61,
    "name": "Sonali Breed Hatching Eggs",
    "slug": "sonali-breed-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile Sonali breeder birds.",
    "description": "Selected from healthy and fertile Sonali breeder birds. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage and transportation help maintain fertility and hatchability. Suitable for producing Sonali chicks for meat and small-scale poultry farming.",
    "details": [
      "Selected from healthy and fertile Sonali breeder birds.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage and transportation help maintain fertility and hatchability.",
      "Suitable for producing Sonali chicks for meat and small-scale poultry farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 45",
        "description": "55 grams, depending on breeder age and strain."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 75–85% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Sonali",
      "Breed",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 62,
    "itemNumber": 62,
    "name": "Desi Hatching Eggs",
    "slug": "desi-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile Desi breeder birds.",
    "description": "Selected from healthy and fertile Desi breeder birds. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage, handling, temperature, and humidity are important for good hatchability. Suitable for producing Desi chicks for backyard and native poultry farming.",
    "details": [
      "Selected from healthy and fertile Desi breeder birds.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage, handling, temperature, and humidity are important for good hatchability.",
      "Suitable for producing Desi chicks for backyard and native poultry farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 40",
        "description": "50 grams, depending on the breed and breeder age."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 70–85% hatchability with proper incubation management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Desi",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 63,
    "itemNumber": 63,
    "name": "Brown Layer Hatching Eggs",
    "slug": "brown-layer-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile brown-layer breeder birds.",
    "description": "Selected from healthy and fertile brown-layer breeder birds. Eggs should have good shell quality, uniform size, and normal shape. Proper storage, handling, temperature, and humidity help maintain hatchability. Suitable for producing brown-layer chicks for commercial egg production.",
    "details": [
      "Selected from healthy and fertile brown-layer breeder birds.",
      "Eggs should have good shell quality, uniform size, and normal shape.",
      "Proper storage, handling, temperature, and humidity help maintain hatchability.",
      "Suitable for producing brown-layer chicks for commercial egg production."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 55",
        "description": "65 grams, depending on the layer strain and breeder age."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 80–90% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Brown",
      "Layer",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 64,
    "itemNumber": 64,
    "name": "Vanaraja Hatching Eggs",
    "slug": "vanaraja-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile Vanaraja breeder birds.",
    "description": "Selected from healthy and fertile Vanaraja breeder birds. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage, handling, temperature, and humidity are important for good hatchability. Suitable for producing Vanaraja chicks for backyard and semi-intensive poultry farming.",
    "details": [
      "Selected from healthy and fertile Vanaraja breeder birds.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage, handling, temperature, and humidity are important for good hatchability.",
      "Suitable for producing Vanaraja chicks for backyard and semi-intensive poultry farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 45",
        "description": "55 grams, depending on breeder age and flock conditions."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 75–85% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Vanaraja",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 65,
    "itemNumber": 65,
    "name": "White Layer Hatching Eggs",
    "slug": "white-layer-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile white-layer breeder birds.",
    "description": "Selected from healthy and fertile white-layer breeder birds. Eggs should have good shell quality, uniform size, and normal shape. Proper storage, handling, temperature, and humidity help maintain good hatchability. Suitable for producing white-layer chicks for commercial egg production.",
    "details": [
      "Selected from healthy and fertile white-layer breeder birds.",
      "Eggs should have good shell quality, uniform size, and normal shape.",
      "Proper storage, handling, temperature, and humidity help maintain good hatchability.",
      "Suitable for producing white-layer chicks for commercial egg production."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 55",
        "description": "65 grams, depending on the strain and breeder age."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 80–90% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "White",
      "Layer",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 66,
    "itemNumber": 66,
    "name": "Quail Hatching Eggs",
    "slug": "quail-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile quail breeder birds.",
    "description": "Selected from healthy and fertile quail breeder birds. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage, handling, temperature, and humidity are important for good hatchability. Suitable for producing quail chicks for meat and egg production.",
    "details": [
      "Selected from healthy and fertile quail breeder birds.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage, handling, temperature, and humidity are important for good hatchability.",
      "Suitable for producing quail chicks for meat and egg production."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 9",
        "description": "12 grams, depending on the quail strain and breeder age."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 75–85% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Quail",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 67,
    "itemNumber": 67,
    "name": "Indian Runner Duck Hatching Eggs",
    "slug": "indian-runner-duck-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile Indian Runner duck breeders.",
    "description": "Selected from healthy and fertile Indian Runner duck breeders. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage, handling, temperature, humidity, and ventilation help maintain hatchability. Suitable for producing Indian Runner ducklings for egg production and small-scale duck farming.",
    "details": [
      "Selected from healthy and fertile Indian Runner duck breeders.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage, handling, temperature, humidity, and ventilation help maintain hatchability.",
      "Suitable for producing Indian Runner ducklings for egg production and small-scale duck farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 60",
        "description": "70 grams, depending on breeder age and strain."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 75–85% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "Indian",
      "Runner",
      "Duck",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 68,
    "itemNumber": 68,
    "name": "White Pekin Duck Hatching Eggs",
    "slug": "white-pekin-duck-hatching-eggs",
    "category": "Hatching Eggs",
    "categorySlug": "hatching-eggs",
    "shortDescription": "Selected from healthy and fertile White Pekin breeder ducks.",
    "description": "Selected from healthy and fertile White Pekin breeder ducks. Eggs should have good shell quality, normal shape, and clean surfaces. Proper storage, handling, temperature, humidity, and ventilation are important for good hatchability. Suitable for producing Pekin ducklings for meat production and commercial duck farming.",
    "details": [
      "Selected from healthy and fertile White Pekin breeder ducks.",
      "Eggs should have good shell quality, normal shape, and clean surfaces.",
      "Proper storage, handling, temperature, humidity, and ventilation are important for good hatchability.",
      "Suitable for producing Pekin ducklings for meat production and commercial duck farming."
    ],
    "subTypes": [
      {
        "title": "Egg weight: Generally, around 80",
        "description": "95 grams, depending on breeder age and strain."
      },
      {
        "title": "Hatching percentage: Good",
        "description": "quality fertile eggs can achieve around 75–85% hatchability with proper incubation and management."
      }
    ],
    "image": "/assets/products/eggs/hatching-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Hatching Eggs",
      "White",
      "Pekin",
      "Duck",
      "Hatching",
      "Eggs"
    ]
  },
  {
    "id": 69,
    "itemNumber": 69,
    "name": "Duck Eating Eggs",
    "slug": "duck-eating-eggs",
    "category": "Eating Eggs",
    "categorySlug": "eating-eggs",
    "shortDescription": "Fresh duck eggs for human consumption, known for their rich taste and creamy yolk.",
    "description": "Fresh duck eggs for human consumption, known for their rich taste and creamy yolk. Generally larger than chicken eggs, with a strong shell and nutrient-rich yolk. Suitable for boiling, frying, baking, and other food preparations. Collected from healthy, well-managed ducks. Proper cleaning, storage, and handling help maintain freshness and quality. Available for household use, restaurants, bakeries, and food businesses.",
    "details": [
      "Fresh duck eggs for human consumption, known for their rich taste and creamy yolk.",
      "Generally larger than chicken eggs, with a strong shell and nutrient-rich yolk.",
      "Suitable for boiling, frying, baking, and other food preparations.",
      "Collected from healthy, well-managed ducks.",
      "Proper cleaning, storage, and handling help maintain freshness and quality.",
      "Available for household use, restaurants, bakeries, and food businesses."
    ],
    "image": "/assets/products/eggs/eating-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Eating Eggs",
      "Duck",
      "Eating",
      "Eggs"
    ]
  },
  {
    "id": 70,
    "itemNumber": 70,
    "name": "Brown Eating Eggs",
    "slug": "brown-eating-eggs",
    "category": "Eating Eggs",
    "categorySlug": "eating-eggs",
    "shortDescription": "Fresh brown-shell chicken eggs suitable for everyday consumption.",
    "description": "Fresh brown-shell chicken eggs suitable for everyday consumption. Generally rich in high-quality protein and essential nutrients. Suitable for boiling, frying, cooking, baking, and other food preparations. Collected from healthy and well-managed layer birds. Selected for good shell quality, freshness, and cleanliness. Suitable for households, hotels, restaurants, bakeries, and food businesses.",
    "details": [
      "Fresh brown-shell chicken eggs suitable for everyday consumption.",
      "Generally rich in high-quality protein and essential nutrients.",
      "Suitable for boiling, frying, cooking, baking, and other food preparations.",
      "Collected from healthy and well-managed layer birds.",
      "Selected for good shell quality, freshness, and cleanliness.",
      "Suitable for households, hotels, restaurants, bakeries, and food businesses."
    ],
    "image": "/assets/products/eggs/eating-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Eating Eggs",
      "Brown",
      "Eating",
      "Eggs"
    ]
  },
  {
    "id": 71,
    "itemNumber": 71,
    "name": "Sonali Eating Eggs",
    "slug": "sonali-eating-eggs",
    "category": "Eating Eggs",
    "categorySlug": "eating-eggs",
    "shortDescription": "Fresh Sonali chicken eggs suitable for everyday consumption.",
    "description": "Fresh Sonali chicken eggs suitable for everyday consumption. Generally, have a brown to light-brown shell and a nutritious yolk. Rich source of high-quality protein and essential nutrients. Suitable for boiling, frying, cooking, baking, and other food preparations. Collected from healthy and well-managed Sonali layer birds. Suitable for households, hotels, restaurants, and food businesses.",
    "details": [
      "Fresh Sonali chicken eggs suitable for everyday consumption.",
      "Generally, have a brown to light-brown shell and a nutritious yolk.",
      "Rich source of high-quality protein and essential nutrients.",
      "Suitable for boiling, frying, cooking, baking, and other food preparations.",
      "Collected from healthy and well-managed Sonali layer birds.",
      "Suitable for households, hotels, restaurants, and food businesses."
    ],
    "image": "/assets/products/eggs/eating-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Eating Eggs",
      "Sonali",
      "Eating",
      "Eggs"
    ]
  },
  {
    "id": 72,
    "itemNumber": 72,
    "name": "Desi Eating Eggs",
    "slug": "desi-eating-eggs",
    "category": "Eating Eggs",
    "categorySlug": "eating-eggs",
    "shortDescription": "Fresh Desi chicken eggs suitable for daily consumption.",
    "description": "Fresh Desi chicken eggs suitable for daily consumption. Known for their natural taste and firm yolk. Provide high-quality protein and essential nutrients. Suitable for boiling, frying, cooking, baking, and other food preparations. Collected from healthy and well-managed Desi birds. Suitable for households, restaurants, hotels, and local food businesses.",
    "details": [
      "Fresh Desi chicken eggs suitable for daily consumption.",
      "Known for their natural taste and firm yolk.",
      "Provide high-quality protein and essential nutrients.",
      "Suitable for boiling, frying, cooking, baking, and other food preparations.",
      "Collected from healthy and well-managed Desi birds.",
      "Suitable for households, restaurants, hotels, and local food businesses."
    ],
    "image": "/assets/products/eggs/eating-eggs.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Eating Eggs",
      "Desi",
      "Eating",
      "Eggs"
    ]
  },
  {
    "id": 73,
    "itemNumber": 73,
    "name": "Broiler Poultry Feed",
    "slug": "broiler-poultry-feed",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Specially formulated feed for broiler chickens raised for meat production.",
    "description": "Specially formulated feed for broiler chickens raised for meat production. Contains essential protein, energy, vitamins, minerals, and amino acids. Helps promote fast, uniform growth and efficient feed utilization. Suitable for commercial broiler farms and small-scale poultry units.",
    "details": [
      "Specially formulated feed for broiler chickens raised for meat production.",
      "Contains essential protein, energy, vitamins, minerals, and amino acids.",
      "Helps promote fast, uniform growth and efficient feed utilization.",
      "Suitable for commercial broiler farms and small-scale poultry units."
    ],
    "subTypes": [
      {
        "title": "Pre",
        "description": "Starter Feed – given during the early chick stage to support strong initial growth and development."
      },
      {
        "title": "Starter Feed",
        "description": "supports healthy growth, muscle development, and good feed intake during the growing stage."
      },
      {
        "title": "Finisher Feed",
        "description": "provided during the final stage to support body weight gain and meat production."
      }
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Poultry Feed & Ingredients",
      "Broiler",
      "Poultry",
      "Feed"
    ]
  },
  {
    "id": 74,
    "itemNumber": 74,
    "name": "Layer Poultry Feed",
    "slug": "layer-poultry-feed",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Specially formulated feed for layer chickens raised for egg production.",
    "description": "Specially formulated feed for layer chickens raised for egg production. Helps maintain good bird health, egg quality, and productive performance. Suitable for commercial layer farms and small-scale poultry units.",
    "details": [
      "Specially formulated feed for layer chickens raised for egg production.",
      "Helps maintain good bird health, egg quality, and productive performance.",
      "Suitable for commercial layer farms and small-scale poultry units."
    ],
    "subTypes": [
      {
        "title": "Pre",
        "description": "Starter Feed – supports early chick growth and development."
      },
      {
        "title": "Starter Feed",
        "description": "provides nutrients for healthy growth of young birds."
      },
      {
        "title": "Grower Feed",
        "description": "supports body development before the laying stage."
      },
      {
        "title": "Pre",
        "description": "Layer Feed – prepares pullets for the start of egg production."
      },
      {
        "title": "Layer Feed",
        "description": "provides protein, calcium, phosphorus, vitamins, and minerals to support regular egg production and strong eggshells."
      }
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Layer",
      "Poultry",
      "Feed"
    ]
  },
  {
    "id": 75,
    "itemNumber": 75,
    "name": "Poultry Dry Fish",
    "slug": "poultry-dry-fish",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Dry fish is a protein-rich feed ingredient used in poultry feed.",
    "description": "Dry fish is a protein-rich feed ingredient used in poultry feed. It helps provide high-quality animal protein for better growth and body development. It can support strong muscles, feathers, and overall bird health when used in a balanced feed. It is commonly used in feed formulations for broilers, layers, chicks, and breeder birds. Farmers should use clean, properly dried, good-quality dry fish without mold, excess salt, or spoilage.",
    "details": [
      "Dry fish is a protein-rich feed ingredient used in poultry feed.",
      "It helps provide high-quality animal protein for better growth and body development.",
      "It can support strong muscles, feathers, and overall bird health when used in a balanced feed.",
      "It is commonly used in feed formulations for broilers, layers, chicks, and breeder birds.",
      "Farmers should use clean, properly dried, good-quality dry fish without mold, excess salt, or spoilage."
    ],
    "image": "/assets/products/meat/dry-fish.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Dry",
      "Fish"
    ]
  },
  {
    "id": 76,
    "itemNumber": 76,
    "name": "Poultry Fish Feed",
    "slug": "poultry-fish-feed",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Poultry fish feed is a protein-rich feed ingredient made from fish or fish meal.",
    "description": "Poultry fish feed is a protein-rich feed ingredient made from fish or fish meal. It provides high-quality protein and essential amino acids for poultry growth. It supports body weight, muscle development, feather growth, and overall health. It can be used in feed for broilers, layers, chicks, and breeder birds as part of a balanced ration. Good-quality fish feed should be fresh, properly dried, clean, and free from mold or bad smell. It is especially useful when farmers need an additional protein source in poultry feed.",
    "details": [
      "Poultry fish feed is a protein-rich feed ingredient made from fish or fish meal.",
      "It provides high-quality protein and essential amino acids for poultry growth.",
      "It supports body weight, muscle development, feather growth, and overall health.",
      "It can be used in feed for broilers, layers, chicks, and breeder birds as part of a balanced ration.",
      "Good-quality fish feed should be fresh, properly dried, clean, and free from mold or bad smell.",
      "It is especially useful when farmers need an additional protein source in poultry feed."
    ],
    "image": "/assets/products/feeds/fish-feed.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Fish",
      "Feed"
    ]
  },
  {
    "id": 77,
    "itemNumber": 77,
    "name": "Poultry Soya DOC",
    "slug": "poultry-soya-doc",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Soya DOC (De-Oiled Cake) is a high-protein feed ingredient commonly used in poultry feed.",
    "description": "Soya DOC (De-Oiled Cake) is a high-protein feed ingredient commonly used in poultry feed. It provides good-quality protein and essential amino acids needed for bird growth. It supports muscle development, feather growth, and healthy body weight. Soya DOC is widely used in broiler, layer, chick, and breeder feeds. It can be mixed with other feed ingredients to make a balanced poultry ration. Good-quality Soya DOC should be clean, properly processed, dry, and free from mold.",
    "details": [
      "Soya DOC (De-Oiled Cake) is a high-protein feed ingredient commonly used in poultry feed.",
      "It provides good-quality protein and essential amino acids needed for bird growth.",
      "It supports muscle development, feather growth, and healthy body weight.",
      "Soya DOC is widely used in broiler, layer, chick, and breeder feeds.",
      "It can be mixed with other feed ingredients to make a balanced poultry ration.",
      "Good-quality Soya DOC should be clean, properly processed, dry, and free from mold."
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Soya",
      "DOC"
    ]
  },
  {
    "id": 78,
    "itemNumber": 78,
    "name": "Poultry Maize",
    "slug": "poultry-maize",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Maize (corn) is one of the main energy ingredients used in poultry feed.",
    "description": "Maize (corn) is one of the main energy ingredients used in poultry feed. It provides high energy that helps birds grow and maintain body weight. It is commonly used in broiler, layer, chick, and breeder feeds. Good-quality maize supports better feed performance and healthy bird development. Maize should be clean, dry, properly stored, and free from mold and excess moisture. It can be combined with Soya DOC, minerals, vitamins, and other ingredients to prepare balanced poultry feed.",
    "details": [
      "Maize (corn) is one of the main energy ingredients used in poultry feed.",
      "It provides high energy that helps birds grow and maintain body weight.",
      "It is commonly used in broiler, layer, chick, and breeder feeds.",
      "Good-quality maize supports better feed performance and healthy bird development.",
      "Maize should be clean, dry, properly stored, and free from mold and excess moisture.",
      "It can be combined with Soya DOC, minerals, vitamins, and other ingredients to prepare balanced poultry feed."
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Maize"
    ]
  },
  {
    "id": 79,
    "itemNumber": 79,
    "name": "Poultry Soya Oil",
    "slug": "poultry-soya-oil",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Soya oil is an energy-rich ingredient used in poultry feed.",
    "description": "Soya oil is an energy-rich ingredient used in poultry feed. It provides concentrated energy to support bird growth and body weight. It helps improve the energy value and feed quality of poultry rations. It can be used in broiler, layer, chick, and breeder feeds in suitable amounts. Soya oil also helps improve feed texture and reduce dust. Good-quality oil should be fresh, clean, and properly stored to maintain feed quality.",
    "details": [
      "Soya oil is an energy-rich ingredient used in poultry feed.",
      "It provides concentrated energy to support bird growth and body weight.",
      "It helps improve the energy value and feed quality of poultry rations.",
      "It can be used in broiler, layer, chick, and breeder feeds in suitable amounts.",
      "Soya oil also helps improve feed texture and reduce dust.",
      "Good-quality oil should be fresh, clean, and properly stored to maintain feed quality."
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Soya",
      "Oil"
    ]
  },
  {
    "id": 80,
    "itemNumber": 80,
    "name": "Poultry Stone Grade",
    "slug": "poultry-stone-grade",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Poultry stone grade usually refers to feed-grade limestone or calcium stone used in poultry feed.",
    "description": "Poultry stone grade usually refers to feed-grade limestone or calcium stone used in poultry feed. It is an important source of calcium for chickens and other poultry birds. It helps support strong bones and proper body development. In layer birds, calcium is especially important for strong eggshell formation. It is used in broiler, layer, chick, and breeder feeds according to the feed formulation. Good-quality poultry stone should be clean, dry, properly processed, and suitable for feed use.",
    "details": [
      "Poultry stone grade usually refers to feed-grade limestone or calcium stone used in poultry feed.",
      "It is an important source of calcium for chickens and other poultry birds.",
      "It helps support strong bones and proper body development.",
      "In layer birds, calcium is especially important for strong eggshell formation.",
      "It is used in broiler, layer, chick, and breeder feeds according to the feed formulation.",
      "Good-quality poultry stone should be clean, dry, properly processed, and suitable for feed use."
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Stone",
      "Grade"
    ]
  },
  {
    "id": 81,
    "itemNumber": 81,
    "name": "Poultry Country Birds",
    "slug": "poultry-country-birds",
    "category": "Live Birds",
    "categorySlug": "live-birds",
    "shortDescription": "Country birds (Desi birds) are traditional backyard poultry birds, popular for their hardiness and natural growth.",
    "description": "Country birds (Desi birds) are traditional backyard poultry birds, popular for their hardiness and natural growth. They are well suited for small farms, backyard rearing, and free-range farming. Country birds are mainly raised for meat and eggs, depending on the breed and farming system. They generally have good adaptability to local weather and farming conditions. Desi meat and eggs are commonly preferred for their traditional taste and local market demand. They are a suitable option for farmers looking for low-scale poultry farming and additional income.",
    "details": [
      "Country birds (Desi birds) are traditional backyard poultry birds, popular for their hardiness and natural growth.",
      "They are well suited for small farms, backyard rearing, and free-range farming.",
      "Country birds are mainly raised for meat and eggs, depending on the breed and farming system.",
      "They generally have good adaptability to local weather and farming conditions.",
      "Desi meat and eggs are commonly preferred for their traditional taste and local market demand.",
      "They are a suitable option for farmers looking for low-scale poultry farming and additional income."
    ],
    "image": "/assets/products/chicks/sonali-chicks.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Live Birds",
      "Poultry",
      "Country",
      "Birds"
    ]
  },
  {
    "id": 82,
    "itemNumber": 82,
    "name": "Poultry Frozen Meat",
    "slug": "poultry-frozen-meat",
    "category": "Poultry Meat",
    "categorySlug": "poultry-meat",
    "shortDescription": "Frozen poultry meat is cleaned and processed chicken meat stored at low temperatures to maintain freshness.",
    "description": "Frozen poultry meat is cleaned and processed chicken meat stored at low temperatures to maintain freshness. It is available in different cuts such as whole chicken, breast, leg, wings, and curry cuts. Proper freezing helps extend shelf life and maintain meat quality. Frozen chicken is convenient for restaurants, hotels, caterers, shops, and households. It should be properly packed, stored continuously in frozen conditions, and handled hygienically. It is a convenient option for businesses that need a regular supply of poultry meat.",
    "details": [
      "Frozen poultry meat is cleaned and processed chicken meat stored at low temperatures to maintain freshness.",
      "It is available in different cuts such as whole chicken, breast, leg, wings, and curry cuts.",
      "Proper freezing helps extend shelf life and maintain meat quality.",
      "Frozen chicken is convenient for restaurants, hotels, caterers, shops, and households.",
      "It should be properly packed, stored continuously in frozen conditions, and handled hygienically.",
      "It is a convenient option for businesses that need a regular supply of poultry meat."
    ],
    "image": "/assets/products/meat/frozen-meat.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Poultry Meat",
      "Poultry",
      "Frozen",
      "Meat"
    ]
  },
  {
    "id": 83,
    "itemNumber": 83,
    "name": "White Peking Duck Meat",
    "slug": "white-peking-duck-meat",
    "category": "Poultry Meat",
    "categorySlug": "poultry-meat",
    "shortDescription": "White Peking Duck is a popular meat duck breed known for its good body size and fast growth.",
    "description": "White Peking Duck is a popular meat duck breed known for its good body size and fast growth. It produces tender, flavourful meat and is widely raised for meat production. Ducks have good feed conversion and can reach market size in a relatively short period with proper care. Suitable for farmers, meat suppliers, restaurants, hotels, and local markets. Proper feeding, clean water, housing, and good farm management help achieve better growth and meat quality.",
    "details": [
      "White Peking Duck is a popular meat duck breed known for its good body size and fast growth.",
      "It produces tender, flavourful meat and is widely raised for meat production.",
      "Ducks have good feed conversion and can reach market size in a relatively short period with proper care.",
      "Suitable for farmers, meat suppliers, restaurants, hotels, and local markets.",
      "Proper feeding, clean water, housing, and good farm management help achieve better growth and meat quality."
    ],
    "image": "/assets/products/meat/frozen-meat.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Meat",
      "White",
      "Peking",
      "Duck",
      "Meat"
    ]
  },
  {
    "id": 84,
    "itemNumber": 84,
    "name": "Indian Runner Duck Meat",
    "slug": "indian-runner-duck-meat",
    "category": "Poultry Meat",
    "categorySlug": "poultry-meat",
    "shortDescription": "Indian Runner ducks are active, hardy ducks mainly known for their excellent egg production.",
    "description": "Indian Runner ducks are active, hardy ducks mainly known for their excellent egg production. They can also be raised for meat, especially in backyard and small-scale farming. Their meat is flavourful and can be sold in local markets. They are suitable for farmers who want a duck breed that can provide both eggs and meat. Proper feeding, clean water, and good management help achieve healthy growth and better meat quality.",
    "details": [
      "Indian Runner ducks are active, hardy ducks mainly known for their excellent egg production.",
      "They can also be raised for meat, especially in backyard and small-scale farming.",
      "Their meat is flavourful and can be sold in local markets.",
      "They are suitable for farmers who want a duck breed that can provide both eggs and meat.",
      "Proper feeding, clean water, and good management help achieve healthy growth and better meat quality."
    ],
    "image": "/assets/products/meat/frozen-meat.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Meat",
      "Indian",
      "Runner",
      "Duck",
      "Meat"
    ]
  },
  {
    "id": 85,
    "itemNumber": 85,
    "name": "Quail Birds Meat",
    "slug": "quail-birds-meat",
    "category": "Poultry Meat",
    "categorySlug": "poultry-meat",
    "shortDescription": "Quail birds are small birds that are widely raised for meat production.",
    "description": "Quail birds are small birds that are widely raised for meat production. They have fast growth and can reach market size in a short period with proper care. Quail meat is tender, flavourful, and popular in local markets and restaurants. They require less space and feed compared with larger poultry birds. Suitable for small farms, backyard farming, restaurants, and meat suppliers. Good housing, clean water, balanced feed, and proper management help achieve healthy birds and better meat quality.",
    "details": [
      "Quail birds are small birds that are widely raised for meat production.",
      "They have fast growth and can reach market size in a short period with proper care.",
      "Quail meat is tender, flavourful, and popular in local markets and restaurants.",
      "They require less space and feed compared with larger poultry birds.",
      "Suitable for small farms, backyard farming, restaurants, and meat suppliers.",
      "Good housing, clean water, balanced feed, and proper management help achieve healthy birds and better meat quality."
    ],
    "image": "/assets/products/meat/frozen-meat.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Poultry Meat",
      "Quail",
      "Birds",
      "Meat"
    ]
  },
  {
    "id": 86,
    "itemNumber": 86,
    "name": "Electric Brooding System",
    "slug": "electric-brooding-system",
    "category": "Brooding Systems",
    "categorySlug": "brooding-systems",
    "shortDescription": "Provides safe and consistent heat for young chicks during the brooding period.",
    "description": "Provides safe and consistent heat for young chicks during the brooding period. Helps maintain the required temperature for healthy chick growth. Easy to operate and suitable for small and large poultry farms. Can be used with temperature controllers and thermostats for better heat management. Supports better chick comfort, feed intake, and early growth. Electric Brooder System Gas Brooder System Infrared Brooder System Charcoal Brooder System",
    "details": [
      "Provides safe and consistent heat for young chicks during the brooding period.",
      "Helps maintain the required temperature for healthy chick growth.",
      "Easy to operate and suitable for small and large poultry farms.",
      "Can be used with temperature controllers and thermostats for better heat management.",
      "Supports better chick comfort, feed intake, and early growth.",
      "Electric Brooder System",
      "Gas Brooder System",
      "Infrared Brooder System",
      "Charcoal Brooder System"
    ],
    "image": "/assets/products/equipment/feeder.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": true,
    "featured": true,
    "tags": [
      "Brooding Systems",
      "Electric",
      "Brooding",
      "System"
    ]
  },
  {
    "id": 87,
    "itemNumber": 87,
    "name": "Poultry Digestive Support Medicines",
    "slug": "poultry-digestive-support-medicines",
    "category": "Medicines & Vaccines",
    "categorySlug": "medicines-vaccines",
    "shortDescription": "Poultry Digestive Support Medicines",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Probiotics",
        "description": "Support healthy gut bacteria and improve digestion."
      },
      {
        "title": "Prebiotics",
        "description": "Help beneficial bacteria grow in the intestine."
      },
      {
        "title": "Digestive enzymes",
        "description": "Help birds digest protein, carbohydrates, and fats."
      },
      {
        "title": "Acidifiers",
        "description": "Help maintain a healthy digestive environment and support feed digestion."
      },
      {
        "title": "Electrolytes",
        "description": "Help maintain hydration and support birds during stress."
      },
      {
        "title": "Liver tonics",
        "description": "Support liver function and normal metabolism."
      },
      {
        "title": "Vitamin supplements",
        "description": "Help maintain appetite, digestion, growth, and overall health."
      },
      {
        "title": "Gut health supplements",
        "description": "Used to support normal intestinal function and feed utilization."
      }
    ],
    "image": "/assets/products/medicines/vaccines.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Medicines & Vaccines",
      "Poultry",
      "Digestive",
      "Support",
      "Medicines"
    ]
  },
  {
    "id": 88,
    "itemNumber": 88,
    "name": "Poultry Respiratory Support Medicines",
    "slug": "poultry-respiratory-support-medicines",
    "category": "Medicines & Vaccines",
    "categorySlug": "medicines-vaccines",
    "shortDescription": "Poultry Respiratory Support Medicines",
    "description": "",
    "details": [],
    "subTypes": [
      {
        "title": "Respiratory",
        "description": "support supplements – Help support normal breathing and respiratory health."
      },
      {
        "title": "Electrolytes",
        "description": "Help maintain hydration during heat or disease–related stress."
      },
      {
        "title": "Vitamin C &amp; E supplements",
        "description": "Support birds during environmental and other stress."
      },
      {
        "title": "Herbal respiratory supplements",
        "description": "May help support normal respiratory function."
      },
      {
        "title": "Essential",
        "description": "oil–based products – Some poultry products are used to support clear airways and breathing."
      },
      {
        "title": "Mucolytic/expectorant products",
        "description": "Certain veterinary formulations help loosen respiratory mucus."
      },
      {
        "title": "Immune",
        "description": "support supplements – Help maintain normal immune function."
      }
    ],
    "image": "/assets/products/medicines/vaccines.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": false,
    "tags": [
      "Medicines & Vaccines",
      "Poultry",
      "Respiratory",
      "Support",
      "Medicines"
    ]
  },
  {
    "id": 89,
    "itemNumber": 89,
    "name": "Poultry Mineral Mixture",
    "slug": "poultry-mineral-mixture",
    "category": "Poultry Feed & Ingredients",
    "categorySlug": "poultry-feed-ingredients",
    "shortDescription": "Supports strong bones and healthy growth in chicks and growing birds.",
    "description": "Supports strong bones and healthy growth in chicks and growing birds. Provides important minerals such as calcium, phosphorus, zinc, iron, manganese, and selenium. Helps maintain good eggshell quality and egg production in layer birds. Supports muscle development, metabolism, and normal body functions. Helps prevent problems caused by mineral deficiencies when included as part of a balanced diet. Can be used for broilers, layers, breeders, and backyard poultry, depending on the product formulation.",
    "details": [
      "Supports strong bones and healthy growth in chicks and growing birds.",
      "Provides important minerals such as calcium, phosphorus, zinc, iron, manganese, and selenium.",
      "Helps maintain good eggshell quality and egg production in layer birds.",
      "Supports muscle development, metabolism, and normal body functions.",
      "Helps prevent problems caused by mineral deficiencies when included as part of a balanced diet.",
      "Can be used for broilers, layers, breeders, and backyard poultry, depending on the product formulation."
    ],
    "image": "/assets/products/feeds/feed-bag.jpg",
    "price": null,
    "priceDisplay": "Price on Request",
    "available": true,
    "isPopular": false,
    "featured": true,
    "tags": [
      "Poultry Feed & Ingredients",
      "Poultry",
      "Mineral",
      "Mixture"
    ]
  }
];
