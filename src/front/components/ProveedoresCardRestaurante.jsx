import React from 'react';

const ProveedoresCardRestaurante = ({ restaurante, onViewAll }) => {
    const { id, name, city, zone, percentage, status } = restaurante;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{name}</h2>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{zone}</span>
            </div>
            <div className="mb-4">
                <p className="text-gray-700">Ciudad: {city}</p>
                <p className="text-gray-700">Porcentaje: {percentage}%</p>
            </div>
            <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${status === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                    {status}
                </span>
                <button
                    onClick={() => onViewAll(id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition"
                >
                    Ver todo
                </button>
            </div>
        </div>
    );
};

export default ProveedoresCardRestaurante;
