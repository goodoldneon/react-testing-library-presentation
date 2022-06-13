---
class: "text-center"
---

# Testing Library

<div class="text-cyan-100">Testing from a user's perspective</div>

<img class="h-24 inline m-8" src="/testing-library-logo.png" />

<div class="bottom py-8 text-3xl">
  <div class="">Aaron Harper</div>
  <div>Engineer at <img class="inline h-12" src="/blumira-logo.png" /></div>
</div>

---

# Supported frameworks

<p class="py-4"></p>

<div class="flex flex-wrap text-center">
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/react-logo.png" style="height: 100px" />
      React
    </label>
  </div>
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/vue-logo.png" style="height: 100px" />
      Vue
    </label>
  </div>
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/angular-logo.png" style="height: 100px" />
      Angular
    </label>
  </div>
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/preact-logo.png" style="height: 100px" />
      Preact
    </label>
  </div>
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/svelte-logo.png" style="height: 100px" />
      Svelte
    </label>
  </div>
</div>

---

# Does not replace...

<p class="py-4"></p>

- Test runner 🏃🏼‍♀️
  - Jest, Mocha, etc.
- Assertion library 👁
  - Jest, Chai, etc.
- Spy/stub library 🕵🏽
  - Jest, Sinon, etc.
- Simulated browser 🤖
  - Jsdom
- End-to-end framework 🌎
  - Cypress, Puppeteer, Selenium, etc.

---

<h1> What does Testing Library do?</h1>

<p class="py-4"></p>

<p>Tests' relationship with the simulated browser</p>

<p class="flex gap-4 items-center">
  <div class="flex-1 text-3xl text-right">
    <div class="my-8">Render ➡️</div>
    <div class="my-8">Events ➡️</div>
    <div class="my-8">Query ⬅️</div>
  </div>

  <div class="flex-1">
    <img src="/browser.png"/>
  </div>
</p>

---

# Tests should...

<h3>Mimic what the user <span class="font-bold text-cyan-100">experiences 👀</span></h3>

<p class="py-4">
  <h4 class="italic">"How do my users know where to enter their first name?"</h4>

  <div>✅ Find the <code>input</code> labeled 'First Name'</div>
  <div>❌ Find the element with the attribute <code>id="first-name"</code></div>
</p>

<p class="py-4">
  <h4 class="italic">"How do my users know when there was a <code>form</code> error?"</h4>

  <div>✅ An "invalid input" error message appears</div>
  <div>❌ An error exists in the React component's state</div>
</p>

---

# Tests should...

<h3>Encourage <span class="font-bold text-cyan-100">best practices 👷🏼‍♀️</span></h3>

<p>
  ✅ Good accessibility

```html
<form>
  <label>
    First Name
    <input />
  </label>
</form>
```

```html
<form>
  <label for="first-name">First Name</label>
  <input name="first-name" />
</form>
```

</p>

<p>
  ❌ Bad accessibility

```html
<form>
  <span>First Name</span>
  <input />
</form>
```

</p>

---

# Tests should...

<h3>Read like <span class="font-bold text-cyan-100">documentation 📑</span></h3>

<p>

Hide implementation details (a.k.a. "black-box testing")

- Easier onboarding
- Easier code reviews
- Easier maintenance

</p>

---

# Tests should...

<h3>Run <span class="font-bold text-cyan-100">quickly 🏃🏽‍♂️</span></h3>

<p>
  <img class="mx-auto" src="/test-watch.gif" />
</p>

---

# Example

<p class="py-4"></p>

<p class="flex">
  <div class="flex-1">
    <img class="my-1" src="/form.gif" />
  </div>

  <div class="flex-1">

```ts {all|1|2-4|5-12|14-15}
test("form submission", async () => {
  // Setup
  render(<MyForm />);

  // User interacts with the page
  const firstNameInput = screen.getByLabelText("First Name");
  await userEvent.click(firstNameInput);
  await userEvent.keyboard("Gordon");
  await userEvent.tab();
  await userEvent.keyboard("Freeman");
  const submitButton = screen.getByText("Submit");
  await userEvent.click(submitButton);

  // Ensure that the correct greeting appears
  screen.getByText("Hello Gordon Freeman!");
});
```

  </div>
</p>

---

<h1>Asynchronous logic</h1>

<p class="py-4"></p>

<p class="flex">
  <div class="flex-1 text-center">
    <img class="mx-auto" src="/user-status-loading.png" style="height:64px" />
    <div class="m-4 text-5xl">⏳</div>
    <img class="mx-auto" src="/user-status-active.png" style="height:64px" />
  </div>

  <div class="flex-1">
    <ol>
      <li>Show "Loading..."</li>
      <li>Fetch user status from server</li>
      <li>Display user status</li>
    </ol>
  </div>
</p>

---

<h1>Asynchronous logic</h1>

<p class="py-4"></p>

