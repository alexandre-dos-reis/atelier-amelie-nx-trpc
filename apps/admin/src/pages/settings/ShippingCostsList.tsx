export const ShippingCostsList = () => {
  return (
    <div>ShippingCostsList</div>
  )
}

// $shippingCosts = [
//   [0, 3000, 500, 0],
//   [3000, 5000, 500, 250],
//   [5000, 20000, 500, 400],
//   [20000, 30000, 500, 500],
//   [30000, 40000, 500, 600],
//   [40000, 50000, 500, 700],
//   [50000, 60000, 500, 800],
//   [60000, 70000, 500, 900],
//   [70000, 80000, 500, 1000],
//   [80000, 90000, 500, 1100],
//   [90000, 100000, 500, 1200]
// ];

// foreach ($shippingCosts as $c) {
//   $shippingCost = (new ShippingCost)
//       ->setMax($c[1])
//       ->setWeightCost($c[2])
//       ->setInsurance($c[3]);

//   $manager->persist($shippingCost);
