import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
