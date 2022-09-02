/**
 * These blocks have been created to support a prototype device
 * idea that provides Haptic feedback .Aimed at students with 
 * hearing dificulties. But can be used by anyone. The block send
 * digital or PWM signal to P2. The prototype uses the Monk Makes
 * switch board and vibration motor. Full details can be found
 * at www. computingatschool.co.uk/
 */


/** Stores the two states of the buzzer */
enum BuzzState {
    //% block=on
    on = 1,
    //% block=off
    off = 0
};

/** Stores the different haptic emotions */
enum HapticEmotion {
    //% block=happy
    happy,
    //% block=sad
    sad,
    //% block=angry
    angry
};


//% color="#4841e3" icon="\uf2a2" weight=110
namespace haptic {

    /**
     * Sets the buzzer on P2 to "on" or "off".
     */
    //% blockId=buzz block="buzz %BuzzState"
    //% weight=100
    export function buzz(state: BuzzState): void {
        // Sets the P2 pin to the value of state
        pins.digitalWritePin(DigitalPin.P2, state);
    }

    /**
     * Runs a haptic buzz pattern depending on the selected emotion
     * @param emotion: happy | sad | angry
     */
    //% blockId=haptic block="haptic %HapticEmotion" weight=90
    export function haptic(emotion: HapticEmotion): void {
        // Jump to selected pattern

        switch (emotion) {
            case HapticEmotion.happy:
                basic.showIcon(IconNames.Happy)
                let vibe = 0
                for (let i = 0; i <= 10; i++) {
                    vibe = 123 * i
                    pins.analogWritePin(AnalogPin.P2, vibe)
                    basic.pause(500)
                }
                pins.analogWritePin(AnalogPin.P2, 0)
                break;

            case HapticEmotion.sad:
                basic.showIcon(IconNames.Sad)
                let vibe2 = 1023
                for (let i = 0; i <= 10; i++) {
                    vibe2 = 2046 / i
                    pins.analogWritePin(AnalogPin.P2, vibe2)
                    basic.pause(500)
                }
                pins.analogWritePin(AnalogPin.P2, 0)
                break;

            case HapticEmotion.angry:
                for (let index = 0; index < 4; index++) {
                    pins.digitalWritePin(DigitalPin.P2, 1)
                    basic.pause(50)
                    basic.showIcon(IconNames.Angry)
                    pins.digitalWritePin(DigitalPin.P2, 0)
                    basic.pause(50)
                }
                pins.digitalWritePin(DigitalPin.P2, 1)
                basic.pause(1000)
                pins.digitalWritePin(DigitalPin.P2, 0)
                basic.pause(500)
                pins.digitalWritePin(DigitalPin.P2, 1)
                basic.pause(100)
                pins.digitalWritePin(DigitalPin.P2, 0)
                break;

        }
    }

    /**
     * Creates a haptic sparkles animation and buzz effect".
     */
    //% blockId=buzzicles block="buzzicles" weight=70
    export function buzzicles(): void {  
    
            let spark = 0
            let ledSpark = 0
            let plotSparkx = 0
            let plotsparky = 0
            spark = randint(300, 1023)
            pins.analogWritePin(AnalogPin.P2, spark)
            basic.pause(200)
            ledSpark = Math.map(spark, 0, 1023, 0, 6)
            plotSparkx = randint(0, ledSpark)
            plotsparky = randint(0, ledSpark)
            led.setBrightness(randint(0, 255))
            led.toggle(plotSparkx, plotsparky)
            
    }

    /**
   * Converts a Sound level into a Buzz representaion.
   */
    //% blockId=buzzlevelv2 block="buzzlevelv2" weight=50
    export function buzzlevelV2(): void {

        let buzzLevel = 0
        buzzLevel = input.soundLevel()
        led.plotBarGraph(buzzLevel, 255)
        pins.analogWritePin(AnalogPin.P2, pins.map(buzzLevel, 0, 255, 0, 1023))
    }
}