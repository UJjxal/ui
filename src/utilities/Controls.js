import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";

export function If(props){
    const {cond, children} = props; return cond?(<>{children}</>):(<></>);
}

export function RawHTML(props){
    let html=props.html.replace(/\n/g, '<br />');
    return <div dangerouslySetInnerHTML={{ __html: html}}></div>;
}

export function ApexBarChart(props){
    let {title, titlealign, categories, yaxis, stroke, colors, series, height, stacked, showDatalables, showDatalablesOn, dataLabelsFormatter, horizontal, type}=props;

    let PlotOptions={
        bar:{
            horizontal: horizontal || false,
            dataLabels: {
                position: 'top'
            }
        }
    };
    let DataLabels={
        enabled:showDatalables || false
    };
    if(dataLabelsFormatter){
        DataLabels.formatter=dataLabelsFormatter;
    }
    if(showDatalablesOn){
        DataLabels.enabledOnSeries=showDatalablesOn;
    }

    const [data, setData]=useState({
    });

    const init=()=>{
        let defaultColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff"];
        let data={
            options: {
                title:{text:title, align:titlealign || "center"},
                xaxis:{
                    categories: categories
                },
                yaxis:{},
                plotOptions: PlotOptions,
                dataLabels: DataLabels
            },
            series: series,
        };
        if(colors){
            //data.options.fill={colors:colors};
            data.options.colors=colors;
        }else{
            //data.options.fill={colors:defaultColors};
            data.options.colors=defaultColors;

        }
        if(stroke){
            data.options.stroke=stroke;
        }
        if(yaxis){
            data.options.yaxis=yaxis;
        }

        let chart={
            type:type || 'bar',
            toolbar:{
                show: false,
            },
            stacked:stacked || false
        };

        data.options.chart=chart;
        setData(data);
    }
    
    useEffect(()=>{
        init();
        // eslint-disable-next-line
    }, [props.series]);

    return(
        <If cond={data.options && data.series}>
            <Chart
                options={data.options || {}}
                series={data.series || []}
                height={height}
                type={type || 'bar'}
            />
        </If>
    )
}