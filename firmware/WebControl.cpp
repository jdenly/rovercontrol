/*
curl https://api.Particle.io/v1/devices/3b001b000447343232363230/setmotors -d access_token=172f237a43e4ed0ee25ddbb1507ebd5061bb19c5 -d params=M3-F-100
Commands are of the format: Motor-Direction-duty
Motor is one of:        M1, M2, M3, M4
Direction is one of:    F, B, S (forward, back, stop) - reverse has no effect on M1 and M2
Duty is percentage 0 to 100 and controls the motor speed.
M1 and M2 do not have PWM so duty is 0 or 1

To read the battery voltage use:
https://api.Particle.io/v1/devices/3b001b000447343232363230/volts?access_token=172f237a43e4ed0ee25ddbb1507ebd5061bb19c5

To read the rangfinder distance in cm use:
https://api.Particle.io/v1/devices/3b001b000447343232363230/distance?access_token=172f237a43e4ed0ee25ddbb1507ebd5061bb19c5



*/

#include "PhoBot.h"
#include "HC_SR04.h"

double volts = 0.0;
double distance = 0.0;
String linear_speed = "40";
String turn_speed = "50";
int linear_delay = 1000;
int turn_delay = 500;
boolean stop_flag = false;

PhoBot p = PhoBot(6.0, 6.0);
HC_SR04 rangefinder = HC_SR04(p.trigPin, p.echoPin);

int stop(String params) {
  stop_flag = true;
}

int commands(String commands) {
  stop_flag = false;
  for (int i = 0; i < strlen(commands); i++) {
    if(!stop_flag) {
      if(commands[i] == 'F') {
        p.control("F-" + linear_speed);
        delay(linear_delay);
      } else if(commands[i] == 'B') {
        p.control("B-" + linear_speed);
        delay(linear_delay);
      } else if(commands[i] == 'L') {
        p.control("L-" + turn_speed);
        delay(turn_delay);
      } else if(commands[i] == 'R') {
        p.control("R-" + turn_speed);
        delay(turn_delay);
      } else if(commands[i] == 'S') {
        p.control("S");
        delay(linear_delay);
      }
      p.control("S");
      delay(100);
    } else {
      break;
    }
  }
  p.control("S");
  delay(100);
  return 0;
}

void setup() {
    Particle.function("stop", stop);
    Particle.function("commands", commands);
    Particle.variable("volts", &volts, DOUBLE);
    Particle.variable("distance", &distance, DOUBLE);
}

void loop() {
    volts = p.batteryVolts();
    distance = rangefinder.getDistanceCM();
    delay(100);
}
