const restaurants = [
  {
    id: 'saffron-bowl',
    name: 'Saffron Bowl',
    cuisine: 'Indian',
    rating: 4.8,
    deliveryTime: '18-25 min',
    minOrder: 199,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    description: 'North Indian comfort food and flavorful curries.'
  },
  {
    id: 'midnight-pizza',
    name: 'Midnight Pizza',
    cuisine: 'Pizza',
    rating: 4.7,
    deliveryTime: '20-30 min',
    minOrder: 249,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    description: 'Wood-fired pizzas and cheesy classics.'
  },
  {
    id: 'burger-lab',
    name: 'Burger Lab',
    cuisine: 'Burgers',
    rating: 4.6,
    deliveryTime: '15-22 min',
    minOrder: 179,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    description: 'Loaded burgers, fries, and crunchy sides.'
  },
  {
    id: 'oriental-bite',
    name: 'Oriental Bite',
    cuisine: 'Chinese',
    rating: 4.9,
    deliveryTime: '22-30 min',
    minOrder: 229,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
    description: 'Wok dishes and savory Chinese favorites.'
  },
  {
    id: 'tandoor-72',
    name: 'Tandoor 72',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '24-32 min',
    minOrder: 219,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh kebabs and rich tandoori platters.'
  },
  {
    id: 'crave-jar',
    name: 'Crave Jar',
    cuisine: 'Desserts',
    rating: 4.8,
    deliveryTime: '15-20 min',
    minOrder: 149,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    description: 'Artisan desserts and dessert boxes.'
  },
  {
    id: 'green-brew',
    name: 'Green Brew',
    cuisine: 'Beverages',
    rating: 4.5,
    deliveryTime: '10-18 min',
    minOrder: 99,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh juices, shakes, and café favorites.'
  },
  {
    id: 'sushi-sprint',
    name: 'Sushi Sprint',
    cuisine: 'Japanese',
    rating: 4.7,
    deliveryTime: '25-35 min',
    minOrder: 299,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    description: 'Light bowls, rolls, and Japanese bites.'
  }
];

