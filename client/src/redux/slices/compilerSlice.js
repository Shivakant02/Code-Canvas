import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullCode: {
    html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Clock</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="clock">
        <div id="time"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
`,
    css: `body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #282c34;
    color: white;
    font-family: 'Arial', sans-serif;
    margin: 0;
}

.clock {
    font-size: 3em;
    background: #333;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
`,
    javascript: `function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = \`\${hours}:\${minutes}:\${seconds}\`;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately
de`,
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    updadeCodeValue: (state, action) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updadeCodeValue } = compilerSlice.actions;
