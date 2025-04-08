#include "DHT.h"  //importa biblioteca 
#define TIPO_SENSOR DHT11          // define tipo de sensor usado 
const int PINO_SENSOR_DHT11 = A0;  //define o local de saida/entrada do sinal analogico 

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); 
 
void setup() {         //inicia configuração de porta de transmissão serial (bits por segundo) 
  Serial.begin(9600);  //indica que a porta de transmissão serial pode funcionar e indica o seu valor de transferência em bits por segundo 
  sensorDHT.begin();   //indica que o componente pode funcionar 
} 

void loop() {           //inicia definições das ações que ficarão em looping 
  float umidade = sensorDHT.readHumidity();//define variavel que irá receber os valores de umidade do sensor 

  if (isnan(umidade)) {         //inicia processo de validação onde as condições são, se umidade e temperatura não for numero 
    Serial.println("Erro ao ler os dados do sensor");  //emite mensagem de erro para caso a validação seja true 

  } else { 
    //se validação for false, emite os textos a seguir:  
    Serial.print(umidade);
  } 
  delay(1000);  //define intervalo em milesegundos (ms), entre um looping e outro 
} 
