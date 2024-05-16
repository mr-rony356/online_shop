import db from "@/db/db";
import MainCard from "./_components/MainCard";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import PageHeader from "../../components/ui/PageHeader";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}
async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeCount, inactiveCount };
}
export default async function Admin() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 my-6">
        <MainCard
          icon="/sales.png"
          title="Sales"
          subtitle={formatCurrency(salesData.amount)}
          description={`${formatNumber(salesData.numberOfSales)} orders`}
        />
        <MainCard
          icon="/customer.png"
          title="Customers"
          subtitle={formatNumber(userData.userCount)}
          description={`${formatCurrency(
            userData.averageValuePerUser
          )} Average value per user `}
        />
        <MainCard
          icon="/product.png"
          title="Products"
          subtitle={`${formatNumber(productData.activeCount)}`}
          description={` ${formatNumber(productData.inactiveCount)} inactive`}
        />
      </div>
    </>
  );
}
