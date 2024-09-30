// PyScript py-editor plugin
import { Hook, XWorker, dedent, defineProperties } from "polyscript/exports";
import { TYPES, offline_interpreter, relative_url, stdlib } from "../core.js";
import { notify } from "./error.js";

// const RUN_BUTTON = `<svg style="height:20px;width:20px;vertical-align:-.125em;transform-origin:center;overflow:visible;color:green" viewBox="0 0 384 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(192 256)" transform-origin="96 0"><g transform="translate(0,0) scale(1,1)"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" fill="currentColor" transform="translate(-192 -256)"></path></g></g></svg>`;
// const RUN_BUTTON = `<svg width="100" height="40" xmlns="http://www.w3.org/2000/svg"><g> <title>Layer 1</title> <rect stroke="null" x="1" y="0" id="svg_1" fill="#4CAF50" ry="10" rx="10" height="40" width="99"/> <polygon id="svg_2" fill="white" points="9,11 9,31 29,21 "/> <text id="svg_3" fill="white" font-size="16" font-family="Arial" y="27" x="30">运行代码</text> </g> </svg>`;
const RUN_BUTTON = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="48"
   height="20"
   viewBox="0 0 47.979725 20.020842"
   version="1.1"
   id="svg1"
   inkscape:export-filename="位图.svg"
   inkscape:export-xdpi="96"
   inkscape:export-ydpi="96"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:export-bgcolor="#ffffff00" />
  <defs
     id="defs1">
    <rect
       x="342.96188"
       y="297.23364"
       width="109.96556"
       height="59.882233"
       id="rect2" />
    <linearGradient
       id="swatch1"
       inkscape:swatch="solid">
      <stop
         style="stop-color:#000000;stop-opacity:1;"
         offset="0"
         id="stop1" />
    </linearGradient>
  </defs>
  <g
     inkscape:label="图层 1"
     inkscape:groupmode="layer"
     id="layer1"
     style="opacity:1;stroke-width:1.20176"
     inkscape:export-filename="运行代码按钮2.svg"
     inkscape:export-xdpi="96"
     inkscape:export-ydpi="96"
     transform="matrix(0.76122217,0,0,0.90959859,-48.154944,-67.942886)">
    <g
       id="g2"
       style="stroke-width:1.20176">
      <rect
         style="fill:#14bce3;fill-opacity:0.940741;fill-rule:nonzero;stroke:#554cec;stroke-width:0.212841;stroke-dasharray:none;stroke-opacity:0;paint-order:stroke markers fill"
         id="rect1"
         width="62.817211"
         height="21.67683"
         x="63.018459"
         y="75.175621"
         transform="matrix(0.99999452,-0.00330999,0.00405075,0.9999918,0,0)"
         rx="13.13646"
         ry="10.993719" />
      <path
         sodipodi:type="star"
         style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:0.397999;stroke-dasharray:none;stroke-opacity:0.0169492;paint-order:stroke markers fill"
         id="path1"
         inkscape:flatsided="true"
         sodipodi:sides="3"
         sodipodi:cx="40.617844"
         sodipodi:cy="38.31329"
         sodipodi:r1="6.6256061"
         sodipodi:r2="3.3128033"
         sodipodi:arg1="0"
         sodipodi:arg2="1.0471976"
         inkscape:rounded="1"
         inkscape:randomized="0"
         d="m 47.24345,38.31329 c 0,11.475886 0,11.475886 -9.938409,5.737943 -9.938409,-5.737943 -9.938409,-5.737943 0,-11.475887 9.938409,-5.737943 9.938409,-5.737943 9.938409,5.737944 z"
         inkscape:transform-center-x="1.382009"
         transform="matrix(-0.78715052,-0.04018847,0.04581581,-0.81106295,107.52272,118.62756)"
         inkscape:transform-center-y="-0.32950674" />
      <text
         xml:space="preserve"
         transform="matrix(0.40527003,-6.4538752e-4,8.6599342e-4,0.35361277,-49.549504,-18.569736)"
         id="text1"
         style="font-size:32px;line-height:0px;white-space:pre;shape-inside:url(#rect2);fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:0.841251;stroke-dasharray:none;stroke-opacity:0.0338983;paint-order:stroke markers fill"
         x="0"
         y="0"
         inkscape:export-filename="运行代码按钮2.svg"
         inkscape:export-xdpi="96"
         inkscape:export-ydpi="96"><tspan
           x="342.96094"
           y="306.42895"
           id="tspan3"><tspan
             style="font-family:'Microsoft YaHei UI';-inkscape-font-specification:'Microsoft YaHei UI';text-align:justify"
             id="tspan1">
