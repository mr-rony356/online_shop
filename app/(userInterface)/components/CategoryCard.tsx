import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  image: string;
}

const CategoryCard = ({
  name,
  image,
  className,
  ...props
}: CategoryCardProps) => {
  return (
    <Card
      className={cn(
        "transform transition-transform hover:scale-105 cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="!space-y-4 py-8 flex flex-col items-center gap-0">
        <div className="rounded-full bg-gray-200 p-2">
            <Image  src={image} alt={name} width={30} height={30} />
        </div>
        <p>{name}</p>
      </div>
    </Card>
  );
};

export default CategoryCard;
