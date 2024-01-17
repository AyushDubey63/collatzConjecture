import React, { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
} from "recharts";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const CollatzVisualization = () => {
  const [inputValue, setInputValue] = useState(10);
  const [series, setSeries] = useState([]);
  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  });
  const [selectedChartType, setSelectedChartType] = useState("all");
  const [selectedColor, setSelectedColor] = useState("blue");

  // Chart sort options
  const sortOptions = [
    { name: "all", value: "all", current: true },
    { name: "Line Chart", value: "line", current: false },
    { name: "Bar Chart", value: "bar", current: false },
    { name: "Area Chart", value: "area", current: false },
    { name: "Composed Area Bar Line Chart", value: "composed", current: false },
    { name: "Simple Radial Chart", value: "radial", current: false },
  ];

  // color sort options
  const colorOptions = [
    { name: "blue", value: "blue", current: true },
    { name: "red", value: "red", current: false },
    { name: "pink", value: "pink", current: false },
    { name: "yellow", value: "yellow", current: false },
    { name: "green", value: "green", current: false },
    { name: "purple", value: "purple", current: false },
  ];

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 1 }));
  };

  useEffect(() => {
    generateSeries();
  }, []);
  const generateSeries = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      const seriesArray = [num];
      let currentNum = num;

      while (currentNum !== 1) {
        if (currentNum % 2 === 0) {
          currentNum = currentNum / 2;
        } else {
          currentNum = 3 * currentNum + 1;
        }
        seriesArray.push(currentNum);
      }

      setSeries(seriesArray);
    }
  };

  //function to generate random hex color code
  function generateRandomHexCode() {
    // Generate a random 6-digit hexadecimal number
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);

    // Ensure the generated code always has 6 digits by padding with zeros if needed
    return `#${randomHex.padStart(6, "0")}`;
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // creating new array for data to show in charts
  const data = [];
  for (let i = 0; i < series.length; i++) {
    data.push({
      value: series[i],
    });
  }

  // creating new array for data to show in radial chart
  const newFormattedData = [];
  for (let i = 0; i < series.length; i++) {
    newFormattedData.push({
      value: series[i],
      fill: generateRandomHexCode(),
    });
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateSeries();
  };

  // max variable to show max reach in the chart
  let max = Math.max(...series);

  //Custom label for chart
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`value: ${value}`}</text>
    );
  };

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  return (
    <div className="gap-20  flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="gap-4 flex justify-center">
          <input
            type="text"
            className="w-2/12 h-1/12 outline-none border-1 p-2 text-white bg-gray-500 rounded-xl"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter a number to try collatz"
          />
          <button
            type="submit"
            className="w-32 outline-none border-1 p-2 text-white bg-gray-500 rounded-xl transition duration-150 ease-in-out hover:scale-110"
          >
            Generate Series
          </button>
        </div>
      </form>
      {series.length > 0 && (
        <div className="flex flex-col md:flex-row max-w-screen justify-center gap-1 items-center">
          <span className="text-6xl  font-bold text-red-500">
            Generated Series:
          </span>
          <ul className="flex flex-wrap gap-5">
            {series.map((number, index) => (
              <li className="text-5xl text-purple-500" key={index}>
                {number}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center  gap-10">
        <div className="">
          <div>
            <Menu
              as="div"
              className="z-10  backdrop-blur-md relative inline-block text-left"
            >
              <div>
                <Menu.Button className="group inline-flex justify-center text-3xl font-medium text-gray-500 hover:text-white">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-5 z-10 mt-2  w-64 sm:w-52 origin-top-right rounded-md bg-gray-200 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <span
                            value={option.value}
                            onClick={() => {
                              setSelectedChartType(option.value);
                              console.log(option.value);
                            }}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-xl "
                            )}
                          >
                            {option.name}
                          </span>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {series && (
          <div className="">
            <div>
              <Menu
                as="div"
                className="z-10  backdrop-blur-md relative inline-block text-left"
              >
                <div>
                  <Menu.Button className="group inline-flex justify-center text-3xl font-medium text-gray-500 hover:text-white">
                    Color
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-64 sm:w-52 origin-top-right rounded-md bg-gray-200 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {colorOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <span
                              value={option.value}
                              onClick={() => {
                                setSelectedColor(option.value);
                                console.log(option.value);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-xl "
                              )}
                            >
                              {option.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center w-full p-2  gap-3">
        {(selectedChartType === "all" || selectedChartType === "line") && (
          <ResponsiveContainer
            width={"100%"}
            aspect={2}
            className="text-center"
          >
            <LineChart
              width={600}
              height={300}
              activeDot={{ r: 10 }}
              data={data}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke={selectedColor}
                strokeWidth={1}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <Tooltip />
              <ReferenceLine
                x={max}
                stroke="brown"
                strokeDasharray="3 3"
                label="Max number reached"
              />
              <YAxis />
              <XAxis dataKey="value" />
            </LineChart>
            <span className="text-3xl underline text-gray-500">Line Chart</span>
          </ResponsiveContainer>
        )}

        {(selectedChartType === "all" || selectedChartType === "bar") && (
          <ResponsiveContainer
            width={"100%"}
            aspect={2}
            className="text-center"
          >
            <BarChart width={600} height={300} data={data}>
              <Bar
                dataKey="value"
                stroke={selectedColor}
                strokeWidth={3}
                fill={selectedColor}
                label={renderCustomBarLabel}
              />

              <YAxis />
              <XAxis dataKey="value" />
            </BarChart>
            <span className="text-3xl underline text-gray-500">Bar Chart</span>
          </ResponsiveContainer>
        )}

        {(selectedChartType === "all" || selectedChartType === "area") && (
          <ResponsiveContainer
            width={"100%"}
            aspect={2}
            className="text-center"
          >
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill={selectedColor}
              />
            </AreaChart>
            <span className="text-3xl underline text-gray-500">Area Chart</span>
          </ResponsiveContainer>
        )}

        {(selectedChartType === "all" || selectedChartType === "composed") && (
          <ResponsiveContainer
            width={"100%"}
            aspect={2}
            className="text-center"
          >
            <ComposedChart width={500} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={generateRandomHexCode()}
                strokeWidth={3}
              />

              <Bar
                dataKey="value"
                fill={selectedColor}
                label={renderCustomBarLabel}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </ComposedChart>
            <span className="text-3xl underline text-gray-500">
              Composed Line Area Bar Chart
            </span>
          </ResponsiveContainer>
        )}

        {(selectedChartType === "all" || selectedChartType === "radial") && (
          <ResponsiveContainer
            width={"100%"}
            aspect={2}
            className="text-center"
          >
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={20}
              data={newFormattedData}
            >
              <RadialBar
                minAngle={100}
                label={{ position: "insideStart", fill: "black" }}
                background
                clockWise
                dataKey="value"
              />
            </RadialBarChart>
            <span className="text-3xl underline text-gray-500">
              Simple Radial Chart
            </span>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CollatzVisualization;
