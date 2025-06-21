import React from "react";
import { Spinner } from "react-bootstrap";

const DataLoaderWrapper = ({ loading, data, children, emptyMessage = "No hay datos disponibles." }) => {
    
  if (loading) return <Spinner animation="border" size="sm" />;
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <p className="text-muted">{emptyMessage}</p>;
  }
  return children;
};
export default DataLoaderWrapper;