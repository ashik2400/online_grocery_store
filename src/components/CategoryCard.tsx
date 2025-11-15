import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border bg-card">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-card-foreground mb-2">{category.name}</h3>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </Card>
    </Link>
  );
};
