import React from 'react'; // Don't forget to import React

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DoughnutChart({ data }) { // Capitalize the function name for consistency
    const options = {

    };
    return (
        <div className='w-[250px] h-[250px]'> {/* Fix the class name */}
            <Doughnut
                data={data}
                options={options}
                
            />
        </div>
    );
}

export default DoughnutChart;
