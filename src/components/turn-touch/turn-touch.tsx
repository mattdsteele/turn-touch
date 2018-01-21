import { Component, Method, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "turn-touch"
})
export class TurnTouch {
  ch: BluetoothRemoteGATTCharacteristic;
  @Event() buttonPress: EventEmitter;

  mappings: { [num: number]: string } = {
    0xff00: "Off",
    0xfe00: "Up",
    0xfeff: "Up Hold",
    0xfb00: "Left",
    0xfbff: "Left Hold",
    0xfd00: "Right",
    0xfdff: "Right Hold",
    0xf700: "Down",
    0xf7ff: "Down Hold"
  };

  mapButton(code: number): string {
    const mapped = this.mappings[code];
    if (mapped) {
      return mapped;
    }
    return `0x${code.toString(16)}`;
  }

  @Method()
  async connect() {
    const device = await navigator.bluetooth.requestDevice({
      optionalServices: ["99c31523-dc4f-41b1-bb04-4e4deb81fadd"],
      filters: [
        {
          name: "Turn Touch Remote"
        }
      ]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(
      "99c31523-dc4f-41b1-bb04-4e4deb81fadd"
    );
    const ch = await service.getCharacteristic(
      "99c31525-dc4f-41b1-bb04-4e4deb81fadd"
    );
    this.ch = ch;

    await ch.startNotifications();
    this.ch.addEventListener("characteristicvaluechanged", e => {
      const value: DataView = (e.target as any).value;
      const toMap = this.mapButton(value.getUint16(0));

      this.buttonPress.emit({ button: toMap });
    });
  }
}
