
import React, { useEffect } from "react";
import RestaurantDetail from '../../components/RestaurantDetail';
import QuickActionCard from '../../components/QuickActionCard';




export const Restaurantes = () => {
  useEffect(() => {
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
  }, []);
  return (

    <RestaurantDetail />
  );
};