const foodItems = [
  { id: 'margherita-pizza', name: 'Margherita Pizza', restaurantId: 'midnight-pizza', category: 'Pizza', cuisine: 'Italian', price: 299, rating: 4.8, dietary: 'Vegetarian', description: 'Classic cheese, basil, and tomato sauce on a thin crust.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'pepperoni-frenzy', name: 'Pepperoni Frenzy', restaurantId: 'midnight-pizza', category: 'Pizza', cuisine: 'Italian', price: 399, rating: 4.7, dietary: 'Non-Vegetarian', description: 'Spicy pepperoni, mozzarella, and signature herbs.', image: 'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'farmhouse-pizza', name: 'Farmhouse Delight', restaurantId: 'midnight-pizza', category: 'Pizza', cuisine: 'Italian', price: 349, rating: 4.6, dietary: 'Vegetarian', description: 'Bell peppers, onions, olives, and fresh mozzarella.', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80' },
  { id: 'classic-burger', name: 'Classic Smash Burger', restaurantId: 'burger-lab', category: 'Burgers', cuisine: 'American', price: 229, rating: 4.7, dietary: 'Non-Vegetarian', description: 'Double patty, cheese, lettuce, and burger sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'veggie-burger', name: 'Veggie Crunch Burger', restaurantId: 'burger-lab', category: 'Burgers', cuisine: 'American', price: 219, rating: 4.5, dietary: 'Vegetarian', description: 'Crispy veg patty with lettuce, tomato, and aioli.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80' },
  { id: 'loaded-fries', name: 'Loaded Fries', restaurantId: 'burger-lab', category: 'Burgers', cuisine: 'American', price: 149, rating: 4.4, dietary: 'Vegetarian', description: 'Crispy fries topped with cheese and seasoning.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80' },
  { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', restaurantId: 'saffron-bowl', category: 'Indian', cuisine: 'Indian', price: 269, rating: 4.8, dietary: 'Vegetarian', description: 'Soft paneer cubes in buttery tomato gravy.', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'butter-chicken', name: 'Butter Chicken', restaurantId: 'saffron-bowl', category: 'Indian', cuisine: 'Indian', price: 319, rating: 4.9, dietary: 'Non-Vegetarian', description: 'Creamy tomato gravy with tender chicken pieces.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'vegan-dal-makhani', name: 'Vegan Dal Makhani', restaurantId: 'saffron-bowl', category: 'Indian', cuisine: 'Indian', price: 249, rating: 4.6, dietary: 'Vegan', description: 'Slow-cooked black lentils with rich spices and coconut cream.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
  { id: 'chilli-garlic-noodles', name: 'Chilli Garlic Noodles', restaurantId: 'oriental-bite', category: 'Chinese', cuisine: 'Chinese', price: 259, rating: 4.8, dietary: 'Vegetarian', description: 'Wok-tossed noodles with vegetables and garlic sauce.', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'dragon-chicken', name: 'Dragon Chicken', restaurantId: 'oriental-bite', category: 'Chinese', cuisine: 'Chinese', price: 329, rating: 4.9, dietary: 'Non-Vegetarian', description: 'Crispy chicken in a bold spicy glaze.', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80' },
  { id: 'veg-spring-rolls', name: 'Veg Spring Rolls', restaurantId: 'oriental-bite', category: 'Chinese', cuisine: 'Chinese', price: 169, rating: 4.5, dietary: 'Vegetarian', description: 'Crisp rolls with vegetables and Asian herbs.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80' },
  { id: 'bbq-tikka-platter', name: 'BBQ Tikka Platter', restaurantId: 'tandoor-72', category: 'Indian', cuisine: 'Indian', price: 419, rating: 4.9, dietary: 'Non-Vegetarian', description: 'Juicy tandoori chicken and grilled vegetables.', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'malai-cookies', name: 'Malai Tikka', restaurantId: 'tandoor-72', category: 'Indian', cuisine: 'Indian', price: 299, rating: 4.7, dietary: 'Non-Vegetarian', description: 'Creamy marinated chicken grilled to perfection.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80' },
  { id: 'tandoori-platter-vegan', name: 'Tandoori Veg Platter', restaurantId: 'tandoor-72', category: 'Indian', cuisine: 'Indian', price: 279, rating: 4.5, dietary: 'Vegan', description: 'Smoky grilled vegetables and spices.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
  { id: 'choco-fudge-cake', name: 'Choco Fudge Cake', restaurantId: 'crave-jar', category: 'Desserts', cuisine: 'Dessert', price: 189, rating: 4.9, dietary: 'Vegetarian', description: 'Rich chocolate cake with velvety fudge glaze.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'lava-cake', name: 'Molten Lava Cake', restaurantId: 'crave-jar', category: 'Desserts', cuisine: 'Dessert', price: 219, rating: 4.8, dietary: 'Vegetarian', description: 'Warm cake with decadent chocolate center.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
  { id: 'berry-bowl', name: 'Berry Cheesecake Bowl', restaurantId: 'crave-jar', category: 'Desserts', cuisine: 'Dessert', price: 199, rating: 4.6, dietary: 'Vegetarian', description: 'Creamy berry delight topped with crunch.', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80' },
  { id: 'mango-smoothie', name: 'Mango Smoothie', restaurantId: 'green-brew', category: 'Beverages', cuisine: 'Beverages', price: 129, rating: 4.7, dietary: 'Vegan', description: 'Fresh mango and almond milk blended smooth.', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'cold-coffee', name: 'Cold Coffee', restaurantId: 'green-brew', category: 'Beverages', cuisine: 'Beverages', price: 149, rating: 4.6, dietary: 'Vegetarian', description: 'Creamy cold brewed coffee with a hint of cocoa.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80' },
  { id: 'citrus-fizz', name: 'Citrus Fizz', restaurantId: 'green-brew', category: 'Beverages', cuisine: 'Beverages', price: 119, rating: 4.5, dietary: 'Vegan', description: 'Refreshing orange and lemon sparkling cooler.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80' },
  { id: 'avocado-roll', name: 'Avocado Crunch Roll', restaurantId: 'sushi-sprint', category: 'Japanese', cuisine: 'Japanese', price: 279, rating: 4.8, dietary: 'Vegan', description: 'Fresh avocado sushi with crunchy greens.', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80', featured: true },
  { id: 'salmon-bowl', name: 'Salmon Power Bowl', restaurantId: 'sushi-sprint', category: 'Japanese', cuisine: 'Japanese', price: 359, rating: 4.9, dietary: 'Non-Vegetarian', description: 'Flame-grilled salmon with bamboo rice and greens.', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80' },
  { id: 'veg-ramen', name: 'Veg Ramen Bowl', restaurantId: 'sushi-sprint', category: 'Japanese', cuisine: 'Japanese', price: 319, rating: 4.7, dietary: 'Vegetarian', description: 'Noodles with seasonal vegetables and umami broth.', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=80' },
  { id: 'vegan-burger', name: 'Plant Burger', restaurantId: 'burger-lab', category: 'Burgers', cuisine: 'American', price: 239, rating: 4.4, dietary: 'Vegan', description: 'Plant-based patty with lettuce, pickles, and vegan sauce.', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80' },
  { id: 'thai-curry-bowl', name: 'Thai Curry Bowl', restaurantId: 'oriental-bite', category: 'Chinese', cuisine: 'Thai', price: 289, rating: 4.6, dietary: 'Vegan', description: 'Coconut curry with vegetables and fragrant rice.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80' }
];

const demoReviews = [
  { name: 'Riya', rating: 5, comment: 'Fresh ingredients and lightning-fast delivery. The butter chicken was amazing!' },
  { name: 'Vikram', rating: 5, comment: 'Best burgers in town. The app is smooth and the order tracking felt premium.' },
  { name: 'Sana', rating: 4, comment: 'Loved the desserts and the packaging quality. Very satisfied with my order.' }
];

const categories = ['All', 'Pizza', 'Burgers', 'Indian', 'Chinese', 'Desserts', 'Beverages', 'Japanese'];

const STORAGE_KEYS = {
  cart: 'freshbite-cart',
  wishlist: 'freshbite-wishlist',
  users: 'freshbite-users',
  currentUser: 'freshbite-current-user',
  reviews: 'freshbite-reviews',
  orders: 'freshbite-orders',
  contactMessages: 'freshbite-contact-messages',
  coupon: 'freshbite-coupon'
};

const couponRules = {
  WELCOME10: { type: 'percent', value: 10 },
  FRESH50: { type: 'fixed', value: 50 }
};
