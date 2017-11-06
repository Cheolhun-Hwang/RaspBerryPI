#include <stdio.h>
#include <wiringPi.h>

#define LEDPIN 4

void main(){
	wiringPiSetup();
	pinMode(LEDPIN, OUTPUT);
	printf("LED1 will be blink...\n^C to Stop\n");

	while(1){
		digitalWrite(LEDPIN, 1); //on
		delay(1000);
		digitalWrite(LEDPIN, 0); //off
		delay(1000);
	}
}