<p class="flex">
  <div class="flex-1 text-center">
    <img class="mx-auto" src="/user-status-loading.png" style="height:64px" />
    <div class="m-4 text-5xl">⏳</div>
    <img class="mx-auto" src="/user-status-active.png" style="height:64px" />
  </div>

  <div class="flex-1">

```tsx {all|2-3|5-6|8-9}
test("fetch user status", async () => {
  // Setup
  render(<UserBadge />);

  // Loading placeholder immediately appears
  screen.getByText("Loading...");

  // Wait for text to appear
  await screen.findByText("Active");
});
```

  </div>
</p>

---

<h1>Queries</h1>

<p class="py-4"></p>

<table>
  <tr class="font-bold">
    <td>Type of Query</td>
    <td>0 Matches</td>
    <td>1 Match</td>
    <td>>1 Matches</td>
    <td>Async</td>
  </tr>
  <tr>
    <td class="italic text-center" colspan="5">Single Element</td>
  </tr>
  <tr>
    <td><code>getBy...</code></td>
    <td class="text-red-500">Error</td>
    <td>✅</td>
    <td class="text-red-500">Error</td>
    <td>No</td>
  </tr>
  <tr>
    <td><code>findBy...</code></td>
    <td class="text-red-500">Error</td>
    <td>✅</td>
    <td class="text-red-500">Error</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>queryBy...</code></td>
    <td>✅</td>
    <td>✅</td>
    <td class="text-red-500">Error</td>
    <td>No</td>
  </tr>
  <tr>
    <td class="italic text-center" colspan="5">Multiple Elements</td>
  </tr>
  <tr>
    <td><code>getAllBy...</code></td>
    <td class="text-red-500">Error</td>
    <td>✅</td>
    <td>✅</td>
    <td>No</td>
  </tr>
  <tr>
    <td><code>findAllBy...</code></td>
    <td class="text-red-500">Error</td>
    <td>✅</td>
    <td>✅</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>queryAllBy...</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>No</td>
  </tr>
</table>

---

<h1>Queries</h1>

<p class="py-4"></p>

<p class="flex">
  <div class="flex-1">
    <li><code>getBy...</code></li>
    <li><code>queryBy...</code></li>
    <li><code>findBy...</code></li>
    <li><code>getAllBy...</code></li>
    <li><code>queryAllBy...</code></li>
    <li><code>findAllBy...</code></li>
  </div>

  <div class="flex-1 text-10xl text-center">+</div>

  <div class="flex-1">
    <li><code>...AltText</code></li>
    <li><code>...DisplayValue</code></li>
    <li><code>...LabelText</code></li>
    <li><code>...PlaceHolderText</code></li>
    <li><code>...Role</code></li>
    <li><code>...Text</code></li>
    <li><code>...Title</code></li>
  </div>
</p>

---

<h1>User Events</h1>

<p class="py-4"></p>

- Keyboard ⌨
- Mouse 🖱
  - Click specific button (e.g. "mouse right")
  - Double-click
  - Move
  - Hover
- Clipboard 📋
  - Cut
  - Copy
  - Paste
- Upload 📁

---

# End-to-end testing?

<p class="py-4"></p>

<p class="flex gap-4 items-center">
  <div class="flex-1 text-2xl">
    <div>✅ Unit testing (simulated browser)</div>
    <div>🤔 End-to-end testing (real browser)</div>
  </div>

  <div class="flex-1">
    <img src="/test-pyramid.png"/>
  </div>
</p>

---

# End-to-end testing

<p class="py-4"></p>

<div class="flex flex-wrap text-center">
  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/puppeteer-logo.png" style="height: 100px" />
      Puppeteer
    </label>
  </div>

  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/playwright-logo.png" style="height: 100px" />
      Playwright
    </label>
  </div>

  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/cypress-logo.png" style="height: 100px" />
      Cypress
    </label>
  </div>

  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/nightwatch-logo.png" style="height: 100px" />
      Nightwatch
    </label>
  </div>

  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/testcafe-logo.png" style="height: 100px" />
      TestCafe
    </label>
  </div>

  <div class="flex-1">
    <label>
      <img class="mx-auto my-4" src="/webdriverio-logo.png" style="height: 100px" />
      WebdriverIO
    </label>
  </div>
</div>

---

<h1>End-to-end testing</h1>

<p class="py-4"></p>

<p class="flex gap-4 items-center">
  <div class="flex-1 text-3xl text-right">
    <div class="my-8">Render️ ❌</div>
    <div class="my-8">Events ❌</div>
    <div class="my-8">Query ⬅️</div>
  </div>

  <div class="flex-1">
    <img src="/browser.png"/>
  </div>
</p>

---

<div class="flex flex-col items-center" style="height: 100%">
  <div class="flex-1"></div>

  <h1>End-to-end testing demo</h1>

  <div class="flex-1 text-8xl">👨🏻‍💻</div>
</div>

---

<h1>The End</h1>

<p></p>

<div class="my-32 text-5xl text-center">
  Questions?

🙋🏾‍♀️🙋🏻🙋🏽‍♂️

</div>
