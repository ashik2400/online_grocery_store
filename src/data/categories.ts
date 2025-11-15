import fruitsImg from '..//assets/fruits.jpg';
import vegetablesImg from '../assets/vegetables.jpg';
import dairyImg from '../assets/dairy.jpg';

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    image: fruitsImg,
    description: 'Fresh, organic fruits delivered daily',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: vegetablesImg,
    description: 'Farm-fresh vegetables and greens',
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    image: dairyImg,
    description: 'Quality dairy products from trusted farms',
  },
];
