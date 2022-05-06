import React, {useState, useEffect, useRef} from 'react';
import * as echarts from 'echarts';
let echartsInstances=[];

export function Chart(props){
    let [uniqId, setUniqId]=useState(Math.floor(Math.random() * 1000) + 1);
    let chartRef=useRef();
    let {
        width,
        height,
        title,
        legend,
        legendData,
        legendPosition,
        legendVerticalDistance,
        series,
        color,
        tooltip,
        xaxis,
        yaxis,
        xAxis,
        yAxis,
        nameGapX,
        nameGapY,
        grid,
        textStyle,
        dataZoom
    }=props;

    let option={
        series,
        grid:grid || {
            left: '5%',
            right: '5%',
            top:'8%',
            bottom: '8%',
            containLabel: true
        }
    };
    if(title){
        option.title=title;
    }
    if(textStyle){
        option.textStyle=textStyle;
    }

    if(legend || legendData){
        if(legend){
            option.legend=legend;
        }else{
            option.legend={
                left: 'center', 
                show:true,
                data:legendData,
                itemWidth:16,
                itemHeight:16,
                icon:'rect', //circle, rect, roundRect, triangle, diamond, pin, arrow, none
                itemGap:20,
            }
            if(legendPosition){
                option.legend[legendPosition]=legendVerticalDistance?legendVerticalDistance:0;
            }else{
                option.legend.top=legendVerticalDistance?legendVerticalDistance:0;
            }
        }
    }else{
        option.legend={show:false};
    }
    if(tooltip){
        option.tooltip=tooltip;
    }
    if(xaxis && yaxis){
        if(typeof xaxis.data === "undefined"){
            option.yAxis={
                type: 'category',
                boundaryGap: yaxis.boundaryGap?true:false,
                data:yaxis.data,
                name:yaxis.title || '',
                nameLocation:'middle',
                nameTextStyle:{color:'#333', fontWeight:'bold', fontFamily:'arial', fontSize:12},
                nameGap:nameGapY || 30,
                
            };
            option.xAxis={
                type:'value',
                name:xaxis.title,
                nameLocation:'middle',
                nameTextStyle:{color:'#333', fontWeight:'bold', fontFamily:'arial', fontSize:12},
                nameGap:nameGapX || 30,
                
            }
        }else{
            option.xAxis={
                type: 'category',
                boundaryGap: series[0]?.type==="bar"?true:false,
                data:xaxis.data,
                name:xaxis.title || '',
                nameLocation:'middle',
                nameTextStyle:{color:'#333', fontWeight:'bold', fontFamily:'arial', fontSize:12},
                nameGap:xaxis.nameGapX || 30,
                axisLabel:{rotate:xaxis.axisLabelRotate || 0}
            };
            option.yAxis={
                type:'value',
                name:yaxis.title,
                nameLocation:'middle',
                nameTextStyle:{color:'#333', fontWeight:'bold', fontFamily:'arial', fontSize:12},
                nameGap:yaxis.nameGapY || 30
            }
        }
    }
    if(xAxis){
        option.xAxis=xAxis;
    }
    if(yAxis){
        option.yAxis=yAxis;
    }
    if(color){
        option.color=color;
    }else{
        option.color=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];
    }
    if(dataZoom){
        option.dataZoom={
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter",
            handleSize: "80%",
            textStyle: {
              fontSize: 8,
            },
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z", //
          }
    }

    useEffect(()=>{
        echartsInstances[uniqId]=echarts.init(chartRef.current);
        echartsInstances[uniqId].setOption(option);

        if(props.onClick){
            echartsInstances[uniqId].off("click");
            echartsInstances[uniqId].on("click", function(event){    
                props.onClick(event);
            });
        }

        window.onresize=null;
        window.onresize=function(){
            for(let ind in echartsInstances){
                echartsInstances[ind].resize();
            }
        }

        return ()=>{
            //echartsInstances=[];
        }

        // eslint-disable-next-line
    }, [props]);

    return(
        <div ref={chartRef} className="m-auto" style={{width:(width || 250+'px'), height:(height || 250+'px')}}>
        </div>
    )
}