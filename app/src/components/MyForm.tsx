import { useState } from "react";
import "./MyForm.css";

export function MyForm(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setGreeting(`Hello ${firstName} ${lastName}!`);
    setFirstName("");
    setLastName("");
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            First Name
            <input
              className="text-input"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>

        <div>
          <label>
            Last Name
            <input
              className="text-input"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>

        <div>
          <input className="submit" type="submit" value="Submit" />
        </div>
      </form>

      {greeting && <div className="greeting">{greeting}</div>}
    </div>
  );
}
