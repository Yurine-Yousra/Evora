import { useState } from "react"
import LineChartDay from "./LineChartDay"
import LineChartMonth from "./LineChartMonth";
import LineChartYear from "./LineChartYear";
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
export default function AdminAnalytics({data}) {
  const [style1,setStyle1] = useState('font-bold text-cyan-900 underline');
  const [style2,setStyle2] = useState('');
  const [style3,setStyle3] = useState('');
  const[day , setDay] = useState(true);
  const[Month , setMonth] = useState(false);
  const[Year , setYear] = useState(false);
  const DAY =()=>{
    setDay(true);
    setMonth(false);
    setYear(false);
    setStyle1('font-bold text-cyan-900 underline');
    setStyle2('');
    setStyle3('');
  }
  const MONTH =()=>{
    setDay(false);
    setMonth(true);
    setYear(false);
    setStyle1('');
    setStyle2('font-bold text-cyan-900 underline');
    setStyle3('');
  }
  const YEAR =()=>{
    setDay(false);
    setMonth(false);
    setYear(true);
    setStyle1('');
    setStyle2('');
    setStyle3('font-bold text-cyan-900 underline');
  }

  //doughnut ;
  const options = {

  };
  const wilayadata = data?.wilayaRecords;
  const topWilayas = wilayadata
    .sort((a, b) => b.events - a.events)  // Sort the array in descending order based on events
    .slice(0, 5);
    const wilayaNames = topWilayas.map(record => record.wilayaName);
    const wilayaEvents = topWilayas.map(record => record.events);
    const doughnutData = {
      labels: wilayaNames,
      datasets: [{
          data: wilayaEvents,
          backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              // Add more colors if needed
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              // Add more colors if needed
          ],
          borderWidth: 1
      }]
  };
  console.log(doughnutData)
  return (
    <div className="lg:max-[1096px]:ps-[208px] min-[1096px]:max-[1195px]:ps-64 min-[1195px]:ps-96 pe-2 text-xl pt-16 pb-16 mb-0">
      <div className="flex items-center justify-between ps-4 pe-4 w-full pb-4">
        <h1 className="text-2xl font-semibold">Events Created :</h1>
        <div>
          <span className="text-lg font-semibold">Per : </span>
        <span className={` w-16 h-8 text-sm cursor-pointer ${style1} `} onClick={()=>DAY()}>DAY </span>
        -
        <span className={` w-16 h-8 text-sm cursor-pointer ${style2} `} onClick={()=>MONTH()}> MONTH </span>
        -
        <span className={` w-16 h-8 text-sm cursor-pointer ${style3} `} onClick={()=>YEAR()}> YEAR</span>
        </div>
      </div>
      <div className="w-full">
      {day && <LineChartDay />}
      {Month && <LineChartMonth />}
      {Year && <LineChartYear />}
      </div>
      <div className="my-8 mx-2rounded-md w-[100%] md:h-[300px]  h-[150px]">
        <p className="my-4 p-4 text-2xl font-semibold ">The best WILAYAS :</p>
      <Doughnut
                className="p-4"
                data={doughnutData}
                options={options}
            />
      </div>
    </div>
  )
}
