---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: "text-center"
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# React Testing Library

<div class="text-cyan-100">Testing from a user's perspective</div>

<img class="h-24 inline m-8" src="/testing-library-logo.png" />

<div class="bottom py-8 text-3xl">
  <div class="">Aaron Harper</div>
  <div>Engineer at <img class="inline h-12" src="/blumira-logo.png" /></div>
</div>

---

# Tests should...

<h3>Mimic what the user <span class="font-bold text-cyan-100">experiences</span></h3>

<p class="py-4">
  <h4 class="italic">"How do my users identify this <code>input</code>?"</h4>

  <div>✅ Find the <code>input</code> labeled 'Age'</div>
  <div>❌ Find the element with the attribute <code>id="age"</code></div>
</p>

<p class="py-4">
  <h4 class="italic">"How do my users know when there was a <code>form</code> error?"</h4>

  <div>✅ An "invalid input" error message appears</div>
  <div>❌ An error exists in the React component's state</div>
</p>

---

# Tests should...

<h3>Encourage <span class="font-bold text-cyan-100">best practices</span></h3>

<p>
  ✅ Good accessibility

```html
<form>
  <label>
    Age
    <input />
  </label>
</form>
```

```html
<form>
  <label for="age">Age</label>
  <input name="age" />
</form>
```

</p>

<p>
  ❌ Bad accessibility

```html
<form>
  <span>Age</span>
  <input />
</form>
```

</p>

---

# Tests should...

<h3>Read like <span class="font-bold text-cyan-100">documentation</span></h3>

<p>

Hide implementation details (a.k.a. "black-box testing")

- Easier onboarding
- Easier code reviews
- Easier maintenance

</p>

---

# Tests should...

<h3>Run <span class="font-bold text-cyan-100">quickly</span></h3>

<p>
  <img class="mx-auto" src="/test-watch.gif" />
</p>

---

# Example

<p class="py-4"></p>

<p class="flex">
  <div class="flex-1">
    <img class="my-1" src="/MyForm.png" />
  </div>

  <div class="flex-1">

```ts {all|1|2-5|6-11|13-17}
test("form submission", async () => {
  // Setup
  const onSubmit = jest.fn();
  render(<MyForm onSubmit={onSubmit} />);

  // User interacts with the page
  await userEvent.click(screen.getByLabelText("First Name"));
  await userEvent.keyboard("Sofia");
  await userEvent.tab();
  await userEvent.keyboard("Lamb");
  await userEvent.click(screen.getByText("Submit"));

  // Ensure that `onSubmit` callback received the correct data
  expect(onSubmit).toBeCalledWith({
    firstName: "Sofia",
    lastName: "Lamb",
  });
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
    <td><code>queryBy...</code></td>
    <td>✅</td>
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
    <td><code>queryAllBy...</code></td>
    <td>✅</td>
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
    <li><code>queryManyBy...</code></li>
    <li><code>findManyBy...</code></li>
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

<h1>Events</h1>

<p class="py-4"></p>

- Keyboard
- Mouse
  - Click specific button (e.g. "mouse right")
  - Double-click
  - Move
  - Hover
- Clipboard
  - Cut
  - Copy
  - Paste
- Upload