</tspan></tspan><tspan
           x="342.96094"
           y="307.23488"
           id="tspan5"><tspan
             style="font-family:'Microsoft YaHei UI';-inkscape-font-specification:'Microsoft YaHei UI';text-align:justify"
             id="tspan4">运行</tspan></tspan></text>
    </g>
  </g>
</svg>
`;

let id = 0;
const getID = (type) => `${type}-editor-${id++}`;

const envs = new Map();
const configs = new Map();

const hooks = {
  worker: {
    codeBeforeRun: () => stdlib,
    // works on both Pyodide and MicroPython
    onReady: ({ runAsync, io }, { sync }) => {
      io.stdout = io.buffered(sync.write);
      io.stderr = io.buffered(sync.writeErr);
      sync.revoke();
      sync.runAsync = runAsync;
    },
  },
};

const validate = (config, result) => {
  if (typeof result === "boolean") throw `Invalid source: ${config}`;
  return result;
};

async function execute({ currentTarget }) {
  const { env, pySrc, outDiv } = this;
  const hasRunButton = !!currentTarget;

  if (hasRunButton) {
    currentTarget.disabled = true;
    outDiv.innerHTML = "";
  }

  if (!envs.has(env)) {
    const srcLink = URL.createObjectURL(new Blob([""]));
    const details = {
      type: this.interpreter,
      serviceWorker: this.serviceWorker,
    };
    const { config } = this;
    if (config) {
      // verify that config can be parsed and used
      try {
        details.configURL = relative_url(config);
        if (config.endsWith(".toml")) {
          const [{ parse }, toml] = await Promise.all([
            import(/* webpackIgnore: true */ "../3rd-party/toml.js"),
            fetch(config).then((r) => r.ok && r.text()),
          ]);
          details.config = parse(validate(config, toml));
        } else if (config.endsWith(".json")) {
          const json = await fetch(config).then((r) => r.ok && r.json());
          details.config = validate(config, json);
        } else {
          details.configURL = relative_url("./config.txt");
          details.config = JSON.parse(config);
        }
        details.version = offline_interpreter(details.config);
      } catch (error) {
        notify(error);
        return;
      }
    } else {
      details.config = {};
    }

    const xworker = XWorker.call(new Hook(null, hooks), srcLink, details);

    const { sync } = xworker;
    const { promise, resolve } = Promise.withResolvers();
    envs.set(env, promise);
    sync.revoke = () => {
      URL.revokeObjectURL(srcLink);
      resolve(xworker);
    };
  }

  // wait for the env then set the target div
  // before executing the current code
  return envs.get(env).then((xworker) => {
    xworker.onerror = ({ error }) => {
      if (hasRunButton) {
        outDiv.insertAdjacentHTML(
          "beforeend",
          `<span style='color:red'>${error.message || error}</span>\n`,
        );
      }
      console.error(error);
    };

    const enable = () => {
      if (hasRunButton) currentTarget.disabled = false;
    };
    const { sync } = xworker;
    sync.write = (str) => {
      if (hasRunButton) outDiv.innerText += `${str}\n`;
      else console.log(str);
    };
    sync.writeErr = (str) => {
      if (hasRunButton) {
        outDiv.insertAdjacentHTML(
          "beforeend",
          `<span style='color:red'>${str}</span>\n`,
        );
      } else {
        notify(str);
        console.error(str);
      }
    };
    sync.runAsync(pySrc).then(enable, enable);
  });
}

const makeRunButton = (handler, type) => {
  const runButton = document.createElement("button");
  runButton.className = `absolute ${type}-editor-run-button`;
  runButton.innerHTML = RUN_BUTTON;
  runButton.setAttribute("aria-label", "Python Script Run Button");
  runButton.addEventListener("click", async (event) => {
    runButton.blur();
    await handler.handleEvent(event);
  });
  return runButton;
};

const makeEditorDiv = (handler, type) => {
  const editorDiv = document.createElement("div");
  editorDiv.className = `${type}-editor-input`;
  editorDiv.setAttribute("aria-label", "Python Script Area");

  const runButton = makeRunButton(handler, type);
  const editorShadowContainer = document.createElement("div");

  // avoid outer elements intercepting key events (reveal as example)
  editorShadowContainer.addEventListener("keydown", (event) => {
    event.stopPropagation();
  });

  editorDiv.append(runButton, editorShadowContainer);

  return editorDiv;
};

const makeOutDiv = (type) => {
  const outDiv = document.createElement("div");
  outDiv.className = `${type}-editor-output`;
  outDiv.id = `${getID(type)}-output`;
  return outDiv;
};

const makeBoxDiv = (handler, type) => {
  const boxDiv = document.createElement("div");
  boxDiv.className = `${type}-editor-box`;

  const editorDiv = makeEditorDiv(handler, type);
  const outDiv = makeOutDiv(type);
  boxDiv.append(editorDiv, outDiv);

  return [boxDiv, outDiv, editorDiv.querySelector("button")];
};

const init = async (script, type, interpreter) => {
  const [
    { basicSetup, EditorView },
    { Compartment },
    { python },
    { indentUnit },
    { keymap },
    { defaultKeymap, indentWithTab },
  ] = await Promise.all([
    import(/* webpackIgnore: true */ "../3rd-party/codemirror.js"),
    import(/* webpackIgnore: true */ "../3rd-party/codemirror_state.js"),
    import(/* webpackIgnore: true */ "../3rd-party/codemirror_lang-python.js"),
    import(/* webpackIgnore: true */ "../3rd-party/codemirror_language.js"),
    import(/* webpackIgnore: true */ "../3rd-party/codemirror_view.js"),
    import(/* webpackIgnore: true */ "../3rd-party/codemirror_commands.js"),
  ]);

  let isSetup = script.hasAttribute("setup");
  const hasConfig = script.hasAttribute("config");
  const serviceWorker = script.getAttribute("service-worker");
  const env = `${interpreter}-${script.getAttribute("env") || getID(type)}`;

  // helps preventing too lazy ServiceWorker initialization on button run
  if (serviceWorker) {
    new XWorker("data:application/javascript,postMessage(0)", {
      type: "dummy",
      serviceWorker,
    }).onmessage = ({ target }) => target.terminate();
  }

  if (hasConfig && configs.has(env)) {
    throw new SyntaxError(
      configs.get(env)
        ? `duplicated config for env: ${env}`
        : `unable to add a config to the env: ${env}`,
    );
  }

  configs.set(env, hasConfig);

  let source = script.textContent;

  // verify the src points to a valid file that can be parsed
  const { src } = script;
  if (src) {
    try {
      source = validate(src, await fetch(src).then((b) => b.ok && b.text()));
    } catch (error) {
      notify(error);
      return;
    }
  }

  const context = {
    // allow the listener to be overridden at distance
    handleEvent: execute,
    serviceWorker,
    interpreter,
    env,
    config: hasConfig && script.getAttribute("config"),
    get pySrc() {
      return isSetup ? source : editor.state.doc.toString();
    },
    get outDiv() {
      return isSetup ? null : outDiv;
    },
  };

  let target;
  defineProperties(script, {
    target: { get: () => target },
    handleEvent: {
      get: () => context.handleEvent,
      set: (callback) => {
        // do not bother with logic if it was set back as its original handler
        if (callback === execute) context.handleEvent = execute;
        // in every other case be sure that if the listener override returned
        // `false` nothing happens, otherwise keep doing what it always did
        else {
          context.handleEvent = async (event) => {
            // trap the currentTarget ASAP (if any)
            // otherwise it gets lost asynchronously
            const { currentTarget } = event;
            // augment a code snapshot before invoking the override
            defineProperties(event, {
              code: { value: context.pySrc },
            });
            // avoid executing the default handler if the override returned `false`
            if ((await callback(event)) !== false)
              await execute.call(context, { currentTarget });
          };
        }
      },
    },
    code: {
      get: () => context.pySrc,
      set: (insert) => {
        if (isSetup) return;
        editor.update([
          editor.state.update({
            changes: {
              from: 0,
              to: editor.state.doc.length,
              insert,
            },
          }),
        ]);
      },
    },
    process: {
      /**
       * Simulate a setup node overriding the source to evaluate.
       * @param {string} code the Python code to evaluate.
       * @param {boolean} asRunButtonAction invoke the `Run` button handler.
       * @returns {Promise<...>} fulfill once code has been evaluated.
       */
      value(code, asRunButtonAction = false) {
        if (asRunButtonAction) return listener();
        const wasSetup = isSetup;
        const wasSource = source;
        isSetup = true;
        source = code;
        const restore = () => {
          isSetup = wasSetup;
          source = wasSource;
        };
        return context
          .handleEvent({ currentTarget: null })
          .then(restore, restore);
      },
    },
  });

  const notifyEditor = () => {
    const event = new Event(`${type}-editor`, { bubbles: true });
    script.dispatchEvent(event);
  };

  if (isSetup) {
    await context.handleEvent({ currentTarget: null });
    notifyEditor();
    return;
  }

  const selector = script.getAttribute("target");

  if (selector) {
    target =
      document.getElementById(selector) || document.querySelector(selector);
    if (!target) throw new Error(`Unknown target ${selector}`);
  } else {
    target = document.createElement(`${type}-editor`);
    target.style.display = "block";
    script.after(target);
  }

  if (!target.id) target.id = getID(type);
  if (!target.hasAttribute("exec-id")) target.setAttribute("exec-id", 0);
  if (!target.hasAttribute("root")) target.setAttribute("root", target.id);

  // @see https://github.com/JeffersGlass/mkdocs-pyscript/blob/main/mkdocs_pyscript/js/makeblocks.js
  const [boxDiv, outDiv, runButton] = makeBoxDiv(context, type);
  boxDiv.dataset.env = script.hasAttribute("env") ? env : interpreter;

  const inputChild = boxDiv.querySelector(`.${type}-editor-input > div`);
  const parent = inputChild.attachShadow({ mode: "open" });
  // avoid inheriting styles from the outer component
  parent.innerHTML = `<style> :host { all: initial; }</style>`;

  target.appendChild(boxDiv);

  const doc = dedent(script.textContent).trim();

  // preserve user indentation, if any
  const indentation = /^([ \t]+)/m.test(doc) ? RegExp.$1 : "    ";

  const listener = () => runButton.click();
  const editor = new EditorView({
    extensions: [
      indentUnit.of(indentation),
      new Compartment().of(python()),
      keymap.of([
        ...defaultKeymap,
        { key: "Ctrl-Enter", run: listener, preventDefault: true },
        { key: "Cmd-Enter", run: listener, preventDefault: true },
        { key: "Shift-Enter", run: listener, preventDefault: true },
        // @see https://codemirror.net/examples/tab/
        indentWithTab,
      ]),
      basicSetup,
    ],
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    parent,
    doc,
  });

  editor.focus();
  notifyEditor();
};

// avoid too greedy MutationObserver operations at distance
let timeout = 0;

// avoid delayed initialization
let queue = Promise.resolve();

// reset interval value then check for new scripts
const resetTimeout = () => {
  timeout = 0;
  pyEditor();
};

// triggered both ASAP on the living DOM and via MutationObserver later
const pyEditor = () => {
  if (timeout) return;
  timeout = setTimeout(resetTimeout, 250);
  for (const [type, interpreter] of TYPES) {
    const selector = `script[type="${type}-editor"]`;
    for (const script of document.querySelectorAll(selector)) {
      // avoid any further bootstrap by changing the type as active
      script.type += "-active";
      // don't await in here or multiple calls might happen
      // while the first script is being initialized
      queue = queue.then(() => init(script, type, interpreter));
    }
  }
  return queue;
};

new MutationObserver(pyEditor).observe(document, {
  childList: true,
  subtree: true,
});

// try to check the current document ASAP
export default pyEditor();
