var url = "http://quandl.com/api/v1/multisets.json?columns=WHO.908_AFG.1,WHO.908_ALB.1,WHO.908_DZA.1,WHO.908_AGO.1,WHO.908_ATG.1,WHO.908_ARG.1,WHO.908_ARM.1,WHO.908_AUS.1,WHO.908_AUT.1,WHO.908_AZE.1,WHO.908_BHR.1,WHO.908_BGD.1,WHO.908_BRB.1,WHO.908_BLR.1,WHO.908_BEL.1,WHO.908_BLZ.1,WHO.908_BEN.1,WHO.908_BTN.1,WHO.908_BOL.1,WHO.908_BIH.1,WHO.908_BWA.1,WHO.908_BRA.1,WHO.908_BRN.1,WHO.908_BGR.1,WHO.908_BFA.1,WHO.908_BDI.1,WHO.908_KHM.1,WHO.908_CMR.1,WHO.908_CAN.1,WHO.908_CPV.1,WHO.908_CAF.1,WHO.908_TCD.1,WHO.908_CHL.1,WHO.908_CHN.1,WHO.908_COL.1,WHO.908_COM.1,WHO.908_COD.1,WHO.908_COG.1,WHO.908_CRI.1,WHO.908_HRV.1,WHO.908_CUB.1,WHO.908_CYP.1,WHO.908_CZE.1,WHO.908_DNK.1,WHO.908_DJI.1,WHO.908_DMA.1,WHO.908_DOM.1,WHO.908_ECU.1,WHO.908_EGY.1,WHO.908_SLV.1,WHO.908_GNQ.1,WHO.908_ERI.1,WHO.908_EST.1,WHO.908_ETH.1,WHO.908_FJI.1,WHO.908_FIN.1,WHO.908_FRA.1,WHO.908_GAB.1,WHO.908_GMB.1,WHO.908_GEO.1,WHO.908_DEU.1,WHO.908_GHA.1,WHO.908_GRC.1,WHO.908_GRD.1,WHO.908_GTM.1,WHO.908_GIN.1,WHO.908_GNB.1,WHO.908_GUY.1,WHO.908_HTI.1,WHO.908_HND.1,WHO.908_HUN.1,WHO.908_ISL.1,WHO.908_IND.1,WHO.908_IDN.1,WHO.908_IRN.1,WHO.908_IRQ.1,WHO.908_IRL.1,WHO.908_ISR.1,WHO.908_ITA.1,WHO.908_CIV.1,WHO.908_JAM.1,WHO.908_JPN.1,WHO.908_JOR.1,WHO.908_KAZ.1,WHO.908_KEN.1,WHO.908_KIR.1,WHO.908_KWT.1,WHO.908_KGZ.1,WHO.908_LAO.1,WHO.908_LVA.1,WHO.908_LBN.1,WHO.908_LSO.1,WHO.908_LBR.1,WHO.908_LBY.1,WHO.908_LTU.1,WHO.908_LUX.1,WHO.908_MKD.1,WHO.908_MDG.1,WHO.908_MWI.1,WHO.908_MYS.1,WHO.908_MDV.1,WHO.908_MLI.1,WHO.908_MLT.1,WHO.908_MRT.1,WHO.908_MUS.1,WHO.908_MEX.1,WHO.908_MDA.1,WHO.908_MNG.1,WHO.908_MNE.1,WHO.908_MAR.1,WHO.908_MOZ.1,WHO.908_MMR.1,WHO.908_NAM.1,WHO.908_NPL.1,WHO.908_NLD.1,WHO.908_NZL.1,WHO.908_NIC.1,WHO.908_NER.1,WHO.908_NGA.1,WHO.908_PRK.1,WHO.908_NOR.1,WHO.908_OMN.1,WHO.908_PAK.1,WHO.908_PAN.1,WHO.908_PNG.1,WHO.908_PRY.1,WHO.908_PER.1,WHO.908_PHL.1,WHO.908_POL.1,WHO.908_PRT.1,WHO.908_QAT.1,WHO.908_ROU.1,WHO.908_RUS.1,WHO.908_RWA.1,WHO.908_KNA.1,WHO.908_LCA.1,WHO.908_VCT.1,WHO.908_WSM.1,WHO.908_STP.1,WHO.908_SAU.1,WHO.908_SEN.1,WHO.908_SRB.1,WHO.908_SYC.1,WHO.908_SLE.1,WHO.908_SGP.1,WHO.908_SVK.1,WHO.908_SVN.1,WHO.908_SLB.1,WHO.908_SOM.1,WHO.908_ZAF.1,WHO.908_KOR.1,WHO.908_ESP.1,WHO.908_LKA.1,WHO.908_SDN.1,WHO.908_SUR.1,WHO.908_SWZ.1,WHO.908_SWE.1,WHO.908_CHE.1,WHO.908_SYR.1,WHO.908_TJK.1,WHO.908_TZA.1,WHO.908_THA.1,WHO.908_BHS.1,WHO.908_TLS.1,WHO.908_TGO.1,WHO.908_TON.1,WHO.908_TTO.1,WHO.908_TUN.1,WHO.908_TUR.1,WHO.908_TKM.1,WHO.908_ARE.1,WHO.908_UGA.1,WHO.908_GBR.1,WHO.908_UKR.1,WHO.908_URY.1,WHO.908_USA.1,WHO.908_UZB.1,WHO.908_VUT.1,WHO.908_VEN.1,WHO.908_VNM.1,WHO.908_YEM.1,WHO.908_ZMB.1,WHO.908_ZWE.1";
var maleData = $.ajax({
  type: "GET",
  dataType: "json",
  url: url,
  success: function(data) { 
    console.log(data);
    var parsedData = parseData(data);
    makeMap(parsedData);
  },
  error: function(err) {
    console.log("json request error", err);
  }
});

function parseData(data) {
  console.log("parseData called");

  var parsedData = {};

  var countries = data.column_names.slice(1).map(function(el, index) {
    return el.slice(8, 11); // returns three letter country codes
  });

  for (var i = 0; i < countries.length; i++) {
    parsedData[countries[i]] = {
      fillKey: (function() {
        return getMapColor(data.data[0][i + 1]);
      })()
    }
  }

  return parsedData;
};

function getMapColor(BMI) {
  if (BMI < 18.5) {
    return 'UNDERWEIGHT';
  } else if (BMI >= 18.5 && BMI < 25) {
    return 'HEALTHY';
  } else if (BMI >= 25 && BMI < 30) {
    return 'OVERWEIGHT';
  } else if (BMI >= 30 && BMI < 35) {
    return 'OBESE';
  } else if (BMI > 35) {
    return 'EXTREMELY_OBESE';
  }
};

function makeMap(data) {
  console.log("make map function called", data);
  
  var map = new Datamap({
    element: document.getElementById('container'),
    fills: {
      defaultFill: 'rgba(23, 48, 210, 0.9)',
      UNDERWEIGHT: 'blue',
      HEALTHY: 'green',
      OVERWEIGHT: 'yellow',
      OBESE: 'orange',
      EXTREMELY_OBESE: 'red',
      UNKNOWN: 'grey',
      NOT_APPLICABLE: 'white'
    },
    data: data
  });
}