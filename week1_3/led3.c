#include <stdio.h>
#include <wiringPi.h>

#define LED01 4
#define LED33 29

void main(){
	wiringPiSetup();
	pinMode(LED01, OUTPUT);
	pinMode(LED33, OUTPUT);

	printf("LED3 will be blink\n^C to Stop\n");

	while(1){
		digitalWrite(LED01, 0);
		digitalWrite(LED33, 1);
		delay(1000);
		digitalWrite(LED01, 1);
		digitalWrite(LED33, 0);
		delay(1000);

	}
}
