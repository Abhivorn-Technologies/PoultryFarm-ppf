export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  purchasedProduct: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Rameshwar Patel",
    role: "Commercial Poultry Farmer",
    location: "Indore, Madhya Pradesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "2 weeks ago",
    title: "Exceptional chick vitality with zero brooding mortality",
    comment: "Ordered Broiler Chicks along with Poultry Chick Drinkers and Feeders. The packaging with ventilation during transit was top-notch. All chicks arrived active, chirping, and healthy.",
    verifiedBuyer: true,
    purchasedProduct: "Broiler Chicks",
  },
  {
    id: "rev-2",
    author: "Dr. Ananya Sundaram",
    role: "Veterinary Hatchery Consultant",
    location: "Coimbatore, Tamil Nadu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    date: "1 month ago",
    title: "High hatchability on Big Size Egg Incubators",
    comment: "We tested the Big Size Egg Incubators with Desi Hatching Eggs and Sonali Hatching Eggs. The temperature stability and automatic turning delivered outstanding healthy hatch rates.",
    verifiedBuyer: true,
    purchasedProduct: "Big Size Egg Incubators",
  },
  {
    id: "rev-3",
    author: "Vikramjit Singh",
    role: "Heritage Breeder",
    location: "Ludhiana, Punjab",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "3 weeks ago",
    title: "Authentic Asil Pure Chicks with strong vigor",
    comment: "The Asil Pure Chicks and Asil Fighter Chicks arrived in pristine health. The birds have a tall, upright posture and active vitality. Very satisfied with the breeder quality.",
    verifiedBuyer: true,
    purchasedProduct: "Asil Pure Chicks",
  },
  {
    id: "rev-4",
    author: "Sowmya Reddy",
    role: "Integrated Farm Owner",
    location: "Hyderabad, Telangana",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    date: "Just recently",
    title: "Khaki Campbell Duck Chicks and Floating Fish Feed",
    comment: "Our integrated farm pond setup has flourished with Khaki Campbell Duck Chicks and high-quality Fish Feed pellets. Prompt logistics and excellent customer service.",
    verifiedBuyer: true,
    purchasedProduct: "Khaki Campbell Duck Chicks",
  },
];
