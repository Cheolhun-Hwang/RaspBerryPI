#include <stdio.h>
#include <wiringPi.h>

#define LED31 27
#define LED32 28
#define LED33 29

void main(){
	wiringPiSetup();
	pinMode(LED31, OUTPUT);
	pinMode(LED32, OUTPUT);
	pinMode(LED33, OUTPUT);

	printf("LED2 will be blink(red, green, blue)\n^C to Stop\n");

	while(1){
		digitalWrite(LED31, 1);
		delay(200);
		digitalWrite(LED31, 0);

		digitalWrite(LED32, 1);
		delay(200);
		digitalWrite(LED32, 0);

		digitalWrite(LED33, 1);
		delay(200);
		digitalWrite(LED33, 0);
	}
}
