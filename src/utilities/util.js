import {PYTHON_API_ROOT, CONTEXT, STATICMRM} from "../config";
import axios from "axios";

class util{
    /**get user info */
    getLoggedData(){
        let lsResp=window.sessionStorage["resp"];
        if(lsResp){
            lsResp=JSON.parse(lsResp);
        }else{
            lsResp={};
        }
        return lsResp || {};
    }

     /** get mail */
     getEmailID(){
        let lsResp=this.getLoggedData();
        return lsResp.response.mail || '';
    }

    mrmUsersEmail(){
        let bankWithUser = [
            /* {
              bank: 'Banco Popular Dominicano',
              email: 'amit.maan@incedoinc.com'
            }, */
            {
              bank: 'Banco Popular Dominicano',
              email: 'gtaveras@bpd.com.do>'
            
            },
            {
              bank: 'Popular Bank',
              email: 'Bramirez@POPULARBANK.COM.PA'
            },
            {
              bank: 'Popular Bank',
              email: 'flopez@popularbank.com.pa'
            }
          ]
        return bankWithUser
    }

    /** get token */
    getToken(){
        let lsResp=this.getLoggedData();
        return lsResp.token || '';
    }

      /** */
      showLoader=()=>{
        var el='<div class="bodycover"></div><div class="loader"><i class="fa fa-spin fa-circle-notch"></i></div>';
        window.$(".bodycover,.loader").remove();
        window.$("body").prepend(el);
    }

    hideLoader=()=>{
        window.$(".bodycover,.loader").remove();
    }

    /**convert camel string into normal */
    camel2Normal(str){
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1").trim();
    }

    copyObj(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    /** expand element as per given id */
    expandElement(id){
        let ob=window.$("#"+id);
        //ob.css({height:(window.$(window).height-50)+'px'})
        if(ob.hasClass("expand-element")){
            window.$("body").append(`<div class="expand-element-cover"></div>`)
            window.$(".expand-element-cover").remove();
            ob.removeClass('expand-element');
        }
        else{
            window.$("body").append(`<div class="expand-element-cover"></div>`)
            ob.addClass('expand-element');
        }
        
    }

    /**return current dateTime */
    currentDateTime(){
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + " "
                + currentdate.toLocaleString('default', { month: 'short' }) + " "//getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        return datetime;
    }

    sleep(ms){
        return new Promise(resolve=>setTimeout(resolve, ms));
    }

    downloadPDFFromBase64(base64, filename){
        const linkSource=`data:application/pdf;base64,${base64}`;
        const downloadLink=document.createElement("a");
        const fileName=(filename || 'download')+".pdf";
        downloadLink.href=linkSource;
        downloadLink.download=fileName;
        downloadLink.click();
    }

    /** */
    convertToCSVBlob=(objArray, header)=>{
        var array=typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str='', line='', index;
        for(index in header){
            if (line !== '') line += ',';
            line += header[index];
        }
        str+=line + '\r\n';

        for (var i=0; i < array.length; i++){
            line='';
            for(index in header){
                if (line !== '') line += ',';
                line += (array[i][index]===''?' ':array[i][index]);
            }
            str+= line + '\r\n';
        }

        return new Blob([str], {type: "text/csv;charset=utf-8"});
    }
    numberFormatSeparator(numb) {
        var internationalNumberFormat = new Intl.NumberFormat('en-US')
        return internationalNumberFormat.format(numb)
    }
    websocketConnection(websocket){
        if (!websocket || websocket.readyState == WebSocket.CLOSED) {
            return true
        } else {
            return false
        }
    }

    correctJsonFormat=(res)=>{
		for(let i in res){
			try{
				res[i]=JSON.parse(res[i].replace(/'/g, '"'));
			}catch (error){
				console.log('errorJsonFormat', error);
			}
		}

		return res;
	}

    /** */
    getUserAccess=async()=>{
        let url=PYTHON_API_ROOT + `GetAccessMrm/${this.getToken()}`;
        if(STATICMRM){
            url=CONTEXT+'/mrm/useraccess.json';
        }
        let res=[];
        try{
            let resp=await axios({method:"get", url, headers: {"Access-Control-Allow-Origin": "*"}});
            res=resp.data.response;
            res.forEach(v=>{
                v.access=JSON.parse(v.access.replace(/'/g, '"'));
            });
        }catch(err){
            console.log("MRM user permission api ", err);
        }
    
        return this.mrmUsersEmail(res);
    }


    // debounce for delay api hitting
    debounceFunction = (func, delay) => {
      let timer;
      return function() {
        let self = this;
        let args= arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
        func.apply(self, args)
        }, delay)
      }
    }
    // Block invalid character fo number input
    blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

}

export default new util();