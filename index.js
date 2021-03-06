
// 1 - OBJETO HOTEL

//let testparams = "Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)";
//let testparams = "Regular: 20Mar2020(fri), 21Mar2020(sat), 22Mar2020(sun)";
let testparams = "Fidelidade: 25Mar2020(wed), 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)";

// 2 - DEFININDO A FUNÇÃO 

let  hotelMaisBarato = (params) => {
  
    let hoteis = [{
        name: "Parque das flores",
        classificacao: 3,
        valorRegular: {semana: 110, fimDeSemana: 90},
        valorFidelidade: {semana: 80, fimDeSemana: 80}
    },{
        name: "Jardim Botânico",
        classificacao: 4,
        valorRegular: {semana: 160, fimDeSemana: 60},
        valorFidelidade: {semana: 110, fimDeSemana: 50}
        },{
        name: "Mar Atlântico",
        classificacao: 5,
        valorRegular: {semana: 220, fimDeSemana: 150},
        valorFidelidade: {semana: 100, fimDeSemana: 40}
        }];
        
       // console.log("-------------------------------------------------------------------------------------");
       // console.log("HOTEIS NO INICIO: "+ hoteis);
    
// 3- FUNÇÕES AUXILIARES DE VALIDAÇÃO

    // VERIFICA SE É FIM DE SEMANA
    const isFimDeSemana = (date) => {
        d = new Date(date)
      //  console.log("DATA : " + d);
        return d.getDay() === 6 || d.getDay() === 0;
   
    }
    // VERIFICA SE É CLIENTE FIDELIDADE
    const isFidelidade = (cliente) => {
        return cliente == "Fidelidade";
    }

// 4 - QUEBRA DA STRING RECEBIDA EM VARIAVEIS DIFERENTES - ATIBUI TIPO DE CLIENTE E TIPOCLIENTE E DATAS A DATASARRAY

    let tipoCliente = params.split(":", 1);    
   // console.log("-------------------------------------------------------------------------------------");
  //  console.log(" ");
 //   console.log("TIPOCLIENTE: "+ tipoCliente);
    
    let datesArray = params.split(":").join(", ").split(", ");
    datesArray.shift();
  //  console.log(" ");
  //  console.log("ARRAY DE DATAS: "+ datesArray);
  //  console.log(" ");
    
    
    
// 5 - FAZ UM LOOP EM CADA DATA DIARIA, COLOCANDO TUDO EM UM ARRAY DE DIARIAS COM OBJETOS DE DIARIA, CONTENTO O NOME E VALOR DA DIARIA NA DATA DESEJADA   
    const diariasArray = datesArray.map((date)=> {
        return hoteis.map((hotel) => {
            
            let diaria = {
                name: hotel.name,
                valorDiaria: hotel.valorFidelidade.fimDeSemana,
                dataDiaria: date,
                classificacao: hotel.classificacao
            }

            return diaria;

        })
        
    }).flat();
    
    // DELETE
   // console.log("-------------------------------------------------------------------------------------");
  //  console.log(" ");
  //  console.log("ARRAY DE DIARIAS"+ diariasArray)
 
    
// 6 - PASSA PELO ARRAY DE DIARIAS GERANDO 3 NOVOS ARRAYS COM AS SOMAS DOS VALORES DE CADA HOTEL
    
    const parqueSum = diariasArray.filter((diaria) => {return diaria.name == "Parque das flores"}).reduce((total, n)=>{return total += n.valorDiaria;},0);
    const jardimSum = diariasArray.filter((diaria) => {return diaria.name == "Jardim Botânico"}).reduce((total, n)=>{return total += n.valorDiaria;},0);
    const marSum = diariasArray.filter((diaria) => {return diaria.name == "Mar Atlântico"}).reduce((total, n)=>{return total += n.valorDiaria;},0);  
    
    
 //   console.log("-------------------------------------------------------------------------------------");
    hoteis.forEach((hotel)=>{
        if (hotel.name == "Parque das flores"){
            hotel.totalDiarias = parqueSum;
        } 
        if (hotel.name == "Jardim Botânico" )  {
            hotel.totalDiarias = jardimSum;  
        }  
        if (hotel.name == "Mar Atlântico" )  {
            hotel.totalDiarias = marSum;      
        }  
    });

// 7  ADICIONA O VALOR TOTAL DAS DIARAIS 
   
// DELETE
 

    const HotelMaisBarato = hoteis.reduce((min, item, index, array) => 
    {
        if(item.totalDiarias < min.totalDiarias){
            return {totalDiarias: item.totalDiarias, name: item.name, classificacao: item.classificacao};
        }else if(item.totalDiarias == min.totalDiarias && item.classificacao >= min.classificacao){
            return {totalDiarias: item.totalDiarias, name: item.name, classificacao: item.classificacao}
        } else {
            return min;
        }
    }, hoteis[0]);

    //console.log("NOME DO HOTEL MAIS BARATO: "+nomeHotelMaisBarato.name);
    console.log(" ");
    console.log("NOME FINAL : "+HotelMaisBarato.name);
    console.log("TOTAL FINAL : "+HotelMaisBarato.totalDiarias);
    console.log("CLASSIFICACAO FINAL : "+HotelMaisBarato.classificacao);
    console.log(" ");

   return HotelMaisBarato.name;


}


hotelMaisBarato(testparams);

module.exports = hotelMaisBarato;