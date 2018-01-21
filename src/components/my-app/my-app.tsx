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
  @State() connecting = false;

  connect = async () => {
    const strip = (this.el.querySelector("turn-touch") as any) as TurnTouch;
    this.connecting = true;
    try {
      await strip.connect();
      this.strip = strip;
      this.connected = true;
    } catch (e) {
      console.error(e);
    } finally {
      this.connecting = false;
    }
  };
  get welcome() {
    return (
      <nav>
        {this.connecting ? (
          <h1>Connecting...</h1>
        ) : (
          <button onClick={this.connect}>Connect</button>
        )}
      </nav>
    );
  }
  @State() emittedEvents: any[] = [];
  get events() {
    return (
      <div>
        <h1>Press some buttons</h1>
        <ul>
          {this.emittedEvents.map(e => {
            return <li>{e}</li>;
          })}
        </ul>
      </div>
    );
  }

  @Listen("buttonPress")
  handlePress(event: CustomEvent) {
    this.emittedEvents = [event.detail.button, ...this.emittedEvents];
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
