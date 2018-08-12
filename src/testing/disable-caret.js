(() => {
  const $iframe = document.getElementById("storybook-preview-iframe");
  const $doc = $iframe.contentDocument;
  const $style = $doc.createElement("style");

  $style.innerHTML = `input {
    caret-color: transparent !important;
  }`;

  $doc.body.appendChild($style);
})();
