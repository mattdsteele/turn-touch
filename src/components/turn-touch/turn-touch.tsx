import { Component, Method, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "turn-touch"
})
export class TurnTouch {
  ch: BluetoothRemoteGATTCharacteristic;
  @Event() buttonPress: EventEmitter;

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
      const number = value.getUint16(0);
      this.buttonPress.emit({ number });
    });
  }
}
