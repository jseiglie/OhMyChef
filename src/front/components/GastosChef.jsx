// components/LineChartExample.jsx
import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

// Datos: 30 días con porcentajes aleatorios
const data = Array.from({ length: 30 }, (_, i) => ({
    name: `${i + 1}`,
    porcentaje: Math.floor(Math.random() * 101), // de 0 a 100
}));

const GastosChef = () => {
    return (
        <LineChart
            width={800}
            height={400}
            data={data}
            role="chef"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            {/* muestra los datos que estan en la propiedad name mas arriba */}
            <XAxis dataKey="name" interval={0} /> {/* Muestra un día cada 4 para no saturar */}
            {/* Cada número que aparece en el eje Y se formatea para añadir el símbolo %. Por ejemplo, "50" se muestra como "50%". */}
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line
                type="monotone"
                dataKey="porcentaje"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 3 }}
            />
        </LineChart>
    );
};

export default GastosChef;
