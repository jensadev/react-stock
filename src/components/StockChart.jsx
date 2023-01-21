import Chart from 'react-apexcharts';
import { useState } from 'react';

// https://youtu.be/u6gSSpfsoOQ?t=28379

export const StockChart = ({ chartData, symbol }) => {
    const { day, week, month, year } = chartData;
    const [timeFrame, setTimeFrame] = useState('24h');

    const changeTimeFrame = () => {
        switch (timeFrame) {
            case '24h':
                return day;
            case '1w':
                return week;
            case '1m':
                return month;
            case '1y':
                return year;
            default:
                return day;
        }
    };

    const options = {
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px',
            },
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300,
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                dateTimeUTC: false,
            },
        },
        tooltip: {
            x: {
                format: 'MMM dd HH:MM',
            },
        },
    };

    let color;
    try {
        const timeFrame = changeTimeFrame();

        // if (timeFrame) {
        //     console.log(timeFrame[timeFrame.length - 1].y, timeFrame[0].y)
        // }

        console.log(timeFrame[timeFrame.length - 1])

        const a = timeFrame[timeFrame.length - 1];
        const b = timeFrame[0];

        console.log({a} , {b})

        color = a.y - b.y > 0 ? '#e53e3e' : '#48bb78';

    } catch (error) {
        console.log(error)
    }

    if (color) {
        options['colors'] = [color];
    }

    const series = [
        {
            name: symbol,
            data: changeTimeFrame(),
        },
    ];



    return (
        <section className="stock-chart">
            <Chart options={options} series={series} type="area" width="100%" />
            <div className='stock-chart__controls'>
                <button className={timeFrame === '24h' ? 'active' : ''} onClick={() => setTimeFrame('24h')}>24h</button>
                <button className={timeFrame === '1w' ? 'active' : ''} onClick={() => setTimeFrame('1w')}>1w</button>
                <button className={timeFrame === '1m' ? 'active' : ''} onClick={() => setTimeFrame('1m')}>1m</button>
                <button className={timeFrame === '1y' ? 'active' : ''} onClick={() => setTimeFrame('1y')}>1y</button>
            </div>
        </section>
    );
};
