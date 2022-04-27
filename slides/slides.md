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

  <div>✅ Find the <code>input</code> labeled 'Age'...</div>
  <div>❌ Find the element with the attribute <code>id="age"</code>...</div>
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
  <span>Name</span>
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
- Easier PR reviews
- Easier maintenance

</p>

---

# Tests should...

<h3>Run <span class="font-bold text-cyan-100">quickly</span></h3>

<ul>
  <li>Part of the development loop</li>
</ul>

---

# Example

<p></p>

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
  await userEvent.keyboard("{tab}");
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
