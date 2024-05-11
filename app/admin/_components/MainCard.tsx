import Image from "next/image";

interface MainCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

const MainCard: React.FC<MainCardProps> = ({
  icon,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="shadow-lg rounded-md bg-white p-8 ">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex items-center gap-6">
        <div className="mr-4">
          <Image src={icon} alt="card icon" className="w-12 h-12" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{subtitle}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
