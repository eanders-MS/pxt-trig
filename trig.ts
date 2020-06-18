//% color=#726eb7 icon="\u22bf"
//% groups='[]'
namespace trig {
    let sinTable: Fx8[];

    // These are in degrees.
    const PI_FX8 = Fx8(180);
    const TWO_PI_FX8 = Fx8(360);
    const PI_OVER_2_FX8 = Fx8(90);
    const TWO_PI_OVER_3_FX8 = Fx8(270);
    const PI_OVER_2 = 90;

    let initSinTable = () => {
        initSinTable = () => {};
        sinTable = [];
        for (let i = 0; i <= PI_OVER_2; ++i) {
            // Generate a quarter arc
            const val = Math.sin(Math.PI / 2 * i / PI_OVER_2);
            const valFx8 = Fx8(val);
            sinTable.push(valFx8);
        }
    }

    function fxmod(a: Fx8, b: Fx8) {
        return ((a as any as number) % (b as any as number)) as any as Fx8;
    }

    export function fxsin(deg: Fx8) {
        initSinTable();
        let index: Fx8, origIndex: Fx8;
        // Put in unit circle (positive or negative)
        index = fxmod(deg, TWO_PI_FX8);
        // Put into positive units
        if (index < Fx.zeroFx8)
            index = Fx.add(index, TWO_PI_FX8);
        // Save unit circle index
        origIndex = index;
        // Put index into the quarter arc
        index = fxmod(index, PI_OVER_2_FX8);
        let sign = Fx.oneFx8;
        // If index is greater than PI, negate the result
        if (origIndex > PI_FX8)
            sign = Fx.neg(sign);
        // If index is in a reverse quadrant, reverse the lookup
        if ((origIndex >= PI_OVER_2_FX8 && origIndex < PI_FX8) || (origIndex >= TWO_PI_OVER_3_FX8 && origIndex < TWO_PI_FX8))
            index = Fx.sub(PI_OVER_2_FX8, index);
        // Lookup the value
        const s = sinTable[Fx.toInt(index)];
        // TODO: Lerp to the closest value between table entries
        // Apply the sign
        return Fx.mul(sign, s);
    }

    export function fxcos(deg: Fx8) {
        return fxsin(Fx.add(deg, PI_OVER_2_FX8));
    }

    //% blockId=trig_sin block="sin $deg"
    export function sin(deg: number) {
        return Fx.toFloat(fxsin(Fx8(deg)));
    }

    //% blockId=trig_cos block="cos $deg"
    export function cos(deg: number) {
        return Fx.toFloat(fxcos(Fx8(deg)));
    }
}