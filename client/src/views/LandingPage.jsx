import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../serverUrl";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function LandingPage() {
  const [invoices, setInvoices] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [revenueJan, setRevenueJan] = useState(0);
  const [revenueFeb, setRevenueFeb] = useState(0);
  const [revenueMar, setRevenueMar] = useState(0);
  const [revenueApr, setRevenueApr] = useState(10000);
  const [revenueMay, setRevenueMay] = useState(0);
  const [revenueJun, setRevenueJun] = useState(0);
  const [revenueJul, setRevenueJul] = useState(0);
  const [revenueAug, setRevenueAug] = useState(0);
  const [revenueSep, setRevenueSep] = useState(0);
  const [revenueOct, setRevenueOct] = useState(0);
  const [revenueNov, setRevenueNov] = useState(0);
  const [revenueDec, setRevenueDec] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const january = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=January`
    );

    // let dataJan = january?.data?.map((el) => {
    //   return el.ProductSolds[0]?.totalPrice || 0;
    // });

    let dataJan = 0;
    for (let i = 0; i < january.data.length; i++) {
      for (let j = 0; j < january.data[i].ProductSolds.length; j++) {
        dataJan += january.data[i].ProductSolds[j].totalPrice;
      }
    }

    setRevenueJan(dataJan);

    const february = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=February`
    );

    let dataFeb = 0;
    for (let i = 0; i < february.data.length; i++) {
      for (let j = 0; j < february.data[i].ProductSolds.length; j++) {
        dataFeb += february.data[i].ProductSolds[j].totalPrice;
      }
    }

    setRevenueFeb(dataFeb);

    const march = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=March`
    );

    let dataMar = 0;

    for (let i = 0; i < march.data.length; i++) {
      for (let j = 0; j < march.data[i].ProductSolds.length; j++) {
        dataMar += march.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueMar(dataMar);

    let dataApr = 0;
    const april = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=April`
    );

    for (let i = 0; i < april.data.length; i++) {
      for (let j = 0; j < april.data[i].ProductSolds.length; j++) {
        dataApr += april.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueApr(dataApr);

    let dataMay = 0;
    const may = await axios.get(`${SERVER_URL}/invoices?year=2024&month=May`);

    for (let i = 0; i < may.data.length; i++) {
      for (let j = 0; j < may.data[i].ProductSolds.length; j++) {
        dataMay += may.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueMay(dataMay);

    let dataJun = 0;
    const june = await axios.get(`${SERVER_URL}/invoices?year=2024&month=June`);

    for (let i = 0; i < june.data.length; i++) {
      for (let j = 0; j < june.data[i].ProductSolds.length; j++) {
        dataJun += june.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueJun(dataJun);

    let dataJul = 0;
    const july = await axios.get(`${SERVER_URL}/invoices?year=2024&month=July`);

    for (let i = 0; i < july.data.length; i++) {
      for (let j = 0; j < july.data[i].ProductSolds.length; j++) {
        dataJul += july.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueJul(dataJul);

    let dataAug = 0;
    const august = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=August`
    );

    for (let i = 0; i < august.data.length; i++) {
      for (let j = 0; j < august.data[i].ProductSolds.length; j++) {
        dataAug += august.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueAug(dataAug);

    let dataSep = 0;
    const september = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=September`
    );

    for (let i = 0; i < september.data.length; i++) {
      for (let j = 0; j < september.data[i].ProductSolds.length; j++) {
        dataSep += september.data[i].ProductSolds[j].totalPrice;
      }
    }
    setRevenueSep(dataSep);

    let dataOct = 0;
    const october = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=October`
    );

    for (let i = 0; i < october.data.length; i++) {
      for (let j = 0; j < october.data[i].ProductSolds.length; j++) {
        dataOct += october.data[i].ProductSolds[j].totalPrice;
      }
    }

    setRevenueOct(dataOct);

    let dataNov = 0;
    const november = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=November`
    );

    for (let i = 0; i < november.data.length; i++) {
      for (let j = 0; j < november.data[i].ProductSolds.length; j++) {
        dataNov += november.data[i].ProductSolds[j].totalPrice;
      }
    }

    setRevenueNov(dataNov);

    let dataDec = 0;
    const december = await axios.get(
      `${SERVER_URL}/invoices?year=2024&month=December`
    );

    for (let i = 0; i < december.data.length; i++) {
      for (let j = 0; j < december.data[i].ProductSolds.length; j++) {
        dataDec += december.data[i].ProductSolds[j].totalPrice;
      }
    }

    setRevenueDec(dataDec);

    setInvoices(data);
    console.log(data, " <<< data");
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        // data: [8, 6, 5, 7, 8, 7, 6, 5, 7, 8, 7, 6],
        data: [
          revenueJan,
          revenueFeb,
          revenueMar,
          revenueApr,
          revenueMay,
          revenueJun,
          revenueJul,
          revenueAug,
          revenueSep,
          revenueOct,
          revenueNov,
          revenueDec,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl">Monthly Revenue Graph</h1>
      <div className="w-[500px] h-[500px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
