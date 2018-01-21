import { Component, Element, State, Listen } from "@stencil/core";
import { TurnTouch } from "../turn-touch/turn-touch";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss",
  shadow: false
})
export class MyApp {
  mock = false;
  strip: TurnTouch;
  @Element() el: HTMLElement;
  @State() connected = false;

  connect = async () => {
    const strip = (this.el.querySelector("turn-touch") as any) as TurnTouch;
    await strip.connect();
    this.connected = true;
    this.strip = strip;
  };
  get welcome() {
    return (
      <nav>
        <button onClick={this.connect}>Connect</button>
      </nav>
    );
  }
  @State() emittedEvents: number[] = [];
  get events() {
    return (
      <ul>
        {this.emittedEvents.map(e => {
          return <li>{e}</li>;
        })}
      </ul>
    );
  }

  @Listen("buttonPress")
  handlePress(event: CustomEvent) {
    this.emittedEvents = [event.detail.number, ...this.emittedEvents];
  }

  render() {
    return (
      <div>
        <turn-touch />
        {this.connected ? this.events : this.welcome}
      </div>
    );
  }
}
