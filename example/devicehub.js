/**
 * Created by Mihai on 7/23/2015.
 */
/*
/////////////////////////////////////////////////////
START CONFIGURATION SECTION
VERY IMPORTANT! SET YOUT API KEY AND PROJECT ID HERE!
/////////////////////////////////////////////////////
 */
var PROJECT_ID=4655;
var API_KEY="249cc882-ba23-4ad7-993f-26258e36203f";
var DEVICE_UUID="f5d1e3ab-210b-4e53-99d4-ee75cc843f4d";
/*
/////////////////////////////////////////////////////////
END CONFIGURATION SECTION
/////////////////////////////////////////////////////////
 */
/////NO EDIT ZONE //////
function Sensor (sensor_name) {
    this.sensor_name = sensor_name;
    this.meta={};
    var server_response=[];
    this.sendData = function(value,timestamp,include_meta) {
        timestamp=timestamp || 0;
        include_meta=include_meta||false;
       var data={};
       data['value']=value;
        if(timestamp!=0)  data['timestamp']=timestamp;
        if(include_meta) data['meta']=this.meta;
        var xmlhttp = new XMLHttpRequest();
        var url = "https://api.devicehub.net/v2/project/"+PROJECT_ID+"/device/"+DEVICE_UUID+"/sensor/"+this.sensor_name+"/data";
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('X-ApiKey', API_KEY);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(data));
    };
   this.getData = function(limit,from,to) {
       limit=limit || 1;
       from=from || 0;
       to=to || 0;
       var result=[]
       var url = "https://api.devicehub.net/v2/project/"+PROJECT_ID+"/device/"+DEVICE_UUID+"/sensor/"+this.sensor_name+"/data?limit="+limit;
       if(from!=0 && to!=0) url+="&from="+from+"&to="+$to;
       var xmlhttp = new XMLHttpRequest();
       xmlhttp.open("GET", url, false);
       xmlhttp.setRequestHeader('X-ApiKey', API_KEY);
       xmlhttp.setRequestHeader('Content-Type', 'application/json');
       xmlhttp.send();
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           var data=new Object;
           data=JSON.parse(xmlhttp.responseText);
           //for(var i in data) result.push([i, data [i]]);
           return data[0];
       };
    };
    this.addMeta = function(meta_name,meta_value)
    {
        this.meta[meta_name]=meta_value;
    }
    this.setMetaProtocol=function (protocol)
    {
        this.meta['protocol']=protocol;
    }
}
function Actuator (actuator_name) {
    this.actuator_name = actuator_name;
    this.meta={};
    var server_response=[];
    this.sendState = function(value) {

       var data={};
       data['state']=value;
        var xmlhttp = new XMLHttpRequest();
        var url = "https://api.devicehub.net/v2/project/"+PROJECT_ID+"/device/"+DEVICE_UUID+"/actuator/"+this.actuator_name+"/state";
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('X-ApiKey', API_KEY);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(data));
    };
   this.getState = function(limit) {
       limit=limit || 1;
        var result=[]
       var url = "https://api.devicehub.net/v2/project/"+PROJECT_ID+"/device/"+DEVICE_UUID+"/actuator/"+this.actuator_name+"/state";
       if(limit>1) url+="/history?limit="+limit;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader('X-ApiKey', API_KEY);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send();
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           var data=new Object;
           data=JSON.parse(xmlhttp.responseText);
           return data[0];
       };
    };
    this.addMeta = function(meta_name,meta_value)
    {
        this.meta[meta_name]=meta_value;
    }
    this.setMetaProtocol=function (protocol)
    {
        this.meta['protocol']=protocol;
    }
}
